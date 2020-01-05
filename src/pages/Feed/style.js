import styled from 'styled-components'

const FeedBox = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding-bottom: 5vh;
`

const FeedItem = styled.article`
  display: flex;
  position: relative;
  padding-left: 20px;
  height: 50px;
  margin: 0 10vw;
  line-height: 50px;
  &::before {
    display: ${props => ([0, 1].includes(props.len) ? 'none' : 'block')};
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    left: 0;
    background-color: ${props => props.theme.colors.navigation};
  }
  &:first-child::before {
    top: 50%;
    height: 50%;
  }
  &:last-child::before {
    height: 50%;
  }
`

const ArticleTitle = styled.div`
  padding: 0 10px;
  text-transform: uppercase;
  position: relative;
  height: 100%;
  cursor: pointer;
  &::before {
    content: '';
    background-color: ${props => props.theme.colors.navigation};
    display: ${props => ([0, 1].includes(props.len) ? 'none' : 'block')};
    width: 20px;
    height: 2px;
    position: absolute;
    left: -20px;
    top: 50%;
  }
`

const ArticleDate = styled.div`
  cursor: pointer;
  color: #bbbbbb;
`

export { FeedBox, FeedItem, ArticleTitle, ArticleDate }
