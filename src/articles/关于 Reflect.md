ES6, Reflect
<!-- more --->
同 Proxy 一致，Reflect 也是 ES6 新增的对象，用于操作对象。

# 参考内容

《ES6 标准入门(第 3 版)》 第 13 章节。

[MDN - Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect) 　  
[JS 中的 Reflect 和 Proxy](https://juejin.im/post/5c7e6857e51d4542194f8c6f)

# 介绍

设计目的

1. 将 Object 对象的一些明显属于语言内部的方法放到 Reflect 对象上。
2. 修改某些 Object 方法的返回结果。
3. 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name], 对应 Reflect.has() 与 Reflect.deleteProperty()

```js
'assign' in Object // true
Reflect.has(Object, 'assign') // true
```

4. Reflect 对象的方法与 Proxy 方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。

# 静态方法

共有 13 个静态方法。大部分与 Object 对象的同名方法作用相同，且与 Proxy 对象的方法一一对应。

## Reflect.get(target, name, receiver)

查找并返回 target 对象的 name 属性，若 name 属性不存在，则返回 undefined 。

```js
const obj = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  }
}
Reflet.get(obj, 'foo') // 1
Reflet.get(obj, 'bar') // 1
Reflet.get(obj, 'baz') // 1
```

若 name 属性绑定了 getter，则 getter 的 this 绑定 receiver。

```js
const obj = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  }
}

const receiver = {
  foo: 3,
  bar: 3
}

Reflet.get(obj, 'baz', receiver) // 6
```

## Reflect.set(target, name, value, receiver)

本方法设置 target 对象的 name 属性值为 value。

同 Reflect.get ，若 target 独享的 name 属性绑定了 setter，则 setter 的 this 绑定 setter。

Reflect.set 会触发 Proxy.definedProperty 拦截。

Reflect.set 的第一个参数若非 Object 类型，则会报错。

```js
const obj = {
  foo: 4,
  set bar(value) {
    return (this.foo = value)
  }
}
const myReceiver = {
  foo: 0
}
Reflect.set(obj, 'bar', 1, myReceiver)
obj.foo // 4
myReceiver.foo // 1
Reflect.set(obj, 'bar', 55)
obj.foo // 55
myReceiver.foo // 1
```

## Reflect.has(obj, name)

对应 name in obj 中的 in 操作符。

若第一个参数 obj 不是对象则报错。

## Reflect.deleteProperty(obj, name)

对应 delete obj[name] 中的 delete 操作符。

返回一个布尔值，删除成功或 name 属性不存在则返回 true。

## Reflect.construct(target, args)

等同于 new target(...args), 提供了一种不使用 new 来调用构造函数。

```js
function Greeting(name) {
  this.name = name
}

// new
const instance = new Greeting('John')

// Reflcet.construct
const instance = Reflect.construct(Greeting, ['John'])
```

## Reflect.getPrototypeOf(obj)

用于读取对象的 \_\_proto\_\_ 属性，对应 Object.getPrototypeOf(obj)

区别在于若传入的参数不是对象，Object.getPrototypeOf(obj) 会把 obj 先转为对象，而 Reflect.getPrototypeOf(obj) 则直接报错。

## Reflect.setPrototypeOf(obj, newProto)

用于设置对象的 \_\_proto\_\_ 属性，返回第一个参数对象，对应 Object.setPrototypeOf(obj, newProto)

若第一个参数不是对象，Object.setPrototypeOf(obj, newProto) 会返回第一个参数本身，而 Reflect.setPrototypeOf(obj, newProto) 会直接报错。

不过若第一个参数是 undefined 或者 null，两个方法都会直接报错。

## Reflect.apply(func, thisArg, args)

等同于 Function.prototype.apply.call(func, thisArg, args) 用于绑定 this 对象后执行给定函数。

```js
const args = [11, 22, 12, 64, 19, 44]

// 旧写法
const youngest = Math.min.apply(Math, ages)
const oldest = Math.max.apply(Math, ages)
const type = Object.prototype.toString.call(youngest)

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages)
const oldest = Reflect.apply(Math.max, Math, ages)
const type = Reflect.apply(Object.prototype.toString, youngest, [])
```

## Reflect.defineProperty(target, propertyKey, attributes)

基本等同于 Object.defineProperty，用于为对象定义属性。而 Object.defineProperty 会被逐渐废除。

若 Reflect.defineProperty() 的第一个参数不是对象则会报错。

```js
function MyDate() {}

// old
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
})

// new
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
})
```

## Reflect.getOwnPropertyDescriptor(target, propertyKey)

基本等同于 Object.getOwnPropertyDescriptor()，用于获取指定属性的描述对象。

若 Reflect.getOwnPropertyDescriptor() 的第一个参数不是对象则会报错， 而 Object.getOwnPropertyDescriptor() 则会返回 undefined 。

## Reflect.isExtensible(target)

返回一个布尔值，表示当前对象是否可拓展。

若参数非对象，Object.isExtensible 会返回 false，而 Reflect.isExtensible 会报错。

## Reflect.preventExtensions(target)

用于使一个对象变得不可拓展。返回一个布尔值，表示是否操作成功。

## Reflect.ownKeys(target)

返回对象的所有属性。基本等于 Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols 之和。

```js
const obj = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4
}

// 旧写法
Object.getOwnPropertyNames(obj) // ['foo', 'bar']
Object.getOwnPropertySymbols(obj) // [Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(obj) // ['foo', 'bar', Symbol(baz), Symbol(bing)]
```
