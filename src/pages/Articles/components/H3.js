import React from 'react'

export default function H3({ children, ...props }) {
  return (
    <h3 {...props}>
      {children}
      <style jsx>
        {`
          h3 {
            margin: 10px 0;
            color: #333333;
            &:after {
              content: ' - h3';
              font-size: 1rem;
              font-weight: 500;
              color: #999999;
            }
          }
        `}
      </style>
    </h3>
  )
}
