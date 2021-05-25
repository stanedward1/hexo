---
title: 三小时mysql
date: 2021-05-02 09:03:32
tags: 视频
categories: mysql
cover: /img/IMG_2317.jpg
---


# [3小时Mysql入门](https://www.bilibili.com/video/BV1iJ411m7Fj)

## sql语句中<>与!=作用一样

## REGEXP--正则

1. REGEXP '[gim]e'----搜索ge ie me

2. REGEXP '[a-h]e'

3. where中，^----beginning    $----end    |----logical or

4. excise

   ```sql
   select *
   from customers
   where first_name REGEXP 'elka|ambur'
   
   select *
   from customers
   where first_name REGEXP 'ey$|on$'
   
   select *
   from customers
   where first_name REGEXP '^my|se'
   
   select *
   from customers
   where first_name REGEXP 'b[ru]'
   # (br|bu)
   ```

## NULL

```sql
select *  
from orders
where shipper_id is null
```

## ORDER BY

```sql
# 按first_name升序排列
select *  
from customers
ORDER BY first_name

# 按first_name降序排列
select *  
from customers
ORDER BY first_name DESC

# 先对state进行排序
select *  
from customers
ORDER BY state first_name

# 使用数字排序会产生不好的结果，应该避免
# 得到按first_name&last_name排序的数据，并新增point字段，且数据全为10
select first_name,last_name,10 AS point
from customers
ORDER BY 1, 2
```

## LIMIT

```sql
# 拿到300条数据，不足则那最大的
select *
from customers
limit 300

# 从第六条数据开始，取3条数据
select *
from customers
limit 6，3

# 积分倒序排列，取前三
select *
from customers
order by points desc
limit 3
```

## JOIN

```sql
# 从orders&customers拿数据
select order_id, orders.customer_id, first_name, last_name
from orders
join customers
	on orders.customer_id = customers.customer_id

equals

select order_id, orders.customer_id, first_name, last_name
from orders
join customers c
	on orders.customer_id = c.customer_id    
	
# 关联的表可以使用join on来进行操作
```

##  LEFT_JOIN&RIGHT_JOIN

```sql
# 左连接和右连接
# 简单理解就是满足左边条件的保存，右边可以为空；反过来也一样
# 两张表的数据都显示了，但是缺少的不显示

SELECT * FROM student s LEFT JOIN class c ON s.class_id = c.id

# 获取所有的产品信息，包括从没订购的产品也会显示
select *
from products p
left join order_items oi
	on p.product_id = oi.product_id
	
select 
	c.customer_id,
	c.first_name,
	o.order_id,
	sh.name AS shipper
from customers c
left join orders o
	on c.customer_id = o.customer_id
left join shippers sh
	on o.shipper_id = sh.shipper_id
 order by c.customer_id
```

## USING

```sql
# o.customer_id = c.customer_id
# 0.shipper_id = sh.shipper_id
select 
	o.order_id
	c.first_name
	sh.name as shipper
from orders o
join customers c
	using (customer_id)
join shippers sh
	using (shipper_id)
```

## NATURAL JOIN

```sql
# 自然关联，数据库去猜你要那些公共列（字段）
select 
	o.order_id
	c.first_name
	sh.name as shipper
from orders o
natural join customers c
```

## CROSS JOIN

```sql
select 
	o.order_id
	p.name
from customers c
cross join products p

equals

select 
	o.order_id
	p.name
from customers c, products p 
```

## UNION

```
# 多张表的连接
```

## INSERT INTO

```sql
insert into customers
values (DEFAULT, 'john', 'smith', NULL)

insert into customers()
values (DEFAULT, 'john', 'smith', NULL)

insert into shippers (name)
values ("asdf"),
		("asdjf")
```

## last_insert_id

```sql
# 字面意思，返回一个最后的id
insert into order_items
values (LAST_INSERT_ID(),1,2,3)
```

## CREATE

```sql
# 新建一个表，数据as same as orders
create table orders_archived as
select * from orders

# 复制一部分数据
insert into orders_archived as
select * from orders
where ……
```

## UPDATE

```sql
update invoices
set payment_total = 10, payment_date = '2021-09-09'
where invoice_id = 1

update invoices
set payment_total = 10, payment_date = '2021-09-09'
where invoice_id = (3,4)

update invoices
set payment_total = 10, payment_date = '2021-09-09'
where invoice_id = (
					select client_id
					from clients
					where state in ('ca','ny')) 
```

## DELETE

```sql
delete from invoices
where client_id=1
```

