---
title: eNSP的安装
date: 2025-05-26 22:02:45
tags: 网工
categories: 网工
cover: /img/ruby.jpg
---
eNSP(Enterprise Network Simulation Platform)是一款由华为提供的免费的、可扩展的、图形化的网络设备仿真平台，主要对企业网路由器、交换机、WLAN等设备进行软件仿真。

可惜的是，这款软件已经在2020年停更了。

eNSP依赖VirtualBox和WinPcap等第三方组件，存在系统兼容性和安全性隐患；兼容新系统不稳定（如Windwos11），最直接的表现就是装好了软件用不了。我装过好几次，都因为组件版本和系统版本的问题不行。

今天又重新安装了一下，能成功运行，特在此对软件版本及系统版本做一下记录

- windwos版本：2009  19045.5854
- eNSP版本：1.3.00.200T
- WinPcap版本：4.1.3
- VirtualBox版本：5.2.4
- Wireshark版本：1.4.3

![启动图片](/img/network/image-20250526202150615.png)

[eNSP全套软件下载地址汇总 - 华为企业互动社区](https://forum.huawei.com/enterprise/cn/zh/thread/blog/580934378039689216?blogId=580934378039689216)



使用windows11电脑时候，参照此链接，解决了启动不了的问题，组件的版本是一致的

https://blog.csdn.net/jingxinguofeng/article/details/122492831