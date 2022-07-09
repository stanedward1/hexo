---
title: Java的包装类
date: 2021-01-28 20:02:30
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---

虽然 Java 语言是典型的面向对象编程语言，但其中的八种基本数据类型并不支持面向对象编程，基本类型的数据不具备“对象”的特性——不携带属性、没有方法可调用。 沿用它们只是为了迎合人类根深蒂固的习惯，并的确能简单、有效地进行常规数据处理。这种借助于非面向对象技术的做法有时也会带来不便。

| type                            | packaging_class |
| ------------------------------- | --------------- |
| byte(1个字节)                   | Byte            |
| short（2个字节）                | Short           |
| int（4个字节）                  | Integer         |
| long（8个字节）                 | Long            |
| float（4个字节）                | Float           |
| double（8个字节）               | Double          |
| char（2个字节）                 | Character       |
| boolean（1/8个字节，1bit，1位） | Boolean         |

**Java为每种基本数据类型都提供了对应的包装器类型，让基本类型具备对象的特征,实现更多的功能。**在Java SE5之前，如果要生成一个数值为10的Integer对象，必须这样进行：

```java
Integer i = new Integer(10);
```


而在从Java SE5开始就提供了自动装箱的特性，如果要生成一个数值为10的Integer对象，只需要这样就可以了：

```java
Integer i = 10;
```

# 基本数据类型和包装类的区别

1. 包装类属于对象，基本数据类型不属于
2. 包装类用new初始化
3. 包装类初始默认值为null，基本数据类型则不同的类型不一样
4. 存储方式和位置不同，从而性能不同

# 拆箱/装箱

- 由基本类型向对应的包装类转换称为装箱，例如把 int 包装成 Integer 类的对象：

```java
Integer i = Integer.valueOf(1); //手动装箱
Integer j = 1; //自动装箱
```

- 包装类向对应的基本类型转换称为拆箱，例如把 Integer 类的对象重新简化为 int。

```java
Integer i0 = new Integer(1);
int i1 = i0; //自动拆箱
int i2 = i0.intValue(); //手动拆箱
```

# 创建包装类对象

```java
package com.biu.leetcode;

/**
 * @ClassName wrapper01
 * @Description Java数据类型包装器
 * @Author biu
 * @Date 2022/3/4 3:58 PM
 **/
public class wrapper_class {
    public static void main(String[] args) {
        // Creates an Integer object from an int
        Integer intObj1 = 100;
        System.out.println(intObj1);

        // Creates an Integer object from a String
        Integer intObj2 = new Integer("1969");
        System.out.println(intObj2);

        // Creates a Double object from a double
        Double doubleObj1 = 10.45;
        System.out.println(doubleObj1);

        // Creates a Double object from a String
        Double doubleObj2 = new Double("234.60");
        System.out.println(doubleObj2);

        // Creates a Character object from a char
        Character charObj1 = 'a';
        System.out.println(charObj1);

        // Creates a Boolean object from a boolean
        Boolean booleanObj1 = true;
        System.out.println(booleanObj1);

        // Creates Boolean objects from Strings
        Boolean booleanTrue = true;
        Boolean booleanFalse = true;
        System.out.println(booleanTrue);
        System.out.println(booleanFalse);

        Integer intObj3 = 100;
        System.out.println(intObj3);

        Integer intObj4 = Integer.valueOf("2014");
        System.out.println(intObj4);

        Double doubleObj3 = 10.45;
        System.out.println(doubleObj3);

        Double doubleObj4 = Double.valueOf("234.56");
        System.out.println(doubleObj4);

        Character charObj2 = 'a';
        System.out.println(charObj2);
    }
}

```

# 包装类的优点

- 在Java中，有时我们可能需要使用对象而不是原始数据类型。例如，在使用集合时。

  ```
  // false
  ArrayList<int> list = new ArrayList<>();
  // true
  ArrayList<Integer> list = new ArrayList<>();
  ```

  在这种情况下，包装器类可以帮助我们将原始数据类型用作对象。

- 我们可以将空值存储在包装对象中。例如，

  ```
  // false
  int a = null;
  // true
  Integer a = null;
  ```

**注意**：基本类型比相应的对象更有效。因此，当需要效率时，总是建议使用原始类型。

