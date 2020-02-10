import React from 'react'
import Markdown from 'markdown-to-jsx'
import Paragraph from '@com/articleTags/Paragraph'
import A from '@com/articleTags/A'

export default function About() {
  const MAIN = require(`@/articles/about.md`).default || ''

  return (
    <main>
      <Markdown
        children={MAIN}
        options={{
          forceBlock: true,
          overrides: {
            p: Paragraph,
            a: A
          }
        }}
      />
      <style jsx>{`
        main {
          max-width: 1000px;
          margin: 10vh auto;
          padding-bottom: 5vh;
          color: #ffffff;
          text-align: center;
          font-size: 1.5rem;
          letter-spacing: 2px;
          cursor: default;
          opacity: 0.8;
        }
      `}</style>
    </main>
  )
}
