import React from 'react'
import root from '@/articles/root.json'

export default function Tags() {
  const Tags = {}
  for (let article of root) {
    const tags = article.tags
    for (let tag of tags) {
      if (Object.keys(Tags).includes(tag)) {
        Tags[tag].count++
        Tags[tag].article.push(article.name)
      } else {
        Tags[tag] = {
          count: 1,
          article: [article.name]
        }
      }
    }
  }
  return (
    <main>
      <header>TAGS</header>
      <div className="sum">
        目前共计<span className="number">{Object.keys(Tags).length}</span>个标签
      </div>
      <div className="tags-box">
        {(Object.keys(Tags) || []).map(item => (
          <span className="tag" key={item}>
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        main {
          max-width: 1000px;
          margin: 0 auto;
          padding-bottom: 5vh;
        }
        header {
          text-align: center;
          display: block;
          font-size: 2rem;
          margin-block-start: 0.67em;
          margin-block-end: 0.67em;
          font-weight: bold;
        }
        .sum {
          color: #555555;
          text-align: center;
          font-size: 1.2rem;
        }
        .number {
          font-weight: 600;
          padding: 0 5px;
        }
        .tags-box {
          margin-top: 20px;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;
        }
        .tag {
          color: #444444;
          font-size: 1.4rem;
          margin: 0 15px;
          padding-bottom: 5px;
          cursor: pointer;
          overflow-wrap: break-word;
          word-wrap: break-word;
          background-color: transparent;
          text-decoration: none;
          outline: none;
          border-bottom: 1px solid #999;
        }
      `}</style>
    </main>
  )
}
