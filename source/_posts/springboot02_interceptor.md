---
title: SpringBoot注册拦截器
date: 2022-01-27 23:08:53
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---
拦截器的作用：用于拦截客户请求并做出相应的处理

**创建拦截器实现HandlerInterceptor接口**

拦截器中的方法将按照preHandle---->Controller---->postHandle---->afterCompletion的顺序执行。

当拦截器链中存在多个拦截器时，postHandler在拦截器连内的所有拦截器返回成功时才会调用，而afterCompletion只有preHandle返回true才调用，但若拦截器链内第一个拦截器的preHandle方法返回false，则后面的方法都不会执行。

```java
package com.biu.chapter04_interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName MyInterceptor1
 * @Description 创建拦截器实现HandlerInterceptor接口
 * @Author biu
 * @Date 2022/1/27 8:57 PM
 **/
public class MyInterceptor1 implements HandlerInterceptor {
    // 返回为true才会往下执行
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        System.out.println("MyInterceptor1>>>preHandle");
        return true;
    }

    // 处理请求完成后，视图渲染之前的处理操作
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
        System.out.println("MyInterceptor1>>>postHandle");
    }

    // 视图渲染之后的处理操作
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        System.out.println("MyInterceptor1>>>afterCompletion");
    }
}
```

**配置拦截器，定义配置类进行拦截器的配置**

```java
package com.biu.chapter04_interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @ClassName WebMvcConfig
 * @Description TODO
 * @Author biu
 * @Date 2022/1/27 9:02 PM
 **/
@Configuration
public class WebAppConfigurer implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration registration = registry.addInterceptor(new MyInterceptor1());
        registration.addPathPatterns("/**");
        registration.excludePathPatterns("/hello");
    }
}
```

**拦截器的使用**

```java
package com.biu.chapter04_interceptor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName HelloController
 * @Description TODO
 * @Author biu
 * @Date 2022/1/27 8:46 PM
 **/
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        System.out.println("这个接口没有被拦截！");
        return "hello biu";
    }

    @GetMapping("/hello2")
    public String hello2() {
        return "hello biu";
    }
}
```
