---
title: 4.Ruby的方法
date: 2021-05-23 00:31:41
tags: Ruby基础
categories: Ruby on Rails
cover: /img/ruby.png
---

调用方法的语法如下所示：

**对象.方法名(参数1，参数2，……，参数n)**

- 上面的对象被称为**接收者**，在面向对象的世界中，调用方法被称之为“向对象发送消息(message)”，调用的结果就是“对象接收(receive)了消息”。也就是说，方法的调用就是把几个参数连同消息一起发送给对象的过程。

根据接收者种类的不同，Ruby的方法可以分为一下3类：

- **实例方法**
- **类方法**
- **函数式方法**

# 实例方法

实例方法是最常用的方法。假设有一个对象（实例），那么以这个对象为接收者的方法就称为**实例方法**

```shell
irb(main):044:0> p "10, 20,30,40".split(",")
["10", " 20", "30", "40"]
=> ["10", " 20", "30", "40"]
irb(main):045:0> p [1,2,3,4].index(2)
1
=> 1
irb(main):046:0> p 1000.to_s
"1000"
=> "1000"
```

上面的代码中，从上到下的接收者分别是：字符串，数组，数值对象

对象能使用的实例方法是由对象所属的类决定的。调用对象的实例方法后，程序就会执行对象所属的类预先定义好的处理。

# 类方法

接收者不是对象而是类本身的方法，我们称之为类方法。

```shell
irb(main):047:0> Array.new
=> []
irb(main):048:0> Time.now
=> 2021-05-29 22:03:30.9682699 +0800
```

# 函数式方法

没有接收者的方法，我们称之为**函数式方法**——虽说没有接收者，但并不表示该方法就真的没有可作为接收者的对象，只是在函数式方法的情况下，可以省略接收者。

```shell
irb(main):049:0> print "hello!"
hello!=> nil
irb(main):050:0> sleep(10)
=> 10
```

# 方法的定义

方法名可以由英文字母，数字，下划线组成，但不能以数字开头

**通过hello方法中的name变量，可以引用执行时传进来的参数**

```shell
irb(main):055:1* def hello(name)
irb(main):056:1*   puts "Hello,#{name}!!!"
irb(main):057:0> end
=> :hello
irb(main):058:0> hello("ruby")
Hello,ruby!!!
```

可以指定默认值给参数。参数的默认值是指在没有指定参数的情况下调用方法是程序默认使用的值。

```shell
irb(main):059:1* def hello(name="ruby")
irb(main):060:1*   puts "hello #{name}"
irb(main):061:0> end
=> :hello
irb(main):062:0> hello()
hello ruby
=> nil
irb(main):063:0> hello("Python")
hello Python
=> nil
```

## 方法的返回值

```shell
irb(main):064:1* def volume(x,y,z)
irb(main):065:1*   return x*y*z
irb(main):066:0> end
=> :volume
irb(main):067:0> p volume(2,3,4)
24
```

方法的返回值也不一定是程序最后一行的执行结果。

```shell
irb(main):068:1* def max(a,b)
irb(main):069:2*   if a>b
irb(main):070:2*     a
irb(main):071:2*   else
irb(main):072:2*     b
irb(main):073:1*   end
irb(main):074:0> end
=> :max
irb(main):075:0> p max(10,5)
10
```

## 定义带块的方法

```shell
irb(main):092:1* def myloop
irb(main):093:2*   while true
irb(main):094:2*     yield
irb(main):095:1*   end
irb(main):096:0> end
=> :myloop
irb(main):097:0> num=1
irb(main):098:1* myloop do
irb(main):099:1*   puts "num is #{num}"
irb(main):100:1*   break if num > 10
irb(main):101:1*   num *= 2
irb(main):102:0> end
num is 1
num is 2
num is 4
num is 8
num is 16
```

## 参数个数不确定的方法

可以选择把所有的参数封装为数组，供方法内部使用

```shell
irb(main):001:1* def foo(*args)
irb(main):002:1*   args
irb(main):003:0> end
=> :foo
irb(main):004:0> p foo(1,2,3,4)
[1, 2, 3, 4]
```

至少需要指定一个参数的方法可以如下定义

```shell
irb(main):005:1* def meth(arg,*args)
irb(main):006:1*   [arg,args]
irb(main):007:0> end
=> :meth
irb(main):008:0> p meth(1)
[1, []]
=> [1, []]
irb(main):009:0> p meth(1,3,4,5,6)
[1, [3, 4, 5, 6]]
=> [1, [3, 4, 5, 6]]
```

只确定首个和最后一个参数名，并省略中间的参数时，可以如下定义

```shell
irb(main):010:1* def a(a,*b,c)
irb(main):011:1*   [a,b,c]
irb(main):012:0> end
irb(main):013:0> p a(1,2,3,4,4,5,6,7)
[1, [2, 3, 4, 4, 5, 6], 7]
=> [1, [2, 3, 4, 4, 5, 6], 7]
irb(main):014:0> p a(1,2)
[1, [], 2]
=> [1, [], 2]
```

## 关键字参数

**使用关键字参数，就可以将参数名与参数值成对的传给方法内部使用。**

```shell
irb(main):015:1* def area2(x:0,y:0,z:0)
irb(main):016:1*   xy = x*y
irb(main):017:1*   yz = y*z
irb(main):018:1*   zx = z*x
irb(main):019:1*   (xy+yz+zx) * 2
irb(main):020:0> end
=> :area2
irb(main):021:0> p area2(x:2,y:3,z:4)
52
=> 52
irb(main):022:0> p area2(x:2,z:4,y:3)
52
=> 52
irb(main):023:0> p area2(x:2,z:3)
12
=> 12
```

**省略了默认值的参数，在调用时不可以被省略**

```shell
irb(main):024:1* def volume(x:,y:2,z:4)
irb(main):025:1*   x*y*z
irb(main):026:0> end
=> :volume
irb(main):027:0> p volume(x:2,y:3)
24
=> 24
irb(main):028:0> p volume(y:2,z:3)
Traceback (most recent call last):
        5: from /usr/bin/irb:23:in `<main>'
        4: from /usr/bin/irb:23:in `load'
        3: from /usr/lib/ruby/gems/2.7.0/gems/irb-1.2.1/exe/irb:11:in `<top (required)>'
        2: from (irb):28
        1: from (irb):24:in `volume'
ArgumentError (missing keyword: :x)
```

**为了避免调用方法时因指定了未定义的参数而报错，我们可以使用"\**args"的形式来接收未定义的参数**

```shell
irb(main):029:1* def meth(x:0,y:0,z:0,**args)
irb(main):030:1*   [x,y,z,args]
irb(main):031:0> end
=> :meth
irb(main):032:0> p meth(z:4,y:3,x:2)
[2, 3, 4, {}]
=> [2, 3, 4, {}]
irb(main):033:0> p meth(x:2,z:3,v:4,w:5)
[2, 0, 3, {:v=>4, :w=>5}]
=> [2, 0, 3, {:v=>4, :w=>5}]
```

**用散列传递参数**——也可以把散列作为关键字参数传递给方法，而这时散列的键只能用符号。虽然可以省略定义了默认值的关键字参数，但传递多余的键则会导致程序发生错误。

```shell
irb(main):034:1* def area2(x:0,y:0,z:0)
irb(main):035:1*   xy = x*y
irb(main):036:1*   yz = y*z
irb(main):037:1*   zx = z*x
irb(main):038:1*   (xy+yz+zx) * 2
irb(main):039:0> end
=> :area2
irb(main):040:0> args1 = {x:2,y:3,z:4}
irb(main):041:0> p area2(args1)
(irb):41: warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call
(irb):34: warning: The called method `area2' is defined here
52
=> 52
irb(main):042:0> args2 = {x:2,z:3}
irb(main):044:0> p area2(args2)
(irb):44: warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call
(irb):34: warning: The called method `area2' is defined here
12
=> 12
```

 
