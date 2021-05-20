---
title: Ruby元编程
date: 2021-05-04 07:03:32
tags: 书籍
categories: ruby
cover: /img/ruby.png
---

# 方法：

## 序言

**static type checking**

Java——Java的编译器会控制代码之间的交谈，对于每一次方法的调用，编译器都会检查接受对象是否有一个匹配的方法，这就叫做——**静态类型检查**

所以Java也叫做静态语言

**动态语言包括Python&Ruby**

在某个对象上调用特定的方法时，系统不会发出警告，直到真正的调用此方法时，才会提示无法响应调用。

## 3.1 代码繁复的问题

### 3.1.1 老系统

```text
DS类下面有很多很多方法！都是拿取对应信息的，看起来就很繁复的样子！
```

### 3.1.2 代码的优雅化🐶

**动态方法**

**method missing**

## 3.2 动态方法

调用一个方法——给一个对象发送一个消息

### 3.2.1 动态调用方法

```ruby
2.7.2 :008 > class MyClass
2.7.2 :009 >   def my_method(my_arg)
2.7.2 :010 >     my_arg * 2
2.7.2 :011 >   end
2.7.2 :012 > end
 => :my_method 
2.7.2 :013 > obj = MyClass
 => MyClass 
2.7.2 :014 > obj = MyClass.new
 => #<MyClass:0x00007f8d721c8cc8> 
2.7.2 :015 > obj.send(:my_method,3)
 => 6 
2.7.2 :016 > obj.my_method(3)
 => 6 
```

**send方法里所调用的方法成为了参数**

**Symbol**是不可修改的，&，特别适合用来表示方法名。

### 3.2.2 动态定义方法

```ruby
2.7.2 :001 > class MyClass
2.7.2 :002 >   define_method :my_method do | my_arg|
2.7.2 :003 >   	my_arg*3
2.7.2 :004 >   end
2.7.2 :005 > end
 => :my_method 
2.7.2 :006 > obj = MyClass.new
 => #<MyClass:0x00007f8d6f67a990> 
2.7.2 :007 > obj.my_method(2)
 => 6 
```

这种在运行时定义方法的技术称为动态方法——**Dynamic Method**

### 3.2.3 重构Computer类

核心就是接收String || Symbol 作为参数，并调用方法。

## 3.3 method_missing方法

什么事动态语言，show me the code

```ruby
2.7.2 :020 > class Lawyer
2.7.2 :021 > end
 => nil 
2.7.2 :022 > nick = Lawyer.new
 => #<Lawyer:0x00007f8d6bce27f0> 
2.7.2 :023 > nick.talk_simple
Traceback (most recent call last):
        1: from (irb):23
NoMethodError (undefined method `talk_simple' for #<Lawyer:0x00007f8d6bce27f0>)
```

```ruby
2.7.2 :025 > Lawyer.ancestors
 => [Lawyer, ActiveSupport::Dependencies::ZeitwerkIntegration::RequireDependency, ActiveSupport::ForkTracker::CoreExtPrivate, ActiveSupport::ForkTracker::CoreExt, ActiveSupport::ToJsonWithActiveSupportEncoder, Object, JSON::Ext::Generator::GeneratorMethods::Object, ActiveSupport::Dependencies::Loadable, ActiveSupport::Tryable, Kernel, BasicObject] 
```

### 3.3.1 覆写method_missing方法

```ruby
2.7.2 :026 > class Lawyer
2.7.2 :027 >   def method_missing(method, *args)
2.7.2 :028 >     puts "You called: #{method} (#{args.join(',')})"
2.7.2 :029 >   end
2.7.2 :030 > end
 => :method_missing 
2.7.2 :032 > lawyer = Lawyer.new
 => #<Lawyer:0x00007f8d6be08710> 
2.7.2 :034 > lawyer.send(:talk_simple,2)
You called: talk_simple (2)
```

### 3.3.2 幽灵方法

因为要调用的方法其实不存在，所以也叫它幽灵方法。

## 3.4 消灭bug

```shell
2.7.2 :121 > class Roulette
2.7.2 :122 >   def method_missing(name, *args)
2.7.2 :123 >     person = name.to_s.capitalize
2.7.2 :124 >     3.times do
2.7.2 :125 >       number = rand(10) + 1
2.7.2 :126 >       puts "#{number}----"
2.7.2 :127 >     end
2.7.2 :128 >     puts  "#{person} got a #{number}"
2.7.2 :129 >   end
2.7.2 :130 > end
```

![image-20210518225149082](img/image-20210518225149082.png)

```shell
2.7.2 :156 > class Roulette
2.7.2 :157 >   def method_missing(name, *args)
2.7.2 :158 >     person = name.to_s.capitalize
2.7.2 :159 >     super unless %w[Bob Tim Longbiu].include? p
erson
2.7.2 :160 >     number = 0
2.7.2 :161 >     3.times do
2.7.2 :162 >       number = rand(10) +1
2.7.2 :163 >       puts "#{number}---"
2.7.2 :164 >     end
2.7.2 :165 >     "#{person} got a #{number}"
2.7.2 :166 >   end
2.7.2 :167 > end
```

## 3.5 白板类

调用类的某个方法返回nil时，可以使用此条语句列出Object中所有以d开头的实例方法

```
Object.instance_methods.grep /^d/
```

### 3.5.1 BasicObject

继承BasicObject类是最简单的定义白板类的方法。

# 附录（思考）

## include&extend的使用场景

```ruby

使用include把一个module包含在一个class||module中，使用.ancestors可以发现，include进来的class||module在上面,一般使用include把自己写的module包含进来
eg:

irb(main):001:1* module A
irb(main):002:1*   "this is A"
irb(main):003:0> end
=> "this is A"
irb(main):004:1* class B
irb(main):005:1*   include A
irb(main):006:1*   "this is B"
irb(main):007:0> end
=> "this is B"
irb(main):008:0> B.ancestors
=> [B, A, Object, Kernel, BasicObject]

使用extend,继承其他module，一般使用extend继承ruby自带的module&gem包的module
irb(main):001:1* module A
irb(main):002:1*   "this is A"
irb(main):003:0> end
=> "this is A"
irb(main):004:1* class B
irb(main):005:1*   extend A
irb(main):006:1*   "this is B"
irb(main):007:0> end
=> "this is B"
irb(main):008:0> B.ancestors
=> [B, Object, Kernel, BasicObject]

```



## 动态创建对象&动态调用方法

```ruby
动态创建对象，已知，可以把方法，类看成是对象
所以----
1.动态创建方法----define_method
一般会使用define_method结合method_missing来编写DRY代码！也就是把重复的代码干掉！

2.7.2 :001 > class Developer
2.7.2 :002 >   
2.7.2 :003 >   def coding_frontend
2.7.2 :004 >     p "writing frontend"
2.7.2 :005 >   end
2.7.2 :006 >   
2.7.2 :007 >   def coding_backend
2.7.2 :008 >     p "writing backend"
2.7.2 :009 >   end
2.7.2 :010 >   
2.7.2 :011 > end
 => :coding_backend 
2.7.2 :012 > developer = Developer.new
 => #<Developer:0x00007f9168453d68> 
2.7.2 :013 > developer.coding_frontend
"writing frontend"
 => "writing frontend" 
2.7.2 :014 > developer.coding_backend
"writing backend"
 => "writing backend" 
2.7.2 :015 > class Developer
2.7.2 :016 >   
2.7.2 :017 >   ["frontend", "backend"].each do |method|
2.7.2 :018 >     define_method "coding_#{method}" do
2.7.2 :019 >     p "writing " + method.to_s
2.7.2 :020 >     end
2.7.2 :021 >   end
2.7.2 :022 >   
2.7.2 :023 > end
 => ["frontend", "backend"] 
2.7.2 :024 > developer = Developer.new
 => #<Developer:0x00007f916c9be178> 
2.7.2 :025 > developer.coding_frontend
"writing frontend"
 => "writing frontend" 
2.7.2 :026 > developer.coding_backend
"writing backend"
 => "writing backend"


2.动态创建类----class_eval&instance_eval

动态调用方法，作用是可以消除繁复的代码
and
调用一个方法实际上是给一个对象发送一条消息！

Calling Methods Dynamically

常规的操作是使用点标志符(.)

irb(main):001:1* class MyClass
irb(main):002:2*   def my_method(my_arg)
irb(main):003:2*     my_arg * 2
irb(main):004:1*   end
irb(main):005:0> end
=> :my_method
irb(main):006:0> obj = MyClass.new
irb(main):007:0> obj.my_method(3)
=> 6
irb(main):009:0> obj.send(:my_method,3)
=> 6

在send方法中，想调用的方法变成了参数，可以动态派发！

值得注意的是在动态调用方法中，方法是以Symbol的形式作为参数的，因为Symbol是不可修改的，所以将方法名表示为Symbol，and  String同样也可以作为方法的参数！

last but not least ----

.send甚至可以调用私有方法，假如不想这么做，可以使用.public_send方法！！！

```



## 动态执行脚本

```ruby

# eval
代码执行最直接的方法，也是最直接的方式，就是使用eval
irb(main):009:0> eval("3-1")
=> 2

# instance_eval
将暂时的变化带入对象的上下文中

# class_eval(module_eval)
临时性的进入类定义块的上下文

```

