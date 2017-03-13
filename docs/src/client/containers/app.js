import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Navbar, NavbarLink, withMediaQueries } from '../../../../src/index'
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

    const NAV_BREAK_POINT = 440
    const { pageScrollPosition, mediaQuery, breakPoints, orientation } = this.props

    const styles = {
      base: {
        position: 'relative',
        display: 'table',
        width: '100%',
      },
      navbar: {
        base:{
          position: 'fixed',
        },
        bar: {
          backgroundColor: '#32b1d1',
          color: 'white',
          transition: 'background-color 10ms ease-in-out',
          height: 60
        },
        title: {
          link:{
            base:{
              fontWeight: 600
            },
            hover: {
              backgroundColor: '#38d2e0'
            },
            active:{
              backgroundColor: '#38d2e0'
            }
          }
        }
      },
      navlink: {
        link: {
          hover: {
            backgroundColor: '#38d2e0'
          },
          active:{
            backgroundColor: '#38d2e0'
          }
        },
        menuLink: {
          active: {
            backgroundColor: null
          }
        }
      }

    }

    return(
      <div style={ styles.base }>
        <Navbar responsiveWidth={ 767 } style={ styles.navbar }>
          <NavbarLink
            to={ ()=> this.handleRoute(BASE_PATH) }
            appendResponsive={ 'bar' }
            style={ styles.navbar.title }>Reactables</NavbarLink>
          <NavbarLink
            to={ ()=> this.handleRoute(BASE_PATH) }
            isActive={ window.location.pathname === '/' }
            style={ styles.navlink }>Components</NavbarLink>
          <NavbarLink
            to={ ()=> this.handleRoute(BASE_PATH + 'layout') }
            isActive={ window.location.pathname === '/layout' }
            style={ styles.navlink }>Layout</NavbarLink>
          <NavbarLink
            to={ ()=> this.handleRoute(BASE_PATH + 'charts') }
            isActive={ window.location.pathname === '/charts' }
            style={ styles.navlink }>Charts</NavbarLink>
        </Navbar>

        <Hero
          title="Reactables"
          tagline="Customizable React.js Components" />
        { React.cloneElement(this.props.children, {
          mediaQuery,
          orientation,
          breakPoints
        }) }
      </div>
    )
  }
}

// Media Queries

function mapStateToProps(state){
  return {
    pageScrollPosition: state.app.pageScrollPosition
  }
}

export default connect(mapStateToProps, {
  setPageScrollPosition,
  setMobileView
})(withMediaQueries(App))

