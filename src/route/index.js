import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GlobalStyle, MainBox } from '@global'
import Header from '@com/Header'
import Progress from '@com/Progress'
import About from '@page/About'
import Feed from '@page/Feed'
import theme from '@global/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Progress />
      <MainBox>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>
      </MainBox>
    </ThemeProvider>
  )
}
