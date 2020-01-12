import React from 'react'

export default function Blockquote({ children, ...props }) {
  return (
    <blockquote {...props}>
      {children}
      <style jsx>
        {`
          blockquote {
            font-style: oblique;
            position: relative;
            color: #999999;
            display: flex;
            &:before {
              content: '>';
              padding-right: 10px;
            }
          }
        `}
      </style>
    </blockquote>
  )
}
