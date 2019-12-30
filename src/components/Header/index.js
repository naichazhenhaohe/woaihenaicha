import React from 'react'
import { StyledHeader, Content, NavList, NavItem } from './style'

export default function Header() {
  return (
    <StyledHeader>
      <Content>
        <NavList>
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
