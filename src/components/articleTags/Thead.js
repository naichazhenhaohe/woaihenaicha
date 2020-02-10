import React from 'react'

export default function Thead({ children, ...props }) {
  return (
    <thead {...props}>
      {children}
      <style jsx>
        {`
          thead {
            border-bottom: 1px solid #fff;
          }
        `}
      </style>
    </thead>
  )
}
