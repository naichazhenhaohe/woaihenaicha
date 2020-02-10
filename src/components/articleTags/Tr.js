import React from 'react'

export default function Tr({ children, ...props }) {
  return (
    <tr {...props}>
      {children}
      <style jsx>
        {`
          tr {
            border-bottom: 1px solid #fff;
            &:last-child {
              border: none;
            }
          }
        `}
      </style>
    </tr>
  )
}
