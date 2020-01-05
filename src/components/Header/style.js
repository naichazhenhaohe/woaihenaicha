import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledHeader = styled.header`
  font-size: 1.3rem;
  font-weight: 600;
  min-width: 1032px;
  overflow: hidden;
`
const Content = styled.div`
  box-sizing: content-box;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 1000px;
  height: ${props => props.theme.heights.primaryNavigation};
  line-height: 32px;
  margin: 0 auto;
  padding: 0 16px;
`

const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  text-align: center;
`

const NavItem = styled(Link)`
  box-sizing: border-box;
  position: relative;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
  height: 32px;
  color: ${props => props.theme.colors.navigation};
  cursor: pointer;
  z-index: 1;
  text-decoration: none;
  &::before {
    position: absolute;
    content: '';
    width: ${props => (props.index === '1' || props.index === '3' ? '0px' : '120px')};
    height: ${props => (props.index === '1' || props.index === '3' ? '32px' : '0px')};
    transition: 0.4s all ease;
    background: ${props => props.theme.colors.navigation};
    ${props => {
      switch (props.index) {
        case '2':
          return { top: 0 }
        case '3':
          return { right: 0 }
        case '4':
          return { bottom: 0 }
        default:
          return { left: 0 }
      }
    }}
    z-index: -1;
  }
  &:hover {
    color: white;
    &::before {
      ${props => {
        if (props.index === '2' || props.index === '4') {
          return { height: '100%' }
        }
        return { width: '100%' }
      }}
    }
  }
`

const SelectedNavItem = styled(NavItem)`
  color: ${props => props.theme.colors.white};
  transition: 0.5s color ease;
  &:hover {
    color: #00ffdd;
  }
  &::before {
    width: 100%;
    height: 100%;
  }
`

export { StyledHeader, Content, NavList, NavItem, SelectedNavItem }
