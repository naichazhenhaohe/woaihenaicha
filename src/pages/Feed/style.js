import styled from 'styled-components'

const FeedBox = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding-bottom: 5vh;
`

const FeedItem = styled.article`
  display: flex;
  border-left: 1px solid red;
  padding-left: 20px;

  // padding: 10px 50px 40px;
  // background: #fff;
  // -webkit-box-shadow: 0 0 10px rgba(202, 203, 203, 0.5);
  // -moz-box-shadow: 0 0 10px rgba(202, 203, 204, 0.5);
  // -webkit-font-smoothing: antialiased;
  // line-height: 1.6rem;
  // letter-spacing: 0;
`

const ArticleTitle = styled.div`
  padding-right: 10px;
  text-transform: uppercase;
`

const ArticleDate = styled.div``

export { FeedBox, FeedItem, ArticleTitle, ArticleDate }
