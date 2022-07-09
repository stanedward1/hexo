---
title: 使用ssh-copy-id命令实现免密登陆服务器
date: 2022-04-07 06:02:45
tags: DevOps
categories: DevOps
cover: /img/75960.jpg
---

大概的思路就是把本地机器的ssh公钥复制到远程服务器上，这个过程可以使用ssh-copy-id命令实现。

```shell
sudo ssh-copy-id -i .ssh/id_rsa.pub ubuntu@ip_address
```

复制成功之后，建议更新一下服务器某些目录的权限，首次登陆仍然需要使用密码进行登录。

```shell
sudo chmod 700 /home/ubuntu/.ssh
sudo chmod 600 /home/ubuntu/.ssh/authorized_keys
```

之所以建议更新某些目录的权限，是因为本人把公钥到服务器之后没有生效，这个时候可以看看日志，相关命令如下，仅作参考：
```shell
cd /var/log
ls
tail -n 2000 auth.log
tail -n 2000 auth.log | grep sshd
```

后续就可以直接免密登陆服务器了，使用ssh公钥进行登陆，也是企业里面比较推荐的做法（最推荐的可能还是通过跳板机）
