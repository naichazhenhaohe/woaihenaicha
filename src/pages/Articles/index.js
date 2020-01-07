import React, { useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import Prism from 'prismjs'
import H1 from './components/H1'
import H2 from './components/H2'
import H3 from './components/H3'
import Paragraph from './components/Paragraph'
import Blockquote from './components/Blockquote'
import A from './components/A'
import Ol from './components/Ol'
import Ul from './components/Ul'
import InlineCode from './components/InlineCode'

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
          color: #555555;
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
            inlineCode: InlineCode
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
