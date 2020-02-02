import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Header from '@com/Header'
import Progress from '@com/Progress'
import About from '@page/About'
import Article from '@page/Articles'
import Feed from '@page/Feed'
import Tags from '@page/Tags'
import Categories from '@page/Categories'

export default function App() {
  const history = createBrowserHistory()
  return (
    <>
      <Progress />
      <main>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/about" component={About} />
            <Route path="/article" component={Article} />
            <Route path="/tags" component={Tags} />
            <Route path="/categories" component={Categories} />
          </Switch>
        </Router>
      </main>
      <style jsx>{`
        main {
          min-height: calc(100vh - 96px);
          padding: 0 25px;
        }
      `}</style>
      <style jsx global>{`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        html {
          font-size: 14px;
        }
        body {
          font-family: 'Overpass', '微软雅黑', cursive, sans-serif;
          width: 100%;
          height: 100%;
          min-height: 100vh;
          background-color: #333333;
        }
        ::selection {
          color: #ffee33;
          background-color: #aa44ff;
        }
      `}</style>
    </>
  )
}
