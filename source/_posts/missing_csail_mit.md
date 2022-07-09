---
title: The Missing Semester of Your CS Education
date: 2021-11-10 23:38:01
tags: Linux&Git&Kali
---
# [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)

**回顾一下一些工具的使用**

# [Course overview + the shell](https://missing.csail.mit.edu/2020/course-shell/)

第一节都是一些比较常规的操作，不过课后习题中的T9让我很好的回顾了一下cut的用法——**remove sections from each line of files**

```shell
# 使用Manjaro
echo '#!/bin/sh' > semester
echo 'curl --head --silent https://missing.csail.mit.edu' >> semester
cat semester
chmod 777 semester
./semester
# 使用cut对信息按空格进行分割，选择第6,7,8段输出
ls -l semester | cut -d" " -f6,7,8 > ~/last-modified.txt
cat ~/last-modified.txt
cat /sys/class/power_supply/hid-f4:73:35:03:24:63-battery/capacity
```

# [Shell Tools and Scripting](https://missing.csail.mit.edu/2020/shell-tools/)

这一节有趣了一点点，Shell工具和脚本

1.Read man ls and write an ls command that lists files in the following manner

- Includes all files, including hidden files
- Sizes are listed in human readable format (e.g. 454M instead of 454279954)
- Files are ordered by recency
- Output is colorized
- A sample output would look like this

```shell
-rw-r--r--   1 user group 1.1M Jan 14 09:53 baz
drwxr-xr-x   5 user group  160 Jan 14 09:53 .
-rw-r--r--   1 user group  514 Jan 14 06:42 bar
-rw-r--r--   1 user group 106M Jan 13 12:12 foo
drwx------+ 47 user group 1.5K Jan 12 18:08 ..
```

```shell
# 相关信息——Read man ls
ls -lt -a --block-size=k --color
```

# [Editors (Vim)](https://missing.csail.mit.edu/2020/editors/)

工作中有些改动比较小的代码，或者比较简单的功能，我会选择使用Vim，看了看这一节，发现我大致掌握了，跳过。

# [Data Wrangling](https://missing.csail.mit.edu/2020/data-wrangling/)
这一节的教学内容很适合用来日志分析，主要是通过类似grep，sed等命令来对数据进行分类或导出。

# [Command-line Environment](https://missing.csail.mit.edu/2020/command-line/)

Ctrl-c会让shell发送SIGSTOP信号

Ctrl-z会让shell发送SIGSTP信号

我们可以使用fg或bg命令回复暂停的工作，它们分别表示在前台或者在后台继续。

jobs命令会列出当前终端对话中尚未完成的全部任务。

命令中的&后缀可以让命令直接在后台运行，这样可以直接在shell中继续做其他的操作，不过它还是会使用shell的标准输出，假如不想让它输出的话，可以选择把输出重定向。

**终端多路复用：** [这里](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/) 是一份 `tmux` 快速入门教程， [而这一篇](http://linuxcommand.org/lc3_adv_termmux.php) 文章则更加详细，它包含了 `screen` 命令。您也许想要掌握 [`screen`](https://www.man7.org/linux/man-pages/man1/screen.1.html) 命令，因为在大多数 UNIX 系统中都默认安装有该程序。

