又来填坑啦

虽然 new 好像和后面四个没什么太大的关系（？）

但是正好想到，就一起来康康

function 的原型对象上的方法好像就 call/apply/bind/toString 以及一个未标准化的 toSource。

正好这篇文章就都来讲讲。

# this

本来想先写 new 来着，但是 new 这个操作符实现的操作里有使用到 this (而且我还没看懂为什么)

所以先来看看 this 。

以下 this 的内容按照左侧文章编写 - [this 关键字](https://wangdoc.com/javascript/oop/this.html)

## this 的使用

无论在什么场合，this 都会返回一个对象。(所以传给 call / apply 的第一个参数也是 object

而简单来说，this 就是属性或方法\"当前\"所在的对象，举一个栗子 ↓ 

```js
// demo 1
var obj = {
  foo(){ console.log(this.bar) }, // 这里偷懒用了 es6 的对象扩展，直接写入函数
  bar: 1
}
var foo = obj.foo
var bar = 2 // 这里不可以用 let or const
obj.foo() // 1
foo() // 2

// demo 2
function f() {
  return `name: ${this.name}`
}
let A = {
  name: 'John',
  describe: f
};
var B = {
  name: 'Hash',
  describe: f
};
A.describe() // 'name: John'
B.describe() // 'name: Hash'

// demo 3
var A = {
  name: 'John',
  describe() {
    return `name: ${this.name}`
  }
};
var name = 'Hash';
var f = A.describe;
f() // 'name: Hash'
```

## this 的原理

上面的例子中 ，对象里的函数在不同的环境下运行，因此 this 也指向了不同的函数。

因为函数会**单独存在内存里**。（为什么是单独呢，是与其他的对象属性有所差异。

```js
let foo = {
  key: 'value',
  bar(){}
}
// 内存里会这样
{
  key: {
    [[value]]: 'value' // 普通的对象属性的值会直接存在对象里
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  },
  bar: { 
    [[value]]: 函数的地址 // 而函数属性的值存的是函数的地址
    ...
  }
}
```
**由于函数是单独的值，所以可以在不同的环境下运行。**

那么这样的话 this 就出现了，目的是 **能够在函数体内部获得当前的运行环境（context）**，this 能够帮助指代函数当前的运行环境。

## this 的使用场合

主要有 全局/构造函数/对象方法 三个使用的场合

### 全局环境

```js
this ===  window // true
```
```js
this === global // true
```
하지만!

```js 
// 无论在浏览器里还是 node 里
var foo = 1
this.foo // 1
const bar = 2
this.bar // undefined
```
使用 ES6 的 let/const 定义的变量会和函数、类一样，**有独立的内存空间**，是 \"Declarative Environment Records\" , 而使用 var 定义的变量属于 \"object environment record\" 会挂在某个对象上，可以根据原型链寻找到。

### 构造函数

```js 
// 举一个 class 的例子
class Demo (){
  constructor(foo){
    this.foo = foo
  }
}
// 再举一个普通对象的例子
function Draft (foo) {
  this.foo = foo,
  this.bar = 2,
}

let demo_1 = new Demo('abc')
let demo_2 = new Draft('def')

demo_1.foo //'abc'
demo_2.foo // 'def'
demo_2.bar // 2
```
构造函数的 this 指向的是**实例对象**，因此在在构造函数内容部定义某个属性，即在定义实例对象有这个属性。

### 对象的方法

对象的方法里包含 this ，this 就会指向方法运行时所在的对象

但是还是有另一种情况的

上面提到了 JavaScript 里的函数是独立在内存里的

```js
var obj = {
  foo: function(){
    console.log(this)
  }
}
// 这时候的 foo() 里的 this 指向 obj
obj.foo() // { foo: [Function: foo] }
```
但是不是不可以改变的

```js
// DEMO 1
(obj.foo = obj.foo)() // code 1
// 等于
(obj.foo = function () {
  console.log(this);
})()  
// 等同于
(function () {
  console.log(this);
})() 
// 情况二 
(false || obj.foo)() // code 2
// 情况三
(1, obj.foo)() // code 3
```

这三个例子真的好难理解啊。。。

第一个还容易，赋值语句会返回右侧的表达式，就是说 obj.foo = obj.foo 会返回 obj.foo 这个函数的地址，然后就变成了 (obj.foo的地址)()，这样运行环境就变成了 window 

**but code 2 and code 3 , whyyyyy ?**

### this 的注意点

1. 避免在 Array.map 和 Array.forEach 中使用。
2. 避免在 callback 中使用。（可以使用 bind() 解决

### 箭头函数和 this

> 箭头函数不会创建 this，只会从自己的作用域链 (?) 的上一层继承 this。 

# bind

又本来想先写 new 来着，但是 this 刚好看完，就顺便看看 bind 。

Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])

## bind 的功能

> bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。 -- MDN 

## bind 的返回值

功能里很清楚的说到**创建一个新的函数**。

所以返回值是一个**绑定了 this 为某个对象的函数**。

## bind 的参数

function.bind(thisArg[, arg1[, arg2[, ...]]])

1. 必选的thisArg 
2. 可选的args

### thisArg 

> 调用绑定函数时作为this参数传递给目标函数的值。 -- MDN 

就是新建的函数的 this 对象

### args 

可以给新建的函数传一些默认的参数值。

```js 
function add(x, y) {
  return x + y;
}
var plus5 = add.bind(null, 5);
plus5(10) // 15
```

## bind 的注意点

bind 函数运行一次就会返回一个**新**的函数，他们的 this 对象是相同的。

所以需要进行 \"绑定\" 和 \"解绑\" 操作的时候不应该调用两次。

```js 
element.addEventListener('click', o.m.bind(o));
element.removeEventListener('click', o.m.bind(o));
```
↑ 的例子中，添加的监听事件和删除的监听事件不是同一个事件，因为两次调用了 bind() 函数，返回了两个匿名函数。

# call

Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])

长得和 bind 很像。

## call 的功能

> call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。 -- MDN

指定一个 this ，并在这个 this 环境下运行函数。

## call 的返回值

其实本质还是调用了函数，若函数本身有返回值则会有返回值，若函数本身没有返回值，则返回 undefined 。

## call 的参数

function.call(thisArg, arg1, arg2, ...)

### thisArg

运行函数时指定的 this 。无参时/传入 null or undefined 时，传入全局对象。

### args
 
指定的参数列表。

## call 的应用

### 调用对象的原生方法

```js 
var obj = {};
obj.hasOwnProperty('toString') // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString') // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```

### 调用匿名函数

```js
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}
```

# apply

apply 和 call 的功能一致。

唯一区别为参数不同。

**就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。**

```js 
let a = {
  a : 2;
}
function foo(b,c) {
  return (this.a + b + c)
}
foo.call(a,1,2) // 5
foo.apply(a,[1,2]) // 5
```

# new

[MDN： new 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
[关于原型](https://naichazhenhaohe.github.io/2019/07/09/%E5%85%B3%E4%BA%8E%E5%8E%9F%E5%9E%8B/)

new 的作用简单来说就是调用了一下构造函数，返回一下这个构造函数所属的对象的实例。

## new 的使用

### new + 构造函数

MDN 里的对 new 的介绍 ↓

1. 创建一个空的简单JavaScript对象（即{}）；
1. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
1. 将步骤1新创建的对象作为this的上下文 ；
1. 如果该函数没有返回对象，则返回this。

看不懂 ↑ ，看这个 ↓

1. 创建一个空对象，作为将要返回的对象实例。
1. 将这个空对象的原型，指向构造函数的prototype属性。
1. 将这个空对象赋值给函数内部的this关键字。
1. 开始执行构造函数内部的代码。

大概就是说其实本质还是**调用了构造函数**，新建一个空对象（就是我们需要的实例），然后把这个空对象传入构造函数作为构造函数的 this ，再针对这个 this 进行一系列的赋值操作，然后因为其实本来就是运行了这个构造函数，因此如果构造函数有明确的 return 一个对象，则会返回这个**被设置好的对象**，但是如果设置了返回非对象则会被无视，如果灭有设置返回值一样，返回在构造函数内进行构造的这个 this 对象。

噢中间还有一步骤就是把这个新的对象的原型（\_\_proto\_\_）指向构造函数的 prototype 。

```js
// 设置返回值为 1000
var Vehicle = function () {
  this.price = 1000;
  return 1000;
};

(new Vehicle()) === 1000 // false

// 设置返回值为一个对象
var Vehicle = function (){
  this.price = 1000;
  return { price: 2000 };
};

(new Vehicle()).price // 2000
```

### new + 普通函数

会返回空对象。

```js 
function getMessage() {
  return 'this is a message';
}
var msg = new getMessage();
msg // {}
typeof msg // "object"
```

但是这个普通对象返回一个对象，则会返回这个对象。

```js 
function getMessage() {
  return {msg: 'foo'};
}
var msg = new getMessage();
msg // {msg: 'foo'}
```

## new.target

> 使用这个属性，可以判断函数调用的时候，是否使用new命令。

```js
function foo() {
  if (!new.target) {
    throw new Error('请使用 new 命令调用！');
  }
  // ...
}
foo() // Uncaught Error: 请使用 new 命令调用！
```

# Object.create()

new 的作用就是新建一个实例，而 Object.create() ，也是。

就是指定原型和属性创建一个新的实例

```js
const Student = {
  id: 1,
}
const Jo = Object.create(Student, {name: { value: 'Josh' }})
Jo.id = 2
Jo.grade = 3
Jo.name = 'John'

Jo // {id: 2, grade: 3}
Jo.name // Josh
```
倒数第二行输出里没有 name 是因为在 create() 的时候传入的对象 name 是不可写,不可枚举,不可配置的；

需要如下传入才可以

```js
const John = Object.create(Student, {
  name: {
    value: "Josh", 
    writable: true,
    enumerable: true,
    configurable: true 
  } 
});
John.name = "John"
John // {id: 1, name: "John"}
```