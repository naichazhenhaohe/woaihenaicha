import React, { useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import Prism from 'prismjs'
import H1 from '@com/articleTags/H1'
import H2 from '@com/articleTags/H2'
import H3 from '@com/articleTags/H3'
import Paragraph from '@com/articleTags/Paragraph'
import Blockquote from '@com/articleTags/Blockquote'
import A from '@com/articleTags/A'
import Ol from '@com/articleTags/Ol'
import Ul from '@com/articleTags/Ul'
import Td from '@com/articleTags/Td'
import Th from '@com/articleTags/Th'
import Tr from '@com/articleTags/Tr'
import Thead from '@com/articleTags/Thead'
import Table from '@com/articleTags/Table'
import InlineCode from '@com/articleTags/InlineCode'
import Soda from '@com/articleDemos/Soda'
import Img from '@com/articleTags/Img'

export default function Root(props) {
  const { state } = props.location
  const MAIN = require(`@/articles/${state.name}.md`).default || ''
  const TAGS = state.tags || []
  const TITLE = state.name || ''
  const scoped = resolveScopedStyles(
    <scope>
      <style jsx>{`
        .markdown {
          font-size: 1.2rem;
          color: #ffffff;
          letter-spacing: 1px;
          cursor: default;
        }
      `}</style>
    </scope>
  )
  function resolveScopedStyles(scope) {
    return {
      className: scope.props.className,
      styles: scope.props.children
    }
  }

  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0)
  })

  return (
    <main>
      <header>{TITLE}</header>
      <div className="tagBox">
        {TAGS &&
          TAGS.map((item, index) => (
            <div className="tag" key={index}>
              {item}
            </div>
          ))}
      </div>
      <Markdown
        className={`markdown ${scoped.className}`}
        children={MAIN}
        options={{
          forceBlock: true,
          overrides: {
            h1: H1,
            h2: H2,
            h3: H3,
            p: Paragraph,
            blockquote: Blockquote,
            a: A,
            ol: Ol,
            ul: Ul,
            inlineCode: InlineCode,
            img: Img,
            soda: Soda,
            td: Td,
            tr: Tr,
            th: Th,
            table: Table,
            thead: Thead
          }
        }}
      />
      {scoped.styles}
      <style jsx>{`
        main {
          max-width: 1000px;
          margin: 0 auto;
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
        .tag {
          display: inline-block;
          background-color: #e9e9e9;
          letter-spacing: 1px;
          border-radius: 5px;
          font-size: 1.3rem;
          height: 30px;
          line-height: 30px;
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
