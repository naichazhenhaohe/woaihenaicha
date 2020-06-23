import React, { useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '@/utils/history'
import Scrollable from '@com/Scrollable'
import Header from '@com/Header'
import MobileHeader from '@com/MobileHeader'
import Progress from '@com/Progress'
import About from '@page/About'
import Article from '@page/Articles'
import Feed from '@page/Feed'
import Tags from '@page/Tags'
import Categories from '@page/Categories'
import isPhone from '@/utils/isPhone'

export default function App () {
  const [showNumber, setShowNumber] = useState(5)
  return (
    <>
      <Progress />
      <Scrollable
        isBottom={() => {
          setShowNumber(showNumber + 5)
        }}
      >
        <Router history={history}>
          {isPhone ? <MobileHeader /> : <Header />}
          <Switch>
            <Route path="/" exact render={() => <Feed showNumber={showNumber} />} />
            <Route path="/about" component={About} />
            <Route path="/article/:title" component={Article} />
            <Route path="/tags" component={Tags} />
            <Route path="/categories" component={Categories} />
          </Switch>
        </Router>
      </Scrollable>
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
