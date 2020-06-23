ES6, Symbol
<!-- more --->
Symbol 是 ES6 新增的属性类型。

Symbol 作为第七原始类型(好像 Object 是不是原始类型一直挺有争议？)，表示独一无二的值。

Reflect 对象也是 ES6 为了操作对象而提供的新 API 。

# 参考

《ES6 标准入门(第 3 版)》 第 10、12、13 章节。

[MDN - Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)  
[MDN - Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)  
[MDN - Symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol)  
[JS 中的 Reflect 和 Proxy](https://juejin.im/post/5c7e6857e51d4542194f8c6f)

**注**  
本文只是我最近太无聊了(又想继续来更博客所以)又翻出阮一峰大佬的这本书来看看  
所以主要是对书中的内容的搬运(主要是搬运啦)和总结。

# 创建 Symbol

```js
let s = Symbol()
console.log(s) // Symbol()
console.log(typeof s) // Symbol
```

需要注意的是，在新建一个 Symbol 值时，不能使用 new 关键词，因为生成的 Symbol 值是一个原始类型的值，而非对象。

创建 Symbol 值时，可以传一个字符串作为参数，用于对这个值进行描述。

```js
let s = Symbol('symbol')
console.log(s) // Symbol('symbol')
console.log(typeof s) // Symbol
```

由于参数仅提供**描述**的功能，因此不同的 Symbol 值得描述信息可以是一样的，就好比不同的人可以有一样的名字一般。

```js
let s1 = Symbol('demo')
let s2 = Symbol('demo')
let s3 = Symbol()
let s4 = Symbol()
console.log(s1 === s2) // false
console.log(s3 === s4) // false
```

# 类型转换

Symbol 值可以显示转换为字符串

```js
let s = Symbol('symbol')
console.log(String(s)) // 'Symbol('symbol')'
console.log(s.toString()) // 'Symbol('symbol')'
```

还转为布尔值。

```js
let s = Symbol()
Boolean(s) // true
console.log(!s) // false
```

Symbol 值不可以转为其他类型的值，也不可以参与其他类型的值的运算，否则会报错。

```js
let s = Symbol()
console.log(Number(s)) // TypeError
console.log('symbol is ' + s) // TypeError
console.log(`symbol is ${s}`) // TypeError
```

# 作为对象属性名

Symbol 值作为对象属性名时，可以保证不会出现重复的属性名。

具有如下三种定义的方法。

```js
const keyName = Symbol()
// 1
let a = {}
a[keyName] = 'hello'
// 2
let b = {
  [keyName]: 'hello'
}
// 3
let c = {}
Object.defineProperty(c, keyName, { value: 'hello' })

a[keyName] // 'hello'
b[keyName] // 'hello'
c[keyName] // 'hello'
```

需要注意的是，使用 Symbol 值作为对象属性名时，无法使用点运算符。  
因为点运算符后跟的是字符串，而不会视其为一个标识符，并去获取这个标识符背后所代表的值。

```js
const keyName = Symbol()
let a = {}
a[keyName] = 'hello'

console.log(a[keyName]) //  'hello'
console.log(a.keyName) //   undefined
```

# 属性名的遍历

常规获取对象的属性名的方式有如下三种：

1. for...in
2. Object.keys()
3. Object.getOwnPropertyNames()

但是都是获取不到类型是 Symbol 的属性名的

Object.getOwnPropertySymbols() 返回一个数组，成员为目标对象的所有 Symbol 类型的属性名。

```js
const s1 = Symbol('s1')
const s2 = Symbol('s2')
const obj = {
  foo: 'trump',
  bar: 55,
  [s1]: true,
  [s2]: false
}
console.log(Object.getOwnPropertyNames(obj)) // ["foo", "bar"]
console.log(Object.getOwnPropertySymbols(obj)) // [Symbol(s1), Symbol(s2)]
```

Reflect.ownKeys() 会返回对象的**所有**键名。

```js
const s1 = Symbol('s1')
const s2 = Symbol('s2')
const obj = {
  foo: 'trump',
  bar: 55,
  [s1]: true,
  [s2]: false
}
console.log(Reflect.ownKeys(obj)) // ["foo", "bar", Symbol(s1), Symbol(s2)]
```

# Symbol 的两个方法: Symbol.for() & Symbol.keyFor()

长得很像  
功能完全不同

## Symbol.for()

作用在于复用一个已登记的 Symbol 值 / 新建一个被登记的 Symbol

接收一个字符串作为参数，并在全局搜索(可以在不同的 iframe 或 service worker 中获取到同一个值)是否以此字符串作为描述的 Symbol 值，有则返回这 Symbol 值，没有则新建一个以此作为描述信息的 Symbol 值。

```js
let s1 = Symbol.for('demo')
let s2 = Symbol.for('demo')

// 注意！ Symbol() 虽然也可以给 symbol 值进行描述，但不会进行登记，
// Symbol.for() 查询的目标也只有其他通过 Symbol.for() 创建的 symbol 值。
let s3 = Symbol('bar')
let s4 = Symbol.for('bar')

console.log(s1 === s2) // true
console.log(s3 === s4) // false
```

## Symbol.keyFor()

参数为 symbol 值，用于获取某个已登记的 Symbol 的描述信息。

```js
let s1 = Symbol('foo')
let s2 = Symbol.for('demo')
let s3 = Symbol()
console.log(Symbol.keyFor(s1)) // undefined
console.log(Symbol.keyFor(s2)) // demo
console.log(Symbol.keyFor(s3)) // undefined
```

可以看到以 Symbol.for() 创建的具有描述信息的 symbol 才适用 Symbol.keyFor()

# ES6 内置的 Symbol

ES6 内置了 11 个 Symbol 值，指向语言内部的方法 / 属性。

## Symbol.hasInstance

对象的 Symbol.hasInstance 方法在对象使用 instanceof 运算符时调用此方法，判断对象是否为某个构造函数的实例。

```js
class DemoClass {
  [Symbol.hasInstance] = target => {
    return target instanceof Array
  }
}

console.log([1, 2] instanceof new DemoClass()) // true
```

## Symbol.isConcatSpreadable

对象(虽然这里说的是对象，但是通常用在数组上)的 Symbol.isConcatSpreadable 表示对象使用 Array.prototype.concat() 时，是否要展开。

Symbol.isConcatSpreadable 为 true 或 undefined 时，数组默认都是可以展开的。

```js
let arr = [1, 2]
console.log([3, 4].concat(arr)) // [3, 4, 1, 2]
arr[Symbol.isConcatSpreadable] = false
console.log([3, 4].concat(arr)) // [3, 4, [1, 2, Symbol(Symbol.isConcatSpreadable): false]]
// 虽然打印的内容里数组 arr 多了一条内容，但是只是其一个属性而已。
console.log(arr) // [1, 2, Symbol(Symbol.isConcatSpreadable): false]
console.log(arr.length) // 2
```

## Symbol.species

Symbol.species 属性指向当前对象的构造函数

## Symbol.match

对象的 Symbol.match 属性指向某函数，当执行 str.match(myObject) 时，该属性存在则会调用该函数。

```js
class MyMatcher {
  [Symbol.match] = string => 'hello world'.indexOf(string)
}
'e'.match(new MyMatcher()) // 1
```

## Symbol.replace

对象的 Symbol.replace 属性指向某函数，当对象被 String.prototype.replace 调用时，会调用本函数。

## Symbol.search

对象的 Symbol.search 属性指向某函数，当对象被 String.prototype.search 调用时，会调用本函数。

## Symbol.split

对象的 Symbol.split 属性指向某函数，当对象被 String.prototype.split 调用时，会调用本函数。

## Symbol.iterator

指向目标对象的默认遍历器方法。

对象在进行 for ... of 循环时，会调用 Symbol.iterator 方法返回该对象的默认遍历器。

## Symbol.toPrimitive

对象的 Symbol.toPrimitive 属性指向一个方法，对象在转为原始类型的值时会调用本方法，返回该对象对应的原始类型。

被调用时接收一个字符串作为参数，标识当前运算的模式。

共有如下三种模式

1. Number。 转为数值。
2. String。 转为字符串。
3. Default。转为数值或者字符串。

## Symbol.toStringTag

在对象上调用 Object.prototype.toString 方法时，若本属性存在，其返回值会出现在 toString 方法返回的字符串中，标识对象的类型。

```js
console.log({ [Symbol.toStringTag]: 'foo' }.toString()) // [object foo]
```

## Symbol.unscopables

对象的 Symbol.unscopables 指向一个对象，指定了使用 with 关键字时哪些属性会被 with 环境排除。
