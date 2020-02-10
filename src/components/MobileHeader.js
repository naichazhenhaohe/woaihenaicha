import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'

function MobileHeader() {
  const scoped = resolveScopedStyles(
    <scope>
      <style jsx>{`
        .link {
          padding: 0 2vw;
          box-sizing: border-box;
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 15px;
          height: 32px;
          color: #ff7755;
          cursor: pointer;
          z-index: 1;
          text-decoration: none;
          &::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 0px;
            transition: 0.5s all ease;
            background: #ff7755;
            top: 0;
            z-index: -1;
          }
        }
        .selected {
          color: white;
          &::before {
            height: 100%;
          }
        }
      `}</style>
    </scope>
  )
  function resolveScopedStyles(scope) {
    return {
      className: scope.props.className,
      styles: scope.props.children
    }
  }

  const routerList = [
    {
      index: 0,
      target: '/',
      content: 'feed'
    },
    {
      index: 1,
      target: '/tags',
      content: 'tags'
    },
    {
      index: 2,
      target: '/categories',
      content: 'categories'
    },
    {
      index: 3,
      target: '/about',
      content: 'about'
    }
  ]

  return (
    <header>
      {routerList.map(item => (
        <NavLink
          activeClassName={`selected ${scoped.className}`}
          key={item.index}
          to={item.target}
          exact={item.index === 0}
          className={`link ${scoped.className}`}
        >
          {item.content}
        </NavLink>
      ))}
      {scoped.styles}
      <style jsx>{`
        header {
          margin-top: 3vh;
          font-size: 1.3rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          text-align: center;
          flex-flow: row nowrap;
        }
      `}</style>
    </header>
  )
}

export default withRouter(MobileHeader)
