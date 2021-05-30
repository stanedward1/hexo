---
title: 5.Ruby的类和模块
date: 2021-05-23 00:32:00
tags: ruby
categories: ruby
cover: /img/ruby.png
---

# 类是什么

**class是面向对象中一个重要的术语。类表示对象的种类。Ruby中的对象一定都属于某个类。**

## 类和实例

**使用class方法显示某个对象属于哪个类**

```shell
irb(main):048:0> ary = []
irb(main):049:0> str = "hello world"
irb(main):050:0> p ary.class
Array
=> Array
irb(main):051:0> p str.class
String
=> String
```

```shell
irb(main):048:0> ary = []
irb(main):049:0> str = "hello world"
irb(main):050:0> p ary.class
Array
=> Array
irb(main):051:0> p str.class
String
=> String
irb(main):052:0> ary = []
irb(main):053:0> str = "hello world"
irb(main):054:0> p ary.instance_of?(Array)
true
=> true
irb(main):055:0> p str.instance_of?(String)
true
=> true
irb(main):056:0> p ary.instance_of?(String)
false
=> false
```

## 继承

**通过扩展已定义的类来创建新类称为继承**，通过继承可以实现以下操作：

- 在不影响原有功能的前提下追加新功能
- 重定义原有功能，使名称相同的方法产生不同的效果
- 在已有功能的基础上追加处理，扩展已有功能
