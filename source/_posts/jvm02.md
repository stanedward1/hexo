---
title: 对象的创建过程
date: 2022-08-06 22:02:30
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---

Java对象的创建过程是**八股**里面比较常见的一个内容。
为了知其然，更知其所以然，在此尝试进行整理归纳！

```plantuml
@startmindmap
* Java对象的创建
	* 1、类加载检查
	* 2、分配内存
	* 3、初始化零值
	* 4、设置对象头
	* 5、执行init方法
@endmindmap
```
