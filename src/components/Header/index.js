import React from 'react'
import { StyledHeader, Content, NavList, NavItem } from './style'

export default function Header() {
  return (
    <StyledHeader>
      <Content>
        <NavList>
          <NavItem index="1">Now</NavItem>
          <NavItem index="2">aBout</NavItem>
          <NavItem index="3">taGs</NavItem>
          <NavItem index="4">catEgories</NavItem>
        </NavList>
      </Content>
    </StyledHeader>
  )
}
