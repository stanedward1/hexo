---
title: SpringBoot配置Aop
date: 2022-01-28 19:02:30
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---
在系统运行时动态添加代码的方式称为面向切面编程（AOP）

**AOP(Aspect-Oriented Programming)能解决啥问题？**

1. 记录日志
2. 监控方法运行时间 （监控性能）
3. 权限控制
4. 缓存优化 （第一次调用查询数据库，将查询结果放入内存对象， 第二次调用， 直接从内存对象返回，不需要查询数据库 ）
5. 事务管理 （调用方法前开启事务， 调用方法后提交关闭事务

下面是SpringBoot配置AOP的一个例子

## 引入spring-boot-starter-aop依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
```

## 在service包下创建UserService类

```java
package com.biu.chapter04_aop.service;

import org.springframework.stereotype.Service;

/**
 * @ClassName UserService
 * @Description TODO
 * @Author biu
 * @Date 2022/1/28 3:23 AM
 **/
@Service
public class UserService {
    public String getUserById(Integer id) {
        System.out.println("get……");
        return "user";
    }

    public void deleteUserById(Integer id) {
        System.out.println("delete……");
    }
}

```

## 创建切面

```java
package com.biu.chapter04_aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

/**
 * @ClassName LogAspect
 * @Description 创建切面
 * @Author biu
 * @Date 2022/1/28 3:25 AM
 **/
// 当类不属于各种归类的时候（不属于@Controller、@Services等的时候),可以使用@Component来标注这个类
@Component
// 表明这是一个切面类
@Aspect
public class LogAspect {
    // 切入点定义，这里的切入点为service包下所有类中的所有方法
    @Pointcut("execution(* com.biu.chapter04_aop.service.*.*(..))")
    public void pc1() {
    }

    // 前置通知，此方法在目标方法执行前执行，通过JoinPoint参数获取目标方法的方法名，修饰符等信息
    @Before(value = "pc1()")
    public void before(JoinPoint joinPoint) {
        String name = joinPoint.getSignature().getName();
        System.out.println("方法执行开始，name = " + name);
    }

    // 后置通知，此方法在目标方法执行之后执行
    @After(value = "pc1()")
    public void after(JoinPoint joinPoint) {
        String name = joinPoint.getSignature().getName();
        System.out.println("方法执行结束，name = " + name);
    }

    // 返回通知，在此方法中可以获取目标方法的返回值，returning参数是返回值的变量名，对应方法的参数。在方法参数中定义了result的类型为Object，表示目标方法的返回值可以是任意类型，若result参数的类型为Long，则该方法只能处理目标方法返回值为Long的情况。
    @AfterReturning(value = "pc1()", returning = "result")
    public void afterReturning(JoinPoint joinPoint, Object result) {
        String name = joinPoint.getSignature().getName();
        System.out.println(name + "方法返回值为：" + result);
    }

    // 异常通知，目标方法发生异常时执行此方法，异常类型为Exception表示只要发生了异常就执行此方法，可以修改异常类型来自定义
    @AfterThrowing(value = "pc1()", throwing = "e")
    public void afterThrowing(JoinPoint joinPoint, Exception e) {
        String name = joinPoint.getSignature().getName();
        System.out.println(name + "方法抛异常了，异常是：" + e.getMessage());
    }

    // 环绕通知，可以实现其他通知的功能，目标方法进入环绕通知后，通过调用ProceedingJoinPoint对象的preceed方法使目标方法继续执行，可以在此修改目标方法的执行参数，返回值等，并且可以在此处理目标方法的异常。
    @Around("pc1()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        return pjp.proceed();
    }
}
```

## 调用UserService中的两个方法

```java
package com.biu.chapter04_aop;

import com.biu.chapter04_aop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName UserController
 * @Description TODO
 * @Author biu
 * @Date 2022/1/28 4:17 PM
 **/
@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("getUserById")
    public String getUserById(Integer id) {
        return userService.getUserById(id);
    }

    @GetMapping("deleteUserById")
    public void deleteUserById(Integer id) {
        userService.deleteUserById(id);
    }
}

```

## output

```shell
方法执行开始，name = getUserById
get……
getUserById方法返回值为：user
方法执行结束，name = getUserById
方法执行开始，name = deleteUserById
delete……
deleteUserById方法返回值为：null
方法执行结束，name = deleteUserById
```
