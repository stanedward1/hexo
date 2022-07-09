---
title: 使用Frp进行内网穿透
date: 2022-01-31 10:02:45
tags: DevOps
categories: DevOps
cover: /img/75960.jpg
---
场景是这样的：我有一台安装了Ubuntu桌面版的笔记本放在老家，有时候家人会用它看看电视剧，查查资料啥的，然后有一台性能啥的比较一般的云主机，有时候跑docker能把我直接卡下线，所以想着远程连老家的Ubuntu机器，过年正好有时间，玩个内网穿透吧。

我选用的是Frp进行内网穿透，下面是官方文档的介绍：

```tex
frp 是一个专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 等多种协议。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公网。
```

github地址：https://github.com/fatedier/frp

# 下载并解压frp压缩包

命令行下载：

```shell
wget https://github.com/fatedier/frp/releases/download/v0.39.0/frp_0.39.0_linux_amd64.tar.gz

tar -zxvf ./frp_0.31.1_linux_amd64.tar.gz
```

或者先在本地下载下来，然后通过scp传到云服务器和Linux机器上，本地网络比较快的情况下，这样还比较省心。

# 改配置文件

云服务器改frps.ini：

```ini
[common]
bind_port = 7000
auto_token =  token #这里放的是token，客户端连接这个的时候需要填写一致，可以看做是服务器密码

dashboard_port = 7500
dashboard_user = admin
dashboard_pwd = admin@username
```

Linux机器改frpc.ini：

```ini
[common]
server_addr = ip_address
server_port = 7000
auto_token =  token

[ssh]
type = tcp
local_ip = 192.168.0.147
local_port = 22
remote_port = 29999
```

# 启动服务

云服务器(在frp目录下运行)：

```shell
nohup ./frps -c frps.ini & # 启动服务端
```

Linux机器((在frp目录下运行):

```shell
nohup ./frpc -c frpc.ini & # 启动服务端
```

# 内网穿透远程连接

```shell
ssh -p remote_port Linux_name@remote_ip_address
# 也就是下面这行命令
ssh -p 29999 longbiu@remote_ip_address
```

默默的用man查了查-p的意思：

```shell
-p port
Port to connect to on the remote host.  This can be specified on a per-host basis in the configuration file.
```

# 自启动脚本

参考：https://www.cnblogs.com/airdot/p/9688530.html