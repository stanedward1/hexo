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



