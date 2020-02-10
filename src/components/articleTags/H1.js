import React from 'react'

export default function H1({ children, ...props }) {
  return (
    <h1 {...props}>
      {children}
      <style jsx>
        {`
          h1 {
            position: relative;
            color: #ffffff;
            font-weight: 600;
            font-size: 1.8rem;
            margin: 20px 0 10px;
            &:after {
              content: ' - h1';
              font-size: 1rem;
              font-weight: 500;
              color: #999999;
            }
          }
        `}
      </style>
    </h1>
  )
}
