import React from 'react'
import { withRouter } from 'react-router-dom'
import root from '@/articles/root.json'

function Feed(props) {
  function handleClick(index) {
    props.history.push('/article', root[index])
  }
  return (
    <main>
      {root &&
        root.reverse().map((item, index) => (
          <article key={index}>
            <div className="title" onClick={() => handleClick(index)}>
              {item.name}
            </div>
            <div className="date" onClick={() => handleClick(index)}>
              {item.date}
            </div>
          </article>
        ))}
      <style jsx>{`
        main {
          max-width: 800px;
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

export default withRouter(Feed)
