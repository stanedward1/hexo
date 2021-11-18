---
title: Redis6
date: 2021-11-18 22:19:01
tags: Redis
categories: 数据库
---

**学习自[【尚硅谷】Redis 6 入门到精通 超详细 教程](https://www.bilibili.com/video/BV1Rv41177Af)**

参考文档：

http://redisdoc.com/

https://devdocs.io/

# NoSQL数据库简介

## 概述

NoSQL(NoSQL = **Not Only SQL** )，意即“不仅仅是SQL”，泛指**非关系型的数据库**。 

NoSQL 不依赖业务逻辑方式存储，而以简单的key-value模式存储。因此大大的增加了数据库的扩展能力。

- 不遵循SQL标准。

- 不支持ACID。

- 远超于SQL的性能。

## 技术发展

**解决CPU及内存压力**

**解决IO压力**

## NoSQL数据库概述

### **NoSQL适用场景** 

-  对数据高并发的读写

- 海量数据的读写

- 对数据高可扩展性的

###  **NoSQL不适用场景**

- 需要事务支持

- 基于sql的结构化查询存储，处理复杂的关系,需要即席查询。

### 数据库排名
http://db-engines.com/en/ranking

# Redis6概述和安装
https://phoenixnap.com/kb/install-redis-on-ubuntu-20-04

## 应用场景

### **配合关系型数据库做高速缓存**

- 高频次，热门访问的数据，降低数据库IO

- 分布式架构，做session共享

### **多样的数据结构存储持久化数据**

## Redis的相关知识

**Redis是单线程+多路IO复用技术**

多路复用是指使用一个线程来检查多个文件描述符（Socket）的就绪状态，比如调用select和poll函数，传入多个文件描述符，如果有一个文件描述符就绪，则返回，否则阻塞直到超时。得到就绪状态后进行真正的操作可以在同一个线程里执行，也可以启动线程执行（比如使用线程池）

**串行  vs  多线程+锁（memcached） vs  单线程+多路IO复用(Redis)**

# 常用五大数据类型

redis常见数据类型操作命令http://www.redis.cn/commands.html

## 键（key）操作

**keys ***    查看当前库所有key  (匹配：keys *1)

**exists key**    判断某个key是否存在

**type key**    查看你的key是什么类型

**del key**    删除指定的key数据

**unlink key**    根据value选择非阻塞删除

仅将keys从keyspace元数据中删除，真正的删除会在后续异步操作。

**expire key 10**     10秒钟：为给定的key设置过期时间

**ttl key**    查看还有多少秒过期，-1表示永不过期，-2表示已过期

**select**    命令切换数据库

**dbsize**    查看当前数据库的key的数量

**flushdb**    清空当前库

**flushall**    通杀全部库

## Redis字符串(String)

- String是Redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。

  String类型是二进制安全的。意味着Redis的string可以包含任何数据。比如jpg图片或者序列化的对象。

  String类型是Redis最基本的数据类型，一个Redis中字符串value最多可以是512M

- ![image-20211119010229946](https://github.com/stanedward1/MyPicture/blob/master/Hexo/daabase/redis6/image-20211119010229946.png?raw=true)

## Redis列表(List)

## Redis集合(Set)

## Redis哈希(Hash)

## Redis有序集合Zset