import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withMediaQueries } from '../../../lib/index'
import { setPageScrollPosition, setMobileView } from '../actions/demo_actions'

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
    this.props.history.push(path)
  }

  render() {

    const NAV_BREAK_POINT = 440
    const { pageScrollPosition, mediaQuery, breakPoints, orientation, location, match } = this.props

    const styles = {
      base: {
        position: 'relative',
        display: 'table',
        width: '100%',
      }

    }

    return(
      <div style={ styles.base }>
        {/*<Navbar responsiveWidth={ 767 } style={ styles.navbar }>*/}
          {/*<NavbarLink*/}
            {/*to={ ()=> this.handleRoute(BASE_PATH) }*/}
            {/*appendResponsive={ 'bar' }*/}
            {/*style={ styles.navbar.title }>Reactables</NavbarLink>*/}
          {/*<NavbarLink*/}
            {/*to={ ()=> this.handleRoute(BASE_PATH) }*/}
            {/*isActive={ location.pathname === '/' }*/}
            {/*style={ styles.navlink }>Components</NavbarLink>*/}
          {/*<NavbarLink*/}
            {/*to={ ()=> this.handleRoute(BASE_PATH + 'layout') }*/}
            {/*isActive={ location.pathname === '/layout' }*/}
            {/*style={ styles.navlink }>Layout</NavbarLink>*/}
          {/*<NavbarLink*/}
            {/*to={ ()=> this.handleRoute(BASE_PATH + 'charts') }*/}
            {/*isActive={ location.pathname === '/charts' }*/}
            {/*style={ styles.navlink }>Charts</NavbarLink>*/}
        {/*</Navbar>*/}

      </div>
    )
  }
}

// Media Queries
App = withRouter(App)
App = withMediaQueries(App)

function mapStateToProps(state){
  return {
    pageScrollPosition: state.app.pageScrollPosition
  }
}

export default connect(mapStateToProps, {
  setPageScrollPosition,
  setMobileView
})(App)

