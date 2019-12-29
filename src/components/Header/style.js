import styled from 'styled-components'

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

// const Logo = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   color: ${props => props.theme.colors.logo};
//   padding: 0 12px;
//   cursor: pointer;
//   &:before,
//   &:after {
//     position: absolute;
//     content: '';
//     width: 100%;
//     height: 2px;
//     background: ${props => props.theme.colors.logo};
//     transition: 0.4s all ease;
//   }
//   &:before {
//     top: 0;
//   }
//   &:after {
//     bottom: 0;
//   }
//   &:hover:before,
//   &:hover:after {
//     transition: 0.4s all ease;
//   }
//   &:hover:before {
//     transform: translateY(-6px);
//   }
//   &:hover:after {
//     transform: translateY(6px);
//   }
//   &:hover div {
//     color: white;
//   }
//   &:hover div:before,
//   &:hover div:after {
//     width: 100%;
//     transition: 0.4s all ease;
//   }
// `

// const Text = styled.div`
//   letter-spacing: 2px;
//   font-size: 14px;
//   z-index: 99;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   transition: 0.4s all ease;
//   &:before,
//   &:after {
//     position: absolute;
//     top: 0;
//     content: '';
//     height: 100%;
//     width: 2px;
//     background: ${props => props.theme.colors.logo};
//     transition: 0.4s all ease;
//     z-index: -1;
//   }
//   &:before {
//     left: 0;
//   }
//   &:after {
//     right: 0;
//   }
// `

const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  text-align: center;
`

const NavItem = styled.nav`
  box-sizing: border-box;
  position: relative;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
  height: 32px;
  color: ${props=>props.theme.colors.logo};
  cursor: pointer;
  z-index: 1;
  &::before {
    position: absolute;
    content: '';
    width: ${props => (props.index === '1' || props.index === '3' ? '0px' : '120px')};
    height: ${props => (props.index === '1' || props.index === '3' ? '32px' : '0px')};
    transition: 0.4s all ease;
    background: ${props=>props.theme.colors.logo};
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

export { StyledHeader, Content, NavList, NavItem }
