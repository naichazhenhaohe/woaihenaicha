import React from 'react'

export default function H1({ children, ...props }) {
  return (
    <h1 {...props}>
      {children}
      <style jsx>
        {`
          h1 {
            position: relative;
            color: #333333;
            font-weight: 600;
            font-size: 1.8rem;
            font-family: 'Comic Sans MS', '楷体', cursive, sans-serif;
            margin: 10px 0;
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
