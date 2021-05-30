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

**for语句与times方法不一样，循环的开始值和结束值可以任意指定**

```shell
irb(main):009:0> sum=0
irb(main):010:1* for i in 1..5
irb(main):011:1*     sum=sum+i
irb(main):012:0> end
=> 1..5
irb(main):013:0> puts sum
15
```

# 普通的for语句

```shell
irb(main):014:0> names = ["awk","Perl","Python","Ruby"]
irb(main):015:1* for name in names
irb(main):016:1*     puts name
irb(main):017:0> end
awk
Perl
Python
Ruby
```

# while语句

```shell
irb(main):018:0> i=1
irb(main):019:1* while i<3
irb(main):020:1*   puts i
irb(main):021:1*   i+=1
irb(main):022:0> end
1
2
```

```shell
irb(main):023:0> sum = 0
irb(main):024:0> i = 1
irb(main):025:1* while sum<50
irb(main):026:1*   sum+=i
irb(main):027:1*   i+=1
irb(main):028:0> end
irb(main):029:0> puts sum
55
```

# until语句

```shell
irb(main):030:0> sum = 0
irb(main):031:0> i = 1
irb(main):032:1* until sum >= 50
irb(main):033:1*   sum +=i
irb(main):034:1*   i+=1
irb(main):035:0> end
irb(main):036:0> puts sum
55
```

# each方法

```shell
irb(main):037:0> names = ["awk","Perl","Pyrhon","Ruby"]
irb(main):038:1* names.each do |name|
irb(main):039:1*   puts name
irb(main):040:0> end
awk
Perl
Pyrhon
Ruby
```

# loop方法

**循环输出Ruby的例子**

```shell
irb(main):044:1* loop do
irb(main):045:1*   print "Ruby"
irb(main):046:0> end
```

# 循环控制

| 命令  | 用途                         |
| ----- | ---------------------------- |
| break | 终止程序                     |
| next  | 跳到下一次循环               |
| redo  | 在相同的条件下重复刚才的处理 |

# 小结

|           | 主要用途                                |
| --------- | --------------------------------------- |
| times方法 | 确定了循环次数时使用                    |
| for语句   | 从对象中取出元素时使用                  |
| while语句 | 希望自由指定循环条件时使用              |
| until语句 | 使用while语句使得循环条件变得难懂时使用 |
| each方法  | 从对象中取出元素时使用                  |
| loop方法  | 不限制循环次数时使用                    |



