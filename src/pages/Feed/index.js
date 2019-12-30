import React from 'react'
import { FeedBox, FeedItem, ArticleTitle, ArticleDate } from './style'
import root from '@/articles/root.json'

export default function Feed() {
  console.log('root', root)
  return (
    <FeedBox>
      {root &&
        root.map((item, index) => (
          <FeedItem key={index}>
            <ArticleTitle>{item.name}</ArticleTitle>
            <ArticleDate>{item.date}</ArticleDate>
          </FeedItem>
        ))}
    </FeedBox>
  )
}
