CSS3, Transition, Transfrom, Translate

<!-- more --->

# 一些说明

trans- 指

1. transition
2. transform
3. translate() → 又包括 translateX() / translateY() / translateZ() / translate3d()

# 相关链接

[MDN 文档: animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)

[MDN 文档 - transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)

[MDN：transform-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function)

# transition

该属性也是一个复合(简写)属性。包括 transition-property，transition-duration，transition-timing-function 和 transition-delay 四个属性。

简单来说，这个属性的作用，看起来和 animation 有一定的相似度(从效果和定义上来看，都是会动的(?)，以及一小部分属性值也很类似，具体的功能就是**允许 CSS 的属性值在一定的时间区间内平滑地过渡**。

## transition-property

值为需要进行过渡的属性名或 none 或 all。

all 就是针对所有可被动画的属性都表现出过渡动画。

none 就是指没有过渡动画。

可能不太好理解什么是要过渡的属性，举个例子：

```css
.demoDiv {
  margin-top: 100px;
  /* 下一行中的 margin-top 就是要过渡的属性名 */
  transition-property: margin-top;
  transition-duration: 2s;
  &:hover {
    margin-top: 200px;
  }
}
```

可以看到 transition-property 的属性值为 "margin-top" ，而 margin-top 就是需要过渡的属性名

上面这个例子中过渡的效果就是当 .demoDiv 被鼠标覆盖时 margin-top 会在 2s 内由 100px 变成 200px

## transition-duration

为过渡的实现进行定时。

单位为 s / ms。

默认值是 0s，当属性值是默认值时，实现的效果是没有过渡动画而不是就不发生转变了，就是说转变会立刻完成，而不会有明显的过渡效果。

在上一个例子中 transition-duration 的值就是 2s , 所以过渡效果会在 2s 内完成。

## transition-timing-function

> CSS 属性受到 transition effect 的影响，会产生不断变化的中间值，而 CSS transition-timing-function 属性用来描述这个中间值是怎样计算的。实质上，通过这个函数会建立一条加速度曲线，因此在整个 transition 变化过程中，变化速度可以不断改变。

大概来说就是这个值会影响过渡动画进行时的变化速度。

也就是说 transition-duration 定义了过渡的时间，而 transition-timing-function 则定义在这个时间内过渡效果要**怎么完成**。

属性值有：

1. ease → 默认值
2. ease-in
3. ease-out
4. ease-in-out
5. linear
6. step-start
7. step-end
8. steps(n, end)
9. cubic-bezier()

举两个例子：

```html
<style type="text/css">
  .demo {
    width: 100px;
    height: 100px;
    margin: 5vh 5vw;
  }
  .demo:hover {
    width: 200px;
  }
  .red {
    background-color: #f34141;
    transition: width 1s ease-in;
  }
  .blue {
    background-color: #41b9f3;
    transition: width 1s ease-out;
  }
</style>
<body>
  <div class="red demo">this is demo2</div>
  <div class="blue demo">this is demo1</div>
</body>
```

<center>

![ease-in](/关于trans-ease-in.gif)

</center>

<center>图1  ease-in 的效果 </center>

<center>

![ease-out](/关于trans-ease-out.gif)

</center>

<center>图2  ease-out 的效果 </center>

可以看到 transition 不仅对过渡动画的**进行**有作用，对过渡动画的**撤销**也有效果。从上面的红块的变动可以看出变长时的动画先缓慢后加速，鼠标移开之后变回原样也是先慢后变快。

demo 的效果不是特别好，可以参考 [MDN 的 transition-timing-function 示例](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function#%E7%A4%BA%E4%BE%8B)

ease-in / ease-out / ease-in-out 这三个很好理解，分别是 过渡刚开始时较缓慢、过渡快结束时较缓慢以及最后一个过渡刚开始、快结束都会较缓慢。

하지만!

可能会误认为 ease 是整个过渡动画均速进行。其实这个是 linear (线性) 才会有的效果。

而 ease 和 ease-in-out 才是相似的。

区别在哪里呢，这就要用到 [cubic-bezier()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function#%E5%AE%9A%E6%97%B6%E5%87%BD%E6%95%B0) 这个定时函数了。ease 等于 cubic-bezier(0.25,0.1,0.25,1)，而 ease-in-out 等于 cubic-bezier(0.42,0,0.58,1)。

step-start / step-end 这两个 一个是在过渡计时开始时(step-start)直接完成转变，一个是在过渡计时结束时(step-end)直接完成转变。

steps(n, end) 相对来说最为复杂(抛开 cubic-bezier 不谈)。 n 是整数，第二个参数可以是 end / start / jump-start / jump-end / jump-none / jump-both 。举个例子：steps(4, end) 过渡效果不是线性的，而是点状的跳 4 下完成过渡。当然啦不是保持同一个状态跳 4 下然后突然完成过渡。

[cubic-bezier(num1,num2,num3,mun4)的介绍传送门](https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function#%E5%AE%9A%E6%97%B6%E5%87%BD%E6%95%B0)

## transition-delay

规定了在过渡效果开始作用之前需要等待的时间。

单位为 s / ms

默认值也是 0s 。默认不进行延迟。

## tips

一个 transition 属性可以为多个 CSS 属性指定过渡效果 ，多个属性的过渡效果之间使用 "," 隔开。

举个 MDN 的例子，例子进行了一些删减，删除了不相关的 CSS 属性

```css
.box {
  -webkit-transition: width 2s, height 2s, background-color 2s, -webkit-transform 2s;
  transition: width 2s, height 2s, background-color 2s, transform 2s;
}
```

## 触发条件

触发条件主要有三个

1. CSS 伪类触发。
   比如上面举的例子的触发条件都是 :hover
2. 媒体查询触发
   @meida 当窗口尺寸变动时触发。
3. JavaScript 触发
   上面有提到 transform 也是可以使用过渡的

```html
<div id="transistion"></div>
<style>
  window.onload = function() {
    let div = document.getElementById('transistion')
    div.style.transform = 'rotate(30deg)'
  }
</style>
```

# transform

transform 属性允许旋转，缩放，倾斜或平移给定元素

这是通过修改 CSS 视觉格式化模型的坐标空间(?)来实现的。

transform 属性也可以使用 transition 进行过渡

属性值：

1. none：不应用任何的变形。
2. 一个或多个：[transform-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function) 指包括后面提到的函数在内的一系列转换函数。

## rotate( )

只有一个参数，用于表示角的大小。

从 y 轴正向开始顺时针偏移 (就是说当值大于 0 时，向着第一象限的方向偏移，值大于 90 度则会进入第四象限

1. 度（degrees） 单位 deg 。一个完整的圆是 360 deg。
2. 百分度（gradians） 单位 grad 。一个完整的圆是 400 grad。
3. 弧度（radians） 单位 rad。 一个完整的圆的弧度是 2π ，约等于 6.28 rad。
4. 圈数（turns） 单位 turn。 一个完整的圆是 1 trun。

举个例子：

**90deg = 100grad = 0.25turn ≈ 1.5708rad**

<center style='transform: rotate(-3deg); margin-bottom: 5vh;'>

![ss-salmon-run](/关于trans-ss-salmon-run.jpg)

</center>

↑ 上面这张图用到了 "transform: rotate(-3deg)" 这条样式语句。

## scale( )

用于修改元素的大小。

参数 sx / sy 当且仅当 sx 等于 sy 时，可以只写一个。

同时这个函数可以看做是 scaleX(sx) scaleY(sy) 函数的整合。

有一个例子，先看代码

```html
<style>
  .box {
    text-align: center;
    height: 200px;
    overflow: auto;
  }
  .box div {
    display: inline-block;
    line-height: 100px;
    width: 100px;
    height: 100px;
    text-align: inherit;
    margin-top: 5vh;
  }
  .red {
    background-color: #f34141;
    transform: scale(2);
  }
  .blue {
    background-color: #41b9f3;
  }
  .green {
    background-color: #2aea39;
    transform: scale(-2);
  }
</style>
<div class="box">
  <div class="demo red">demo 1</div>
  <div class="demo blue">demo 2</div>
  <div class="demo green">demo 3</div>
</div>
```

<div class='box'>
  <div class='demo red' > demo 1</div>
  <div class='demo blue' > demo 2</div>
  <div class='demo green' > demo 3</div>
</div>

打开开发者工具检查一下就可以看出 scale() 这个函数进行了什么样的处理。

将内容为 demo 3 的这个 div 包括 margin 在内的状态进行了二维平面内的旋转。

scale() 是仅适用于在二维平面上的变换的。

要进行 3D 变换可以使用 scale3d(sx,sy,sz) 参数中多了一个 sz 服务于 z 轴延申

原理与 scale() 类似。

## skew( )

前面的 rotate() 和 scale() 分别用于旋转和依据 x/y\[/z]轴修改大小。

而这个函数实现的功能则是歪斜变换。

与 scale() 类似， skew() 也可看成是 skewX(ax) 与 skewY(ay) 的合成函数。

有两个参数 ax / ay 表示在每个方向的倾斜量。

**注意：**与 scale() 的两个参数不同的是，当 skew() 函数只有一个参数是，默认 ay 等于 0 而不是默认 ay 等于 ax

> 该变换是剪切（指的是会损失像素点）映射（横向），其在水平和垂直方向上将像素点扭曲一定角度。每个点的坐标根据新点与指定角度成比例的值和到原点的距离决定;因此，距离原点越远，添加的值就越大。

ax 和 ay 的值与 rotate() 参数一致，用于表示角度，单位为 deg / grad / rad /turn

## transform-origin

上面总结了 transform 是在不影响正常文档流的情况下允许修改元素的外观或位置。

默认的原点确实在**元素的中心位置**

但是可以通过 transform-origin 属性改变原点位置。

transform-origin 的属性值有可以有一、二、三个。分别代表 x 轴 ，y 轴 ，z 轴的偏移量。

参数可以是长度值(单位为 px、em 这些)、百分比（**这里的百分比参照的是这块区域的宽高**）、以及关键字(left/bottom/top/right/center) , 当有第三个元素的时候只能使用长度值，用于表示 z 轴偏移量。

**注意：**这里的偏移是相对起始点的。而默认的起始点在内边距的左上角。

# translate()

这一系列的函数通常作为 transform 的参数使用

有如下成员

1. translate()
2. translateX()
3. translateY()
4. translate3d()
5. translateZ()

和 rotate() 很像，有 x/y/z 以及 3d 版本。

对于图形的旋转、倾斜、大小变化都已经介绍了，translate() 实现的功能则是平移。

## translate( )

translate(tx, ty)

有两个参数，当只给一个参数时，如同 skew() 一般，默认 ty 为 0 ，而不是等同于 tx 。

tx / ty 就是常规的长度数据，单位可以是 em / px / vh 等等。

举个例子：

```html
<div style="width: 60px; height: 60px; background-color: #f34141;">demo 1</div>
<div style="width: 60px; height: 60px; background-color: #41b9f3; transform: translate(20px,5px)">
  Moved demo 2
</div>
<div style="width: 60px; height: 60px; background-color: #2aea39;">demo 3</div>
```

<div style='width: 60px; height: 60px; background-color: #f34141;'>demo 1</div>
<div style='width: 60px; height: 60px; background-color: #41b9f3; transform: translate(20px,5px)'>Moved demo 2</div>
<div style='width: 60px; height: 60px; background-color: #2aea39;'>demo 3</div>

## translate3d( )

translate3d(tx,ty,tz) 具有三个参数，相比 translate() 多了 tz 参数。

举一个例子：

```html
<div class="demo-3d-1">demo 1</div>
<div class="demo-3d-2">Moved demo 2</div>
<div class="demo-3d-3">demo 3</div>
```

```css
.demo-3d-1,
.demo-3d-2,
.demo-3d-3 {
  width: 60px;
  height: 60px;
  background-color: skyblue;
}
.demo-3d-2 {
  width: 60px;
  height: 60px;
  background-color: pink;
  transform: perspective(500px) translate3d(10px, 0, 100px);
}
```

<div class='demo-3d-1'>demo 1</div>
<div class='demo-3d-2'>Moved demo 2</div>
<div class='demo-3d-3'>demo 3</div>

[关于 perspective()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective)

## tips

translate3d() 可以说是 translateX(tx) / translateY(ty) / translateZ(tz) 的复合函数
translate() 可以说是 translateX(tx) / translateY(ty) 的复合函数

两个函数的区别如同 rotate() / scale() 一样，不带 3d 字眼时，作用于二维平面。

那这里就不在多介绍 X/Y/Z 三个子函数(应该不能称为子函数，但是应该也能理解到是什么 hhh)了。

好嘞，那收工啦！
