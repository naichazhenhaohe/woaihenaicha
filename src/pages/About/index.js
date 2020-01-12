import React from 'react'
import Markdown from 'markdown-to-jsx'
import Paragraph from '@com/Paragraph'
import A from '@com/A'
import Ul from '@com/Ul'
import Center from '@com/Center'

export default function About() {
  const MAIN = require(`@/articles/about.md`).default || ''
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
  return (
    <main>
      <header>ABOUT</header>
      <Markdown
        className={`markdown ${scoped.className}`}
        children={MAIN}
        options={{
          forceBlock: true,
          overrides: {
            p: Paragraph,
            a: A,
            ul: Ul,
            center: Center
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
      `}</style>
    </main>
  )
}
