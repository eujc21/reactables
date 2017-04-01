import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Navbar, NavbarLink } from '../../../lib/index'
import Hero from '../components/hero'
import Bundle from './bundle'
import loadComponents from 'bundle-loader?lazy!../containers/components'
import loadLayout from 'bundle-loader?lazy!../containers/layout'
import loadCharts from 'bundle-loader?lazy!../containers/charts'
import loadScratch from 'bundle-loader?lazy!../containers/scratch'

import ScrollToTop from '../components/scroll_to_top'

export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/reactables/' : '/'

const Components = () => (
  <Bundle load={loadComponents}>
    {Components => Components ? <Components/> : null }
  </Bundle>
)

const Layout = () => (
  <Bundle load={loadLayout}>
    {Layout => Layout ? <Layout /> : null}
  </Bundle>
)

const Charts = () => (
  <Bundle load={loadCharts}>
    {Charts => Charts ? <Charts /> : null }
  </Bundle>
)

const Scratch = () =>(
  <Bundle load={loadScratch}>
    {Scratch => Scratch ? <Scratch /> : null }
  </Bundle>
)

const RouterLink = ({ label, to, exact, allowActive = true, style }) => (
  <Route path={to} exact={ exact } children={({ match }) => (
    <NavbarLink isActive={ allowActive && match !== null } style={ style }>
      <Link
        to={to}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          textDecoration: 'none',
          color: 'white'
        }}>
        {label}
      </Link>
    </NavbarLink>
  )}/>
)

class Router extends React.Component {

  componentDidMount(){
    loadComponents(()=>{})
    loadLayout(()=>{})
    loadCharts(()=>{})
  }

  render(){

    const styles = {
      base: {},
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
      <BrowserRouter basename={ BASE_PATH }>
        <ScrollToTop>
          <div>
            <Navbar responsiveWidth={ 767 } style={ styles.navbar }>
              <RouterLink
                to={ '/' }
                label="Reactables"
                allowActive={ false }
                appendResponsive="bar"
                style={ styles.navlink }/>
              <RouterLink exact to={ '/' } label="Components" style={ styles.navlink }/>
              <RouterLink to={ '/layout' } label="Layout" style={ styles.navlink }/>
              <RouterLink to={ '/charts' } label="Charts" style={ styles.navlink }/>
            </Navbar>

            <Hero
              title="Reactables"
              tagline="Customizable React.js Components" />

            <Route exact path="/" component={ Components } />
            <Route path="/layout" component={ Layout } />
            <Route path="/charts" component={ Charts } />
            <Route path="/scratch" component={ Scratch } />

           </div>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

export default Router


