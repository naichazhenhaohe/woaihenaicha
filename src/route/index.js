import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../globalStyle/theme'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default function App() {
  return (
    // <Router>
    //   <Switch>
    //     <Route path="/" exact component={<div>안녕</div>} />
    //   </Switch>
    // </Router>
    <ThemeProvider theme={theme}>안녕</ThemeProvider>
  )
}
