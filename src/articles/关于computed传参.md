VueJs, Computed

<!-- more --->

Vue 的 compouted 属性也会被添加到实例中。  
虽然可以给 computed 设置 setter，但是（正常来说）是不可以接收参数的

<!--more-->

# 参考链接

[vue 计算属性怎么传参](https://segmentfault.com/q/1010000009648670) 里的高赞回答

# 一些说明

computed 的存在，一方面是简化标签里面的运算/操作，另一方面还有就是它是响应式依赖缓存的。

就是说只有 computed 属性依赖的值变动才会进行更新。

但是下面提到的使用闭包的方法有没有破坏这个特性我没有真正的去测试过（但是上面的链接的答主说是支持缓存的

虽然我没有测，但是闭包嘛 hhh 它的特性就让人觉得缓存没有问题。

至于为什么不直接使用官方推荐的 methods

:)

# 问题引入

实际的代码没有。

大概就是 v-for 循环了几个组件

然后需要进行 v-if 判断

判断又依赖于 v-for 循环得到的下标

所以出现了这个问题。

具体的解决方案：

1. 把 v-if / v-for 直接一起写在标签里同时混用。应该会收到 Eslint 的警告，但是并不影响食用，我就是看的公司代码报错了，实在忍不住来优化的
2. 使用 method 。这毕竟是官方推荐食用的。思路就是接受参数并返回一个布尔值，其实食用 method 口感也会很好
3. 使用闭包给 computed 传参。具体的响应式缓存香不香另说，但是用起来觉得很帅。
4. setter。感觉 setter 可以曲线救国，但是只是猜想。

# 实际解决

```html
<template v-for="(item, index) of foo">
  <div v-if="bar(index)">
    something
  </div>
</template>
<script>
  export default {
    // ...
    computed: {
      bar: function() {
        return function(index) {
          // 因为忘了具体的业务逻辑
          // 如果只需要获取数组里的一部分这种简单的逻辑 没有必要这样。。。
          if (index > 4) {
            return true
          }
          return false
        }
      }
    }
  }
</script>
```
