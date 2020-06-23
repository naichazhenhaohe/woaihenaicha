import React, { useEffect } from 'react'
import Prism from 'prismjs'
import isPhone from '@/utils/isPhone'
import Markdown from './markdown'

export default function Root (props) {
  document.body.scrollTop = 0
  const { title } = props.match.params
  const content = require(`@/articles/${title}.md`).default.split('<!-- more --->') || ''

  const TAGS = content[0].replace('/\r/g', "").split(', ') || []

  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0)
  })

  return (
    <main className={isPhone ? 'mobile-main' : 'PC-main'}>
      <header>{title}</header>
      <div className="tagBox">
        {TAGS &&
          TAGS.map((item, index) => (
            <div className={isPhone ? 'tag' : 'tag PC-tag'} key={index}>
              {item}
            </div>
          ))}
      </div>
      <Markdown content={content[1]} />
      <style jsx>{`
        .PC-main {
          max-width: 1000px;
          margin: 0 auto;
          padding-bottom: 5vh;
        }
        .mobile-main {
          width: 90vw;
          margin: 0 5vw;
          padding-bottom: 5vh;
        }
        header {
          text-align: center;
          display: block;
          font-size: 2rem;
          margin-block-start: 0.67em;
          margin-block-end: 0.67em;
          font-weight: bold;
          color: #ffffff;
          opacity: 0.9;
        }
        .tagBox {
          text-align: center;
          margin: 20px 0;
        }
        .PC-tag {
          letter-spacing: 1px;
          font-size: 1.3rem;
          height: 30px;
          line-height: 30px;
        }
        .tag {
          display: inline-block;
          background-color: #e9e9e9;
          border-radius: 5px;
          font-size: 1.1rem;
          height: 25px;
          line-height: 25px;
          padding: 0 5px;
          margin: 0 5px;
          position: relative;
          cursor: pointer;
          &:before {
            content: '#';
            left: 0;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </main>
  )
}
