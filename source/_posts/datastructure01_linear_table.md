---
title: 1.数据结构——线性表
date: 2021-05-23 01:11:27
tags: 数据结构与算法
categories: 计算机基础
cover: /img/data-structure.png
---

![image-20210523212647422](/img/1-DataStructureLinearTable/image-20210523212647422.png)

**线性表：零个或多个数据元素的有限序列**

同时也是最常用也最简单的一种结构

# 线性表的定义

1. List---->零个或多个数据元素的**有限序列**
2. 线性表元素的个数n(n>=0)定义为线性表的长度，当n=0时，称之为空表
3. 在较为复杂的线性表中，一个数据元素可以由**若干个数据项**组成---->比如大学上课时的花名册，至少有个姓名和学号，姓名和学号就是数据项
4. **线性表里的数据元素得是相同类型的数据**

# 线性表的抽象数据类型

**抽象数据类型：Abstract Data Type（ADT）**

```text
ADT List

Operation
	InitList(*L)----初始化操作，建立一个空的线性表L
	ListEmpty(L)----若线性表为空，返回true，否则返回false
	ClearList(*L)----将线性表清空
	GetElem(L,i,*e)----将线性表L中的第i个位置元素值返回给e
	LocateElem(L,e)----在线性表L中查找与e值相等的元素，success---->返回该元素在表中的序号，failed---->返回0
	ListInsert(*L,i,e)----在线性表L中的第i个位置插入新元素e
	ListDelete(*L,i,*e)----删除线性表L中的第i个位置元素，并用e返回该值
	ListLength(L)----返回线性表L的元素个数
```

# 线性表的顺序存储结构

**线性表的顺序存储结构，指的是用一段地址连续的存储单元存储线性表的数据元素。**

我么通常可以用一维数组来实现顺序存储结构

## 顺序存储方式

1. **存储空间的起始位置：数组data，它的存储位置就是存储空间的存储位置**
2. **线性表的最大存储容量：数组长度MaxSize**
3. **线性表的当前长度：length**

## 数据长度与线性表长度区别

**数据长度即数组长度——存放线性表的存储空间的长度**

**线性表的长度：线性表中数据元素的个数**

在任意时刻，线性表的长度应该小于等于数组的长度。

存储器中的每个存储单元都有自己的编号，这个编号称为地址。

**线性表的第i个元素存储在下标为i-1的位置**

# 顺序存储结构的插入与删除

## 获得元素操作

```c
typedef int Status;
Status GetElem(SqList L,int i,ElemType *e)
{
	if(L.length==0 || i<1 || i>L.length)
		return ERROR;
  *e=L.data[i-1]
  return OK;
}
```

## 插入操作

**插入算法的思路：**

1. 如果插入位置不合理，抛出异常；
2. 如果线性表长度大于等于数组长度，则抛出异常或动态增加容量；
3. 从最后一个元素开始向前遍历到第i个位置，分别将它们都向后移动一个位置；
4. 将要插入元素填入位置i处；表长加1

```c
Status ListInsert(SqList *L,int i,ElemType e)
{
	int k;
  // 顺序线性表已满
	if (L->length==MAXSIZE)
		return ERROR;
  // 当i不在范围内
  if (i<1 || i>L->length+1)
  	return ERROR;
  // 若插入的数据位置不在表尾
  if (i<=L->length)
  {
    // 将要插入的位置后数据元素向后移动一位
  	for(k=L->length-1;k>=i-1;k--){
  		L->data[k+1]=L->data[k];
  	}
  }
  // 将新元素插入
  L->data[i-1]=e;
  L->length++;
  return OK;
}
```

## 删除操作

**删除算法的思路：**

1. 如果删除位置不合理，抛出异常；
2. 取出删除元素；
3. 从删除元素位置开始遍历到最后一个元素位置，分别将它们都向前移动一个位置；
4. 表长减1

```c
Status ListDelete(Sqlist *L,int i,ElemType *e)
{
  int k;
  // 线性表为空
  if (L->length==0)
    return ERROR;
  // 删除位置不正确
  if (i<1 || i>L->length)
    return ERROR;
  *e=L->data[i-1];
  // 如果删除不是最后位置
  if(i<L->length)
  {
    // 将删除位置后继元素前移
    for(k=i;k<L->length;k++)
      L->data[k-1]=L->data[k];
  }
  L->length--;
  return OK;
}
```

## 线性表顺序存储结构的优缺点

存，读数据时，不管哪个位置，时间复杂度都是O(1)；

而插入或删除时，时间复杂度都是O(n)

这说明：**线性表的存储结构比较适合元素个数不太变化，而更多时存取数据的应用。**

# 线性表的链式存储结构

<u>所有元素都不考虑相邻位置，哪有空位就到哪里，只需要让元素知道它下一个元素的位置在哪里就可以了，这样，所有的元素我们都可以通过遍历而找到。</u>

为了表示每个数据元素a[i]与其直接后继数据元素a[i+1]之间的逻辑关系，对数据元素a[i]来说，除了存储其本身的信息之外，还需存储一个指示其直接后继的信息（即直接后继的存储位置)，我们把**存储数据元素信息的域称为数据域**，把**存储直接后继位置的域称为指针域**。**指针域中存储的信息称做指针或链。这两部分信息组成数据元素ai的存储映像，称为结点（Node）**

![img](/img/1-DataStructureLinearTable/webp)

![image-20210525120449386](/img/1-DataStructureLinearTable/image-20210525120449386-1915492.png)

# 单链表的读取

**获得链表第i个数据的算法思路：**

1. 声明一个结点p指向链表第一个结点，初始化j从1开始
2. 当j<i时，就遍历链表，让p的指针向后移动，不断指向下一结点，i累加1
3. 若到链表末尾p为空，则说明第i个元素不存在
4. 否则查找成功，返回结点p的数据

```c
Status GetElem(Linklist L,int i,ElemType *e)
{
  int j;
  // 声明结点p
  LinkList p;
  // 让p指向链表L的第一个结点
  p = L->next;
  // j为计数器
  j=1;
  // p不为空或者计数器j还没有等于i时，循环继续
  while (p&&j<1){
    // p指向下一个结点
    p=p->next;
    ++j;
  }
  if(!p || j>i)
    // 第i个元素不存在
    return ERROR;
  // 取第i个元素的数据
  *e = p->data;
  return OK;
}
```

**核心思想是：工作指针后移**

# 单链表的插入与删除

![image-20210525235117148](/img/1-DataStructureLinearTable/image-20210525235117148.png)

```text
s->next=p->next;p->next=s;
```

单链表第i个数据插入结点的算法思路:

1. 声明一结点p指向链表第-一个结点， 初始化j从1开始;
2. 当j<i时，就遍历链表，让p的指针向后移动，不断指向下一-结点，j累加1;
3. 若到链表末尾p为空，则说明第i个元素不存在;
4. 否则查找成功，在系统中生成一一个空结点s;
5. 将数据元素e赋值给s->daa;
6. 单链表的插入标准语句s->next=p->next;p->next=s;
7. 返回成功。

```c
Status ListInsert(LinkList *L,int i,ElemType e)
{
    int j;
    LinkList p,s;
    p = *L;
    j=1;
    // 寻找第i个结点
    while(p && j<i)
    {
        p = p->next;
        ++j;
    }
    // 第i个元素不存在
    if(!p || j>i)
        return ERROR;
    // 生成新结点
    s = (LinkList)malloc(sizeof(Node));
    s->data = e;
    // 将p的后继结点赋值给s的后继
    s->next = p->next;
   	 // 将s赋值给p的后继
    p->next = s;
    return OK;
}
```

# 单链表的删除

单链表第i个数据删除结点的算法思路:

1. 声明一结点p指向链表第一个结点，初始化j从1开始
2. 当j<i时，就遍历链表，让p的指针向后移动，不断指向下一个结点，j累加1；
3. 若到链表末尾p为空，则说明第i个元素不存在;
4. 否则查找成功，将欲删除的结点p->next赋值给q；
5. 单链表的删除标准语句p->next=q->next;
6. 将q结点中的数据赋值给e,作为返回;
7. 释放q结点;
8. 返回成功。

```c
Status ListDelete（LinkList *L,int i, ElemType *e）
{
	 int j;
    LinkList p,q;
    p = *L;
    j = 1;
    // 遍历寻找第i个元素
    while (p->next && j<i)
    {
        p=p->next;
        ++j;
    }
    if(!(p->next) || j>i)
        // 第i个元素不存在
        return ERROR;
    q = p->next;
    // 将q的后继赋值给p的后继
    p->next = q->next;
    // 将q结点的数据给e
    *e = q->data;
    // 让系统回收此结点，释放内存
    free(q);
    return OK;
}
```

**对插入或删除数据越频繁的操作，单链表的效率优势就越明显**

# 单链表的整表创建

​	回顾一下，顺序存储结构的创建，其实就是一个 数组的初始化，即声明一个类型
和大小的数组并赋值的过程。而单链表和顺序存储结构就不一-样，它不像顺序存储结
构这么集中，它可以很散，是一种动态结构。对于每个链表来说，它所占用空间的大
小和位置是不需要预先分配划定的，可以根据系统的情况和实际的需求即时生成。

​	所以创建单链表的过程就是一个动态生成链表的过程。即从“ 空表”的初始状态
起，依次建立各元素结点，并逐个插入链表。

单链表整表创建的算法思路:

1. 声明一结点p和计数器变量i;
2. 初始化——空链表L;
3. 让L的头结点的指针指向NULL,即建立一个带头结点的单链表;
4. 循环:
   - 生成一新结点赋值给 p;
   - 随机生成一数字赋值给 p的数据域 p->data;
   - 将p插入到头结点与前一新结点之间。

```c
// 头插法
void CreateListHead(LinkList *L, int n)
{
	LinkList p;
	int i;// 初始化随机数种子
	srand(time(0));
	*L = (LinkList)malloc(sizeof(Node));
	// 先建立一个带头结点的单链表
    (*L)->next = NULL;
	for(i=0;i<n;i++){
      // 生成新节点
		p=(LinkList)malloc(sizeof(Node));
      // 随机数生成100以内的数字
		p->data = rand()%100+1;
		p->next = (*L)->next;
      // 插入到表头
		(*L)->next = p;
	}
}
```

```c
// 尾插法
void CreateListTail(LinkList *L,int n)
{
    LinkList p,r;
    int i;
    // 初始化随机数种子
    srand(time(0));
    // 整个线性表
    *L = (LinkList)malloc(sizeof(Node));
    // r为指向
    r=*L;
    for (i=0; i<n; i++)
    {
        p = (Node *)malloc(sizeof(Node));
        p->data = rand()%100+1;
        r->next=p;
        r = p;
    }
    r->next = NULL;
}
```

# 单链表的整表删除

​	当我们不打算使用这个单链表时，我们需要把它销毁，其实也就是在内存中将它释放掉，以便于留出空间给其他程序或软件使用。
单链表整表删除的算法思路如下: 

1. 声明- -结点p和q;
2. 将第一个结点赋值给p;
3. 循环:
   1. 将下一结点赋值给 q;
   2. 释放p;
   3. 将q赋值给 p。

```c
Status ClearList(LinkList *L)
{
	LinkList p,q;
	// p指向第一个结点
	p=(*L)->next;
	while(p)  // 没到表尾
	{
		q=p->next;
		free(p);
		p=q;
	}
	(*L)->next=NULL;  // 头结点指针域为空
	return OK;
}
```

# 单链表结构与顺序表结构优缺点

## 存储分配方式

**顺序存储结构用一段连续的存储单元依次存储线性表的数据元素**
**单链表采用链式存储结构，用组任意的存储单元存放线性表的元素**

## 时间性能

### 查找

- 顺序存储结构O(1)
- 单链表O(n)

### 插入和删除

- 顺序存储结构需要平均移动表长一半的元素，时间为O(n)
- 单链表的插入和删除时间仅为O(1)

## 空间性能

**顺序存储结构需要预分配存储空间，分大了，浪费,分小了易发生上溢**
**单链表不需要分配存储空间，只要有就可以分配，元素个数也不受限制**

# 静态链表

**用数组描述的链表叫做静态链表**

# 循环链表

将单链表中终端结点的指针端由空指针改为指向头结点，就使整个单链表形成一个环，这种头尾相接的单链表称为单循环链表，简称循环链表( circular linked list)。

# 双向链表

**双向链表（double linked list）是在单链表的每个结点中，再设置一个指向其前驱结点的指针域。所以在双向链表中的结点都有两个指针域。一个指向直接后继，另一个指向直接前驱。**

