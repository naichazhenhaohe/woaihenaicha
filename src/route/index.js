import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GlobalStyle, MainBox } from '@global'
import Header from '@com/Header'
import Progress from '@com/Progress'
import About from '@page/About'
import Article from '@page/Articles'
import Feed from '@page/Feed'
import theme from '@global/theme'
import { createBrowserHistory } from 'history'

export default function App() {
  const history = createBrowserHistory()
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Progress />
      <MainBox>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/about" component={About} />
            <Route path="/article" component={Article} />
          </Switch>
        </Router>
      </MainBox>
    </ThemeProvider>
  )
}
