因为刚入坑 VueJs  
有一些很酷的的代码  
在撸公司源代码的时候看到下面这两行  

```js
const Extend = Vue.extend({ ...(data || {}) });
const Content = new Extend().$mount();
```

觉得特别有意思(只要是对 extend 不是很熟，又看到了直接 new 了一个\$monent())哈，就比较仔细的看了一下。

<!-- more -->

# 相关链接

[Vue.extend(options)](https://cn.vuejs.org/v2/api/#Vue-extend)  
[vm.\$mount([elementOrSelector])](https://cn.vuejs.org/v2/api/#vm-mount)  

↑ 两个主要函数的官方 API 文档。其实没什么帮助哈，还有一个\$el 忘记并懒得引用了。

# 相关代码

```js
function renderComponent({ el = "body", data = {} }) {
  const Extend = Vue.extend({ ...(data || {}) });
  const Content = new Extend().$mount();
  if (el.nodeName) {
    el.append(Content.$el);
  } else {
    document.querySelector(el).appendChild(Content.$el);
  }
  return Content;
}
```

代码用于一个叫 vue-orgchart 的组件。  
这个组件用于生成树状卡片，然后代码里的 renderComponent() 函数是作为生成卡片的代码的一部分。  
所以目的也很明确就是生成或者说渲染组件(虽然函数名就能看出来 hhh  

其实代码也有一些很奇怪的地方。。比如 data 参数已经默认为{}了为什么还要在给给 Vue.extend()传参的时候再进行一次判断。就很迷哈，小细节就不处理了。

if 语句块就是判断一下传入的 el 参数是否为真实节点，是的话就直接把生成的节点(这里用\$el 直接获取到实例)挂上去，如果不是的话，还要用原生 DOM 操作来获取一下。

所以其实一开始看到一脸懵逼的地方还是那两行定义语句。

# 相关说明

```js
// 修改了 ...(data||{}) 为 ...data
const Extend = Vue.extend({ ...data });
const Content = new Extend().$mount();
```

好玩的还是这两行代码。

**Vue.extend() 官方的解释是一个构造器，能创建一个\"子类\"。**

传入的参数就是一些包括生命周期函数、data（需要是函数）、props 等内容在内的一个对象。

这里只是生成了一个构造器。优势呢在于可以接受一个包括模版在内的一些配置项，所以**异步接收**一些组件的配置内容就应该需要用到这个 Vue.extend() 函数了。

后面的 Content 的定义就有点玄幻了。虽然因为当时忘记打印看看 Extend 是个什么东西了不知道 Extend() 是个什么东西，但是可以预感到返回值是一个实例对象。

其实除了粗浅的经验外，看了 \$mount() 的定义之后可以能证实。

官网提到 **vm.\$mount( [elementOrSelector] ) 的返回值就是 vm 本身**。调用\$mount()的 vm 和返回的 vm 的区别就是返回的 vm 是已被挂载的实例。**所以不管怎么样 vm 就是组件实例。**Extend()的返回值就是一个组件实例。(但是这里的说法是有问题的！

所以 \$mount() 的作用也就知道啦，就是**用来挂载这个刚被生成的未被挂载过的组件**。

这里还有一个坑当时想了半天就是，给 Vue.extend()传入的 data，就算有 el 选项，它也只是一个组件构造器，不会进行挂载，因为它甚至还不是一个实例，而 Extend() 的作用就是生成一个实例(这里注意大小写，是代码里的 Extend()，而不是 Vue.extend()

虽然现在想想没什么嘛，但是当时~~可能是公司暖气开太足了脑子跑不动，~~想了好久已经传了 el 为什么还要再 mount()一下。

**后面才是重头哈！有意思的东西来了**

最后再来说这个 new 。

new 后面跟的，应该是一个构造函数才对。

虽然代码里的字面意思就是新建了一个已经被挂载好了的组件实例。(不是这样的！不是这样的！不是这样的！

复习一下引用到 new 的时候会进行的操作。

1. 新建一个空的对象，作为要返回的一个实例对象。
2. 把这个空对象的原型指向构造函数的 prototype
3. 再将这个空对象赋值给函数内部的 this
4. 执行构造函数的内部代码

那么这就冲突了（其实不确定

Extend().\$mount() 已经是一个实例了，还能作为构造函数吗。

打印了一下 Content ，可以看到已经是一个 Vue 组件了。

```js
VueComponent {_uid: 25, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
```

```js
Vue.prototype.$mount = function(el, hydrating) {
  el = el && query(el);

  // resolve template/el and convert to render function
  // 接下来的一些代码解析了模版以及el并转到渲染函数
  // 就是其实和 el / hydrating / mount 无关，这仨就没出现过

  return mount.call(this, el, hydrating);
};
```

返回了一个 mount 的调用。。。

To be completed...
