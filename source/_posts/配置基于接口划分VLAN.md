---
title: 配置基于接口划分VLAN
date: 202-05-28 22:29:11
tags: 网工
categories: 网工
cover: /img/75960.jpg
---
[配置基于接口划分VLAN示例](https://support.huawei.com/enterprise/zh/doc/EDOC1100468714/526f31bd)

参照华为的文档进行基于接口划分VLAN，预期的结果是同一VLAN同一网段，但是处于不同路由器的两台电脑能够相互通信。

```tex
将User1和User2配置在一个网段，比如192.168.100.0/24；将User3和User4配置在一个网段，比如192.168.200.0/24。

User1和User2能够互相ping通，但是均不能ping通User3和User4。User3和User4能够互相ping通，但是均不能ping通User1和User2。
```

但是参照步骤完成后，结果如图：

![image-20250528105750258](/img/image-20250528105750258.png)

经过排查，发现是两个问题导致的

1. 对应的VLAN需要配上IP地址，充当网关

   ```shell
   [~SwitchB]interface Vlanif 2
   [*SwitchB-Vlanif2]ip address 192.168.1.254 24
   [*SwitchB-Vlanif2]quit
   ```

2. 对应的接口都需要打开

   ```shell
   [~HUAWEI]interface G 1/0/0
   [~HUAWEI-GE1/0/0]undo shutdown
   [*HUAWEI-GE1/0/0]quit
   ```

   

结果如图：

![image-20250528210532534](/img/image-20250528210532534.png)