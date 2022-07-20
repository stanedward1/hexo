---
title: Linux挂载分区
date: 2022-04-19 01:02:45
tags: DevOps
categories: DevOps
cover: /img/75960.jpg
---
## 背景
以往是在一个比较大的固态硬盘里安装Linux系统，最近购入了一台宏碁暗影骑士擎，它有三个硬盘位，于是把我多余的sata硬盘找出来装了上去。可是多余的这个sata硬盘只有128G，有点担心会不够用，所以决定挂载一个windows系统存放数据的分区，同时也用来存放Linux系统需要使用到的数据。  
Os: Fedora35
## 过程
- 首先是查看现有分区，使用如下命令：`fdisk -l`
- 定位到想要挂载的分区，如`/dev/sda3`
- 挂载分区，使用如下命令：`mount /dev/sda3 /data`  
## 自动挂载分区  
### 编辑/etc/fstab
```shell
/dev/sda3 /data ntfs defaults 0 0
```
需要注意的是，这个文件修改完假如不能正常加载的话，可能重启以后不能正常进入桌面，所以可以使用如下命令进行测试：  
`sudo mount -a`  
另外，要注意文件系统格式,双系统的话文件系统可能是ntfs，这个要根据实际情况来！

