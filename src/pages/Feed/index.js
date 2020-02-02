import React from 'react'
import root from '@/articles/root.json'
import Box from './box'

export default function Feed() {
  return (
    <main>
      {root &&
        root.map((item, index) => (
          <Box
            index={index}
            loca={item.location}
            name={item.name}
            date={item.date}
            tags={item.tags}
            key={index}
          />
        ))}
      <style jsx>{`
        main {
          max-width: 1000px;
          margin: 50px auto;
          padding-bottom: 5vh;
        }
        article {
          display: flex;
          position: relative;
          padding-left: 20px;
          height: 50px;
          margin: 0 10vw;
          line-height: 50px;
          &::before {
            content: '';
            position: absolute;
            width: 2px;
            height: 100%;
            left: 0;
            background-color: #ff7755;
          }
          &:first-child::before {
            top: 50%;
            height: 50%;
          }
          &:last-child::before {
            height: 50%;
          }
        }
        .title {
          padding: 0 10px;
          text-transform: uppercase;
          position: relative;
          height: 100%;
          cursor: pointer;
          &::before {
            content: '';
            background-color: #ff7755;
            width: 20px;
            height: 2px;
            position: absolute;
            left: -20px;
            top: 50%;
          }
        }
        .date {
          cursor: pointer;
          color: #bbbbbb;
        }
      `}</style>
      <style jsx>{`
        .title {
          &::before {
            block: ;
          }
        }
      `}</style>
    </main>
  )
}
