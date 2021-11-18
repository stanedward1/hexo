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

# 常用五大数据类型

redis常见数据类型操作命令http://www.redis.cn/commands.html

## 键（key）操作

## Redis字符串(String)

## Redis列表(List)

## Redis集合(Set)

## Redis哈希(Hash)

## Redis有序集合Zset