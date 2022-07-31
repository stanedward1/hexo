---
title: JVM简单调优及一些工具的使用
date: 2022-07-31 13:02:30
tags: Java && Spring
categories: Java && Spring
cover: /img/springboot.jpg
---

我们都知道，Java语言有自动的垃圾回收的一个机制，主要做的是回收分配给对象的内存。  
与此同时，也有一个词，叫做**OOM（out of memory）**,说的就是内存用完了。  
OOM有多种情况，包括**堆内存溢出，方法区（运行时常量池）和元空间溢出，直接内存溢出，栈内存溢出**。  
一般来说会使用默认参数，但是对于一些吞吐量比较大，或者生成了很多大对象的业务场景，假如是使用的一般的服务器，这个时候，仍旧使用默认的参数可能会造成比较频繁的OOM，这种时候，我们可以**修改默认的参数，来实现简单的调优**。

## 问题定位
问题的定位离不开日志，所以我们可以在应用启动时，加上JVM的GC日志参数，以此来准确的定位问题。  
[官方文档关于相关日志参数的说明](https://docs.oracle.com/javase/9/tools/java.htm#JSWOR-GUID-BE93ABDC-999C-4CB5-A88B-1994AAAC74D5)
```shell
java -jar -XX:+PrintGCDetails -Xloggc:gc.log.$(date +%y%m%d%H%M) wiki-0.0.1-SNAPSHOT.jar&
```
发生OOM之后，可以将此日志文件进行分析，一般可以将日志文件上传至某些专门的GC分析的网站，如[GCeasy](https://gceasy.io/gc-index.jsp) ,后续根据分析情况修改对应参数即可。  
![image-GCeasy](/img/Java_and_Spring/jvm01/jvm01.png)
## JVM相关参数

| 参数名称                   | 含义                                                       | 默认值               | 说明                                                         |
| -------------------------- | ---------------------------------------------------------- | -------------------- | ------------------------------------------------------------ |
| -Xms                       | 初始堆大小                                                 | 物理内存的1/64(<1GB) | 默认(MinHeapFreeRatio参数可以调整)空余堆内存小于40%时，JVM就会增大堆直到-Xmx的最大限制. |
| -Xmx                       | 最大堆大小                                                 | 物理内存的1/4(<1GB)  | 默认(MaxHeapFreeRatio参数可以调整)空余堆内存大于70%时，JVM会减少堆直到 -Xms的最小限制 |
| -Xmn                       | 年轻代大小(1.4or later)                                    |                      | 注意：此处的大小是（eden+ 2 survivor space).与jmap -heap中显示的New gen是不同的。整个堆大小=年轻代大小 + 老年代大小 + 持久代（永久代）大小.增大年轻代后,将会减小年老代大小.此值对系统性能影响较大,Sun官方推荐配置为整个堆的3/8 |
| -XX:NewSize                | 设置年轻代大小(for 1.3/1.4)                                |                      |                                                              |
| -XX:MaxNewSize             | 年轻代最大值(for 1.3/1.4)                                  |                      |                                                              |
| -XX:PermSize               | 设置持久代(perm gen)初始值                                 | 物理内存的1/64       |                                                              |
| -XX:MaxPermSize            | 设置持久代最大值                                           | 物理内存的1/4        |                                                              |
| -Xss                       | 每个线程的堆栈大小                                         |                      | JDK5.0以后每个线程堆栈大小为1M,以前每个线程堆栈大小为256K.根据应用的线程所需内存大小进行 调整.在相同物理内存下,减小这个值能生成更多的线程.但是操作系统对一个进程内的线程数还是有限制的,不能无限生成,经验值在3000~5000左右一般小的应用， 如果栈不是很深， 应该是128k够用的 大的应用建议使用256k。这个选项对性能影响比较大，需要严格的测试。（校长）和threadstacksize选项解释很类似,官方文档似乎没有解释,在论坛中有这样一句话:-Xss is translated in a VM flag named ThreadStackSize”一般设置这个值就可以了 |
| -XX:NewRatio               | 年轻代(包括Eden和两个Survivor区)与年老代的比值(除去持久代) |                      | -XX:NewRatio=4表示年轻代与年老代所占比值为1:4,年轻代占整个堆栈的1/5Xms=Xmx并且设置了Xmn的情况下，该参数不需要进行设置。 |
| -XX:SurvivorRatio          | Eden区与Survivor区的大小比值                               |                      | 设置为8,则两个Survivor区与一个Eden区的比值为2:8,一个Survivor区占整个年轻代的1/10 |
| -XX:+DisableExplicitGC     | 关闭System.gc()                                            |                      | 这个参数需要严格的测试                                       |
| -XX:PretenureSizeThreshold | 对象超过多大是直接在旧生代分配                             | 0                    | 单位字节 新生代采用Parallel ScavengeGC时无效另一种直接在旧生代分配的情况是大的数组对象,且数组中无外部引用对象. |
| -XX:ParallelGCThreads      | 并行收集器的线程数                                         |                      | 此值最好配置与处理器数目相等 同样适用于CMS                   |
| -XX:MaxGCPauseMillis       | 每次年轻代垃圾回收的最长时间(最大暂停时间)                 |                      | 如果无法满足此时间,JVM会自动调整年轻代大小,以满足此值.       |

## JDK相关的命令行工具
1. jps：虚拟机进程状况工具
2. jstat：虚拟机统计信息监视工具
3. jinfo：Java配置信息工具
4. jmap：Java内存映像工具
5. jhat：虚拟机堆转储快照分析工具
6. jstack：Java堆栈跟踪工具


