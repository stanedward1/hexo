---
title: SpringBoot整合Servlet，Filter和Listener
date: 2022-01-27 23:08:54
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---
**Spring Boot中对于整合基本Web组件提供了比较好的支持，以下为整合Servlet，Filter和Listener的例子**

```java
package com.biu.chapter04_integrate;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName MyServlet
 * @Description 定义Servlet组件，使用@WebServlet进行标记
 * @Author biu
 * @Date 2022/1/27 9:49 PM
 **/
@WebServlet("/my")
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("name>>>" + request.getParameter("name"));
    }
}

```

```java
package com.biu.chapter04_integrate;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;


/**
 * @ClassName MyFilter
 * @Description 定义Filter组件，使用@WebFilter进行标记
 * @Author biu
 * @Date 2022/1/27 10:05 PM
 **/
@WebFilter("/*")
public class MyFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) {
        System.out.println("MyFilter>>>init");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        System.out.println("MyFilter>>doFilter");
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        System.out.println("Myfilter>>>destroy");
    }
}

```

```java
package com.biu.chapter04_integrate;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;

/**
 * @ClassName MyListener
 * @Description 定义Listener组件，使用@WebListener进行标记
 * @Author biu
 * @Date 2022/1/27 10:40 PM
 **/
@WebListener
public class MyListener implements ServletRequestListener {
    @Override
    public void requestDestroyed(ServletRequestEvent servletRequestEvent) {
        System.out.println("MyListener>>>requestDestroyed");
    }

    @Override
    public void requestInitialized(ServletRequestEvent servletRequestEvent) {
        System.out.println("MyListener>>>requestInitialized");
    }
}

```

**在项目入口类添加@ServletComponentScan注解，实现对这三个组件的扫描**

```java
package com.biu.chapter04_integrate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

/**
 * @author longbiu
 */
@SpringBootApplication
@ServletComponentScan
public class Chapter04IntegrateApplication {

    public static void main(String[] args) {
        SpringApplication.run(Chapter04IntegrateApplication.class, args);
    }

}

```

**结果如下所示**

```shell
MyFilter>>>init
2022-01-28 01:15:03.301  INFO 21068 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2022-01-28 01:15:03.304  INFO 21068 --- [           main] c.b.c.Chapter04IntegrateApplication      : Started Chapter04IntegrateApplication in 1.533 seconds (JVM running for 3.1)
MyListener>>>requestInitialized
MyFilter>>doFilter
name>>>longbiu
MyListener>>>requestDestroyed
```
