import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'

function Header() {
  const scoped = resolveScopedStyles(
    <scope>
      <style jsx>{`
        .link {
          box-sizing: border-box;
          position: relative;
          width: 120px;
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
            width: 120px;
            height: 0px;
            transition: 0.5s all ease;
            background: #ff7755;
            top: 0;
            z-index: -1;
          }
          &:hover {
            color: white;
            &::before {
              height: 100%;
            }
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
      <main>
        <div className="nav-list">
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
        </div>
      </main>
      {scoped.styles}
      <style jsx>{`
        header {
          font-size: 1.3rem;
          font-weight: 600;
          min-width: 1032px;
          width: 100vw;
          overflow: hidden;
        }
        main {
          box-sizing: content-box;
          display: flex;
          align-items: center;
          overflow: hidden;
          width: 1000px;
          height: 64px;
          line-height: 32px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .nav-list {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-grow: 1;
          text-align: center;
        }
      `}</style>
    </header>
  )
}

export default withRouter(Header)
