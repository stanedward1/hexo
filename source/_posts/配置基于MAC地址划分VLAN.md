---
title: 配置基于MAC地址划分VLAN
date: 2025-05-29 12:08:34
tags: 网工
categories: 网工
---

[配置基于MAC地址划分VLAN示例 - 配置基于VLAN的VLAN Mapping - CloudEngine 12800 V200R024C10 配置指南-以太网交换 - 华为](https://support.huawei.com/enterprise/zh/doc/EDOC1100468714/2568012b)

此实验中配置结果为：

User1、User2、User3可以访问公司网络，如换成其他外来用户则不能访问。

为了实现这个效果，需要将cloud连接外网进行实验，此处参考：

[使用Ensp连接外网进行实验_环回适配器如何共享网络-CSDN博客](https://blog.csdn.net/WXDCSDN/article/details/134690153)

[使用eNSP云连接外网-阿里云开发者社区](https://developer.aliyun.com/article/557038)

![image-20250529204245558](/img/network/image-20250529204245558.png)

![image-20250603081104357](/img/network/image-20250603081104357.png)

```shell
!Software Version V200R005C10SPC607B607
!Last configuration was updated at 2025-06-03 08:02:31+00:00
!Last configuration was saved at 2025-06-03 07:48:15+00:00
#
sysname Switch1
#
vlan batch 10
#
interface GE1/0/0
 undo shutdown
 port default vlan 10
#
interface GE1/0/1
 undo shutdown
 port default vlan 10
#
interface GE1/0/2
 undo shutdown
#
interface GE1/0/3
 undo shutdown
 port default vlan 10
 mac-vlan enable
```

```shell
!Software Version V200R005C10SPC607B607
!Last configuration was updated at 2025-06-03 07:54:25+00:00
!Last configuration was saved at 2025-06-03 07:54:30+00:00
#
sysname Switch2
#
vlan batch 10
#
vlan 10
 mac-vlan mac-address 0022-0022-0022
 mac-vlan mac-address 0033-0033-0033
#
interface GE1/0/0
 undo shutdown
 port link-type hybrid
 port hybrid untagged vlan 10
 mac-vlan enable
#
interface GE1/0/1
 undo shutdown
 port link-type hybrid
 port hybrid untagged vlan 10
 mac-vlan enable
```

最终效果如图：

![image-20250603080446134](/img/network/image-20250603080446134.png)