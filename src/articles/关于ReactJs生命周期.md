ES6, Proxy
<!-- more --->
ReactJS v16 的生命周期有较大变动进行了更新。

做了一个 16.4 之后的生命周期的图。
getDerivedStateFromProps() 在 16.4 进行了一些改动（就是增加了更新时也会触发）。

![生命周期](/ReactJsLifecycle.png)

<center>ReactJs v16+ Lifecycle</center>

(于 V17) 计划删除三个 will 周期函数是为了配合 Fiber。

但是为了向下兼容保留带有 unsafe_ 前缀的三个生命周期函数。

大概就是为了解决组件更新同步的问题，提出了 Fiber ，而 Fiber 的思路大概就是把更新碎片化，这样一来某一个任务没有完成的时候又被 emergency 插队了，这样这个任务又会重新来做一遍，这就导致了一次更新里某些生命周期函数可能会被重复调用。

还是和以前一样的，生命周期分为挂载、更新、卸载三个部分。

# 卸载

当然还是从最简答的来啦。

只有一个 componentWillUnmount() 。

和我一样可怜。

没有参数没有返回值。

作用就是清理一些计时器、网络请求什么的。

清理计时器什么的，忘了的话 React 会有提示，记得到 componentWillUnmount() 里来加。

# 更新

state / props 变动以及 forceUpdate() 会触发更新。

## static getDerivedStateFromProps(nextProps, prevState)

更新和挂载都会进入这个函数。

这里是静态函数所以没法在里面用 this 。

获取新的 props 和旧的 state 进行一些操作，返回值是一个对象用来更新当前的 state 。

用于取代三个 Will 生命周期函数。

componentWillMount / compoentWillReceiveProps / componentWillUpdate 。

## shouldComponentUpdate(nextProps, nextState) 

如果是 forceUpdate() 引发的更新不过经过此函数。

返回一个布尔值，true 表示会触发重新渲染，false 表示不会触发重新渲染，默认返回 true 。

官方表示建议使用 PureComponent 来实现减少渲染。并表示以后的版本即使返回 false 也有可能重新渲染。

## render()

纯函数，返回需要渲染的内容。

## getSnapshotBeforeUpdate(prevProps, prevState)

好像都不怎么推荐使用来着。  
官方举了一个处理 scroll 的例子。

这一步是一个分水岭，之后的操作涉及 DOM 操作，是不可以被中断的，而之前的生命周期都可能被中断，就是说可能一次更新被重复调用。

## componentDidUpdate()

有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的

# 挂载

没啥好说的其实也

## constructor

这个通常的类组件都会用到

除了需要的话不要忘了 super(props)

也不要忘了不要在 constructor() 里使用 setState() 也没啥了。

## static getDerivedStateFromProps(nextProps, prevState)

在挂载阶段这个函数取代了 componentWillMount

## render()

同更新阶段的 render()

## componentDidMount()

在这里可以获取到DOM节点并操作，比如对 canvas，svg 的操作，服务器请求，订阅都可以写在这个里面，但是别忘了在 componentWillUnmount 中取消订阅
