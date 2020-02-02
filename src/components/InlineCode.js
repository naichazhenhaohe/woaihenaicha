import React from 'react'

export default function InlineCode({ children, ...props }) {
  return (
    <code {...props}>
      {children}
      <style jsx>
        {`
          code {
            color: red;
            font-family: 'Comic Sans MS','微软雅黑',cursive,sans-serif;
          }
        `}
      </style>
    </code>
  )
}
