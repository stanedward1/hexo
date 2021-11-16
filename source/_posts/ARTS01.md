---
title: ARTS01
date: 2021-11-16 20:16:58
tags: ARTS
categories: ARTS及其他
cover: /img/75960.jpg
---

---

```tex
每周至少做一个leetcode 的算法题、阅读并点评至少一篇英文技术文章、学习至少一个技术技巧、分享一篇有观点和思考的技术文章。（也就是 Algorithm、Review、Tip、Share 简称 ARTS）
```

# Algorithm

## 数据库题库练手

```sql
# 196. 删除重复的电子邮箱
# Write your MySQL query statement below
delete p1.* from Person p1,Person p2 where p1.Email=p2.Email and p1.Id > p2.Id;
```

```sql
# 197. 上升的温度
# Write your MySQL query statement below
SELECT
    weather.id AS 'Id'
FROM
    weather
        JOIN
    weather w ON DATEDIFF(weather.date, w.date) = 1
        AND weather.Temperature > w.Temperature
;
```

# Review

# Tip

# Share

