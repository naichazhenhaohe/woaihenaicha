import React from 'react'
import { FeedBox, FeedItem, ArticleTitle, ArticleDate } from './style'
import { withRouter } from 'react-router-dom'
import root from '@/articles/root.json'

function Feed(props) {
  function handleClick(index) {
    props.history.push('/article', root[index])
  }
  return (
    <FeedBox>
      {root &&
        root.map((item, index, arr) => (
          <FeedItem key={index} len={arr.length}>
            <ArticleTitle onClick={() => handleClick(index)} len={arr.length}>
              {item.name}
            </ArticleTitle>
            <ArticleDate onClick={() => handleClick(index)}>{item.date}</ArticleDate>
          </FeedItem>
        ))}
    </FeedBox>
  )
}

export default withRouter(Feed)
