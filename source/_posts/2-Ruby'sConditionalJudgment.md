---
title: 2.Ruby的条件判断
date: 2021-05-23 00:30:41
tags: ruby
categories: ruby
cover: /img/ruby.png
---

# 什么是条件判断

**某个条件时，执行oo处理，否则执行xx处理**

1. if语句
2. unless语句
3. case语句

# Ruby中的条件

**在Ruby中有个约定俗成的规则，为了使程序更容易理解，返回真假值的方法都要以？结尾**

# 逻辑运算符

**一般用&&，||，！**---->优先级高一些

# if语句

```shell
irb(main):001:0> a = 10
irb(main):002:0> b = 20
irb(main):003:1* if a>b
irb(main):004:1*   puts "a比b大"
irb(main):005:1* elsif a<b
irb(main):006:1*   puts "a比b小"
irb(main):007:1* else
irb(main):008:1*   puts "a与b相等"
irb(main):009:0> end
a比b小
```

# unless语句

```shell
irb(main):010:0> a=0
irb(main):011:0> a=10
irb(main):012:0> b=20
irb(main):013:1* unless a>b
irb(main):014:1*   puts "a不比b大"
irb(main):015:0> end
a不比b大
```

# case语句

```shell
irb(main):016:0> tags = ["a","img","pre"]
irb(main):017:1* tags.each  do |tagname|
irb(main):018:2*   case tagname
irb(main):019:2*   when "p","a","i","c"
irb(main):020:2*     puts "#{tagname} has child"
irb(main):021:2*   when "img","br"
irb(main):022:2*     puts "#{tagname} has no child"
irb(main):023:2*   else
irb(main):024:2*     puts "#{tagname} cannot be used"
irb(main):025:1*   end
irb(main):026:0> end
a has child
img has no child
pre cannot be used
=> ["a", "img", "pre"]
```

