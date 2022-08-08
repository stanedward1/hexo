---
title: Java的异常处理
date: 2021-01-28 20:03:31
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---

异常发生的原因有很多，通常包含以下几大类：

- 用户输入了非法数据。
- 要打开的文件不存在。
- 网络通信时连接中断，或者 JVM 内存溢出。

这些异常有的是因为用户错误引起，有的是程序错误引起的，还有其它一些是因为物理错误引起的。

**一般会把异常分为三种类型：**

1. 检查性异常：**由编译器在编译时检查，并提示程序员处理这些异常**。比如尝试打开不存在的文件会导致FileNotFoundException。
2. 运行时异常：不在编译时检查，而是在运行时检查。一些常见的运行时异常包括：APi使用不当，空指针访问，越界数组访问，将数字除以0……。**可以这样说，如果产生了RuntimeException，那就是你的错。**
3. 错误：表示不可恢复的情况，例如Java虚拟机（JVM）内存不足，内存泄漏，堆栈溢出错误，库不兼容，无限递归等。**错误通常是程序员无法控制的，我们不应该尝试处理错误。**

## 捕获异常

使用 try 和 catch 关键字可以捕获异常。try/catch 代码块放在异常可能发生的地方。

try/catch代码块中的代码称为保护代码，使用 try/catch 的语法如下：

```java
try
{
   // 程序代码
}catch(ExceptionName e1)
{
   //Catch 块
}
```

```java
package com.biu.throwable;

public class ExcepTest {
    public static void main(String[] args) {
        try {
            int a[] = new int[2];
            System.out.println("Access element three : " + a[3]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Exception throw : " + e);
        }
    }
}
```

## 创建自定义异常

要自己定义异常类，必须从已有的异常类来继承，最好是选择意思相近的异常继承类。

- 所有异常都必须是 Throwable 的子类。
- 如果希望写一个检查性异常类，则需要继承 Exception 类。
- 如果想写一个运行时异常类，那么需要继承 RuntimeException 类。

## 捕获所有异常

只写一个异常处理程序来捕获所有类型的异常，通过捕获异常类型的基类Exception可以做到这一点

```java
package com.biu.throwable;

public class ExceptionMethods {

    public static void main(String[] args) {
        try {
            throw new Exception("My Exception");
        } catch (Exception e) {
            System.out.println("Caught Exception");
            System.out.println("getMessage():" + e.getMessage());
            System.out.println("getLocalizedMessage():" +
                    e.getLocalizedMessage());
            System.out.println("toString()" + e);
            System.out.println("printStackTrace():");
            e.printStackTrace(System.out);
        }
    }
}

```

## 使用finally进行清理

对于一些代码，可能会希望无论try块中的异常是否抛出，它们都可以执行。为了达到这个效果，可以在异常处理程序后面加上finally子句。

对于没有垃圾回收和析构函数自动调用机制的语言来说，finally非常重要。它能使程序员保证：无论try块里发生了什么，内存总是能释放。但Java有垃圾回收机制，而且，Java也没有析构函数可供调用。

当要把除内存以外的资源恢复到它们的初始状态时，就要用到finally子句。比如已经打开的文件或网络连接。

```java
package com.biu.throwable;

public class FinallyWorks {
    static int count = 0;

    public static void main(String[] args) {
        while (true) {
            try {
                if (count++ == 0)
                    throw new ThreeException();
                System.out.println("No exception");
            } catch (ThreeException e) {
                System.out.println("ThreeException");
            } finally {
                System.out.println("In finally clause");
                if (count == 2) break;
            }
        }
    }
}

class ThreeException extends Exception {
}

```

## 异常的限制

1. 在覆盖方法的时候,只能抛出在基类方法的异常说明里列出的那些异常

2. 在基类构造器声明的异常,在子类必须抛出,子类的构造器可以抛出任何异常,但是必须抛出基类构造器的异常

3. 在基类和接口方法声明的异常,子类覆盖的方法可以不抛出基类和接口方法声明的异常以外的异常,但可以少或不抛出

4. 不能基于异常重载方法

5. 子类没有向上转型为基类和接口时,可以不捕获基类和接口的异常,反之.如有向上转型,必须捕获基类和接口的异常

## 构造器

**在创建需要清理的对象之后，立即进入一个try-finally语句块，并把清理对象的语句放到finally中**



