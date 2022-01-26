---
title: SpringBoot上传文件的一些分析
date: 2022-01-27 00:16:03
tags: SpringeBoot
categories: 框架
---





先上两段相关代码：

```java
package com.biu.chapter04_file_upload;

import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

/**
 * @ClassName FileUploadController
 * @Description 文件上传处理接口
 * @Author biu
 * @Date 2022/1/25 0:11
 **/
@RestController
public class FileUploadController {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");

    public static final Logger LOG = LoggerFactory.getLogger(FileUploadController.class);

    @PostMapping("/uploads")
    public String upload(MultipartFile[] uploadFiles, HttpServletRequest req) {
        LOG.info("---------------------------------------");
        LOG.info(Arrays.toString(uploadFiles));
        String realPath = req.getSession().getServletContext().getRealPath("uploadFile");
        String format = sdf.format(new Date());
        File folder = new File(realPath + format);
        if (!folder.isDirectory()) {
            folder.mkdirs();
        }

        try {
            for (MultipartFile uploadFile : uploadFiles) {
                String oldName = uploadFile.getOriginalFilename();
                String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."), oldName.length());
                uploadFile.transferTo(new File(folder, newName));
                String filePath = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + "/uploadFile" + format + newName;
                // return filePath;
                System.out.println("filePath = " + filePath);
            }
            return "上传成功！";
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "上传失败！";
    }
}

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>uploads</title>
</head>
<body>
<p>MultipartFile upload</p>

<form action="uploads" method="POST" enctype="multipart/form-data">
    File: <input type="file" name="uploadFiles" multiple="multiple"/>
    <input type="submit" value="submit" />
</form>
</body>
</html>
```

这两段代码的功能就是简单的上传文件，下面我将尝试分析一下上面的Java代码：

```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");
```

这个构造参数的传参为描述日期和时间格式的String，作用是使用给定模式和默认语言环境的默认日期格式符号构造一个FORMAT。官方文档有描述：https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html



```java
 public static final Logger LOG = LoggerFactory.getLogger(FileUploadController.class);
```

引入slf4j来打印日志，主要作用是分析代码，使用静态绑定的ILoggerFactory实例，返回与作为参数传递的类对应的记录器。官方文档有描述：[[SLF4J 手册](https://www.slf4j.org/manual.html)](https://www.slf4j.org/codes.html#loggerNameMismatch)



接下来是上传文件的公有方法，传参为HttpServletRequest对象和一个MultipartFile[]对象数组，相关文档:

[MultipartFile](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/multipart/MultipartFile.html)

[HttpServletRequest](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html)



```java
String realPath = req.getSession().getServletContext().getRealPath("uploadFile");
```

这行代码用来获取项目运行目录下的uploadFile文件夹，作用是用来存放上传的文件，其中getSession()方法的作用是返回与此请求关联的HttpSession，然后调用getServletContext()返回web应用程序的ServletContext对象，最后调用getRealPath()方法来返回一个包含真实路径的字符串。

使用logger打印出来的结果如下：

```shell
.FileUploadController               : 在当前应用运行的上下文环境中获取uploadFile文件夹C:\Users\***\AppData\Local\Temp\tomcat-docbase.8080.8757276750274673738\uploadFile
```



```java
String format = sdf.format(new Date());
```

返回一个格式化的String，内容为当前时间，结果为：“2022/01/26/”



```java
File folder = new File(realPath + format);
```

把两个String拼接了一下，结果为：“ C:\Users\***\AppData\Local\Temp\tomcat-docbase.8080.8757276750274673738\uploadFile2022\01\26”。再进行下一步的判断逻辑，并根据结果来判读是否新建文件夹。



在try……catch里面循环文件数组对象，并进行相应的逻辑处理：

```java
String oldName = uploadFile.getOriginalFilename();
                String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."), oldName.length());
```

这两行代码用来给文件重命名，比较简单。



```java
uploadFile.transferTo(new File(folder, newName));
```

用来对文件进行上传操作，将接收到的文件传输到给定的目标文件，上传完成之后，将字符串简单拼接一下就得到我们上传文件的url地址了！transferTo的文档在这：https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/multipart/MultipartFile.html
