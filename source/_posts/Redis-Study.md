---
title: Redis-Study
date: 2021-06-21 21:04:32
tags: Redis
categories: Redis
cover: /img/redis.png
---

# Redis简介

全称：Remote Dictionary Service

使用场景：缓存，分布式锁，限流

特点：

- 支持数据持久化
- 支持多种不同的数据结构类型之间的映射
- 支持主从模式的数据备份
- 自带了发布订阅系统
- 定时器，计数器

# Redis安装

## 四种方式获取一个redis

1. 直接编译安装
2. 使用Docker
3. 直接安装
4. [在线体验](https://try.redis.io/)

### 直接编译安装

```
yum install gcc-c++
wget http://download.redis.io/releases/redis-5.0.7.tar.gz
tar -zxvf redis-5.0.7.tar.gz
cd redis-5.0.7/
make
make install
redis-server redis.conf
```

### 通过Docker安装

1. 提前准备好Docker

2. ```
   docker run --name javaboy-redis -d -p 6379:6379 redis --requirepass 123
   ```

Docker上的Redis启动成功之后，可以从宿主机上连接，前提是宿主机上存在redis-cli。

如果宿主机上没有安装Redis，那么也可以进入到Docker容器中去操作Redis

```
docker exec -it javaboy-redis redis-cli -a 123
```

### 直接安装

**CentOs:**

```
yum install redis
```

**Ubuntu:**

```
apt-get install redis
```

**MacOs:**

```
brew install redis
```

### 在线体验

https://try.redis.io/

# Redis-基本数据类型

- String
- List
- Hash
- Set
- ZSet

## 在后台启动redis

首先，修改redis.conf配置文件：

