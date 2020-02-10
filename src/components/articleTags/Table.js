import React from 'react'

export default function Table({ children, ...props }) {
  return (
    <table {...props}>
      {children}
      <style jsx>
        {`
          table {
            border-collapse: collapse;
            margin-bottom: 2vh;
          }
        `}
      </style>
    </table>
  )
}
