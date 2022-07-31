---
title: JVM简单调优及一些工具的使用
date: 2022-07-31 13:02:30
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---

我们都知道，Java语言有自动的垃圾回收的一个机制，主要做的是回收分配给对象的内存。  
与此同时，也有一个词，叫做**OOM（out of memory）**,说的就是内存用完了。  
OOM有多种情况，包括**堆内存溢出，方法区（运行时常量池）和元空间溢出，直接内存溢出，栈内存溢出**。  
一般来说会使用默认参数，但是对于一些吞吐量比较大，或者生成了很多大对象的业务场景，假如是使用的一般的服务器，这个时候，仍旧使用默认的参数可能会造成比较频繁的OOM，这种时候，我们可以**修改默认的参数，来实现简单的调优**。

## 问题定位
问题的定位离不开日志，所以我们可以在应用启动时，加上JVM的GC日志参数，以此来准确的定位问题。  
[官方文档关于相关日志参数的说明](https://docs.oracle.com/javase/9/tools/java.htm#JSWOR-GUID-BE93ABDC-999C-4CB5-A88B-1994AAAC74D5)
```shell
java -jar -XX:+PrintGCDetails -Xloggc:gc.log.$(date +%y%m%d%H%M) wiki-0.0.1-SNAPSHOT.jar&
```
发生OOM之后，可以将此日志文件进行分析，一般可以将日志文件上传至某些专门的GC分析的网站，如[GCeasy](https://gceasy.io/gc-index.jsp)  
![image-GCeasy](/img/Java_and_Spring/jvm01/jvm01.png)
## JVM相关参数
## JDK相关的命令行工具

