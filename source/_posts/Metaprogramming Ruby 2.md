---
title: 《Ruby元编程》
date: 2021-05-04 07:03:32
tags: 书籍
categories: ruby
cover: /img/ruby.png
---

# 元这个字眼

# 对象模型

Ruby的世界除了对象，还有其他的语言构件，比如class，module，instance variable等，元编程操作的就是这些语言构件。

所有这些语言构件存在的系统称之为对象模型。

## 打开类

```shell
2.7.2 :011 > def to_alphanumeric(s)
2.7.2 :012 >   s.gsub(/[^\w\s]/,'')
2.7.2 :013 > end
 => :to_alphanumeric 
2.7.2 :014 > to_alphanumeric("hello, %% world")
 => "hello  world" 
```

**更好的方法是让字符串本身来做这种转换**

**可以去String类植入to_alphanumeric方法**

### 类定义揭秘

Ruby中，定义类的语句和其他语句没有本质区别

```shell
2.7.2 :015 > 3.times do
2.7.2 :016 >   class C
2.7.2 :017 >     puts "Hello Longbiu"
2.7.2 :018 >   end
2.7.2 :019 > end
Hello Longbiu
Hello Longbiu
Hello Longbiu
 => 3 
```

Ruby的class关键字更像是一个作用域操作符，而不是类型声明语句。class关键字的核心任务是把你带到类的上下文中，让你可以在里面定义方法。

**重新打开已经存在的类并对之进行动态修改——打开类（open class）**

### 打开类的问题

```shell
2.7.2 :005 > [].methods.grep /^re/
 => [:reject!, :repeated_permutation, :repeated_combination, :reject, :reverse_each, :replace, :reverse, :reverse!, :reduce, :remove_instance_variable, :respond_to?] 
```

方法名冲突时可能会出现bug，这种粗暴的修改类的方法也叫做——**猴子补丁(Monkeypatch)**

一般来说，添加新方法比修改已有的方法安全。

## 类的真相

### 对象中有什么

![image-20210521101716315](/img/Metaprogramming/image-20210521101716315.png)

假如说，my_method()是MyClass的一个实例方法，这就意味着这个方法定义在MyClass中，需要定义一个MyClass的实例才能调用它。

同一个类的对象共享同样的方法，但不共享实例变量。

### 类的真相

类本身也是对象。

其他语言只允许你读取类的相关信息，而Ruby允许你在运行时修改这些信息。

**Ruby的类继承自它的超类**

```shell
2.7.2 :006 > Array.superclass
 => Object 
2.7.2 :007 > Object.superclass
 => BasicObject 
2.7.2 :008 > BasicObject.superclass
 => nil 
2.7.2 :009 > Class.superclass
 => Module 
```

Ruby中，类与模块这两个概念十分接近，保留这两个概念的主要原因是为了获得代码的清晰性。

把自己的代码include到别的代码——Module

希望某段代码被实例化或被继承——Class

![image-20210521103307143](/img/Metaprogramming/image-20210521103307143.png)

```shell
2.7.2 :010 > class MyClass;
2.7.2 :011 > end
 => nil 
2.7.2 :012 > obj1 = MyClass.new
 => #<MyClass:0x00007f8fa4353dc0> 
2.7.2 :013 > obj2=MyClass.new
 => #<MyClass:0x00007f8fa43f14d0> 
2.7.2 :014 > MyClass.superclass
 => Object 
2.7.2 :016 > Class.new(MyClass)
 => #<Class:0x00007f8fa42d7608> 
2.7.2 :017 > Class.new(MyClass).superclass
 => MyClass 
```

### 常量

任何以大写字母开头的引用(包括类名和模块名)都是常量。

Ruby中，常量和变量的区别在于它们的scope不同。

```shell
2.7.2 :018 > module MyModule
2.7.2 :019 >   MyConstant = "A"
2.7.2 :020 >   class MyClass
2.7.2 :021 >     MyConstant = "B"
2.7.2 :022 >   end
2.7.2 :023 > end
```

我们可以使用Module来组织常量

### 对象和类的小结

|      | 描述                                       |
| ---- | ------------------------------------------ |
| 对象 | 一组实例变量+指向其类的引用                |
| 类   | 一个对象+一组实例方法+对其superclass的引用 |

```ruby
module Bookworm
	class Text
```

## 缺失的连接线

```shell
2.7.2 :026 > Object.class
 => Class 
2.7.2 :027 > Module.superclass
 => Object 
2.7.2 :028 > Class.class
 => Class 
```

## 调用方法时发生了什么？

1. **方法查找**
2. **执行方法**

### 方法查找

调用一个方法前，Ruby会在对象的类中查找那个方法

**两个概念：receiver+ancestors chain**

receiver就是你调用方法所在的对象

**Ruby首先在接受者的类中查找，然后顺着祖先链向上查找，直到找到这个方法为止**

```shell
2.7.2 :037 > class MyClass
2.7.2 :038 >   def my_method;
2.7.2 :039 >     'my_method()';
2.7.2 :040 >   end
2.7.2 :041 > end
 => :my_method 
2.7.2 :042 > class MySubclass < MyClass
2.7.2 :043 > end
 => nil 
2.7.2 :044 > obj = MySubclass.new
 => #<MySubclass:0x00007f8fa44b33c8> 
2.7.2 :045 > obj.my_method()
 => "my_method()" 
```

**"向右一步，再向上"——先向右一步来到接收者所在的类，然后沿着祖先链向上查找。**

**模块与方法查找**

```shell
2.7.2 :046 > module M1
2.7.2 :047 >   def my_method
2.7.2 :048 >     "M1#my_method()"
2.7.2 :049 >   end
2.7.2 :050 > end
 => :my_method 
2.7.2 :051 > class C
2.7.2 :052 >   include M1
2.7.2 :053 > end
 => C 
2.7.2 :054 > class D < C;
2.7.2 :055 > end
 => nil 
2.7.2 :056 > D.ancestors
 => [D, C, M1, Object, JSON::Ext::Generator::GeneratorMethods::Object, Kernel, BasicObject] 
```

使用prepend方法，可以把module插入ancestors chain中包含它的该类的下方，而不是像include方法那样插入到上方。

```shell
2.7.2 :057 > class C2
2.7.2 :058 >   prepend M1
2.7.2 :059 > end
 => C2 
2.7.2 :060 > class D2 < C2;
2.7.2 :061 > end
 => nil 
2.7.2 :062 > D2.ancestors
 => [D2, M1, C2, Object, JSON::Ext::Generator::GeneratorMethods::Object, Kernel, BasicObject] 
```

**多重包含**

```shell
2.7.2 :063 > module M1;
2.7.2 :064 > end
 => nil 
2.7.2 :065 > module M2
2.7.2 :066 >   include M1
2.7.2 :067 > end
 => M2 
2.7.2 :068 > module M3
2.7.2 :069 >   prepend M1
2.7.2 :070 >   include M2
2.7.2 :071 > end
 => M3 
2.7.2 :072 > M3.ancestors
 => [M1, M3, M2] 
```

如果该module已经存在于祖先链中，那么Ruby会悄悄忽略这个include或prepend指令。

**Kernel模块**

print方法其实是Kernel模块的私有实例方法

```shell
2.7.2 :075 > Kernel.private_instance_methods.grep(/^pr/)
 => [:proc, :printf, :print] 
```

Object类包含了kernel模块，所以无论哪个对象都可以随意调用Kernel模块的方法。

**内核方法**——给Kernel模块增加一个方法

### 执行方法

当前对象用self表示，因此可以用self关键字来对他进行访问。任何时刻，只有一个对象能充当当前对象，而且没有哪个对象可以长期充当此角色。

**顶层上下文——top level context**

对象main有时被称为顶层上下文----此时开发者处在堆栈的顶层，要没还没有调用任何方法，要么调用的方法已经返回。

```shell
2.7.2 :079 > self
 => main 
2.7.2 :080 > self.class
 => Object 
```

在类和模块定义之中，self的角色由这个类或者模块本身担任。

### 细化

细化解决的问题是：解决破坏性的猴子补丁

**细化**用法如下：

```shell
2.7.2 :081 > module StringExtensions
2.7.2 :082 >   refine String do
2.7.2 :083 >     def to_alphanumeric
2.7.2 :084 >       gsub(/[^\w\s]/,'')
2.7.2 :085 >     end
2.7.2 :086 >   end
2.7.2 :087 > end
 => #<refinement:String@StringExtensions>
```

细化在默认情况下不生效，为了使细化生效，必须调用using方法。

```shell
2.7.2 :081 > module StringExtensions
2.7.2 :082 >   refine String do
2.7.2 :083 >     def to_alphanumeric
2.7.2 :084 >       gsub(/[^\w\s]/,'')
2.7.2 :085 >     end
2.7.2 :086 >   end
2.7.2 :087 > end
 => #<refinement:String@StringExtensions> 
2.7.2 :088 > module StringStuff
2.7.2 :089 >   using StringExtensions
2.7.2 :090 >   "my_string..".to_alphanumeric
2.7.2 :091 > end
 => "my_string" 
2.7.2 :092 > "my_string...##".to_alphanumeric
Traceback (most recent call last):
```

细化只在两种场合有效：refine代码内部，从using语句的位置开始到模块结束。

细化并非全局性的，所以它不会带来类所具有的问题，可以让细化只作用在你希望生效的地方。

## 混乱的模块

## 对象模型小结

- 对象由一组实例变量和类的引用组成。
- 对象的方法存在于对象所属的类中（对类来说是实例方法）。类本身是Class类的对象。类的名字只是一个常量。
- Class类是Module的子类。一个模块基本上就是由一组方法组成的包。类除了具有模块的特性之外，还可以被实例化（使用new方法） ，或者按一定的层次结构来组织（使用superclass方法）。
- 常量像文件系统一样，是按照树形结构组织的。其中，模块和类的名字扮演目录的角色，其他普通的常量则扮演文件的角色。
- 每个类都有一个祖先链，这个链从每个类自己开始，向上直到Basicobject结束。
- 调用方法时， Ruby首先向右找到接收者所属的类，然后向上查找祖先链，直到找到该方法或到达链的顶端为止。
- 在类中包含一个模块（使用include方法）时，这个模块会被插入祖先链中，位置就在类的正上方；而使用prepend方法包含一个模块时，这个模块也会被插入祖先链中，位置在类的正下方。
- 调用一个方法时，接收者会扮演self的角色。
- 定义一个模块（或类）时，该模块会扮演self的角色。实例变量永远被认定为self的实例变量。
- 任何没有明确指定接收者的方法调用，都当做是调用self的方法。
- 细化就像在原来的类上添加了一块补丁，而且它会覆盖正常的方法查找。此外，细化只在程序的部分区域生效：从using语句的位置开始，直到模块结束，或者直到文件结束。

# 方法

**static type checking**

Java——Java的编译器会控制代码之间的交谈，对于每一次方法的调用，编译器都会检查接受对象是否有一个匹配的方法，这就叫做——**静态类型检查**

所以Java也叫做静态语言

**动态语言包括Python&Ruby**

在某个对象上调用特定的方法时，系统不会发出警告，直到真正的调用此方法时，才会提示无法响应调用。

## 代码繁复的问题

###  老系统

```text
DS类下面有很多很多方法！都是拿取对应信息的，看起来就很繁复的样子！
```

### 代码的优雅化🐶

**动态方法**

**method missing**

## 动态方法

调用一个方法——给一个对象发送一个消息

### 动态调用方法

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

### 动态定义方法

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

### 重构Computer类

核心就是接收String || Symbol 作为参数，并调用方法。

## method_missing方法

什么是动态语言，show me the code

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

### 覆写method_missing方法

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

### 幽灵方法

因为要调用的方法其实不存在，所以也叫它幽灵方法。

## 消灭bug

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

![image-20210518225149082](/img/Metaprogramming/image-20210518225149082.png)

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

##  白板类

调用类的某个方法返回nil时，可以使用此条语句列出Object中所有以d开头的实例方法

```
Object.instance_methods.grep /^d/
```

### BasicObject

继承BasicObject类是最简单的定义白板类的方法。

### 删除方法

| name          | 作用                         |
| ------------- | ---------------------------- |
| undef_method  | 删除所有（包括继承来的）方法 |
| remove_method | 仅删除接受者自己的方法       |

### 修改Computer

```ruby
class Computer < BasicObject
	……
```

## 小结

幽灵方法产生风险的根本原因是它们并非真正的方法，它们只是对方法调用的拦截。

有动态方法则是普通的方法，不过它们不是用def定义，而是用define_method定义，它们的行为跟其他方法没什么两样。

# 代码块

块可以用来控制**作用域(scope)**,作用域是变量和方法可用性范围。

## 学习代码块

### 代码块学习路线

- 代码块的基础知识
- 作用域的基础知识：用代码块携带变量穿越作用域
- 通过传递块给instance_eval方法来控制作用域
- 怎样把块转换为诸如Proc和lambda这样的可调用对象，供以后调用

### 代码块基础知识

```ruby
def a_method(a,b)
	a+yield(a,b)
end
```

```shell
2.7.2 :103 > def a_method(a,b)
2.7.2 :104 >   a+yield(a,b)
2.7.2 :105 > end
 => :a_method 
2.7.2 :106 > a_method(1,2) {|x,y| (x+y)*3}
 => 10 
```

代码块可以用大括号定义，也可以用do……end关键字定义，通常来说，只有一行的块用大括号，而多行的块用do……end。

只有调用一个方法时，才可以定义一个块。块会被直接传递给这个方法，该方法可以用yield关键字调用这个块。

**使用Kernel#block_given?方法询问当前的方法调用是否包含块**

```shell
2.7.2 :107 > def a_method
2.7.2 :108 >   return yield if block_given?
2.7.2 :109 >   'no block'
2.7.2 :110 > end
 => :a_method 
2.7.2 :111 > a_method
 => "no block" 
2.7.2 :112 > a_method { "here is a block" }
 => "here is a block" 
```

## ~~Ruby的#符号~~

### ~~using关键字~~

## 代码块是闭包

代码块还可以把变量偷偷带出原来的作用域。

代码块不能独立的运行。![screenshot-20210521-170353](/img/Metaprogramming/screenshot-20210521-170353.png)

```shell
2.7.2 :128 > def my_method
2.7.2 :129 >   x = "goodbye"
2.7.2 :130 >   yield("cruel")
2.7.2 :131 > end
 => :my_method 
2.7.2 :132 > x = "hello"
 => "hello" 
2.7.2 :133 > my_method { |y| "#{x}, #{y} world" }
 => "hello, cruel world" 
2.7.2 :134 > my_method { |x| "#{x}, world" }
 => "cruel, world" 
```

绑定在代码块里的变量在代码块结束之后，也跟着结束了。基于这样的特性，代码块也叫做闭包——closure。

### 作用域

**此书里一段很魔幻的话**

```tex
设想你是一个微型调试器（debugger） ，正沿着代码穿过一段Ruby程序。你从一条语句蹦到另一条语句，直到遇到一个断点。看看周围的环境，这就是你的作用域。

作用域里到处都是绑定。你的脚下有一堆局部变量。抬头向上看，你会发现自己站在一个对象里，它有自己的方法和实例变量。这个对象就是当前对象，也称为self。不远处有一棵挂满常量的树，你可以用它们来确定自己的位置。更远的地方，还有一组全局变量。
```

**Ruby的作用域之间是截然分开的，一旦进入一个新的作用域，原先的绑定会被替换成一组新的绑定。**

```shell
2.7.2 :149 > def a_scope
2.7.2 :150 >   $var = "some value"
2.7.2 :151 > end
 => :a_scope 
2.7.2 :152 > def another_scope
2.7.2 :153 >   $var
2.7.2 :154 > end
 => :another_scope 
2.7.2 :155 > a_scope
 => "some value" 
2.7.2 :156 > another_scope
 => "some value" 
```

任何人都可以修改全局变量，开发者几乎无法确定是谁修改了它们。所以尽量不用$全局变量。有时顶级实例变量代替全局变量。

### 作用域门

程序会在三个地方关闭前一个作用域，同时打开一个新的作用域：

- 类定义
- 模块定义
- 方法

我们可以这样说：class，module，def关键字都对应一个作用域门。

### 扁平化作用域

**使用Class.new和define_method来穿越作用域门**

```shell
2.7.2 :170 > my_var = "Success"
 => "Success" 
2.7.2 :163 > MyClass = Class.new do
2.7.2 :164 >   puts "#{my_var} in the class definition!"
2.7.2 :165 >   define_method :my_method do
2.7.2 :166 >   "# {my_var} in the method"
2.7.2 :167 >   end
2.7.2 :168 > end
Success in the class definition!
(irb):163: warning: already initialized constant MyClass
(irb):158: warning: previous definition of MyClass was here
 => MyClass 
```

**共享作用域**

### 闭包小结

每个Ruby作用域都包含一组绑定，不同作用域之间被作用域门分隔开来。

……

## instance_eval方法

这是另外一种混合代码和绑定的方式。

```shell
2.7.2 :214 > class MyClass
2.7.2 :215 >   def initialize
2.7.2 :216 >     @v = 1
2.7.2 :217 >   end
2.7.2 :218 > end
 => :initialize 
2.7.2 :219 > obj = MyClass.new
 => #<MyClass:0x00007f8fa39d4380 @v=1> 
2.7.2 :220 > obj.instance_eval do
2.7.2 :221 >   self
2.7.2 :222 >   @v
2.7.2 :223 > end
 => 1 
2.7.2 :224 > v = 2
 => 2 
2.7.2 :225 > obj.instance_eval { @v = v }
 => 2 
2.7.2 :226 > obj.instance_eval { @v}
 => 2 
```

我们把传递给instance_eval方法的代码块称为**上下文探针**，因为它就像是一个深入到对象中的代码片段，并可以对那个对象进行操作。

### 打破封装

Instance_exec方法稍微灵活一些，允许对代码块传入参数。

```shell
2.7.2 :256 > class C
2.7.2 :257 >   def initialize
2.7.2 :258 >     @x=1
2.7.2 :259 >   end
2.7.2 :260 > end
 => :initialize 
2.7.2 :261 > class D
2.7.2 :262 >   def twisted_method
2.7.2 :263 >     @y = 2
2.7.2 :264 >     C.new.instance_eval { "@x: #{@x}, @y: #{@y}" }
2.7.2 :265 >   end
2.7.2 :266 > end
 => :twisted_method 
2.7.2 :267 > D.new.twisted_method
 => "@x: 1, @y: " 
```

**如上代码所示：instance_eval方法把receiver变成当前对象self时，调用者的实例变量就落在了作用域范围外面。**

***Instance_exec方法可以解决此问题***

```shell
2.7.2 :275 > class D
2.7.2 :276 >   def twisted_method
2.7.2 :277 >     @y = 2
2.7.2 :278 >     C.new.instance_exec(@y) {|y| "@x: #{@x}, @y: #{y}" }
2.7.2 :279 >   end
2.7.2 :280 > end
 => :twisted_method 
2.7.2 :281 > D.new.twisted_method
 => "@x: 1, @y: 2" 
```

### 洁净室

洁净室只是一个用来执行块的环境。它可以提供若干有用的方法供代码块调用。但是，一个理想化的洁净室是不应该有任何方法或者实例变量的。因为这样的话，其中的方法名或实例变量名有可能和代码块从其环境中带来的名字冲突。

因此，BasicObject的实例往往用来充当洁净室，**因为它是白板类**，几乎没有任何方法。

## 可调用对象

从底层看，使用代码块的两步：

- 将代码打包备用
- 调用代码块，执行代码

这种打包代码，之后调用的机制主要有：

- 使用proc，proc是由块转换而来的对象
- 使用lambda，它是proc的变种
- 使用方法

### Proc对象

Ruby中的绝大多数东西都是对象，但是代码块不是。那么想存储一个块供以后执行则需要一个对象。

Ruby在标准库中提供了一个名为proc的类。proc就是由块转换而来的对象。

开发者可以把代码块传给Proc.new方法来创建一个proc，并使用Proc#call方法来执行这个由代码块转换而来的对象——延迟执行

```shell
2.7.2 :002 > inc  = Proc.new { |x| x+1}
 => #<Proc:0x00007fde808a7620 (irb):2> 
2.7.2 :003 > inc.call(2)
 => 3 
```

```shell
2.7.2 :004 > dec = lambda { |x| x-1 }
 => #<Proc:0x00007fde8087c100 (irb):4 (lambda)> 
2.7.2 :005 > dec.class
 => Proc 
2.7.2 :006 > dec.call(2)
 => 1 
```

*p = ->(x) {x+1}***等价于***p=lambda{|x| x+1}*

**使用&可以实现Proc和代码块的互相转换**

```shell
2.7.2 :010 > p = my_method{|name| "hello #{name}"}
 => #<Proc:0x00007fde7aba5c38 (irb):10> 
2.7.2 :011 > p.class
 => Proc 
2.7.2 :012 > p.call("Bill")
 => "hello Bill" 
```

```shell
2.7.2 :013 > def my_method(greeting)
2.7.2 :014 >   "#{greeting}, #{yield}"
2.7.2 :015 > end
 => :my_method 
2.7.2 :017 > my_proc = proc{"Bill"}
 => #<Proc:0x00007fde80c98310 (irb):17> 
2.7.2 :018 > my_method("hello",&my_proc)
 => "hello, Bill" 
```

调用如上的my_method方法时，&操作符会把my_proc转换为代码块，再把代码块传给这个方法。

### Proc与Lambda的对比

**使用Proc#lambda？方法检测Proc是不是lambda**

Proc和lambda的重要差别有两个：

- return关键字
- 参数校验

lambda中，return仅表示从这个lambda中返回

proc中，return表示从定义proc的作用域中返回

```shell
2.7.2 :034 > p = Proc.new { |a,b| [a,b]}
 => #<Proc:0x00007fde80c60910 (irb):34> 
2.7.2 :035 > p.arity
 => 2 
2.7.2 :036 > p.call(1,2,3)
 => [1, 2] 
2.7.2 :037 > p.call(1)
 => [1, nil] 
```

简单说：proc会把传来的参数调整成自己期望的形式，而lambda假如和自己所期望的形式不同，则抛出错误。

整体来说：lambda更直观，因为它更像是一个方法，它对参数数量要求严格，而且调用return时仅从代码中返回。

### Method对象

```shell
2.7.2 :038 > class MyClass
2.7.2 :039 >   def initialize(value)
2.7.2 :040 >     @x=value
2.7.2 :041 >   end
2.7.2 :042 >   def my_method
2.7.2 :043 >     @x
2.7.2 :044 >   end
2.7.2 :045 > end
 => :my_method 
2.7.2 :046 > object = MyClass.new(1)
 => #<MyClass:0x00007fde7b071a50 @x=1> 
2.7.2 :048 > m = object.method :my_method
 => #<Method: MyClass#my_method() (irb):42> 
2.7.2 :049 > m.call
 => 1 
```

**通过调用Kernel#method方法，可以获得一个用Method对象表示的方法，可以在以后使用Method#call方法对它进行调用。**

Method对象类似代码块或者lambda，实际上，可以通过Method#to_proc方法把Method对象转换为Proc。另外还可以通过define_method方法把代码块转换为方法。

### 可调用对象小结

可调用对象是可以执行的代码片段，有以下几种：

- 代码块（它们不是真正的“对象” ，但是它们是“可调用的” ）：在定义它们的作用域中执行。
- proc： Proc类的对象跟代码块一样，也在定义自身的作用域中执行。
- lambda：也是Proc类的对象，但是跟普通的proc有细微的差别。它跟块和proc一样都是闭包，因此也在定义自身的作用域中执行。
- 方法：绑定于一个对象，在所绑定对象的作用域中执行。它们也可以与这个作用域解除绑定，然后再重新绑定到另一个对象的作用域上。

## 编写领域专属语言(DSL)

### 第一个领域专属语言

## 改良的DSL

## 小结

# 类定义

**定义RUby类实际上是在运行代码**

**宏类可以用来修改类**

**环绕别名可以在其他方法前后封装额外代码**

Ruby最优雅的特性之一：**单体类**

## 揭秘类定义

### 深入类定义

```shell
2.7.2 :061 > class MyClass
2.7.2 :062 >   puts "hello"
2.7.2 :063 > end
hello
 => nil 
2.7.2 :064 > result = class MyClass
2.7.2 :065 >   self
2.7.2 :066 > end
 => MyClass 
2.7.2 :067 > result
 => MyClass 
```

### 当前类

不管处在Ruby程序的哪个位置，总存在一个当前对象：self。同样也纵使有一个当前类（或模块）存在。

**class_eval方法**

class_eval方法会在一个已存在类的上下文中执行一个块。

class_eval会同时修改self和当前类

- Ruby解释器总是追踪当前类（或模块）的引用。所有使用def定义的方法都成为当前类的实例方法。

- 在类定义中，当前类就是self—正在定义的类。

- 如果你有一个类的引用，则可以用class_eval （或module—eval）方法打开这个类。

### 类实例变量

Ruby解释器假定所有的实例变量都属于当前对象self，在类定义时也如此！

```shell
irb(main):002:1* class MyClass
irb(main):003:1*   @my_var = 1
irb(main):004:2*   def self.read;
irb(main):005:2*     @my_var;
irb(main):006:1*   end
irb(main):007:2*   def write;
irb(main):008:2*     @my_var = 2;
irb(main):009:1*   end
irb(main):010:2*   def read;
irb(main):011:2*     @my_var;
irb(main):012:1*   end
irb(main):013:0> end
=> :read
irb(main):014:0> obj = MyClass.new
irb(main):015:0> obj.read
=> nil
irb(main):016:0> obj.write
=> 2
irb(main):017:0> obj.read
=> 2
irb(main):018:0> MyClass.read
=> 1
```

其中一个@my_var变量定义于obj充当self的时刻，它是obj对象的实例变量。

另外一个@my_var变量定义于MyClass充当self的时刻，它是MyClass的实例变量，也就是**类实例变量**

一个类实例变量只可以被类本身所访问，而不能被类的实例或者子类所访问。

## Taboo类

## 单件方法

### 使用单件方法

### 类方法的真相

### 类宏

## 单件类

### 单件方法的神奇之处

### 揭秘单件类

### 补充方法查找

## 模块的麻烦

## 方法包装器

### 方法别名

### 更多的方法包装器

### 解决Amazon难题

## 打破数学规律

## 小结

# 编写代码的代码

## 通向周末的编程之路

### 老板的任务

### 开发计划

## Kernel#eval方法

### REST Client的例子

### 绑定对象

### irb的例子

### 对比代码字符串与块

### eval方法的麻烦

## 校验过的属性(第一步)

## 校验过的属性(第二步)

## 校验过的属性(第三步)

## 校验过的属性(第四步)

## 钩子方法

### 更多钩子方法

### VCR的例子

## 校验过的属性(第五步)

## 小结

# 尾声

**根本没有什么元编程，从来只有编程而已**

# 准备Rails之旅

# Active Record的设计

# Active Support的Concern模块

# alias_method_chain方法沉浮表

# 属性方法的发展

# 最后的思考

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

