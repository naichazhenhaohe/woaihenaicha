import React from 'react'

export default function Pragraph({ children, ...props }) {
  return (
    <p {...props}>
      {children}
      <style jsx>
        {`
          p {
            margin-bottom: 10px;
          }
        `}
      </style>
    </p>
  )
}
