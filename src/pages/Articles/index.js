import React from 'react'
import Content from '@/articles/2019 yearly review.md'
import { Main, Title, TagBox, Tag, StyledMarkdown, H1, H2, Paragraph, Blockquote } from './style'

export default function Root() {
  const content = Content.split('---')
  const main = content[1]
  const options = content[0].split('\n')
  const optionsObject = {}
  for (let item of options) {
    if (item) {
      item = item.split(': ')
      optionsObject[item[0]] = item[1]
    }
  }
  const tags = (optionsObject.tags || optionsObject.tag || '').split(', ')
  return (
    <Main>
      <Title>{optionsObject.title}</Title>
      <TagBox>{tags && tags.map((item, index) => <Tag key={index}>{item}</Tag>)}</TagBox>
      <StyledMarkdown
        options={{
          forceBlock: true,
          overrides: {
            h1: H1,
            h2: H2,
            p: Paragraph,
            blockquote: Blockquote
          }
        }}
      >
        {main}
      </StyledMarkdown>
    </Main>
  )
}
