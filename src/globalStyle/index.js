import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 14px;
  }
  body {
    font-family: 'Comic Sans MS', '微软雅黑', cursive, sans-serif;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 48px;
    background-color: ${props => props.theme.colors.main};
  }
`

const MainBox = styled.div`
  background: ${props => props.theme.colors.innerBackground};
`
export { GlobalStyle, MainBox }
