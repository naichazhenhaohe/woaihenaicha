import React from 'react'
import root from '@/articles/root.json'

export default function Categories() {
  const Categories = {}
  for (let article of root) {
    const { category } = article
    if (Object.keys(Categories).includes(category)) {
      Categories[category].count++
      Categories[category].article.push(article.name)
    } else {
      Categories[category] = {
        count: 1,
        article: [article.name]
      }
    }
  }
  return (
    <main>
      <header>TAGS</header>
      <div className="sum">
        目前共计<span className="number">{Object.keys(Categories).length}</span>个分类
      </div>
      <div className="categories-box">
        {(Object.keys(Categories) || []).map(item => (
          <div className="category" key={item}>
            <span>{item + ' '}</span>
            <span className="categoriey-count">({Categories[item].count})</span>
          </div>
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
        .categories-box {
          margin-top: 20px;
        }
        .category {
          color: #444444;
          font-size: 1.4rem;
          padding-bottom: 15px;
          overflow-wrap: break-word;
          word-wrap: break-word;
          background-color: transparent;
          text-decoration: none;
          outline: none;
          & > span {
            cursor: pointer;
          }
        }
        .categoriey-count {
          color: #999;
          cursor: pointer;
        }
      `}</style>
    </main>
  )
}
