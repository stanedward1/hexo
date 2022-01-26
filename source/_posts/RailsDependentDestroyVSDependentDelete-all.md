---
title: destroy VS delete_all
date: 2021-06-03 20:55:17
tags: Rails基础
categories: Rails
cover: /img/ruby.png
---

# dependent: :destroy VS dependent: :delete_all

[首先来看看guides.rubyonrails里的解释](https://guides.rubyonrails.org/association_basics.html)

```shell
Additionally, objects will be destroyed if they're associated with dependent: :destroy, and deleted if they're associated with dependent: :delete_all.
```

**`:dependent` 选项控制属主销毁后怎么处理关联的对象：**

- `:destroy`：也销毁关联的对象
- `:delete_all`：直接从数据库中删除关联的对象（不执行回调）
- `:nullify`：把外键设为 `NULL`（不执行回调）
- `:restrict_with_exception`：如果有关联的记录，抛出异常
- `:restrict_with_error`：如果有关联的对象，为属主添加一个错误

**从字面意思上看很简单，就是一个销毁一个删除嘛**

**详细一点的说的话，那就是**`delete` 只会从db中删除当前对象记录，而不会从db中删除其相关的子记录。

`destroy` 将从db中删除当前对象记录，并从db中删除其相关的子记录

