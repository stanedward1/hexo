---
title: SpringBoot的缓存
date: 2022-03-06 20:13:05
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---
Spring3.1中开始对缓存提供支持，核心思路是对方法的缓存，当开发者调用一个方法时，将方法的参数和返回值作为key/value缓存起来，当再次调用该方法时，如果缓存中有数据，就直接从缓存中获取，否则再去执行该方法。
[Caching](https://docs.spring.io/spring-boot/docs/2.1.6.RELEASE/reference/html/boot-features-caching.html)
[Caching Data with Spring](https://spring.io/guides/gs/caching/)
[gs-caching](https://github.com/spring-guides/gs-caching)

1、添加项目依赖  
2、添加缓存配置信息  
3、使用@EnableCaching，在项目入口类开启缓存  