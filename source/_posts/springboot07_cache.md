---
title: SpringBoot的缓存
date: 2022-03-06 20:13:05
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---
Spring3.1中开始对缓存提供支持，核心思路是对方法的缓存，当开发者调用一个方法时，将方法的参数和返回值作为key/value缓存起来，当再次调用该方法时，如果缓存中有数据，就直接从缓存中获取，否则再去执行该方法。

# Redis单机缓存

# Redis集群缓存

