import React from 'react'

export default function Th({ children, ...props }) {
  return (
    <th {...props}>
      {children}
      <style jsx>
        {`
          th:first-child {
            border-right: 1px solid #fff;
          }
          th:last-child {
            padding: 1vh 1vw;
          }
        `}
      </style>
    </th>
  )
}
