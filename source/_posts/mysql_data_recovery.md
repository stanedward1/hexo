---
title: Mysql误删数据后的恢复
date: 2022-07-22 22:03:32
tags: Mysql
categories: Database
cover: /img/IMG_2317.jpg
---
## 背景
最近为了在公司很久前配发的8G内存MacBook Pro上少开几个软件，我选择了idea提供的Database Client和Http Client，然而因为自己的不够细心加上对idea提供的Database Client不够熟悉，导致了误删了某张表的全部数据。
万幸不影响用户使用……
在这里复盘一下**Mysql误删数据后的恢复**

## SQL命令
```sql
-- input
delete from user;
-- output
-- delete from user
-- > Affected rows: 4
-- > 时间: 0.035s

-- input
show variables where variable_name in ('log_bin','datadir', 'basedir');
-- output
-- basedir	/usr/
-- datadir	/var/lib/mysql/
-- Mysql是否开启binlog功能，此功能开启才支持从日志文件恢复
-- log_bin	ON
```

## mysqlbinlog的使用
```shell
# 1、在datadir下找到对应删除数据时间段的数据日志文件
cd /var/lib/mysql && ll
# 2、进入mysql安装目录使用mysqlbinlog命令
cd /usr
sudo touch mysqllog.sql
sudo chmod 777 mysqllog.sql
sudo mysqlbinlog --base64-output=decode-rows -v --database=wiki --start-datetime="2022-07-22 01:00:00" --stop-datetime="2022-07-22 22:45:59" /var/lib/mysql/binlog.000133 > mysqllog.sql
cat mysqllog.sql
```
得到结果如图所示：
![msyql_data_recovery_01](/img/Database/msyql_data_recovery_01.png)

## 语句转换
DELETE语句转成Insert语句
使用Linux命令
```shell
cat mysqllog.sql | sed -n '/###/p' | sed 's/### //g;s/\/\*.*/,/g;s/DELETE FROM/;INSERT INTO/g;s/WHERE/SELECT/g;' |sed -r 's/(@17.*),/\1;/g' | sed 's/@1=//g'| sed 's/@[1-9]=/,/g' | sed 's/@[1-9][0-9]=/,/g' > mysqllogOK.sql
```
得到结果如图所示：
![msyql_data_recovery_02](/img/Database/msyql_data_recovery_02.png)

## 数据恢复与一点小结
运行此sql语句即可
大批量删除数据时，可以将这些数据插入到一个新表中，确认之后再删除。
