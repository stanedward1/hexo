---
title: Array&Hash&Symbol
date: 2021-05-04 07:04:32
tags: Ruby基础
categories: Ruby on Rails
cover: /img/ruby.png
---

**Array(数组):顺序且有序的集合类型，Ruby中使用方括号来获取数组元素，索引使用数字，从0开始**

**Hash(哈希or散列):使用键值操作的集合类型，哈希中的索引不局限于使用数字，Hash中的索引也被称为键，使用花括号包含键值对的形式表示**

**Symbol(符号):Ruby中特有的数据类型，rails中经常用到，使用symbol会比使用字符串更有效率，比如“是否相等”这类问题，字符串是按字母一个一个的比较，而symbol只需进行一次操作，适合用来作为Hash的键（索引）**

## 数组 
### 数组的创建
```
# 使用[]来创建数组
2.7.2 :002 > nums = [1,2,3,4,5]
 => [1, 2, 3, 4, 5] 
2.7.2 :003 > strs = ["a","b","c"]
 => ["a", "b", "c"] 
```
```
# 使用Array.new
2.7.2 :004 > a = Array.new
 => [] 
2.7.2 :005 > p a
[]
 => [] 
2.7.2 :006 > a =Array.new(5)
 => [nil, nil, nil, nil, nil] 
2.7.2 :007 > a =Array.new(5,0)
 => [0, 0, 0, 0, 0] 
```
```
# %w创建不包含空白的字符串数组，%i创建元素为符号的数组
2.7.2 :008 > lang = %w(Ruby java python ssm nginx docker)
 => ["Ruby", "java", "python", "ssm", "nginx", "docker"] 
2.7.2 :009 > p lang
["Ruby", "java", "python", "ssm", "nginx", "docker"]
 => ["Ruby", "java", "python", "ssm", "nginx", "docker"] 
2.7.2 :010 > lang = %i(Ruby java python ssm nginx docker)
 => [:Ruby, :java, :python, :ssm, :nginx, :docker] 
2.7.2 :011 > p lang
[:Ruby, :java, :python, :ssm, :nginx, :docker]
 => [:Ruby, :java, :python, :ssm, :nginx, :docker] 
```
```
# 使用to_a方法把其他对象转换为数组
2.7.2 :012 > smartphone = {xiaomi: "小米",huawei: "华为"}
 => {:xiaomi=>"小米", :huawei=>"华为"} 
2.7.2 :016 > t = smartphone.to_a
 => [[:xiaomi, "小米"], [:huawei, "华为"]] 
2.7.2 :018 > t.is_a? Array
 => true 
```
```
# 对用逗号或者空白隔开的字符串使用split方法
2.7.2 :019 > text = "one","two","three".split(',')
 => ["one", "two", ["three"]] 
2.7.2 :020 > text = "one,two,three".split(',')
 => ["one", "two", "three"] 
2.7.2 :022 > p text
["one", "two", "three"]
 => ["one", "two", "three"] 
```
### 索引的使用
```
# 通过[]指定索引，获取相应的元素
2.7.2 :023 > a = ["a","b","c","d"]
 => ["a", "b", "c", "d"] 
2.7.2 :024 > a[1]
 => "b" 
# 形如a[n..m]，若m比数组长度大，返回的结果与指定的数组最后一个元素是一样的
2.7.2 :025 > a[1..4]
 => ["b", "c", "d"] 
# 从某个元素开始，获取多个元素
2.7.2 :026 > a[1,2]
 => ["b", "c"] 
# 还可使用at，slice方法
```
```
# 使用a[n] = item来替换元素

a = ["a","b","c","d"]
a[2,4] = ["C","D","E"]
p a

output----["a","b","C","D","E"]

a = ["a","b","c","d","e","f"]
a[2..4] = ["C","D","E"]
p a

output---- ["a","b","C","D","E","f"]
```
```shell
# 插入元素
irb(main):003:0> a = ["q","s","d"]
irb(main):006:0> a[2,0] = ["X","Y"]
irb(main):007:0> a
=> ["q", "s", "X", "Y", "d"]
```
```shell
# 通过多个索引创建数组
irb(main):008:0> a = %w(a b c d e d)
irb(main):009:0> a
=> ["a", "b", "c", "d", "e", "d"]
irb(main):010:0> a.values_at(1,3,5)
=> ["b", "d", "d"]
```
### 作为集合与作为列的数组
```
# 交集&并集
irb(main):011:0> ary = ["a","b","c"]
irb(main):012:0> ary1 = ["b","c","d"]
irb(main):013:0> ary & ary1
=> ["b", "c"]
irb(main):014:0> ary | ary1
=> ["a", "b", "c", "d"]
irb(main):015:0> ary1-ary
=> ["d"]
```
```
irb(main):016:0> ary+ary1
=> ["a", "b", "c", "b", "c", "d"]
```
```
# 对于数组开头的元素
irb(main):022:0> a
=> ["a", "b", "c", "d", "e", "d", "f"]
irb(main):023:0> a.unshift("1")
=> ["1", "a", "b", "c", "d", "e", "d", "f"]
irb(main):024:0> a.shift
=> "1"
irb(main):025:0> a
=> ["a", "b", "c", "d", "e", "d", "f"]

# 对于数组末尾的元素
irb(main):026:0> a
=> ["a", "b", "c", "d", "e", "d", "f"]
irb(main):027:0> a.push("df")
=> ["a", "b", "c", "d", "e", "d", "f", "df"]
irb(main):028:0> a.pop
=> "df"
irb(main):029:0> a
=> ["a", "b", "c", "d", "e", "d", "f"]
```
### 主要的数组方法
```
irb(main):033:0> a = [1,2,3,4,5,1,3,6]
# 数组开头添加元素
irb(main):034:0> a.unshift(12)
=> [12, 1, 2, 3, 4, 5, 1, 3, 6]
# 数组末尾添加元素
irb(main):035:0> a << 980
=> [12, 1, 2, 3, 4, 5, 1, 3, 6, 980]
# 连接两个数组
irb(main):037:0> a.concat([8,3,5])
=> [12, 1, 2, 3, 4, 5, 1, 3, 6, 980, 8, 3, 5]
irb(main):038:0> a
=> [12, 1, 2, 3, 4, 5, 1, 3, 6, 980, 8, 3, 5]
# 把第2，3，4个元素换为一个0
irb(main):039:0> a[2..4]=0
irb(main):040:0> a
=> [12, 1, 0, 5, 1, 3, 6, 980, 8, 3, 5]
# 1-3的元素换为一个9
irb(main):041:0> a[1,3] = 9
irb(main):042:0> a
=> [12, 9, 1, 3, 6, 980, 8, 3, 5]
``````
```
### 数组内元素的删除
```
irb(main):060:0> a
=> [12, 9, 1, 3, 6, 980, 8, 3, 5]
irb(main):061:0> a.delete(1)
=> 1
irb(main):062:0> a
=> [12, 9, 3, 6, 980, 8, 3, 5]
irb(main):063:0> a.delete_at(1)
=> 9
irb(main):064:0> a
=> [12, 3, 6, 980, 8, 3, 5]
irb(main):065:0> a.delete_if{|i| i<5}
=> [12, 6, 980, 8, 5]
irb(main):066:0> a
=> [12, 6, 980, 8, 5]
irb(main):067:0> a[2,0] = [1,2,3,4,5]
irb(main):068:0> a
=> [12, 6, 1, 2, 3, 4, 5, 980, 8, 5]
irb(main):069:0> a.reject{|i| i<2}
=> [12, 6, 2, 3, 4, 5, 980, 8, 5]
irb(main):070:0> a
=> [12, 6, 1, 2, 3, 4, 5, 980, 8, 5]
irb(main):071:0> a.reject!{|i| i<2}
=> [12, 6, 2, 3, 4, 5, 980, 8, 5]
irb(main):072:0> a
=> [12, 6, 2, 3, 4, 5, 980, 8, 5]
irb(main):073:0> a.slice!(1,2)
=> [6, 2]
irb(main):074:0> a
=> [12, 3, 4, 5, 980, 8, 5]
irb(main):075:0> a.uniq!
=> [12, 3, 4, 5, 980, 8]

```

```
irb(main):076:0> a
=> [12, 3, 4, 5, 980, 8]
irb(main):077:0> a[2,0]=[1,2,3,4,5,3,42,5,3]
irb(main):078:0> a
=> [12, 3, 1, 2, 3, 4, 5, 3, 42, 5, 3, 4, 5, 980, 8]
irb(main):079:0> a.collect!{|i| i*2}
=> [24, 6, 2, 4, 6, 8, 10, 6, 84, 10, 6, 8, 10, 1960, 16]
irb(main):080:0> a.fill(0,2..5)
=> [24, 6, 0, 0, 0, 0, 10, 6, 84, 10, 6, 8, 10, 1960, 16]
irb(main):081:0> a.reverse
=> [16, 1960, 10, 8, 6, 10, 84, 6, 10, 0, 0, 0, 0, 6, 24]
irb(main):082:0> a.sort!
=> [0, 0, 0, 0, 6, 6, 6, 8, 10, 10, 10, 16, 24, 84, 1960]
irb(main):084:0> a.sort_by{|i| -i}
=> [1960, 84, 24, 16, 10, 10, 10, 8, 6, 6, 6, 0, 0, 0, 0]
```
### 处理数组中的元素
```
irb(main):116:0> a
=> [0, 0, 0, 0, 6, 6, 6, 8, 10, 10, 10, 16, 24, 84, 1960]
irb(main):117:0> sum =0
irb(main):118:1* a.each do |i|
irb(main):119:1*   sum+=i
irb(main):120:0> end
=> [0, 0, 0, 0, 6, 6, 6, 8, 10, 10, 10, 16, 24, 84, 1960]
irb(main):122:0> p sum
2140
=> 2140
```

```
irb(main):128:0> b=[[1,2,3],[2,3,4],[3,4,5]]
irb(main):129:0> b
=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
irb(main):131:0> b=Array.new(3,[3,4,5])
irb(main):132:0> b
=> [[3, 4, 5], [3, 4, 5], [3, 4, 5]]
```
### 同时访问多个数组
```
irb(main):164:0> a
=> [1, 2, 3]
irb(main):165:0> b
=> [1, 2, 2]
irb(main):166:0> c
=> [1, 2, 1]
irb(main):167:0> result = []
irb(main):168:1* a.zip(b,c) do |a ,b, c|
irb(main):169:1*   result << a+b+c
irb(main):170:0> end
=> nil
irb(main):171:0> result
=> [3, 6, 6]

```
## hash
### Hash的创建
```
irb(main):182:0> h1 = {"a"=>"b","c"=>"d"}
irb(main):183:0> h1
=> {"a"=>"b", "c"=>"d"}
irb(main):184:0> h1["a"]
=> "b"
irb(main):185:0> h2 = {a:"b",c:"d"}
irb(main):186:0> h2
=> {:a=>"b", :c=>"d"}
irb(main):187:0> h2[:a]
=> "b"
```
### 值的获取与设定
```
irb(main):188:0> h = Hash.new
irb(main):189:0> h["r"]="ruby"
irb(main):190:0> h["r"]
=> "ruby"
irb(main):192:0> h.store("r","ruby")
=> "ruby"
irb(main):193:0> h.fetch("r")
=> "ruby"
irb(main):194:0> h.fetch("N")
Traceback (most recent call last):
        5: from /usr/bin/irb:23:in `<main>'
        4: from /usr/bin/irb:23:in `load'
        3: from /usr/lib/ruby/gems/2.7.0/gems/irb-1.2.1/exe/irb:11:in `<top (required)>'
        2: from (irb):194
        1: from (irb):194:in `fetch'
KeyError (key not found: "N")
irb(main):195:0> h.fetch("N","(undef)")
=> "(undef)"
```
###  对Hash的查看
```
irb(main):201:0> h3 = Hash.new(1)
irb(main):202:0> h3["a"]=10
irb(main):205:0> p h3["x"]
1
```

```
irb(main):213:0> h1
=> {"a"=>"b", "c"=>"d"}
irb(main):214:0> h1.key?("a")
=> true
```
### 键值的删除
```
irb(main):218:0> h1
=> {"a"=>"b", "c"=>"d"}
irb(main):219:0> h1["a"]
=> "b"
irb(main):220:0> h1.delete("a")
=> "b"
irb(main):221:0> h1
=> {"c"=>"d"}
```
### 初始化散列
```
irb(main):222:0> h1
=> {"c"=>"d"}
irb(main):223:0> h1.clear
=> {}
irb(main):224:0> h1.size
=> 0
```
### 合并散列
```
irb(main):228:0> h1
=> {"a"=>"b", "c"=>"d"}
irb(main):229:0> h2
=> {:a=>"b", :c=>"d"}
irb(main):230:0> h1.merge(h2)
=> {"a"=>"b", "c"=>"d", :a=>"b", :c=>"d"}
```

```