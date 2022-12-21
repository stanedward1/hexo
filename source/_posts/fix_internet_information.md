---
title: 利用Python批量修改计算机网络配置
date: 2022-12-21 10:02:45
tags: DevOps
categories: DevOps
cover: /img/75960.jpg
---
场景是这样的：多台计算机按照楼栋及房间号分配网段及IP地址  
初步的方案是人工一间一间房间的去修改，但是这样子非常的繁琐而且慢，所以可以尝试用代码解决这个事情  
大致思路：  
​	用字典存储按照楼栋及房间号分配网段及IP地址的信息  
​    用户输入房间号或者用户名，程序执行修改计算机网络配置  
```python
# -*- coding: UTF-8 -*-
import wmi
import time
import subprocess
import os

while True:
    user_name = input("please input the user's name or room number:")
    dic = {"1011": "192.168.235.10"}

    # get computer's cpu
    def get_cpu_info():
        data = {}
        cpu_lists = wmi.WMI().Win32_Processor()
        cpu_core_count = 0
        for cpu in cpu_lists:
            cpu_core_count += cpu.NumberOfCores
            cpu_model = cpu.Name
        data["cpu_count"] = len(cpu_lists)
        data["cpu_model"] = cpu_model
        data["cpu_core_count"] = cpu_core_count
        print("cpu is: " + data.get('cpu_model'))
        pass

    # get local network card information
    def get_intenet_card():
        wmiservice = wmi.WMI()
        local_config = wmiservice.Win32_NetworkAdapterConfiguration(
            IPEnabled=True)
        machine = local_config[0]
        print("computer name is: " + machine.DNSHostName)
        print("current ip address is: " + machine.IPAddress[0])
        print("mac address is: " + machine.MACAddress)
        pass

    # fix computer's network
    def fix_adapter(user_name):
        wmiservice = wmi.WMI()
        adapter = wmiservice.Win32_NetworkAdapterConfiguration(IPEnabled=True)
        if len(adapter) >= 1:
            for i in range(len(adapter)):
                print(str(i) + "----" + adapter[i].Description)
            num = input("\tselect network card(use num)：")
            real_adapter = adapter[int(num)]
        else:
            real_adapter = adapter[0]
        newIP = dic[user_name]
        # set new ip address
        arrIPAddresses = [newIP]
        # set subnet mask
        arrSubnetMasks = ['255.255.255.0']
        # set gateway
        arrDefaultGateways = [('192.168.%s.254' % (newIP[6:9]))]
        # representing non automatic selection
        arrGatewayCostMetrics = [1]
        # dns server
        arrDNSServers = ['dns_server_address']
        # start executing modifications
        ipRes = real_adapter.EnableStatic(IPAddress=arrIPAddresses,
                                          SubnetMask=arrSubnetMasks)
        if ipRes[0] == 0:
            print('\ttip:setting ip succeeded')
            print('\tcurrent ip：%s' % newIP)
        else:
            if ipRes[0] == 1:
                print('\ttip:setting ip succeeded, please get started!')
            else:
                print('\ttip:setting ip failed: error occurred in ip settings')
                return False
        wayRes = real_adapter.SetGateways(
            DefaultIPGateway=arrDefaultGateways,
            GatewayCostMetric=arrGatewayCostMetrics)
        if wayRes[0] == 0:
            print('\ttip:setting gateway succeeded')
            print('\tcurrent gateway is:%s' % arrDefaultGateways[0])
        else:
            print(
                '\ttip:setting gateway failed: error occurred in gateway settings'
            )
            return False
        dnsRes = real_adapter.SetDNSServerSearchOrder(
            DNSServerSearchOrder=arrDNSServers)
        if dnsRes[0] == 0:
            print(
                '\ttip:setting dns succeeded. wait 3 seconds to refresh the cache'
            )
            print('\tcurrent dns：%s' % arrDNSServers[0])
            time.sleep(3)
            # refresh dns's cache
            # os.system('ipconfig /flushdns')
            devNull = open(os.devnull, 'w')
            subprocess.Popen('ipconfig /flushdns', stdout=devNull)
        else:
            print('\ttip:setting dns failed: error occurred in dns settings')
        return False

    get_intenet_card()
    get_cpu_info()
    print("***********************************************")
    if user_name not in list(dic.keys()):
        print(
            "*******  this user does not exist, please check again!  *******")
    else:
        fix_adapter(user_name)

    a = input("please input 'exit' to exit this program:")
    if a == 'exit':
        print("*******  successful execution, program exit  *******")
        break
```

最后可以使用pyinstaller将代码打包为exe文件，并添加图标，如：**pyinstaller -F -i xxx.ico fix_information.py**

