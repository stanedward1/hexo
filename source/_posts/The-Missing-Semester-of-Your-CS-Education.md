---
title: The Missing Semester of Your CS Education
date: 2021-11-10 23:38:01
tags:
---

# [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)

**回顾一下一些工具的使用**

## [Course overview + the shell](https://missing.csail.mit.edu/2020/course-shell/)

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

## [Shell Tools and Scripting](https://missing.csail.mit.edu/2020/shell-tools/)

