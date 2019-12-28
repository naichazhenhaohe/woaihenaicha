import React from 'react'
import Content from '@/articles/2019 yearly review.md'
import Markdown from 'markdown-to-jsx'

export default function Root() {
  const content = Content.split('---')
  const option = content[0]
  const main = content[1]
  console.log(option)
  return (
    <main>
      <Markdown
        options={{
          forceBlock: true,
          overrides: {
            h1: {
              props: {
                className: 'foo'
              }
            }
          }
        }}
      >
        {main}
      </Markdown>
    </main>
  )
}
