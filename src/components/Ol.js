import React from 'react'

export default function Ol({ children, ...props }) {
  return (
    <ol {...props}>
      {children}
      <style jsx>
        {`
          ol {
            margin: 10px 0;
            margin-left: 25px;
          }
        `}
      </style>
    </ol>
  )
}
