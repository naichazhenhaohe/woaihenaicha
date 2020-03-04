/**
 * @description 为最外层main标签添加滚动事件，作用于 Feed 组件，下拉获取更多博客信息
 * 于 src/router/index.js 中调用
 */
import React, { useState, useRef } from 'react'
import ToTop from '@com/ToTop'
import isPhone from '@/utils/isPhone'

export default function Scrollable(props) {
  const handleScroll = e => {
    const { scrollHeight, scrollTop, clientHeight } = e.target
    const bottom = scrollHeight - scrollTop <= clientHeight + 100
    if (scrollTop >= 200) {
      setIsTop(true)
    } else {
      setIsTop(false)
    }
    if (bottom) {
      props.isBottom()
    }
  }
  const [isTop, setIsTop] = useState(false)
  const mainRef = useRef(null)
  return (
    <main ref={mainRef} onScroll={handleScroll} className={props.className}>
      {props.children}
      {isTop && !isPhone ? <ToTop theRef={mainRef} /> : ''}
      <style jsx>{`
        main {
          height: 100vh;
          min-height: calc(100vh - 96px);
          overflow-x: hidden;
          overflow-y: auto;
          width: 100vw;
        }
      `}</style>
    </main>
  )
}
