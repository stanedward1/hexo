---
title: 设计模式----单例设计模式
date: 2022-02-10 01:05:05
tags: 设计模式
categories: 系统设计
cover: /img/DesignPatterns/设计模式.jpg
---
# 模式定义

**保证一个类只有一个实例，并且提供一个全局访问点**，也就是如何实例化一个**唯一的对象**

# 应用场景

重量级的对象，不需要多个实例，如线程池，数据库连接池

# 代码演示

## 延迟加载

```java
package com.biu.designpattern.singleton.lazysingleton;

public class LazySingletonTest {
    public static void main(String[] args) {
        LazySingleton uniqueInstance = LazySingleton.getInstance();
        LazySingleton uniqueInstance1 = LazySingleton.getInstance();
        System.out.println(uniqueInstance == uniqueInstance1);
    }
}

class LazySingleton {
    // 利用一个静态变量来记录Singleton类的唯一实例
    private static LazySingleton uniqueInstance;

    // 把构造器声明为私有的，只有从LazySingleton类内才可以调用构造器
    private LazySingleton() {
    }

    // 用getInstance()方法实例化对象，并返回这个实例
    public static LazySingleton getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new LazySingleton();
        }
        return uniqueInstance;
    }
}
```

延迟加载方式在多线程下有问题，获取到的不是同一个对象

加入多线程进行测试：

```java
 new Thread(() -> {
    LazySingleton uniqueInstance = LazySingleton.getInstance();
    System.out.println(uniqueInstance);
}).start();

new Thread(() -> {
    LazySingleton uniqueInstance = LazySingleton.getInstance();
    System.out.println(uniqueInstance);
}).start();
```

### output

```shell
com.biu.designpattern.singleton.lazysingleton.LazySingleton@616831d4
com.biu.designpattern.singleton.lazysingleton.LazySingleton@1e057600
```

## 处理多线程

```java
class LazySingleton {
    private static LazySingleton uniqueInstance;

    private LazySingleton() {
    }

    // 通过增加synchronized关键字到getInstance()方法中，我们可以让每个线程在进入此方法之前，要先等候其他的线程离开这个方法，也就是没有两个线程能同时进入这个方法
    public static synchronized LazySingleton getInstance() {
        if (uniqueInstance == null) {
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            uniqueInstance = new LazySingleton();
        }
        return uniqueInstance;
    }
}
```

### output

```shell
com.biu.designpattern.singleton.lazysingleton.LazySingleton@1e057600
com.biu.designpattern.singleton.lazysingleton.LazySingleton@1e057600
```

## 立即创建实例（改善多线程）

```java
// 利用这个做法，JVM在加载这个类的时候会马上创建唯一的单件实例，并保证了在任何线程访问uniqueInstance静态变量之前，一定先创建这个实例
private static LazySingleton uniqueInstance = new LazySingleton();
```

### output

```shell
com.biu.designpattern.singleton.lazysingleton.LazySingleton@4388eabf
com.biu.designpattern.singleton.lazysingleton.LazySingleton@4388eabf
```

## 用“双重检查加锁”，在getInstance()中减少使用同步

```java
class LazySingleton {
    // volatile关键词确保了当uniqueInstance变量被初始化成为Singleton实例时，多个线程正确的处理uniqueInstance变量
    private volatile static LazySingleton uniqueInstance;

    private LazySingleton() {
    }

    public static LazySingleton getInstance() {
        if (uniqueInstance == null) {
            synchronized (LazySingleton.class) {
                if (uniqueInstance == null) {
                    uniqueInstance = new LazySingleton();
                }
            }
        }
        return uniqueInstance;
    }
}
```

### output

```shell
com.biu.designpattern.singleton.lazysingleton.LazySingleton@1e057600
com.biu.designpattern.singleton.lazysingleton.LazySingleton@1e057600
```

# 字节码

![DesignPatterns02Singleton01](/img/Java_and_Spring/DesignPatterns02Singleton01.png)

```class
public class com.biu.designpattern.lazysingleton.Demo
  minor version: 0
  major version: 52
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #2                          // com/biu/designpattern/lazysingleton/Demo
  super_class: #4                         // java/lang/Object
  interfaces: 0, fields: 0, methods: 2, attributes: 1
Constant pool:
   #1 = Methodref          #4.#19         // java/lang/Object."<init>":()V
   #2 = Class              #20            // com/biu/designpattern/lazysingleton/Demo
   #3 = Methodref          #2.#19         // com/biu/designpattern/lazysingleton/Demo."<init>":()V
   #4 = Class              #21            // java/lang/Object
   #5 = Utf8               <init>
   #6 = Utf8               ()V
   #7 = Utf8               Code
   #8 = Utf8               LineNumberTable
   #9 = Utf8               LocalVariableTable
  #10 = Utf8               this
  #11 = Utf8               Lcom/biu/designpattern/lazysingleton/Demo;
  #12 = Utf8               main
  #13 = Utf8               ([Ljava/lang/String;)V
  #14 = Utf8               args
  #15 = Utf8               [Ljava/lang/String;
  #16 = Utf8               demo
  #17 = Utf8               SourceFile
  #18 = Utf8               Demo.java
  #19 = NameAndType        #5:#6          // "<init>":()V
  #20 = Utf8               com/biu/designpattern/lazysingleton/Demo
  #21 = Utf8               java/lang/Object
{
  public com.biu.designpattern.lazysingleton.Demo();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 9: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/biu/designpattern/lazysingleton/Demo;

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=2, args_size=1
         0: new           #2                  // class com/biu/designpattern/lazysingleton/Demo
         3: dup
         4: invokespecial #3                  // Method "<init>":()V
         7: astore_1
         8: return
      LineNumberTable:
        line 11: 0
        line 12: 8
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  args   [Ljava/lang/String;
            8       1     1  demo   Lcom/biu/designpattern/lazysingleton/Demo;
}
SourceFile: "Demo.java"
```

# 字节码指令重排序

# 类加载机制

# JVM序列化机制

有些JVM的实现是：在用到的时候才创建对象

# 单例模式在源码中的应用
