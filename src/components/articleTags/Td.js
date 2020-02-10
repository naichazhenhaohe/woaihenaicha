import React from 'react'

export default function Td({ children, ...props }) {
  return (
    <td {...props}>
      {children}
      <style jsx>
        {`
          td:first-child {
            border-right: 1px solid #fff;
          }
          td:last-child {
            padding: 1vh 1vw;
          }
        `}
      </style>
    </td>
  )
}
