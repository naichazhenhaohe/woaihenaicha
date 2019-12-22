import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GlobalStyle, MainBox } from '@global'
import Header from '@com/Header'
import About from '@page/About'
import theme from '@global/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainBox>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={About} />
          </Switch>
        </Router>
      </MainBox>
    </ThemeProvider>
  )
}
