import React from 'react'

export default function H2({ children, ...props }) {
  return (
    <h2 {...props}>
      {children}
      <style jsx>
        {`
          h2 {
            position: relative;
            color: #333333;
            font-weight: 600;
            font-size: 1.4rem;
            font-family: 'Comic Sans MS', '楷体', cursive, sans-serif;
            margin: 10px 0;
            &:after {
              content: ' - h2';
              font-size: 1rem;
              font-weight: 500;
              color: #999999;
            }
          }
        `}
      </style>
    </h2>
  )
}
