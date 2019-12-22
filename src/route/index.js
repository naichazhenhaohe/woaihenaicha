import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GlobalStyle } from '../globalStyle'
import Header from '../components/Header'
import About from '../pages/About'
import theme from '../globalStyle/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={About} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
