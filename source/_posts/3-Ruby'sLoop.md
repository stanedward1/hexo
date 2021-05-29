---

title: 3.Ruby的循环
date: 2021-05-23 00:31:22
tags: ruby
categories: ruby
cover: /img/ruby.png
---

# 实现循环的方法

**六种循环语句或方法**

1. times方法
2. while语句
3. each方法
4. for语句
5. until语句
6. loop方法

# time方法

**如果只是单纯执行一定次数的处理，用times方法可以很轻松的实现**

```shell
irb(main):027:1* 7.times do
irb(main):028:1*   puts "满地油菜花"
irb(main):029:0> end
满地油菜花
满地油菜花
满地油菜花
满地油菜花
满地油菜花
满地油菜花
满地油菜花
=> 7
```

```shell
irb(main):033:1* 5.times do |i|
irb(main):034:1*   puts "第#{i+1}次循环"
irb(main):035:0> end
第1次循环
第2次循环
第3次循环
第4次循环
第5次循环
=> 5
```

# for语句

