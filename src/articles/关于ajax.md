Ajax 是 2005 年发布的一个技术，以 XMLHttpRequest 为核心，向服务器请求额外的数据而无需卸载页面

虽然还是用的 axios 多一点啦

但是再其实两者都是基于 XMLHttpRequest 的

# 参考连接

[AJAX](https://www.liaoxuefeng.com/wiki/1022910821149312/1023022332902400)

《JavaScript 高级程序设计》
P<sub>571</sub> 第 21 章 Ajax 与 Comet

# 一些说明

Ajax (和 axios) 的核心都是 XMLHttpRequest 对象 (即 XHR)。  
一次 HTTP 请求对应一个页面。  
以异步的方式从服务器获取数据，意味着用户进行一些操作后（比如单击），可以不必刷新页面也能获取到新的数据。  
不必刷新页面就能获取到数据意义重大。  
**异步**是重点。  
Ajax 通信与数据格式无关。  
~~Ajax 读起来没有 Axios 好听~~  
以及本文的 Ajax 与 jQuery 里的 ajax 不同。因为对 jQuery 没有那么熟悉(也不是非常的喜爱)所以没有对 jQuery 里的 ajax 进行总结。

# XMLHttpRequest

既然是核心，还是要看一看。

IE7+、FireFox、Opera、Chrome 和 Safari 都支持原生的 XHR 对象，可以直接使用 XMLHttpRequest 的构造函数

```js
const xhr = new XMLHttpRequest();
```

## open() & send()

主要通过这两个函数来进行请求的发送。

open() 的三个参数：

1. 请求类型 ( GET / POST 这些
2. URL
3. 是否异步发送 (默认为 true，若设置为 false 则变成同步，若请求时间过长，浏览器会进入假死状态

send() 的参数：

作为请求主体发送的数据。若不需要测传 null ，因为这个参数**对于某些浏览器是必须的**。  
GET 请求不需要参数，POST 请求需要把 body 部分以字符串或者 FormData 对象传进去。

举个例子：

```js
const xhr = new XMLHttpRequest();
// 只传两个参数，保持异步请求。
xhr.open("get", "https://somewhere.com");
xhr.send(null);
```

## 请求结果

在收到响应后，响应的数据会自动填充为 xhr 对象的属性。

1. responseText: 作为响应主体被返回的文本
2. responseXML: 如果响应内容为\"text/xml\"或者\"application/xml\"，这个属性保存包含相应数据的 xml 文档。
3. status: 响应的 HTTP 状态
4. statusText: HTTP 状态说明。

根据请求结果来进行一系列的判断和后序操作

```js
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
  console.log(xhr.responseText);
} else {
  console.log(`request failed: ${xhr.status}`);
}
```

判断 status 为 200 或 200+ 是因为有的浏览器会错误的报告 204 状态码。  
判断 status 为 304 是因为 304 代表请求的资源并没有被修改，可以直接使用本地的。

## readyState & onreadystatechange

readyState 也是 XHR 对象的属性，有如下几个值：

1. 0: 未初始化。尚未调用 open()
2. 1: 启动。已调用 open() ，但没有调用 send()
3. 2: 发送。已调用 send() ，但没有收到响应。
4. 3: 接收。接受到部分响应。
5. 4: 完成。接受到全部的数据，并且可以在客户端使用。

而 readyState 变动一次就会触发一次 onreadystatechange 事件。

不过，必须在调用 open() 前指定 onreadystatechange 事件才能确保跨浏览器的兼容性。

举个例子:

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.responseText);
    } else {
      console.log(`request failed: ${xhr.status}`);
    }
  }
};
// 先定义监听事件再发送数据
xhr.open("get", "https://somewhere.com");
xhr.send(null);
```

## abort()

> 在接受到相应后还可以调用 abort() 事件，而且也不再允许访问任何与相应有关的对象属性。在终止请求之后，还应该对 XHR 对象进行解引用操作。由于内存原因，不建议重用 XHR 对象。 -- -- 《JavaScript 高级程序设计》

## header

每个 HTTP 请求都会带有 header

使用 setRequestHeader() 方法可以设置自定义请求 header，要成功发送头部信息，必须在调用 open() 之后，send() 之前。

```js
xhr.open("get", "https://somewhere.com");
xhr.setRequestHeader("demoHeader", "demo");
xhr.send(null);
```

使用 getResponseHeader() 可以取得相应的头部信息，使用 getAllResponseHeaders() 可以获取到响应的所有 header 信息。

```js
const demo = xhr.getReponseHeader("demoHeader");
const allHeaders = xhr.getAllResponseHeaders();
```

## 跨域问题

Ajax 是遵守同源策略的。

[关于跨域](https://naichazhenhaohe.github.io/2019/09/09/%E5%85%B3%E4%BA%8E%E8%B7%A8%E5%9F%9F/)

## jQuery 的 Ajax

jQuery 这么强，当然会对 Ajax 进行封装啦。

```js jQueyr 里的 Ajax
$.ajax({
  type: "POST",
  url: url,
  data: data,
  dataType: dataType,
  success: function() {},
  error: function() {}
});
```

当然还有一些别的参数可以使用，不过最常用的内容就是上面这些。
