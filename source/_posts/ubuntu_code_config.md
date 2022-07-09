---
title: 基于Ubuntu的发行版的编程环境配置及软件下载
date: 2022-02-15 22:02:45
tags: DevOps
categories: DevOps
cover: /img/75960.jpg
---
最近选择安装了Pop!_OS进行学习及开发，Pop!_OS是一款基于Ubuntu的发行版，对NVIDIA的支持较好，也趁着这个机会，记录以下这类发行版的一些环境配置及软件安装。

# 换源

**vim /etc/apt/sources.list**

## 阿里源

```shell
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

## 中科大源

```shell

deb https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

执行命令进行更新

```shell
sudo apt-get update
sudo apt-get upgrade
```

# 编程软件

## idea

点击网址下载：https://www.jetbrains.com/idea/download/#section=linux

下载下来是一个压缩包，使用命令进行解压缩并启动程序：

```shell
tar -zxvf ideaIU-2021.3.2.tar.gz
// 启动程序
sh /idea-IU-213.6777.52/bin/idea.sh
```

这个时候ide是没有图标的，需要进入目录：/usr/share/applications/

新建一个Intellij-idea.desktop文件，文件内容如下：

```xml
[Desktop Entry]
Name=IntelliJ IDEA
Comment=IntelliJ IDEA
Exec=/home/longbiu/Downloads/idea-IU-213.6777.52/bin/idea.sh
Icon=/home/longbiu/Downloads/idea-IU-213.6777.52/bin/idea.svg
Terminal=false
Type=Application
Categories=Developer;
```

保存该文件，并退出，便可从桌面进行启动了

## postman

```shell
sudo apt-get install snapd
sudo snap install postman
```

## vscode

点击下载：https://code.visualstudio.com/download

下载下来是一个deb文件

使用命令：

```shell
sudo dpkg -i ***.deb
```

## beekeeper studio

相关文档：https://docs.beekeeperstudio.io/installation/#windows-installation

```shell
# Install our GPG key
wget --quiet -O - https://deb.beekeeperstudio.io/beekeeper.key | sudo apt-key add -

# add our repo to your apt lists directory
echo "deb https://deb.beekeeperstudio.io stable main" | sudo tee /etc/apt/sources.list.d/beekeeper-studio-app.list

# Update apt and install
sudo apt update
sudo apt install beekeeper-studio
```

## tableplus

在macos下经常使用这个软件，但是我安装Pop!_OS可能版本较新，安装下来之后使用不了，情况跟这个网址一样：https://github.com/TablePlus/TablePlus-Linux/issues/116

安装文档：https://tableplus.com/blog/2019/10/tableplus-linux-installation.html

## vim

vim是很经典的一款编辑器了，安装命令：

```shell
sudo apt install vim
```

使用vundle下载插件：https://github.com/VundleVim/Vundle.vim

# 编程环境

## java

```shell
sudo apt install openjdk-8-jdk
```

## maven

```shell
sudo apt update
sudo apt install maven
```

## docker

相关文档：https://docs.docker.com/engine/install/ubuntu/

```shell
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 为了确认所下载软件包的合法性，需要添加软件源的 GPG 密钥。
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 向 sources.list 中添加 Docker 软件源
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

# 安装 docker-ce
sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo systemctl enable docker

sudo systemctl start docker

# 建立 docker 用户组
sudo groupadd docker

# 将用户添加至docker用户组
sudo gpasswd -a $XXX docker

# 更新docker用户组
newgrp docker
```

## mysql

```shell
# 用docker装mysql不专业，不安全，不稳定，本次使用docker安装mysql进行使用仅用来测试
134  docker pull mysql:latest
135  docker images
138  docker run -itd --name pop_os_mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=longbiu mysql
141  docker ps
142  docker update --restart=always 650c93d21037
143  docker exec -it 650c93d21037 /bin/bash

```

## ruby

相关链接：https://github.com/rvm/ubuntu_rvm

## python

```shell
sudo apt install python3
```

## nodejs

```shell
sudo apt install nodejs
```

# 通用软件

## typora

```shell
# or use
# sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA300B7755AFCFAE
wget -qO - https://typora.io/linux/public-key.asc | sudo apt-key add -

# add Typora's repository
sudo add-apt-repository 'deb https://typora.io/linux ./'
sudo apt-get update

# install typora
sudo apt-get install typora
```

## chrome

```shell
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

## 百度网盘

下载链接：https://pan.baidu.com/download#pan

## 网易云音乐

下载链接；https://music.163.com/#/download

## clash

下载链接：https://github.com/Dreamacro/clash/releases

# 软件卸载

```shell
sudo apt remove app name
sudo apt purge app name
sudo snap remove app name
```

# NVIDIA驱动下载

相关链接：https://linuxconfig.org/how-to-install-the-nvidia-drivers-on-ubuntu-20-04-focal-fossa-linux

```shell
sudo ubuntu-drivers autoinstall
```
