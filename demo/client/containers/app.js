import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Navbar, NavbarLink } from '../../../src/index'
import Hero from '../components/hero'

class App extends React.Component {

  handleRoute =(path)=>{
    browserHistory.push(path)
  }

  render() {

    const style = {
      base: {},
      navbar: {
        base: {
          backgroundColor: 'blue',
          color: 'white',
        },
        title: {
          fontWeight: 600
        }
      }
    }


    return(
      <div style={ style.base }>
        <Navbar styles={{ base: style.navbar.base }}>
          <NavbarLink to={ ()=> this.handleRoute('/') } styles={{ link: style.navbar.title }}>Reactables</NavbarLink>
          <NavbarLink to={ ()=> this.handleRoute('/components') }>Components</NavbarLink>
          <NavbarLink to={ ()=> this.handleRoute('/charts') }>Charts</NavbarLink>
          <NavbarLink to={ ()=> this.handleRoute('/layout') }>Layout</NavbarLink>
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
  }
}

export default connect(mapStateToProps, {


})(App)

