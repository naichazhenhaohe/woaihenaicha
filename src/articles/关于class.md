语法糖。  
ES6 中的 class 只是让对象原型的写法更加清晰，更像面向对象语言编程的语法而已。 
当然还是有些小差别的。

<!-- more -->

# 参考链接/书籍

《ES6 标准入门》

[类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)

# 一些说明

JavaScript 是利用原型链进行继承的，或者说 JavaScript 是基于原型的面向对象的语言。

所以在 class 出现前，都是使用构造函数来定义并生成新的对象。

类声明不会提升，所以在使用 class 进行一个类声明前，new 了一个这个类的对象，会报错。

类的内部的函数是不可枚举的，所以无法用 Object.keys() 获取到。

# 传统构造函数 & 类

```js
// 定义构造函数
function Persion(name, age) {
  this.name = name;
  this.age = age;
}
// 定义原型链上的方法
Persion.prototype.getName = function() {
  return this.name;
};
// 定义实例对象
let Joo = new Persion("Joo", 233);
```

映射到类上就会有如下的代码

```js
// 定义类
class Persion {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
}
// 定义实例对象方法不变
let Joo = new Persion("Joo", 233);
```

1. 类里的方法都是挂在类的 prototype 上的

```js
class Demo {
  constructor(){
    ...
  }
  toString(){
    ...
  }
  toValue(){
    ...
  }
}
// 上面的Demo类的定义等同于如下代码
Demo.prototype = {
  constructor(){},
  toString(){},
  toValue(){}
}
```

2. prototype 上的 constructor 指向类本身，这和 ES5 是一致的

```js
Demo.prototype.constructor === Demo; // true
```

3. 类内部的方法是不可枚举的。所以无法用 Object.keys(Demo.prototype) 获取到。这个是与 ES5 有差异的。
4. constructor 是在使用 new 命令生成新实例对象时被调用的，所以如果即使不设置 constructor 也会默认添加一个空的 constructor。
5. 类必须使用 new 关键字来调用，否则会报错。
6. class 不存在变量提升。

# 类表达式

类也可以使用表达式的形式来定义，不过有点奇怪的感觉

```js
const Foo = class Bar {
  getName() {
    return Bar.name;
  }
};
```

以上例的形式定义的类，类名是 Foo ，而 Bar 的作用在于类内部指代当前类。

要是不想要 Bar 的话，也可以省略

```js
const Foo = class {
  getName() {
    return this.name;
  }
};
```

还有就是有一种直接定义一个对象实例的方式。

```js
const foo = new Class {
  ...
}
```

# 私有属性 & 私有方法

私有方法：ES6 不提供  
私有属性：ES6 不支持

# this 问题

this 问题都是大问题

函数内部如果有 this，则会默认指向类的实例。

## 一个问题

但是还有有坑的，如果把方法拿出来单独使用，this 又会指向当前运行的环境，举个例子：

```js
class Logger {
  printName(name = "demo") {
    this.print(`hello ${name}`);
  }
  print(text) {
    console.log(text);
  }
}
const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read proterty 'print' of undefined
```

## 解决方法

1. 在 constructor 中使用 bind()
2. 箭头函数
3. 使用 ES6 的 Proxy

### 在 constructor 中使用 bind()

如果会 React 的话这个肯定会啦

```js
class Demo {
  constructor() {
    this.handleChange = this.hangdleChang.bind(this);
  }
  function handleChange(){}
}
```

### 箭头函数

但是！第二个有坑来着。  
我也是一开始以为，会跟 React 的 class 一样，用箭头函数定义的方法，就会指向那个组件(或者说这里需要的是实例)。  
ReactJS 里除了在 constructor 里把函数进行 bind 之外(其实很不喜欢这样，函数多了又会增加好几行代码不说，写一个新的函数就要跑回来 bind 一下就很烦)，还可以使用箭头函数(推荐指数：五颗星)。

```js
class Demo extends React.Component {
  constructor() {}
  hangdleChange = e => {
    console.log(e.target.value);
  };
}
```

React 中的函数会丢失 this 的原因大概就是在 React 中添加监听事件，传递的不是字符串(比如直接绑定 \<button onclick='handleClice()'>\</button> 里的 onclick 属性值是一个字符串)，而是在 JSX 里传的就是一个函数，也就是说在调用 onClick 时，处理函数会导致函数的 this 丢失，所以需要强制绑定一下。  
虽然说使用\"丢失\"来描述不太好，换个例子来说明就很清楚了

```js
// 注意，这里不能使用 let / const ，否则 demo 不会挂在全局对象上
var demo = "abc";
const obj = {
  demo: "def",
  getDemo() {
    return this.demo;
  }
};
let { getDemo } = obj;
getDemo(); // abc
```

至于箭头函数的 this 的问题。。。  
箭头函数的 this 就是**定义时**所在对象，是不变的。  
所以无论直接在类里（如上上例子）通过箭头函数的形式定义一个函数  
或者在 render()方法里引用箭头函数（如下例），this 都指向的是组件实例。  

```js
class Demo extends React.Component {
  handleClick(e) {
    console.log(this);
  }
  render() {
    return (
      <button type="button" onClick={e => this.handleClick(e)}>
        Click Me
      </button>
    );
  }
}
```

说完 ReactJS。。。  
再说说 ES6 的类里的箭头函数怎么绑定   
其实也可以像 ReactJs 里一样直接用箭头函数以表达式的形式定义函数，  
但是先看看《ES6 标准入门》里的例子  

```js
class Logger {
  constructor() {
    this.printName = (name = "there") => {
      this.print(`hello ${name}`);
    };
  }
}
```

其实也不难能理解啦  
关键点就是**构造函数里的 this 指向的是实例对象**  
所以直接在构造函数里用箭头函数来定义方法  

但是像 React 里一样直接用箭头函数定义函数，也不是不可以

```js
class Foo {
  state = 0;
  getState = () => {
    return this.state;
  };
}
class Bar {
  state = 0;
  getSate() {
    return this.state;
  }
}
```

然后其实有一个挺难发现的区别

```js
let foo = new Foo();
let bar = new Bar();
foo.getState(); // 0
bar.getState(); // 0
// 然后打印看看 bar 和 foo 这两个对象
bar; // Bar {state: 0}
foo; // Foo {state: 0, getState: ƒ}
```

可以看到使用箭头函数定义的函数，**不会在类的 prototype 上，而是直接作为实例对象的属性**。

### Proxy
 
代理的坑以后再来填吧  
其实也就是针对某个操作进行一个拦截，然后进行一些(必要的话的)操作  

# set / get

hmmm 和 Java 的 set/get 依旧是有比较打的差异  
不过和 ES5 里的用法是一样的  

举一个《ES6 标准入门》里的例子，就体现了 set/get 的两个注意点

```js
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }
  // 1. get/set 的用法
  get html() {
    return this.element.innerHTML;
  }
  set html(val) {
    this.element.innerHTML = val;
  }
}
// 2.取值函数和存值函数是设置再属相的 Descriptor 对象上的。
let descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype,
  "html"
);
"get" in descriptor; // true
"set" in descriptor; // true
```

# 遍历器

有涉及到 generator 和 Symbol 的 iterator 属性

```js
class Foo {
  constructor(...args) {
    this.args = args;
  }
  *[Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}
for (let x of new Foo("hello", "world")) {
  console.log(x);
}
// hello
// world
```

Symbol.interator 属性指向对象的默认遍历器方法。  
换句话说，就是使用 for of 语句循环某个对象时，会调用 Symbol.iterator 方法返回该对象的默认遍历器。  
generator 就又很有的说的。跳过跳过。  

# 静态方法

static 关键字定义的函数需要通过类本身来调用。

```js
class Demo {
  static getName() {
    console.log("abc");
  }
}
let demo = new Demo();
demo.getName(); // TypeError
Demo.getName(); // abc
```

又会涉及到 this 的问题。  
因为类里的 this 指向实例对象  
但是静态函数里的 this 指向类(我不知道这样描述对不对，但是看起来是这样的  

举一个 MDN 上的例子

```js
class StaticMethodCall {
  static staticMethod() {
    return "Static method has been called";
  }
  static anotherStaticMethod() {
    return this.staticMethod() + " from another static method";
  }
}
StaticMethodCall.staticMethod();
// 'Static method has been called'

StaticMethodCall.anotherStaticMethod();
// 'Static method has been called from another static method'
```

就像 React 的新生命周期里的 getDerivedStateFromProps 是一个静态函数所以**不能使用 this**(没有具体测试在这个生命周期函数里的 this 会是什么东西，但是确实有印象在这个生命周期里调用 this.state 会报错。

还有就是子类可以通过 super 对象调用父类的静态函数

```js
class Father {
  static Hello() {
    return "hello";
  }
}
class Son extends Father {
  static Greet() {
    return super.Hello();
  }
}
Son.Greet();
// hello
```

# 静态属性

```js
class Demo {
  static foo = "foo";
}
console.log(Demo.foo); // foo
```

# 实例属性

用过 React 应该也会很熟悉吧。。。  
一般的做法，就是在 constructor 里直接定义实例属性，如下

```js
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {};
    // 以下是一些自定义的属性实例
    this.filter = null;
    this.state = null;
  }
}
```

但是其实可以不用写在 constructor 里了

```js
class Demo {
  state = 0;
  getState() {
    return this.state;
  }
}
```

# new.target

没有想到是 ES6 的属性。

构造函数通过 new 调用，或者在构造函数中使用 new.target 返回类的构造函数，如果构造函数不是通过 new 调用的话，就会返回 undefined

```js
class Demo {
  constructor() {
    console.log(new.target === Demo);
  }
}
let demo = new Demo(); // true
```

需要注意的是**如果某个类被其他类继承了 new.target 会返回子类**。  
由此可以定义一个只能被继承不可以实例化的类
