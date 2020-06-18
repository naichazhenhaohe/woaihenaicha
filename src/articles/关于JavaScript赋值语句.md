其实赋值语句倒是没有什么很花里胡哨的内容。
想写的是连续赋值语句。


# 参考链接

[javascript 面试题，关于连续赋值的坑？](https://www.zhihu.com/question/41220520)  
[神奇的 JS 连续赋值语句](http://xiaoyuze88.github.io/blog/2013/09/20/%E7%A5%9E%E5%A5%87%E7%9A%84JS%E8%BF%9E%E7%BB%AD%E8%B5%8B%E5%80%BC%E8%AF%AD%E5%8F%A5)  
[搞懂 JavaScript 中的连续赋值](https://cloud.tencent.com/developer/article/1093667) -> 图解流程

# 赋值语句

虽然普通的赋值语句和其他语言没有特别大的区别。

## 复合赋值

虽然名字听起来很强起来的样子，其实就是比如  
x += y 表示 x = x + y  
x -= y 表示 x = x - y  

操作符可以是 + - \* / % \<\< \>\> 以及位移操作符 

## 返回值

```js
let demo = null;
console.log(demo = { foo: "bar" }); // { foo: "bar" }
console.log(demo = 3); // 3
```

js 中的赋值语句构成：  
左手边表达式 = 赋值表达式

可以看到赋值语句的左侧，并不是原始地址，而是一个表达式  
虽然这个和输出右边的内容没有什么关系 hhh  
但是赋值语句的返回值，确实就是右边的表达式的内容

```js
let a = {};
b = a;
console.log(a.x = b = { n: 1 }); // { n: 1 }
```

如果是连续赋值语句的话，也会返回最右边的表达式

# 连续赋值语句

重点来了。

先说最简单的。

```js
let foo = bar = "demo";
console.log(foo); // 'demo'
console.log(bar); // 'demo'
```

其实上面的赋值语句使用 Prettier 格式化的话，  
会变成这样 ↓  
let foo = (bar = "demo")  
这样的话也更加可以理解了。  
하지만!  
那么 bar 算是使用 var 定义的还是算是 let 定义的呢？

```js
let foo = (bar = "demo");
// 因为测试的时候是在浏览器而不是nodejs，所以使用的是window而不是global。
console.log(window.foo); // undefined
console.log(window.bar); // "demo"
// 这是因为 let / const 定义的变量有自己独立的内存空间，
// 而 var 定义的变量会挂在对应的对象上。
// 如果不能理解的话，换一个展示的方法:
const foo = (bar = 0);
console.log(foo); // 0
console.log(bar); // 0
foo = 1; // TypeError
bar = 1; // 1
```

所以如果用 let / const 进行连续赋值的话，后面的那个变量，不算是使用 let / const 定义的。

## var 定义和不用 var 定义

1. 用 var 进行变量定义，于全局环境，则变量会挂在全局对象上，于函数作用域，则是局部变量。
2. 如果不用 var 直接对一个变量进行赋值，那么思路是会顺着原型链找这个值，没有找到的话就挂在全局对象上。
3. 使用 let / const 定义的变量会有属于自己的内存空间。

## 连续赋值对象

```js
let a = { n: 1 };
let b = a;
a.x = a = { n: 2 };
console.log(a.x); //undefined
console.log(b);
```

首先说明和 var / let / const 无关，所以代码里的 let 改成 var 也无任何关系。

但是改成 const 有关系。

大概的来肢解下上面这串赋值的流程

1. let a = { n: 1 };  
   a 的内存指向 { n: 1 } // 至于为什么是指向。。。就不多说了  
2. let b = a;  
   b 的内存也指向 { n: 1 }  
3. a.x = a = { n: 2 }  
   重头戏来了。看到有一个说法 **先解析后执行** 感觉对理解还是有帮助的。  
   首先是分析赋值语句的左边 a.x ，因为 a 当前指向 { n: 1 }，没有 x 属性，先给他个 undefined  
   注意！这时 a 和 b 的内存都指向的是 { n: 1, x: undefined }  
   接着，再等给 x 赋值的是会，再看赋值语句的右边 a = { n: 2 }。也是一个赋值语句，需要先处理。  
   这时，a 的内存指向了**新的对象 { n: 2 }** 。然后这个赋值语句的返回值，是赋值语句右边的表达式，所以返回了{ n: 2 }，给了 x。  
   注意！这时 a 的内存，指向是另一个对象 { n: 2 }，而 b 的内存没有变，指向的一就是最开始的 { n: 1, x: { n: 2 } }  
4. 接下来两个 console 语句就很清楚了  
   因为 a 指向 { n: 2 } 而 b 指向 { n: 1, x: { n: 2 } }  
   所以 a.x 当然是 undefined 而 b 是具有 n/x 属性的对象。 

JavaScript 里的函数、对象具有独立的内存空间，是 "Declarative Environment Records" (需要注意的是 let/const 定义的变量也是)。所以上例里的 a 和 b 的内存只是一个指向对象的指针，而不是说 a/b 的内存里就存着对象。所以在被赋予新的对象值时，会变动内存指向新的对象而不是根据新的对象的内容改变原本指向的对象。
