import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

class Navbar extends React.Component {
  static propTypes = {
    styles: PropTypes.object,
    mobileWidth: PropTypes.number
  }

  static defaultProps = {
    styles: {}
  }
  render(){

    const { styles, children } = this.props

    let style = {
      base:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 9999,
        width: '100%',
        height: 70,
        backgroundColor: '#000000',
        transform: 'translateZ(0)',
        position: 'fixed',
        top: 0,
        left: 0

      },
      links: {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        height: '100%',
        listStyleType: 'none'
      }
    }

    merge(style, styles)

    const links = React.Children
      .toArray(children)
      .reduce((obj, link)=>{
        if(link.props.align === 'left'){
          obj.left.push(link)
        } else {
          obj.right.push(link)
        }
        return obj

      }, { left: [], right: []})

    return(
      <div style={ style.base }>
        <ul style={ style.links }>{ links.left }</ul>
        <ul style={ style.links }>{ links.right }</ul>
      </div>
    )
  }
}

const NavbarLink =({to, children, styles})=>{

  const style = {
    base: {
      height: '100%',
      display: 'inline',
      padding: 0,

    },
    link:{
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      margin: 0,
      padding: '0 15px',
      fontSize: 14,
      textDecoration: 'none',
      color: 'white',
      cursor: 'pointer'
    }
  }

  merge(style, styles)

  return(
    <li
      style={ style.base }
    >
      { typeof to === 'string'
        ? <a style={ style.link } href={ to }>{ children }</a>
        : <a style={ style.link } onClick={ to }>{ children }</a>
      }
    </li>
  )
}

NavbarLink.PropTypes =  {
  align: PropTypes.oneOf(['left', 'right']),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
}

NavbarLink.defaultProps = {
  align: 'left'
}

export { Navbar, NavbarLink }
