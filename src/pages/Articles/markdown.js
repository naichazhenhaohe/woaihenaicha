import React from 'react'
import Markdown from 'markdown-to-jsx'
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

export default React.memo(({ content }) => {
  return (
    <>
      <Markdown
        className='markdown'
        children={content}
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
      <style jsx>{`
        :global(.markdown) {
          font-size: 1.2rem;
          color: #ffffff;
          letter-spacing: 1px;
          cursor: default;
        }
      `}</style>
    </>
  )
})