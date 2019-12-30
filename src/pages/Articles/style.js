import Markdown from 'markdown-to-jsx'
import styled from 'styled-components'

const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 5vh;
`

const Title = styled.h1`
  text-align: center;
`

const TagBox = styled.div`
  text-align: center;
  margin: 20px 0;
`

const Tag = styled.div`
  display: inline-block;
  background-color: #e9e9e9;
  letter-spacing: 1px;
  border-radius: 5px;
  font-size: 1.3rem;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  margin: 0 5px;
  position: relative;
  cursor: pointer;
  &:before {
    content: '#';
    left: 0;
    font-size: 1.1rem;
  }
`

const StyledMarkdown = styled(Markdown)`
  font-size: 1.2rem;
  color: #555555;
  letter-spacing: 1px;
  cursor: default;
`

const H1 = styled.h1`
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
`

const H2 = styled.h2`
  position: relative;
  color: #333333;
  font-weight: 600;
  font-size: 1.5rem;
  font-family: 'Comic Sans MS', '楷体', cursive, sans-serif;
  margin: 10px 0;
  &:after {
    content: ' - h2';
    font-size: 1rem;
    font-weight: 500;
    color: #999999;
  }
`

const Paragraph = styled.p`
  margin-bottom: 10px;
`

const Blockquote = styled.blockquote`
  font-style: oblique;
  position: relative;
  color: #999999;
  display: flex;
  &:before {
    content: '>';
    padding-right: 10px;
  }
`

export { Main, Title, TagBox, Tag, StyledMarkdown, H1, H2, Paragraph, Blockquote }
