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
      <div className="sum">
        Currently there are<span className="number">{Object.keys(Categories).length}</span>
        categories
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
          letter-spacing: 2px;
        }
        .sum {
          margin: 5vh auto;
          color: #ffffff;
          text-align: center;
          font-size: 1.4rem;
        }
        .number {
          font-weight: 600;
          padding: 0 5px;
          color: #ffee33;
        }
        .categories-box {
          margin-top: 20px;
        }
        .category {
          color: #ffffff;
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
