---
title: float-vs-decimal
date: 2021-06-29 23:34:22
tags:
---

# Float

Float对象表示不精确的实数

## float * other → float
```shell
2.7.2 :067 > 2.0 * 3
 => 6.0
```

## float ** other → float
```shell
2.7.2 :068 > 2.0 ** 3
 => 8.0
```

## **float + other → float**

```shell
2.7.2 :069 > 2.0 + 3
 => 5.0
```

## **float - other → float**

```shell
2.7.2 :070 > 2.0 - 1.5
 => 0.5
```

## **-float → float**

```shell
2.7.2 :071 > -2.0
 => -2.0
```

## **float / other → float**

```shell
2.7.2 :072 > 2.0 / 2
 => 1.0
```

2.7.2 :073 > 2.0 < 3
 => true
2.7.2 :074 > 2.0 <= 3
 => true
2.7.2 :075 > 2.0 <=> 3
 => -1
2.7.2 :076 > 2.0 == 2
 => true
2.7.2 :077 > 2.0 > 1
 => true
2.7.2 :078 > 2.0 >= 1
 => true
2.7.2 :079 > (-2.0).abs
 => 2.0
2.7.2 :080 > (-2.0).angle
 => 3.141592653589793

