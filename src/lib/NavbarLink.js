import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import isFunction from 'lodash/isFunction'

export default class NavbarLink extends React.Component {

  static propTypes =  {
    append: PropTypes.oneOf(['left', 'right']),
    appendResponsive: PropTypes.oneOf(['bar', 'menu', 'hide']),
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    isActive: PropTypes.bool,
    style: PropTypes.object
  }

  static defaultProps = {
    append: 'left',
    appendResponsive: 'menu',
    isActive: false,
    style: {}
  }

  state = { isHovered: false }

  handleHover =()=>{
    this.setState({
      isHovered: !this.state.isHovered
    })
  }

  setLinkColor =(styles)=> {

    const { isActive, isMobile } = this.props
    const { isHovered } = this.state

    if(isMobile) {
      if(isActive)
        merge(styles.menuLink.base, styles.menuLink.active)
      if(isHovered)
        merge(styles.menuLink.base, styles.menuLink.hover)
    } else {
      if(isActive)
        merge(styles.link.base, styles.link.active)
      if(isHovered)
        merge(styles.link.base, styles.link.hover)
    }

    return styles
  }


  renderLinkType =(styles)=>{
    const {children, to, isMobile } = this.props
    const linkStyle = isMobile ? styles.menuLink.base : styles.link.base

    if(typeof to === 'string')
      return (
        <a
          style={ linkStyle }
          href={ to }
        >{ children }</a>)

    if(isFunction(to))
      return (
        <a
          style={ linkStyle }
          onClick={ to }
        >{ children }</a>)

    return(
      <div style={ linkStyle }>
        { children }
      </div>
    )
  }


  render() {

    const { style } = this.props

    let styles = {
      base: {
        height: '100%',
        display: 'inline',
        padding: 0,
      },
      link: {
        base:{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          margin: 0,
          padding: '0 15px',
          fontSize: 14,
          textDecoration: 'none',
          color: 'white',
          cursor: 'pointer',
        },
        active: {
          backgroundColor: '#cecece'
        },
        hover: {
          backgroundColor: '#cecece'
        }
      },
      menuLink: {
        base:{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #282828',
          height: '100%',
          margin: 0,
          padding: '20px 15px',
          fontSize: 14,
          textDecoration: 'none',
          color: 'white',
          cursor: 'pointer'
        },
        active: {
          backgroundColor: '#cecece'
        },
        hover: {
          backgroundColor: '#cecece'
        }

      }
    }

    merge(styles, style)
    this.setLinkColor(styles)

    return (
      <li
        style={ styles.base }
        onMouseOver={ this.handleHover }
        onMouseLeave={ this.handleHover }
      >
        { this.renderLinkType(styles) }

      </li>
    )
  }
}