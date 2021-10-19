---
title: ARTS001
date: 2021-10-19 17:22:12
tags: ARTS
categories: ARTS
cover: /img/75960.jpg
---

```tex
每周至少做一个leetcode 的算法题、阅读并点评至少一篇英文技术文章、学习至少一个技术技巧、分享一篇有观点和思考的技术文章。（也就是 Algorithm、Review、Tip、Share 简称 ARTS）
```

## Algorithm

## Review

[Teach Yourself Programming in Ten Years](http://norvig.com/21-days.html)

## Tip

**显示db中所有进程**

```sql
show processlist;
```

**查询有无慢查询**

```sql
select * from information_schema.processlist where Command != 'Sleep' and Time > 300 order by Time desc;
```

**查询所有表的行数**

```sql
SELECT 
    table_name, 
    table_rows
FROM
    information_schema.tables
WHERE
    table_schema = '******'
ORDER BY table_rows desc;
```

**使用sidekiq做后台作业调度处理，并使用sidekiq-corn允许将作业设置为在指定时间运行**

[sidekiq-corn文档](https://www.rubydoc.info/gems/sidekiq-cron/1.2.0)

## Share

[别让自己墙了自己----左耳朵耗子](https://coolshell.cn/articles/20276.html)



