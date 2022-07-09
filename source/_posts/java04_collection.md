---
title: Java容器
date: 2021-01-28 20:03:30
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg

---

Java 集合， 也叫作容器，所有集合类都位于 java.util 包下。Java的集合类主要由两个接口派生而出：Collection 和 Map，Collection 和 Map 是 Java 集合框架的根接口，这两个接口又包含了一些子接口或实现类。

![java04_collection01](/img/Java_and_Spring/java04_collection01.png)

*集合接口：6个接口（短虚线表示），表示不同集合类型，是集合框架的基础。*

*抽象类：5个抽象类（长虚线表示），对集合接口的部分实现。可扩展为自定义集合类。*

*实现类：8个实现类（实线表示），对接口的具体实现。*

# Collerction

## List

### ArrayList

**使用场景**

- 其拥有动态数组的属性，适合在声明时不知道数据结构大小时使用，避免了浪费内存空间
- 适合需要快速随机查找和遍历
- 不适合经常需要插入和删除操作

```latex
排列有序，可重复
底层使用数组实现
速度快，增删慢，getter()和setter()方法快
非线程安全
容量不够时：
	java 8 及之后扩容计算方法： int newCapacity = oldCapacity + (oldCapacity >> 1); 这意味着在原来数组大小的基础上扩大50%作为新数组大小
    java 6 的计算方法：int newCapacity = (oldCapacity * 3)/2 + 1; 这意味着在原来数组大小的基础上扩大1.5倍作为新数组容量的大小
```

最常用的List实现类，继承自AbstractList，允许对元素进行快速的随机访问，相关链接：https://devdocs.io/openjdk~8/java/util/arraylist

### Vector

**使用场景**

- 需要快速访问元素的多线程环境，实际上已被ArrayList取代（同步操作上所消耗的时间太多）

```latex
排列有序，可重复
底层使用数组实现
速度快，增删慢
线程安全，效率低
容量不够时：当前容量扩展一倍
```

Vector支持线程的同步，也就是某一时刻只有一个线程可以写Vector，避免多线程同时写而引起的不一致性，但实现同步需要很高的花费，因此，访问它比访问ArrayList慢。相关链接：https://devdocs.io/openjdk~8/java/util/vector

### LinkedList

**使用场景**

- 适合需要随机插入、随机删除效率要求比较高时
- 可以作为队列和栈使用

```latex
排列有序，可重复
底层使用双向循环链表实现
查询速度慢，增删快，add()和remove()方法快
非线程安全
双向链表，没有初始化大小，也没有扩容的机制，就是一直在前面或者后面新增就好。
```

## Set

### HashSet

**使用场景**

用于不需要保证元素插入和取出顺序的场景

```
排列无序，不可重复
底层使用Hash表实现
存取速度快
非线程安全
内部是HashMap，扩容的规则与HashMap相同
```

HashSet 存储元素的顺序并不是按照存入时的顺序（和 List 显然不 同） 而是按照哈希值来存的所以取数据也是按照哈希值取得。元素的哈希值是通过元素的 hashcode 方法来获取的

HashSet 首先判断两个元素的哈希值，如果哈希值一样，接着会比较 equals 方法 如果 equls 结果为 true ，HashSet 就视为同一个元素。如果 equals 为 false 就不是 同一个元素。

### TreeSet

**使用场景**

- 用于支持对元素自定义排序规则的场景。

```latex
排序有序，不可重复
底层使用红黑树实现
非线程安全
```

### LinkedHashSet

**使用场景**

- 用于保证元素的插入和取出顺序满足 FIFO 的场景

```latex
排列无序，不可重复
底层使用Hash表+链表实现
非线程安全
内部是LinkedHashMap
```

## Queue

### PriorityQueue

### ArrayQueue

# Map

## HashMap

## HashTable

## TreeMap

# 总结

![java04_collection02](/img/Java_and_Spring/gaitubao_java04_collection02.png)









