import React from 'react'

export default function Center({ children, ...props }) {
  return (
    <center {...props}>
      {children}
      <style jsx>
        {`
          center {
            font-size: 0.9rem;
          }
        `}
      </style>
    </center>
  )
}
