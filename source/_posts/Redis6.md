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

https://www.redis.net.cn/tutorial/3501.html

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

| 命令           | 作用                                         |
| -------------- | -------------------------------------------- |
| keys *         | 查看当前库的所有键                           |
| exists         | 判断某个键是否存在                           |
| type           | 查看键的类型                                 |
| del            | 删除某个键                                   |
| expire         | 为键值设置过期时间，单位秒                   |
| ttl            | 查看还有多久过期,-1表示永不过期,-2表示已过期 |
| dbsize         | 查看当前数据库中key的数量                    |
| flushdb        | 清空当前库                                   |
| Flushall       | 通杀全部库                                   |
| unlink         | 异步删除key                                  |
| flushdb async  | 异步清空当前库                               |
| flushall async | 异步通杀全部库                               |

## Redis字符串(String)

- String是Redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。

  String类型是二进制安全的。意味着Redis的string可以包含任何数据。比如jpg图片或者序列化的对象。

  String类型是Redis最基本的数据类型，一个Redis中字符串value最多可以是512M

- ![image-20211119010229946](https://github.com/stanedward1/MyPicture/blob/master/Hexo/daabase/redis6/image-20211119010229946.png?raw=true)

**所谓原子操作是指不会被线程调度机制打断的操作；**

**这种操作一旦开始，就一直运行到结束，中间不会有任何 context switch （切换到另一个线程）。**

**（1）在单线程中， 能够在单条指令中完成的操作都可以认为是"原子操作"，因为中断只能发生于指令之间。**

**（2）在多线程中，不能被其它进程（线程）打断的操作就叫原子操作。**

**Redis单命令的原子性主要得益于Redis的单线程。**

### 常用命令

- | 命令             | 作用                                                        |
  | ---------------- | ----------------------------------------------------------- |
  | get              | 查询对应键值                                                |
  | set              | 添加键值对                                                  |
  | mget             | 同时获取一个或多个value                                     |
  | mset             | 同时设置一个或多个key-value对                               |
  | incr             | 将key中存储的数字值增1只能对数字值操作，如果为空，新增值为1 |
  | decr             | 将key中存储的数字值减1只能对数字之操作，如果为空,新增值为-1 |
  | incrby 步长      | 将key中存储的数字值增，自定义步长                           |
  | decrby 步长      | 将key中存储的数字值减，自定义步长                           |
  | strlen           | 获取值的长度                                                |
  | setnx            | 只有在key 不存在时设置key的值                               |
  | setex <过期时间> | 设置键值的同时，设置过去时间，单位秒                        |
  | append           | 追加                                                        |

### 数据结构

**String的数据结构为简单动态字符串(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配.**

**字符串实际分配的空间capacity一般要高于实际字符串长度len。当字符串长度小于1M时，扩容都是加倍现有的空间，如果超过1M，扩容时一次只会多扩1M的空间。需要注意的是字符串最大长度为512M。**

## Redis列表(List)

**单键多值**

Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

**它的底层实际是个双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。**

### 常用命令

| 命令        | 作用                                        |
| ----------- | ------------------------------------------- |
| lpush/rpush | 从左边/右边插入一个或多个值。               |
| lpop/rpop   | 从左边/右边吐出一个值。值在键在，值光键亡。 |
| lrange      | 按照索引下标获得元素(从左到右)              |
| llen        | 获得列表长度                                |
| linsert     | 在<value>的后面插入<newvalue>插入值         |
| lrem        | 从左边删除n个value(从左到右)                |
| lset        | 将列表key下标为index的值替换成value         |

### 数据结构

List的数据结构为快速链表quickList。 首先在列表元素较少的情况下会使用一块连续的内存存储，这个结构是ziplist，也即是压缩列表。 

它将所有的元素紧挨着一起存储，分配的是一块连续的内存。 当数据量比较多的时候才会改成quicklist。 

因为普通的链表需要的附加指针空间太大，会比较浪费空间。比如这个列表里存的只是int类型的数据，结构上还需要两个额外的指针prev和next。 

**Redis将链表和ziplist结合起来组成了quicklist。也就是将多个ziplist使用双向指针串起来使用。这样既满足了快速的插入删除性能，又不会出现太大的空间冗余。**

## Redis集合(Set)

Redis set对外提供的功能与list类似是一个列表的功能，**特殊之处在于set是可以自动排重的**，当你需要存储一个列表数据，又不希望出现重复数据时，set是一个很好的选择，并且set提供了判断某个成员是否在一个set集合内的重要接口，这个也是list所不能提供的。

**Redis的Set是string类型的无序集合。它底层其实是一个value为null的hash表，所以添加，删除，查找的复杂度都是O(1)。**

一个算法，随着数据的增加，执行时间的长短，如果是O(1)，数据增加，查找数据的时间不变.。

### 常用命令

| 命令        | 作用                                                         |
| ----------- | ------------------------------------------------------------ |
| sadd …      | 将一个或多个 member 元素加入到集合 key 当中，已经存在于集合的元素将被忽略 |
| srem …      | 删除元素                                                     |
| smembers    | 取出该集合的所有值。                                         |
| sismember   | 判断集合是否为含有该值，有返回1，没有返回0                   |
| scard       | 返回该集合的元素个数。                                       |
| srem        | 删除集合中的某个元素。                                       |
| srandmember | 随机从该集合中取出n个值。不会从集合中删除                    |
| spop        | 随机从该集合中吐出一个值。删除                               |
| sdiff       | 返回两个集合的差集元素。                                     |
| sunion      | 返回两个集合的并集元素。                                     |
| smove       | value把集合中一个值从一个集合移动到另一个集合                |
| sinter      | 返回两个集合的交集元素。                                     |

### 数据结构

Set数据结构是dict字典，字典是用哈希表实现的。

Java中HashSet的内部实现使用的是HashMap，只不过所有的value都指向同一个对象。Redis的set结构也是一样，它的内部也使用hash结构，所有的value都指向同一个内部值。

## Redis哈希(Hash)

Redis hash 是一个键值对集合。

Redis hash是一个string类型的field和value的映射表，hash特别适合用于存储对象。

**类似Java里面的Map<String,Object>**

### 常用命令

| 命令    | 作用                                                         |
| ------- | ------------------------------------------------------------ |
| hset    | 给集合中的 键赋值                                            |
| hget    | 从集合 取出 value                                            |
| hmset … | 批量设置hash的值                                             |
| hexists | 查看哈希表 key 中，给定域 field 是否存在。                   |
| hmget   | 批量获取hash的值                                             |
| hgetall | 获取所有字段值                                               |
| hlen    | 获取某个key内的全部数量                                      |
| hincrby | 为哈希表 key 中的域 field 的值加上增量 1  -1                 |
| hsetnx  | 将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在 |
| hdel    | 删除一个key                                                  |

### 数据结构

Hash类型对应的数据结构是两种：ziplist（压缩列表），hashtable（哈希表）。当field-value长度较短且个数较少时，使用ziplist，否则使用hashtable。

## Redis有序集合Zset

Redis有序集合zset与普通集合set非常相似，是一个没有重复元素的字符串集合。

不同之处是有序集合的每个成员都关联了一个**评分（**score）,这个评分（score）被用来按照从最低分到最高分的方式排序集合中的成员。集合的成员是唯一的，但是评分可以是重复了 。

因为元素是有序的, 所以你也可以很快的根据评分（score）或者次序（position）来获取一个范围的元素。

访问有序集合的中间元素也是非常快的,因此你能够使用有序集合作为一个没有重复成员的智能列表。

### 常用命令

| 命令                                                         | 作用                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| zadd                                                         | 将一个或多个 member 元素及其 score 值加入到有序集 key 当中   |
| zrange [WITHSCORES]                                          | 返回有序集 key 中，下标在 之间的元素带WITHSCORES，可以让分数一起和值返回到结果集。 |
| zrevrange [WITHSCORES]                                       | 同上，改为从大到小排列。                                     |
| zscore member                                                | 获取元素的分数                                               |
| zrem                                                         | 删除该集合下，指定值的元素                                   |
| zrank                                                        | 返回该值在集合中的排名，从小到大                             |
| zrevrank                                                     | 返回该值在集合中的排名，从大到小                             |
| zrangebyscore key min max [withscores] [limit offset count]  | 返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员。有序集成员按 score 值递增(从小到大)次序排列。 |
| zrevrangebyscore key max min [withscores] [limit offset count] | 同上，改为从大到小排列。                                     |
| zincrby                                                      | 为元素的score加上增量                                        |
| zcard                                                        | 获取集合中元素的数量                                         |
| ZCOUNT key min max                                           | 获得指定分数范围内的元素个数                                 |

### 数据结构

SortedSet(zset)是Redis提供的一个非常特别的数据结构，一方面它等价于Java的数据结构Map<String, Double>，可以给每一个元素value赋予一个权重score，另一方面它又类似于TreeSet，内部的元素会按照权重score进行排序，可以得到每个元素的名次，还可以通过score的范围来获取元素的列表。

zset底层使用了两个数据结构

（1）hash，hash的作用就是关联元素value和权重score，保障元素value的唯一性，可以通过元素value找到相应的score值。

（2）跳跃表，跳跃表的目的在于给元素value排序，根据score的范围获取元素列表。

# Redis6配置文件详解

https://docs.bitnami.com/installer/apps/redash/get-started/understand-default-config/

[配置Redis服务器、设置密码并允许IP访问](https://juejin.cn/post/6844903589270257678)

# Redis的发布和订阅

## 什么是发布和订阅

**Redis 发布订阅 (pub/sub) 是一种消息通信模式：发送者 (pub) 发送消息，订阅者 (sub) 接收消息。**

Redis 客户端可以订阅任意数量的频道。

## 发布订阅命令行实现

```shell
SUBSCRIBE channel1
publish channel1 hello
```

发布的消息没有持久化，如果在订阅的客户端收不到hello，只能收到订阅后发布的消息