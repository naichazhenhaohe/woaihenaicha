ReactJs, Hook

<!-- more --->

Hooks ReactJs 的 16.8 新特性。  
官方表示期望 Hook 成为编写组件的主要方式。  
还有就是 Hook [ho͝ok]，参考 book 的读音。浩克是 Hulk(

# 参考链接

[Hook 简介](https://zh-hans.reactjs.org/docs/hooks-intro.html#___gatsby)  
[想创建应用程序，只用 React Hooks 就够了](https://mp.weixin.qq.com/s/c3ZEJa_NLpqUW16zkWZucw)  
[React：useHooks 小窍门](https://mp.weixin.qq.com/s/ER6HQRLiD5KwtQtY4xriMw) ← 一些自定义的 Hooks  
[How to use useReducer in React Hooks for performance optimization](https://medium.com/crowdbotics/how-to-use-usereducer-in-react-hooks-for-performance-optimization-ecafca9e7bf5)  
[Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)  
[useMemo 与 useCallback 使用指南](https://zhuanlan.zhihu.com/p/66166173)

# Hooks 简介

ReactJs v16.8 的新特性。  
在之前用 ReactJs 来写组件用的最多的就是类组件和函数组件。最主要的区别就是类组件提供了包括一系列的生命周期函数以及 state 在内的一些的特性。  
[Hooks 的动机](https://zh-hans.reactjs.org/docs/hooks-intro.html#motivation)官方给了描述。  
主要解决如下三方面的问题：

1. 很难在组件之间复用状态逻辑
2. 难以理解复杂的组件
3. 难以理解 class

> Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

虽然感觉第三个问题有点牵强，但是 Hooks 的功能就是为函数组件提供了很多 React 特性。  
至于 Hooks 会不会取代类组件这个问题。很多知乎的回答都是\"可以\"。

> There are no plans to remove classes from React.

上面官网这句话也可以看出，Hooks 的出现是可以取代类组件。但是还没有对应 getSnapshotBeforeUpdate 和 componentDidCatch 这两个生命周期函数的等价 Hook 写法。

Hooks 是由一系列 Hook 组成的，比如 useState，useEffect，useContext，useReducer，useRef 等，还可以自定义 Hook。

# 使用说明

1. 只在函数最外(表)层使用。不要在循环、条件判断或者子函数中调用。
2. 只在函数组件或者自定义 Hook 中调用 Hook。

官方很详细的解释了这两条使用说明，参见[Hook 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)。

关键就是：

> 只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联

每次的渲染 useState 都会返回当前的 state，而将 Hook 与 state 对应就是依据 Hook 的调用顺序，假如说在某个条件判断里引用某个 Hook，当某次渲染跳过了此 Hook，这样 Hook 的调用顺序就会有变动，就可能导致某个 state 和它应该对应的 Hook 没有对应起来，就会导致 bug 出现产生。

# useState

[使用 State Hook](https://zh-hans.reactjs.org/docs/hooks-state.html)

useState 这个 Hook 就是帮助在函数组件里使用 state。  
useState 会返回两个值，当前状态(或者说初始值)以及用于更新这个 state 的函数。

```js
import React, { useState } from 'react'
export default function Demo() {
  const [demo, setDemo] = useState(123)
  // demo 就是一个 state 变量
  // setDemo 就是用于修改 demo 的值的函数
  // useState 的参数 123 就是 state 的初始值
  setDemo(234) // 修改 demo 的值为 234
  return <div>{demo}</div>
}
```

上面的例子中的 setDemo，作用虽然类似于 setState，但是它不会把新旧 state 进行合并。针对某一个 state 变量(比如上例中的 Demo)来说 setDemo 函数和 class 组件里的 setState 是完全一样的。

## 函数式更新

使用 useState 的时候的第二个返回值是一个函数，用于更新 state。该函数会接收之前的 state 作为参数。

```js
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount)
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  )
}
```

# useEffect

处理副操作的 Hook。  
可以把 useEffect 这个 Hook 看做是 componentDidMount 和 componentDidUpdate 以及 componentWillUnmount 这三个函数的组合。

**通过 useEffect 告诉 React 在渲染之后需要执行那些操作，React 会报错作为 useEffect 参数的这个函数，并在每次执行 DOM 更新之后调用它。默认情况下，在第一次挂载渲染以及之后每次的更新渲染都会执行。**

```js
import React, { useState, useEffect } from 'react'
function Example() {
  const [count, setCount] = useState(0)
  // 这里的作用类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

> 每次我们重新渲染，都会生成新的 effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。

## 删除副操作

一些副操作是需要在组件卸载的时候进行删除的，要进行删除，就需要副操作(这里的副操作指的是作为 useEffect 的参数整个函数)返回一个函数，React 将在执行清除操作(或者说卸载)的时候调用这个作为返回值的函数。

```js
// 不需要清除的副操作
useEffect(() => {
  document.title = `You clicked ${count} times`
})
// 需要清除的副操作
useEffect(() => {
  let interval = setInterval(() => {
    // do something
  }, 1000)
  return () => {
    clearInterval(interval)
  }
})
```

例子中的计时器是需要在组件卸载的时候进行清除的。  
说到计时器有看到一篇自定义 useInterval 的文章 → [Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)

## 为什么每次渲染都会调用 useEffect

[解释: 为什么每次更新的时候都要运行 Effect](https://zh-hans.reactjs.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update)

解决的问题：因为容易忘记在 componentDidUpdate 进行一些操作而导致的 bug，而 useEffect 每次渲染（即挂载、每次更新）都会执行，会有效解决因为忽视了 componentDidUpdate 而出现的 bug。

## 跳过 Effect 进行优化

> 如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可。

```js
useEffect(() => {
  document.title = `You clicked ${count} times`
}, [count]) // 仅在 count 更改时更新
```

如果两次渲染，作为 useEffect 的第二个参数的这个数组里的内容**都是**一直的，则 React 会跳过这个 effect 从而实现优化。

> 如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。

还有就是可能见到过传一个空数组作为第二个参数的。目的是让这个 Hook 只运行一次，这就相当于告诉 React 要进行的副操作不依赖任何的 state 或者 props，所以永远也不会重复执行。

# useContext

用于接收一个 Context 对象。**只是用来读取 context**，需要在上层组件中 createContext 来申明 context。  
Context 对象值为上层组件中距离当前组件最近的\<ContextName.Provider\>提供的 value。  
就是说 useContext 的作用类似于 \<ContextName.Consumer\>  
举一个官方给的例子，就能很好的理解 useContext 的用法：

```js
// 作为 context 值的对象。
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}

const ThemeContext = React.createContext(themes.light)

function App() {
  return (
    // 需要在上层组件中声明 Context
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  // 获取上层组件中声明的context
  const theme = useContext(ThemeContext)
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>I am styled by theme context!</button>
  )
}
```

# useReducer

[useReducer](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)  
[How to use useReducer in React Hooks for performance optimization](https://medium.com/crowdbotics/how-to-use-usereducer-in-react-hooks-for-performance-optimization-ecafca9e7bf5)  
某种程度上来说，useState 也是 useReducer 的一种。  
如果熟悉 redux 的话，关于 useReducer 的理解就很容易。如果不熟悉 redux 的话，当然先去熟悉下 redux 啦。

```js
const initialState = { count: 0 }
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  // 或者可以直接使用如下代码
  // const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}
```

useReducer 的参数第一个是一个 reducer 函数，第二个参数是 store 初值（虽然官方给的例子里用的是 state，但是其实和 redux 里的 store 是一个东西。

相比之下使用的成本（考虑学习成本和其他因素）确实比 redux 好用，但是能不能说直接取代了 redux，感觉还是看实际需求。

# useCallback & uesMemo

[useMemo 与 useCallback 使用指南](https://zhuanlan.zhihu.com/p/66166173)

最大的区别在于 useCallback 返回一个 memoized 回调函数，而 useMemo 返回一组个 memoized 值。

如果不知道 memoized 的话回想一下 React.memo 的作用，不知道 React.memo 的话...  
→ ReactJS 官方给的链接：[Memoization](https://en.wikipedia.org/wiki/Memoization)  
→ 我觉得看这个就够了：[React.memo](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo)

```js 语法
// useCallback
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
// useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

useMemo 把\"创建\"函数和依赖项作为参数，返回一个 memozied 值，仅当某个依赖项改变时才会重新计算返回值。  
useCallback 把内联函数以及依赖作为参数，返回值为这个函数的 memoized 版本，仅在某个依赖项改变时才会更新。

**useCallback(fn, deps) 相当于 useMemo(() => fn, deps)**

和 useEffect 还是很像的，有几个区别

1. useEffect 会在(无第二个参数的情况下)每次渲染都执行，而 useMemo 和 useCallback 会在挂载(或者说第一次渲染)的时候执行，之后仅在依赖项变动之后更新。
2. 只有 useEffect 能进行副作用操作，useMemo 和 useCallback 不行。

> 传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

# useRef

[Refs and the DOM](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)
[useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)

> 本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的\"盒子\"。

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    inputEl.current.focus()
  }
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```

例子中的使用和类组件里的 ref 一样，如果将 ref 对象以 \<div ref={myRef} /\> 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。

可以用来获取节点实例，但是本质还是一个存值的盒子，当然 ref 对象发生变化时，并不会被通知到，相反的变动 current 属性也不会引发组件的重渲染。

```js
function Timer() {
  const intervalRef = useRef()
  useEffect(() => {
    const id = setInterval(() => {
      // ...
    })
    intervalRef.current = id
    return () => {
      clearInterval(intervalRef.current)
    }
  })
  // ...
}
```

# 自定义 Hook

[自定义 Hook](https://zh-hans.reactjs.org/docs/hooks-custom.html)  
[Hooks FAQ](https://zh-hans.reactjs.org/docs/hooks-faq.html)

看了官方对于自定义 Hook 的描述，可以感觉到自定义 Hook 是针对解决组件间状态逻辑复用的问题的，而也就是这样，才会有知乎上一大堆类\"Hooks 能不能取代 Redux\"问题。

> 自定义 Hook 是一个函数，其名称以 "use" 开头，函数内部可以调用其他的 Hook。

虽然可以在自定义 Hook 中引用其他 Hook，但是还是要遵守 Hook 规则，仅在自定义 Hook 的顶层使用其他 Hook。

上面两个链接里有很多拓展的想法/思路。因为又是自定义，开放性很强，~~再加上懒~~所以就不多说了
