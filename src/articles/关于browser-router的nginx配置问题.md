ReactJs, Browser Router, Nginx

<!-- more --->

React-Router 里有两种 Router ，分别是 Browser-Router 和 Hash-Router

Browser Router 是 React 是官方推荐的，但是需要做一些服务器的支持。

# 参考链接

[react router 项目部署 nginx 配置问题](https://www.jianshu.com/p/51ba2bec00c7)

# 问题

使用 browser history 的路由模式时，

举个例子，访问某应用的 demo 路由，网址为 https://xxx.xxx.xxx.xxx/demo

服务器会从目录文件中的 demo 文件夹中去寻找所对应的应用资源  
但是其实 demo 只是一个路由，服务器中并不存在 demo 文件夹，由此在刷新游览器时，会出现 404 的情况。

# 配置

CentOS 7.6
nginx 1.12.1

# 查看 nginx.conf 位置

要配置就需要先找到 nginx.conf 的位置嘛。  
我没记错的话要是没有扔资源在默认文件夹，直接输入网址会显示 nginx 的初始页面，有写配置文件的坐标。

如果忘了且没有地方的话。

```markup
$ ps aux|grep nginx
```

![配置文件坐标-1](/配置文件坐标-1.png)

</div>
以我的服务器为例，会显示如图红色下划线的部分的一个地址，根据这个地址输入以下命令

```markup
$ /usr/sbin/nginx -t
```

就会暴露如下图所示的配置文件的位置

<div class='centerPic'>

![配置文件坐标-2](/配置文件坐标-2.png)

# 配置 nginx

找到配置文件的位置后进行配置。

因为我把网站直接扔在了**根目录**，所以只需要进行如下配置

```markup
location / {
    root   html;
    index  index.html;
    # url 切换时始终返回index.html
    try_files $uri /index.html;
}
```

假如配置在子目录下，以 /app 为例

```markup
# nginx配置
location /app {
    root   html;
    index  index.html;
    # url 切换时始终返回index.html
    try_files $uri /app/index.html;
}
# 图片样式缓存1年
location ~* /app.*\.(js|css|png|jpg)$
{
    access_log off;
    expires    365d;
}
# html/xml/json 文件不缓存
location ~* /app.*\.(?:manifest|appcache|html?|xml|json)$
{
    expires    -1;
}
```

同时，在项目的 package.json 文件里配置

```markup
"homepage": "http://your-address/app",
```

并且，在 React-Router 里指定 basename

```html
<BrowserRouter basename="/app"> </BrowserRouter>
```

# 配置完成后重启 nginx

如果配置文件的更改没有出错的话，调用如下命令直接会成功，针对 browser router 的服务器配置也就完成了。

```markup
$ service nginx restart
```

如果报错了，则说明配置文件时，出错了
可能是少了分号或者可能有单词拼写错误

我遇到的问题是，把 $uri 写了了 $url

重启完成之后，配置就结束了
