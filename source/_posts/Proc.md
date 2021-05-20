---
title: Proc类
date: 2021-05-05 07:03:32
tags: ruby
categories: ruby
cover: /img/ruby.png
---

# Proc类

## Proc类是个啥

用来使块对象化的类！

### 创建Proc对象

#### Proc.new()

```Ruby
irb(main):001:1* hello1 = Proc.new do |name|
irb(main):002:1*   puts "Hello, #{name}."
irb(main):003:0> end
irb(main):004:0> hello1.call("Ruby")
Hello, Ruby.
```

#### proc{}

```ruby
irb(main):005:1* hello = proc do |name|
irb(main):006:1*   "hello, #{name}."
irb(main):007:0> end
irb(main):008:0> hello.call("ruby")
=> "hello, ruby."
```

调用call方法时的参数会作为块变量，块中最后一个表达式的值则为Proc#call的返回值

```shell
irb(main):009:0> hello["ruby"]
=> "hello, ruby."
```

### Lambda表达式

通过lambda方法创建的Proc对象的行为会更接近方法。

and

Lambda表达式对参数数量的检查更严格，and，Proc对象调用call方法时，参数数量和块变量的数量可以不同

```shell
irb(main):010:1* proc = Proc.new do |a,b,c|
irb(main):012:0> end
=> #<Proc:0x00005601b8e140f0 (irb):10>
irb(main):014:0> proc.class
=> Proc
irb(main):015:0> proc.call(1,2)
=> [1, 2, nil]

irb(main):019:0* lambda = lambda do |a,b,c|
irb(main):020:0*   [a,b,c]
irb(main):021:-> end
irb(main):022:0> lambda
=> #<Proc:0x00005601b8e1d718 (irb):19 (lambda)>
irb(main):026:0> lambda.call(1,2)
Traceback (most recent call last):
        6: from /usr/bin/irb:23:in `<main>'
        5: from /usr/bin/irb:23:in `load'
        4: from /usr/lib/ruby/gems/2.7.0/gems/irb-1.2.1/exe/irb:11:in `<top (required)>'
        3: from (irb):25
        2: from (irb):26:in `rescue in irb_binding'
        1: from (irb):19:in `block in irb_binding'
ArgumentError (wrong number of arguments (given 2, expected 3))

```

### to_proc方法

在方法中指定块时，如果以“&对象”的形式传递参数，对象.to_proc就会被自动调用，从而生成Proc对象。

```shell
irb(main):029:0> ["1","2","3"].map(&:to_i)
=> [1, 2, 3]
irb(main):030:0> ["1","2","3"].map{|i| i.to_i}
=> [1, 2, 3]
```

符号&会触发:to_i 的 to_proc 方法, to_proc 执行后会返回一个 proc 实例

一个类名排序的例子

```shell
irb(main):031:0> [Integer,String,Array,Hash,File,IO].sort_by(&:name)
=> [Array, File, Hash, IO, Integer, String]
```

一个计数器

```shell
irb(main):032:1* def counter
irb(main):033:1*   c=0
irb(main):034:2*   Proc.new do
irb(main):035:2*     c+=1
irb(main):036:1*   end
irb(main):037:0> end
=> :counter
irb(main):038:0> c1 = counter
irb(main):039:0> c1.call
=> 1
irb(main):040:0> c1.call
=> 2
irb(main):041:0> c1.call
=> 3
irb(main):042:0> c2 = counter
irb(main):043:0> c2.call
=> 1
irb(main):044:0> c2.call
=> 2
irb(main):045:0> c1.call
=> 4
```

两个变量对引用的Proc对象分别保存并处理了调用counter方法时初始化的本地变量

像Proc对象这样，将处理内容，变量等环境同时保存的对象，被成为闭包。

使用Proc对象可以通过少量代码实现处理对象化。

### Proc的实例方法

```shell
irb(main):048:0> prc = Proc.new{|a,b| a+b}
irb(main):049:0> prc.call(1,2)
=> 3
irb(main):050:0> prc[1,2]
=> 3
irb(main):051:0> prc.yield(5,6)
=> 11
irb(main):052:0> prc.(3,4)
=> 7
irb(main):053:0> prc === [1,4]
=> 5
```

```shell
irb(main):098:0> fizz = proc{ |n| n%3==0}
irb(main):099:0> buzz = proc{ |n| n%5==0}
irb(main):100:0> fizzbuzz = proc{|n| fizz[n] && buzz[n]}

irb(main):090:1* (1..100).each do |i|
irb(main):091:2*   case i
irb(main):092:2*   when fizzbuzz then puts "Fizz Buzz"
irb(main):093:2*   when fizz then puts "Fizz"
irb(main):094:2*   when buzz then  puts "Buzz"
irb(main):095:2*   else puts i
irb(main):096:1*   end
irb(main):097:0> end
```

### prc.arrity

此方法可以返回作为call方法的参数的块变量的个数，以“|*args|”的形式指定块变量时，返回-1

```ruby
irb(main):004:0> prc0 = Proc.new{nil}
irb(main):005:0> prc1 = Proc.new{|a| a}
irb(main):006:0> prc2 = Proc.new{|a,b| a+b}
irb(main):007:0> prc3 = Proc.new{|a,b,c| a+b+c}
irb(main):008:0> prc4 = Proc.new{|*args| args}
irb(main):009:0> prc0.arity
=> 0
irb(main):010:0> prc1.arity
=> 1
irb(main):011:0> prc2.arity
=> 2
irb(main):012:0> prc3.arity
=> 3
irb(main):013:0> prc4.arity
=> -1
```

### prc.parameters

使用此方法可以返回“[种类，变量名]”形式的数组的列表

```ruby
irb(main):015:0> prc0.parameters
=> []
irb(main):016:0> prc1.parameters
=> [[:opt, :a]]
irb(main):017:0> prc2.parameters
=> [[:opt, :a], [:opt, :b]]
irb(main):018:0> prc3.parameters
=> [[:opt, :a], [:opt, :b], [:opt, :c]]
irb(main):019:0> prc4.parameters
=> [[:rest, :args]]
```

### prc.source_location

返回定义prc的程序的位置，返回值为“[代码文件名，行编号]”形式的数组

```ruby
irb(main):020:0> prc0.source_location
=> ["(irb)", 4]
irb(main):021:0> prc1.source_location
=> ["(irb)", 5]
irb(main):022:0> prc2.source_location
=> ["(irb)", 6]
```

```shell
irb(main):024:0> to_class.call("test")
=> String
irb(main):025:0> to_class.call(123)
=> Integer
irb(main):026:0> to_class.call(2**100)
=> Integer
```



### Proc&Lambda

1. 对参数的容忍程度不同，lambda比较严格，Proc比较宽松，数量有差异也不会报错

2. 回传的scope不同，Proc里面的return会结束整个method，而lambda的return只会结束lambda本身。

   ```shell
   irb(main):061:1* def method_proc
   irb(main):062:1*   thing = Proc.new{ return 1 }
   irb(main):063:1*   thing.call
   irb(main):064:1*   puts "hi proc"
   irb(main):065:1*   return 2
   irb(main):066:0> end
   => :method_proc
   irb(main):067:1* def method_lambda
   irb(main):068:1*   thing = lambda{ return 1 }
   irb(main):069:1*   thing.call
   irb(main):070:1*   puts "hi lambda"
   irb(main):071:1*   return 2
   irb(main):072:0> end
   => :method_lambda
   irb(main):073:0> method_proc
   => 1
   irb(main):074:0> method_lambda
   hi lambda
   => 2
   ```

   