import React from 'react'
import { Navbar, NavbarLink } from '../../../lib/index'
import Hero from '../components/hero'
import Components from './components'

export default class App extends React.Component {

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

      <div>
        <Navbar responsiveWidth={ 767 } style={ styles.navbar }>
          <NavbarLink to={'/'} style={ styles.navlink }>
            Reactables
          </NavbarLink>
          <NavbarLink to={'/'} isActive style={ styles.navlink }>
            Core
          </NavbarLink>
        </Navbar>

        <Hero
          title="Reactables"
          tagline="Customizable React.js Components" />

        <Components />
       </div>

    )
  }
}


