Proxy 是 ES6 新增的对象。

可以理解为在目标对象前架设一个拦截层，外界访问本对象需要先通过本层拦截。

最好先了解 Reflect (?

# 参考

《ES6 标准入门(第 3 版)》 第 12 章节。

[MDN - Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 　  
[JS 中的 Reflect 和 Proxy](https://juejin.im/post/5c7e6857e51d4542194f8c6f)

# 创建 Proxy

ES6 提供 Proxy 构造函数，用于生成 Proxy 实例。

```js
const proxy = new Proxy(target, handler)
```

target 参数接收目标对象。  
handler 参数用于制定拦截的行为。

```js
const proxy = new Proxy(
  {},
  {
    get: (target, property) => 35
  }
)
console.log(proxy.a) //35
console.log(proxy.bar) //35
```

需要注意的时，要想使 Proxy 起作用，必须对 Proxy 实例进行操作，而并非对 Proxy 实例的目标对象进行操作。  
且当 handler 为空对象时，等同于直接对原对象进行处理。

不过可以将 Proxy 实例作为目标对象的属性，从而达到在目标对象上进行调用。

```js
const proxy = new Proxy(
  {},
  {
    get: (target, property) => 35
  }
)
const obj = Object.create(proxy)
console.log(obj.foo) // 35
```

# Proxy.revocable()

revocable 是 Proxy 唯一的静态方法。

Proxy.revocable(target, handler) 返回一个可以取消的 Proxy 对象。

```js
let target = {}
let handler = {}

let { proxy, revoke } = Proxy.revocable(target, handler)

proxy.foo = 123
console.log(proxy.foo) // 123

revoke()
console.log(proxy.foo) // Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
```

# this 问题

在 Proxy 代理下，目标对象内的 this 关键字会指向 Proxy 代理。

```js
const target = {
  m: () => {
    console.log(this === proxy)
  }
}
const handler = {}
const proxy = new Proxy(target, handler)
target.m() // false
proxy.m() // true
```

# 拦截操作

handler 对象具有 13 个属性。

对于可以设置但是没有设置的操作，会直接落在目标对象上。

## get()

get(target, propKey, receiver) 方法用于拦截某个属性的读取操作。

get 与 set 方法的第三个参数 receiver 详见 Reflect.get() 部分。

```js
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey)
      if (index < 10) {
        propKey = String(target.length + index)
      }
      return Reflect.get(target, propKey, receiver)
    }
  }
  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}
let arr = createArray(1, 2, 3)
console.log(arr[-1]) // 3
```

如果某个属性不可配置或者不可写，则该属性不能被代理，通过 Proxy 对象访问会报错。

```js
const target = Object.defineProperties(
  {},
  {
    foo: {
      value: 123,
      writable: false,
      configurable: false
    }
  }
)

const proxy = new Proxy(target, {
  get: (target, propKey) => 'abc'
})
proxy.foo // TypeError
```

## set()

set(target, poroKey, value, receiver) 方法用于拦截某个属性的赋值操作。

返回一个布尔值。

```js
//
let validator = {
  set: (obj, prop, value) => {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid')
      }
    }
    // 对于属性名不是 age 的属性，则直接保存
    obj[prop] = value
  }
}

let person = new Proxy({}, validator)

person.age = 100
console.log(person.age) // 100

person.age = '100' // Uncaught TypeError: The age is not an integer
person.age = 300 // Uncaught RangeError: The age seems invalid
```

> 如果对象的某个属性不可写也不可配置，那么 set 不得改变这个属性的值，只能返回同样的值，否则会报错。 --《ES6 标准入门》P<sub>243</sub>

## apply()

apply(target, object, args) 方法拦截函数的调用、call 和 apply 操作。

三个参数分别为 target 目标对象、object 目标对象的上下文(this) 、args 目标对象的参数数组。

```js
const twice = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2
  }
}
const sum = (left, right) => {
  return left + right
}
const proxy = new Proxy(sum, twice)
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30

// 直接调用 Reflect.apply 也会被拦截
Reflect.apply(proxy, null, [7, 8]) // 30
```

## has()

has(target, propKey) 方法用于拦截 HasProperty 操作，判断目标对象是否用友某个属性时，本方法会生效，返回一个布尔值。

has 拦截的使 HasProperty 操作，而不是 HasOwnProperty，并不判断某属性是目标对象本身的还是其继承而来的。

典型的就是 in 运算符。

但是不对 for ... in 循环生效啦。

```js
const handler = {
  has(target, key) {
    if (key[0] === '_') {
      return false
    }
  }
}
const target = {
  _prop: 'foo',
  prop: 'foo'
}
const proxy = new Proxy(target, handler)
'_prop' in proxy // false
```

## construct()

construct(target, args) 方法用于拦截 new 命令。

construct 方法返回的必须是一个对象

```js
const p = new Proxy(function() {}, {
  construct(target, args) {
    console.log(`called: ${args.join(',')}`)
    return { value: args[0] * 10 }
  }
})
console.log(new p(1).value)
// "called： 1“
// 10
```

## deleteProperty()

deleteProperty(target, propKey) 方法用于拦截 delete 操作。若抛错或者返回 false ，则目标属性无法被 delete 删除。

目标对象的不可配置(configurable)的属性不能被 deleteProperty 方法删除。

```js
const handler = {
  deleteProperty(target, key) {
    invariant(key, 'delete')
    return true
  }
}
function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}

const target = { _prop: 'foo' }
const proxy = new Proxy(target, handler)
delete proxy._prop // Uncaught Error: Invalid attempt to delete private "_prop" property
```

## defineProperty()

defineProperty(target, propKey, propDesc) 方法拦截了 Object.defineProperty 操作。返回 false 会使添加新属性抛错。

## getOwnPropertyDescriptor()

getOwnPropertyDescriptor(target, propKey) 拦截 Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者 undefined。

```js
const handler = {
  getOwnPropertyDescriptor(target, key) {
    if (key[0] === '_') {
      return
    }
    return Object.getOwnPropertyDescriptor(target, key)
  }
}
const target = { _foo: 'bar', baz: 'tar' }
const proxy = new Proxy(target, handler)

Object.getOwnPropertyDescriptor(proxy, 'wat')
//  undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
//  undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
//  {value: "tar", writable: true, enumerable: true, configurable: true}
```

## getPrototypeOf()

getPrototypeOf(target) 方法用来拦截获取对象原型，会拦截以下操纵

1. Object.prototype.\_\_proto\_\_
2. Object.prototype.isPrototypeOf()
3. Object.getPrototypeOf()
4. Reflect.getPrototypeOf()
5. instanceof

返回值必须是对象或者 null，否者会报错。

若目标对象不可拓展，则必须返回目标对象的原型对象。

## isExtensible()

isExtensible(target) 方法拦截 Object.isExtensible 操作。

## ownKeys()

ownKeys(target) 拦截对象自身属性的读取操作，拦截以下操作

1. Object.getOwenPropertyNames()
2. Object.getOwenPropertySymbols()
3. Object.keys()

## preventExtensions()

preventExtensions(target) 方法拦截 Object.preventExtensions()。必须返回一个布尔值，否则自动转为布尔值。

只有目标对象不可拓展(Object.isExtensible(proxy) 为 false)时，才能返回 true，否则报错。

## setPrototypeOf()

setPrototypeOf(target, proto) 方法拦截 Object.setProtetypeOf 方法。

```js
const handler = {
  setPrototypeOf(target, proto) {
    throw new Error('Changing the prototype is forbidden')
  }
}
const proto = {}
const target = function() {}
const proxy = new Proxy(target, handler)
Object.setPrototypeOf(proxy, proto) // Uncaught Error: Changing the prototype is forbidden
```
