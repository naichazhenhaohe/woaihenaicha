import React from 'react'

export default function Ul({ children, ...props }) {
  return (
    <ul {...props}>
      {children}
      <style jsx>
        {`
          ul {
            margin: 10px 0;
            margin-left: 25px;
          }
        `}
      </style>
    </ul>
  )
}
