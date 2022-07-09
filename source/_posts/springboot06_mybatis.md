---
title: SpringBoot整合Mybatis&配置多数据源
date: 2022-02-03 23:13:05
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---
# 整合MyBatis

**MyBatis是一款优秀的持久层框架，MyBtis支持定制化SQL，存储过程以及高级映射。MyBatis几乎避免了所有的JDBC代码手动设置参数以及获取结果集，在Spring Boot中，MyBatis官方提供了一套自动化配置方案，可以做到MyBatis开箱即用**

## 建库建表

```sql
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
```

## 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
</dependency>

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.23</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
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
package com.biu.mybatis.Mapper;

import com.biu.mybatis.Book;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BookMapper {
    int addBook(Book book);

    int deleteBookById(Integer id);

    int updateBookById(Book book);

    Book getBookById(Integer id);

    List<Map<String, Object>> getALlBooks();
}

```

- 在项目的根包下创建一个子包Mapper，在Mapper中创建BookMapper
- 指明类为Mapper的方式：@Mapper注解，@MapperScan()注解

## 创建BookMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >

<mapper namespace="com.biu.mybatis.Mapper.BookMapper">
    <insert id="addBook" parameterType="com.biu.mybatis.Book">
        insert into book(name, author)
        values (#{name}, #{author})
    </insert>

    <delete id="deleteBookById" parameterType="int">
        delete
        from book
        where id = #{id}
    </delete>

    <update id="updateBookById" parameterType="com.biu.mybatis.Book">
        update book
        set name=#{name},
            author=#{author}
        where id = #{id}
    </update>

    <select id="getBookById" parameterType="int" resultType="com.biu.mybatis.Book">
        select *
        from book
        where id = #{id}
    </select>

    <select id="getALlBooks" resultType="com.biu.mybatis.Book">
        select *
        from book
    </select>
</mapper>
```

## 创建Service

```java
package com.biu.mybatis;

import com.biu.mybatis.Mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BookService {
    @Autowired
    BookMapper bookMapper;

    public int addBook(Book book) {
        return bookMapper.addBook(book);
    }

    public int updateBook(Book book) {
        return bookMapper.updateBookById(book);
    }

    public int deleteBookById(Integer id) {
        return bookMapper.deleteBookById(id);
    }

    public Book getBookById(Integer id) {
        return bookMapper.getBookById(id);
    }

    public  List<Map<String, Object>> getAllBooks() {
        return bookMapper.getALlBooks();
    }
}

```

## 创建Controller

```java
package com.biu.mybatis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

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

        Book b3 = bookService.getBookById(8);
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
updateBook>>>0
getBookById>>>com.biu.mybatis.Book@7cf1a674
deleteBookById>>>0
getAllBooks>>>[com.biu.mybatis.Book@7c5a6cf, com.biu.mybatis.Book@1e5f3318]
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
