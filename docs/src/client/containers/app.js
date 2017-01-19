import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Navbar, NavbarLink } from '../../../../src/index'
import { setPageScrollPosition, setMobileView } from '../actions/demo_actions'
import Hero from '../components/hero'
import { BASE_PATH } from '../router/router'

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('scroll', this.handlePagePosition)
    this.mediaQuery = window.matchMedia(`(min-width: 767px)`)
    this.mediaQuery.addListener(this.setIsMobile)
    this.setIsMobile()
  }

  componentWillUnmount() {
    this.mediaQuery.removeListener(this.setIsMobile)
  }

  setIsMobile =()=>{
    this.props.setMobileView(!this.mediaQuery.matches)
  }

  handlePagePosition =()=>{
    this.props.setPageScrollPosition(document.body.scrollTop)
  }

  handleRoute =(path)=>{
    browserHistory.push(path)
  }

  render() {

    const NAV_BREAK_POINT = 420
    const { pageScrollPosition } = this.props

    const style = {
      base: {
        position: 'relative',
        display: 'table',
        width: '100%',
      },
      navbar: {
        base: {
          backgroundColor: pageScrollPosition < NAV_BREAK_POINT ? 'transparent' : '#32b1d1',
          color: 'white',
          transition: 'background-color 10ms ease-in-out'
        },
        title: {
          fontWeight: 600
        }
      }
    }

    return(
      <div style={ style.base }>
        <Navbar styles={{ base: style.navbar.base }}>
          <NavbarLink to={ ()=> this.handleRoute(BASE_PATH) } styles={{ link: style.navbar.title }}>Reactables</NavbarLink>
          <NavbarLink to={ ()=> this.handleRoute(BASE_PATH) }>Components</NavbarLink>
          <NavbarLink to={ ()=> this.handleRoute(BASE_PATH + 'charts') }>Charts</NavbarLink>
        </Navbar>

        <Hero
          title="Reactables"
          tagline="Customizable React.js Components" />

        { this.props.children }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    pageScrollPosition: state.app.pageScrollPosition
  }
}

export default connect(mapStateToProps, {
  setPageScrollPosition,
  setMobileView
})(App)

