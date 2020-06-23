Sytled-JSX, PrismJs, ReactJs

<!-- more --->

最近弃用了 Hexo  
想自己搭建一个 blog  
开发过程中因为好学~~(其实是作死)~~  
陆陆续续换/采用了一些(陌生的)技术栈，因此踩了一些坑，来记录一下  
本文特指 styled-Jsx 以及 PrismJs

# Related Links

[PrismJs - Homepage](https://prismjs.com/)  
[PrismJs - Github](https://github.com/PrismJS/prism/)  
[Styled-Jsx - Github](https://github.com/zeit/styled-jsx)  
[React 拾遗：从 10 种现在流行的 CSS 解决方案谈谈我的最爱 （下）](https://juejin.im/post/5b3dd2d25188251b193d2d7e)

# Styled-Jsx

> Full CSS support for JSX without compromises

## Why Not Styled-Components

(X) Styled-Components  
(O) Styled-Jsx

~~当然是因为 Styled-Jsx 名字更短啦! ~~

其实初选时选择了 Styled-Components 的

但是在使用的过程中遇到了问题

就是在路由切换之后会(目前还不知道理由地)出现样式丢失的问题

在 GitHub 上翻阅了一些其他使用了 Styled-Components 的项目他们并没有遇到一样的问题

只知道在使用 React-Router 且每次路由跳转没有刷新（指全局刷新页面）的情况下，样式会发生丢失

并且通过一系列搜索以及重新翻阅文档也依旧无法解决

## Configure Styled-Jsx

styled-jsx 通过如下指令安装完成之后

```markup
yarn add styled-jsx
// or
npm install --save styled-jsx
```

仅需要在 <inlineCode>.babelrc</inlineCode> 里配置即可

```markup
{
  "plugins": [
    "styled-jsx/babel"
  ]
}
```

但是其实如果是用的 <inlineCode>Create-React-App</inlineCode> 创建的应用的话，ReactJs 的 Babel 配置是在 <inlineCode>package.json</inlineCode> 里的，直接添加上面的代码即可。

```markup
{
  "babel": {
    "plugins": [
      [
        "styled-jsx/babel",
        {"plugins": [ "styled-jsx-plugin-less" ]}
      ]
    ]
    ...
  }
  ...
}
```

## Use Styled-Jsx

使用超简单！  
参考 → [React 拾遗：从 10 种现在流行的 CSS 解决方案谈谈我的最爱 （下）](https://juejin.im/post/5b3dd2d25188251b193d2d7e)

### basic

不需要 import  
直接在 jsx 里(或者使用 styled-jsx 提供的 css 接口)写 CSS 样式即可  
详见如下 demo  
封装了一个供 <inlineCode>markdown-to-jsx</inlineCode> 使用的 a 标签组件

```jsx
import React from 'react'
export default function A({ children, ...props }) {
  return (
    <a target="_blank" {...props}>
      {children}
      {/* 下面部分是 Styled-Jsx 内容 */}
      <style jsx>
        {`
          a {
            text-decoration: none;
            color: #ff7755;
            transition: 0.5s all ease;
            &:hover,
            &:focus {
              color: #00ccff;
            }
          }
        `}
      </style>
    </a>
  )
}
```

### Third-party Components

直接给第三方组件一个 className 然后在 <inlineCode>\<style jsx\></inlineCode> 里定义样式是无效的。

```jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Demo() {
  // 1. 定义一个函数返回 scope 的 className (类名为 styled-jsx 特有类名) 和 styles (内容即 CSS 样式)
  function resolveScopedStyles(scope) {
    return {
      className: scope.props.className,
      styles: scope.props.children
    }
  }
  // 2. 编写样式
  const scoped = resolveScopedStyles(
    <scope>
      <style jsx>{`
        .selected {
          color: white;
          &::before {
            height: 100%;
          }
        }
      `}</style>
    </scope>
  )
  return (
    <>
      {/*3. 给第三方组件传入 className */}
      <NavLink activeClassName={`selected ${scoped.className}`} to="/" exact>
        demo
      </NavLink>
      {/*4. 需要将样式注入 */}
      {scoped.styles}
    </>
  )
}
```

# PrismJs

PrismJs 是用来高亮代码的插件

作为一个程序员写博客还是会插入一些代码的嘛

## Configure

PrismJs 的使用还是比较方便的  
跟 Styled-Jsx 一样下载(然后配置下 Babel )即用

```markup
yarn add prismjs
// or
npm install --save prismjs
```

下载完成之后如下配置 <inlineCode>package.json</inlineCode>

```markup
{
  ... // other options
  "babel": {
    ... // other options
    "plugins": [
      ... // other options
      [
        "prismjs",
        {
          "languages": ["javascript", "css", "html", "jsx", "markup"],
          "plugins": ["line-numbers", "show-language"],
          "theme": "okaidia",
          "css": true
        }
    ]
    ]
  }
}
```

在 languages 数组里填上需要的语言  
Prism 支持一百多种语言，[这里查看支持语言](https://prismjs.com/#supported-languages)  
配置好之后就可以用啦！

## Usage

(我)没有进行选择主题的操作  
因为好像默认选用 OKAIDIA 这个主题  
我还是满意的

```jsx
// 在类组建里
componentDidMount(){
  setTimeout(() => Prism.highlightAll(), 0)
}
// 在 hooks 里
useEffect(() => {
  setTimeout(() => Prism.highlightAll(), 0)
})
```

在主组件里调用过了这个高亮所有的函数之后其实就可以啦

当然啦还需要写 md 文件的时候进行一些配合

````markup
``` jsx  ← 在三个重音符之后需要带上所属语言。需要在 package.json 配置里的那个 language 数组里
return(
  <div></div>
)
...
````
