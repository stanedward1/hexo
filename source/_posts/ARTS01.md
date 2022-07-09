---
title: ARTS01
date: 2021-11-16 20:16:58
tags: Others
categories: ARTS&Others
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
    Weather.id AS 'Id'
FROM
    Weather
        JOIN
    Weather w ON DATEDIFF(Weather.recordDate , w.recordDate ) = 1
        AND Weather.Temperature > w.Temperature
```
# Review
[Where is Ruby Headed in 2021?](https://bignerdranch.com/blog/where-is-ruby-headed-in-2021/)
```tex
讲了一些开发人员对Ruby这门语言的优化，另外重申了Ruby开发者Matz将Ruby称为一种面向人类的语言。
主要是Ruby3开始的一些优化，包括并发，I/O，Ruby执行速度等的一些优化。
```
相关链接：
https://botreetechnologies.medium.com/5-saas-solutions-built-with-ruby-on-rails-d2d37f184745
# Tip
这周并没有总结啥技术技巧，不过又用回了Jetbrains公司的编辑器，原因是使用Vim和Vscode的时候改变了代码的格式。
# Share
发现了一本蛮不错的书籍，叫做——[冒号课堂----编程范式与OOP思想](https://book.douban.com/subject/4031906/)，讲了一些编程范式，语言很风趣，但也还是难免曲高和寡。
总之，是一本值得一读的，难得的好书。
另外，一直以来都有很多计算机软件开发方面走的比较远的开发者推荐阅读英文文档，浏览英文社区，这本书的作者也不例外，我现在完全赞同这种看法。
