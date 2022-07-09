---
title: SpringBoot整合JdbcTemplate&配置多数据源
date: 2022-01-31 23:13:05
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---
# 整合JdbcTemplate

**JdbcTemplate是Spring提供的一套JDBC模版框架，没有MyBatis那么灵活，但是比直接用JDBC要方便一些。**

## 建库建表

```sql
CREATE DATABASE chapter05 DEFAULT CHARACTER
SET utf8;

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(20) DEFAULT NULL,
	`author` varchar(20) DEFAULT NULL,
	PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `book` (`id`, `name`, `author`)
		VALUES(1, '三国演义', '罗贯中'), (2, '西游记', '吴承恩');
```

## 添加依赖

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <scope>runtime</scope>
  <version>8.0.25</version>
</dependency>

<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>druid</artifactId>
  <version>1.1.23</version>
</dependency>
```

## 数据库配置

```xml
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/chapter05?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=mypassword
```

## 创建实体类

```java
package com.biu.jdbc_template;

import java.util.Date;

/**
 * @ClassName Book
 * @Description 创建实体类
 * @Author biu
 * @Date 2022/1/28 6:50 PM
 **/
public class Book {
    private Integer id;
    private String name;
    private String author;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}

```

## 创建数据库访问层

```java
package com.biu.jdbc_template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * @ClassName BookDao
 * @Description 创建数据库访问层
 * @Author biu
 * @Date 2022/1/29 11:11 AM
 **/
@Repository
public class BookDao {
    @Resource
    private JdbcTemplate jdbcTemplate;

    public int addBook(Book book) {
        return jdbcTemplate.update("insert into book(name,author) values (?,?)", book.getName(), book.getAuthor());
    }

    public int updateBook(Book book) {
        return jdbcTemplate.update("update book set name=?,author=? where id=?", book.getName(), book.getAuthor(), book.getId());
    }

    public int deleteBookById(Integer id) {
        return jdbcTemplate.update("delete from book where id=?", id);
    }

    public Map<String, Object> getBookById(@PathVariable Integer id) {
        String sql = "select * from book where id = ?";
        Map<String, Object> map = jdbcTemplate.queryForMap(sql, id);
        System.out.println(map);
        return map;
    }

    public List<Map<String, Object>> getAllBooks() {
        String sql = "select * from book";
        List<Map<String, Object>> books = jdbcTemplate.queryForList(sql);
        return books;
    }
}

```

- JdbcTemplate中，增删改三种类型的操作主要使用update和batchUpdate方法来实现，query和queryForObject方法主要用来完成查询功能。
- execute方法可以用来执行任意的sql，call方法用来调用存储过程。
- 在执行查询操作时，需要有一个RowMapper将查询出来的列和实体类中的属性一一对应起来。如果列名和属性名都是相同的，那么可以直接使用BeanPropertyRowMapper。

## 创建Service

```java
package com.biu.jdbc_template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName BookService
 * @Description Service层
 * @Author biu
 * @Date 2022/1/29 11:46 AM
 **/
@Service
public class BookService {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    BookDao bookDao;

    public int addBook(Book book) {
        return bookDao.addBook(book);
    }

    public int updateBook(Book book) {
        return bookDao.updateBook(book);
    }

    public int deleteBookById(Integer id) {
        return bookDao.deleteBookById(id);
    }

    public Map<String, Object> getBookById(Integer id) {
        return bookDao.getBookById(id);
    }

    public List<Map<String, Object>> getAllBooks() {
        return bookDao.getAllBooks();
    }
}

```

## 创建Controller

```java
package com.biu.jdbc_template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @ClassName BookController
 * @Description TODO
 * @Author biu
 * @Date 2022/1/29 12:03 PM
 **/
@RestController
public class BookController {
    @Autowired
    BookService bookService;

    @GetMapping("bookOps")
    public void bookOps() {
        Book b1 = new Book();
        b1.setName("某本Java开发书籍");
        b1.setAuthor("某个Java开发大佬");
        int i = bookService.addBook(b1);
        System.out.println("addBook>>>" + i);

        Book b2 = new Book();
        b2.setId(1);
        b2.setName("某本小说");
        b2.setAuthor("某个小说家");
        int updateBook = bookService.updateBook(b2);
        System.out.println("updateBook>>>" + updateBook);

        Map<String, Object> b3 = bookService.getBookById(1);
        System.out.println("getBookById>>>" + b3);
        int delete = bookService.deleteBookById(2);
        System.out.println("deleteBookById>>>" + delete);
        List<Map<String, Object>> allBooks = bookService.getAllBooks();
        System.out.println("getAllBooks>>>" + allBooks);
    }
}

```

## output

```shell
addBook>>>1
updateBook>>>1
{id=1, name=某本小说, author=某个小说家}
getBookById>>>{id=1, name=某本小说, author=某个小说家}
deleteBookById>>>1
getAllBooks>>>[{id=1, name=某本小说, author=某个小说家}, {id=6, name=某本Java开发书籍, author=某个Java开发大佬}]
```

# 多数据源

## 建库建表

```sql
CREATE DATABASE chapter05_1 DEFAULT CHARACTER
SET utf8;

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(20) DEFAULT NULL,
	`author` varchar(20) DEFAULT NULL,
	PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `book` (`id`, `name`, `author`)
		VALUES(1, '三国演义', '罗贯中');
	
	
CREATE DATABASE chapter05_2 DEFAULT CHARACTER
SET utf8;

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(20) DEFAULT NULL,
	`author` varchar(20) DEFAULT NULL,
	PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `book` (`id`, `name`, `author`)
		VALUES(1, '西游记', '吴承恩');
```

## 添加依赖

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
	<groupId>com.alibaba</groupId>
	<artifactId>druid-spring-boot-starter</artifactId>
	<version>1.1.23</version>
</dependency>

<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<scope>runtime</scope>
</dependency>
```

## 数据库配置

```
spring.datasource.one.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.one.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.one.url=jdbc:mysql://127.0.0.1:3306/chapter05-1?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=UTF-8
spring.datasource.one.username=root
spring.datasource.one.password=mypassword

spring.datasource.two.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.two.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.two.url=jdbc:mysql://127.0.0.1:3306/chapter05-2?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=UTF-8
spring.datasource.two.username=root
spring.datasource.two.password=mypassword
```

## 配置数据源

```java
package com.biu.jdbc_template_datasource;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

/**
 * @ClassName DataSourceConfig
 * @Description ConfigurationPropertiess注解表示使用不同的前缀的配置文件来创建不同的DataSource实例
 * @Author biu
 * @Date 2022/1/31 11:56 PM
 **/
@Configuration
public class DataSourceConfig {
    @Bean
    @ConfigurationProperties("spring.datasource.one")
    DataSource dsOne() {
        return DruidDataSourceBuilder.create().build();
    }

    @Bean
    @ConfigurationProperties("spring.datasource.two")
    DataSource dsTwo() {
        return DruidDataSourceBuilder.create().build();
    }
}

```

## 配置JdbcTemplate

```java
package com.biu.jdbc_template_datasource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

/**
 * @ClassName JdbcTemplateConfig
 * @Description 配置多数据源时，开发者需要自己提供JdbcTemplate实例
 * @Author biu
 * @Date 2022/2/1 12:09 AM
 **/
@Configuration
public class JdbcTemplateConfig {
    @Bean
    JdbcTemplate jdbcTemplateOne(@Qualifier("dsOne") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean
    JdbcTemplate jdbcTemplateTwo(@Qualifier("dsTwo") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}

```

## 创建BookController

```java
package com.biu.jdbc_template_datasource;

import com.fasterxml.jackson.databind.BeanProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @ClassName BookController
 * @Description TODO
 * @Author biu
 * @Date 2022/2/1 10:10 AM
 **/
@RestController
public class BookController {
    @Resource(name = "jdbcTemplateOne")
    JdbcTemplate jdbcTemplateOne;
    @Autowired
    @Qualifier("jdbcTemplateTwo")
    JdbcTemplate jdbcTemplateTwo;

    @GetMapping("/test1")
    public void test1() {
        String sql = "select * from book";
        List<Map<String, Object>> books1 = jdbcTemplateOne.queryForList(sql);
        List<Map<String, Object>> books2 = jdbcTemplateTwo.queryForList(sql);
        System.out.println("books1:" + books1);
        System.out.println("books2:" + books2);
    }
}

```

## output

```shell
books1:[{id=1, name=三国演义, author=罗贯中}]
books2:[{id=1, name=西游记, author=吴承恩}]
```
