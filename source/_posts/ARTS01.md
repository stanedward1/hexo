---
title: ARTS01
date: 2021-11-13 22:29:11
tags: Others
categories: ARTS&Others
cover: /img/75960.jpg
---
```tex
每周至少做一个leetcode 的算法题、阅读并点评至少一篇英文技术文章、
学习至少一个技术技巧、分享一篇有观点和思考的技术文章
也就是 Algorithm、Review、Tip、Share 简称 ARTS）
```
## Algorithm
### 大礼包
```java
import java.util.*;
/**
 * @Classname T638
 * @Description 20211024每日一题-大礼包
 * @Date 2021/10/24 21:48
 * @Author Longbiu
 */
public class T638 {
    List<Integer> price;
    List<List<Integer>> special;
    Map<String, Integer> cache;

    public int shoppingOffers(List<Integer> price_, List<List<Integer>> special_, List<Integer> needs) {
        price = price_;
        special = special_;
        cache = new HashMap<>();
        return dfs(needs);
    }

    private int dfs(List<Integer> needs) {
        int ans = 0;
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<needs.size();i++){
            ans += price.get(i) * needs.get(i);
            sb.append(needs.get(i) + "#");
        }
        if(ans != 0){
            String key = sb.toString();
            if(cache.containsKey(key)){
                ans = cache.get(key);
            }else{
                for(List<Integer> sp: special){
                    boolean check = true;
                    for(int i=0;i<needs.size();i++)
                        if(sp.get(i) > needs.get(i)){
                            check = false;
                            break;
                        }
                    if(check){
                        List<Integer> next = new ArrayList<>();
                        for(int i=0;i<needs.size();i++){
                            next.add(needs.get(i) - sp.get(i));
                        }
                        ans = Math.min(ans, dfs(next) + sp.get(sp.size()-1));
                    }
                }
                cache.put(key, ans);
            }
        }
        return ans;
    }
}
```
### 键盘行
```java
# T500 键盘行
class Solution {
    public String[] findWords(String[] words) {
        List<String> list = new ArrayList<String>();
        String rowIdx = "12210111011122000010020202";
        for (String word : words) {
            boolean isValid = true;
            char idx = rowIdx.charAt(Character.toLowerCase(word.charAt(0)) - 'a');
            for (int i = 1; i < word.length(); ++i) {
                if (rowIdx.charAt(Character.toLowerCase(word.charAt(i)) - 'a') != idx) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                list.add(word);
            }
        }
        String[] ans = new String[list.size()];
        for (int i = 0; i < list.size(); ++i) {
            ans[i] = list.get(i);
        }
        return ans;
    }
}
```
### 整数除法
```java
# 剑指 Offer II 001. 整数除法
class Solution {
    public int divide(int a, int b) {
        if(a==0x80000000 && b==-1){
           return Integer.MAX_VALUE;
        }
        int negative = 2;
        if (a>0){
            negative--;
            a = -a;
        }
        if(b>0){
            negative--;
            b=-b;
        }

        int result = divideCore(a,b);
        return negative==1? -result : result;
    }

    private int divideCore(int a, int b){
        int result=0;
        while(a<=b){
            int value = b;
            int quotient = 1;
            while(value>=0x80000000 && a<=value+value){
                quotient+=quotient;
                value+=value;
            }

            result +=quotient;
            a-=value;
        }
        return result;
    }
}
```
### 二进制加法
```java
class Solution {
    public String addBinary(String a, String b) {
        StringBuilder result = new StringBuilder();
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;
        while (i>=0 || j>=0){
           int digitA = i >= 0 ? a.charAt(i--) - '0' : 0;
           int digitB = j >= 0 ? b.charAt(j--) - '0' : 0;
           int sum = digitA + digitB + carry;
           carry = sum >= 2 ? 1 : 0;
           sum = sum >= 2? sum - 2 : sum;
           result.append(sum);
        }

        if (carry == 1) {
            result.append(1);
        }
        return result.reverse().toString();
    }
}
```
### 数据库题库练手
```sql
# T175 组合两个表
# Write your MySQL query statement below
select FirstName,LastName,City,State from Person left join  Address on Person.PersonId = Address.PersonId;
```
```sql
# 超过经理收入的员工
# Write your MySQL query statement below
# where
select
    a.Name as Employee
from
    Employee AS a,
    Employee AS b
where
    a.ManagerId = b.id
        and a.Salary > b.Salary;

# Join
select
    a.Name as Employee
from
    Employee AS a
join
    Employee AS b
on
    a.ManagerId = b.id
        and a.Salary > b.Salary;
```
```sql
# 182 查找重复的电子邮箱
# Write your MySQL query statement below

select Email from
(
  select Email, count(Email) as num
  from Person
  group by Email
) as statistic
where num > 1;
```
## Review
### [Teach Yourself Programming in Ten Years](http://norvig.com/21-days.html)
```tex
中文翻译为“十年学会编程”，大意是想要达到专家水平大约要花十年时间。没有真正的捷径。
介绍的东西都比较适合新手，看了之后有点感叹自己怎么没有在刚进入cs专业学习之前看到这篇文章。
```
### [What every programmer should know about memory](https://lwn.net/Articles/250967/)
```tex
这是一个系列文章，共有九节，我看的是第一节，比较简单，大概的介绍了一些内存的一些概念。
我注意到这篇文章是07年9月份发布的，所以文章里只介绍到了DDR3。
```
### [Tutorial: Create your first Spring application﻿](https://www.jetbrains.com/help/idea/your-first-spring-application.html#add-home-page)
```tex
捡了捡Java的东西，记得这一周比较忙，没有什么多余的时间找比较好的文章看，所以看了看Jetbrains的Tutorial。
```
### [5 Programming Languages that will Die](https://medium.com/@lidiaaa08/5-programming-languages-that-will-die-1a4e40371a2e)
```
每个编写代码的人都有自己喜欢的语言。这种情况经常发生，因为我们学习了某种编程语言，或者我们很快掌握了它，
或者它使我们的工作变得更容易。
拥有首选语言有几个原因。然而，我们的语言有时可能会变得单调乏味。它不再由制造它的公司维护，或者人们出于
某种无法解释的原因停止使用它。
其他语言，例如 C，在许多情况下仍然是最流行的编程语言，经受住了时间的考验。
关键 是编程语言似乎有一个生命周期，对于某些人来说，末日似乎已经到来。
						————《5 Programming Languages that will Die》
```
## Tip
### sidekiq及数据库的一点技巧
**显示db中所有进程**
```sql
show processlist;
```
**查询有无慢查询**
```sql
select * from information_schema.processlist where Command != 'Sleep' and
Time > 300 order by Time desc;
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
### 傲慢的程序员
**这周思考了一个技巧——学着成为一个“傲慢”的程序员**
故事发生在一个晚上，业务跟开发反应了一个他眼中的bug，于是菜鸟开发开始检查代码，检查数据，可是没查出问题，
于是，当天晚上，菜鸟开发失眠了，第二天，菜鸟开发继续排查问题，直到中午，测试工程师路过菜鸟开发的工位时，
才发现业务把一个feature当成了一个bug。
这半个月我们开发的项目上线了，这半个月发生了蛮多这样子的事， 有时候，代码逻辑没问题，但是业务觉得场景对不上，
数据对不上等，所以整的菜鸟开发很难受。
辣么，这周的技巧是——**你可以相信通过自测和测试工程师测试的代码**。
### 知行合一
这周没有什么技术技巧，只有周末想了想最近的事情，并手写了一点点随想，主要是觉得自己的有效学习和时间管理方面要加强，
另外对我来说比较新，或者说较少接触的技术知识也要挤时间学。
![image-20211107233150239](/img/ARTS0301.png)
在一个群里看得了这个图片，烂道理谁都懂，但是很多人都是思想上的巨人，行动上的侏儒，谁又能免俗呢，我也一样。
知行合一是一个很nice的方法论，要坚持，要扎实。希望自己继续坚持ARTS。
### vim&tmux
   这周在工作上主要是写一些新需求，以及改bug,都是比较小的改动，或者是代码量比较小的feature，所以选择使用vim完成,
   个人感觉体验不错。
   这里的资源看起来不错，可以偶尔看看：[vim用户指南系列文章](https://linux.cn/article-8143-1.html)
   用过的命令行工具有Konsole,iTerm2,Terminator,它们关于分屏的操作不太一样，这个时候，可以看tmux,这里是资料：[tmux中文资料](https://www.ruanyifeng.com/blog/2019/10/tmux.html)
### [别让自己墙了自己----左耳朵耗子](https://coolshell.cn/articles/20276.html)
### [程序员之路](https://icyfenix.cn/tricks/2021/geekbang.html)
### [一个开发者的Linux机器](https://dev.to/deepu105/my-sleek-and-modern-linux-development-machine-in-2021-2d8f)
### [开源带来的机会](https://linux.cn/article-13974-1.html)
