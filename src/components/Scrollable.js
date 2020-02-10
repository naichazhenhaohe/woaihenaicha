/**
 * @description 为最外层main标签添加滚动事件，作用于 Feed 组件，下拉获取更多博客信息
 * 于 src/router/index.js 中调用
 */
import React from 'react'
export default function Scrollable(props) {
  const handleScroll = e => {
    console.log(e)
    const { scrollHeight, scrollTop, clientHeight } = e.target
    const bottom = scrollHeight - scrollTop <= clientHeight + 100
    if (bottom) {
      props.isBottom()
    }
  }
  return (
    <main onScroll={handleScroll} className={props.className}>
      {props.children}
      <style jsx>{`
        main {
          overflow: auto;
          height: 100vh;
          min-height: calc(100vh - 96px);
        }
      `}</style>
    </main>
  )
}
