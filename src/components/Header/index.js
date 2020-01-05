import React from 'react'
import { StyledHeader, Content, NavList, NavItem } from './style'
import { withRouter } from 'react-router-dom'

function Header(props) {
  return (
    <StyledHeader>
      <Content>
        <NavList>
          {/* {pathname === '/' ? (
            <SelectedNavItem index="1" to="/">
              feed
            </SelectedNavItem>
          ) : (
            <NavItem index="1" to="/">
              feed
            </NavItem>
          )}
          {pathname === '/tags' ? (
            <SelectedNavItem index="2" to="/tags">
              tags
            </SelectedNavItem>
          ) : (
            <NavItem index="2" to="/tags">
              tags
            </NavItem>
          )}
          {pathname === '/categories' ? (
            <SelectedNavItem index="3" to="/categories">
              categories
            </SelectedNavItem>
          ) : (
            <NavItem index="3" to="/categories">
              categories
            </NavItem>
          )}
          {pathname === '/about' ? (
            <SelectedNavItem index="4" to="/about">
              about
            </SelectedNavItem>
          ) : (
            <NavItem index="4" to="/about">
              about
            </NavItem>
          )} */}
          <NavItem index="1" to="/">
            feed
          </NavItem>
          <NavItem index="2" to="/tags">
            tags
          </NavItem>
          <NavItem index="3" to="/categories">
            categories
          </NavItem>
          <NavItem index="4" to="/about">
            about
          </NavItem>
        </NavList>
      </Content>
    </StyledHeader>
  )
}

export default withRouter(Header)
