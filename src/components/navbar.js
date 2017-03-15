import React, { PropTypes } from 'react'
import { Button } from './button'
import merge from 'lodash/merge'
import isFunction from 'lodash/isFunction'

class Navbar extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    responsiveWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    menuIcon: PropTypes.node,
    appendMenuButton: PropTypes.oneOf(['left', 'right']),
  }

  static defaultProps = {
    style: {},
    responsiveWidth: 'auto',
    appendMenuButton: 'right'
  }

  state = {
    isMobile: false,
    isMenuVisible: false
  }

  componentDidMount() {
    const { responsiveWidth } =  this.props

    const minWidth = responsiveWidth === 'auto'
      ? this.calculateLinkWidth()
      : responsiveWidth

    this.mediaQuery = window.matchMedia(`(min-width: ${ minWidth }px)`)
    this.mediaQuery.addListener(this.updateIsMobile)
    this.updateIsMobile()
  }

  componentWillUnmount() {
    this.mediaQuery.removeListener(this.updateIsMobile)
  }

  calculateLinkWidth=()=>{
    const leftWidth = parseInt(window.getComputedStyle(this.leftLinks).width) || 0
    const rightWidth = parseInt(window.getComputedStyle(this.rightLinks).width) || 0
    return leftWidth + rightWidth
  }

  updateIsMobile =()=>{
    const isMobile = !this.mediaQuery.matches
    this.setState({
      isMobile,
      isMenuVisible: false
    })
  }

  toggleMobileMenu =()=>{
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    })
  }

  handleMenuClick =()=>{
    this.setState({
      isMenuVisible: false
    })
  }

  render(){

    const { style, children } = this.props
    const { isMobile, isMenuVisible } = this.state

    let styles = {
      base: {
        position: 'relative',
        width: '100%',
        zIndex: 9999,
      },
      bar:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: '#000000',
        top: 0,
        left: 0,
      },
      linkContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        height: '100%',
        listStyleType: 'none'
      },
      menuButton: {
        margin: '0 15px',
        padding: '5px 10px',
        backgroundColor: null
      },
      menu:{
        position: 'absolute',
        width: '100%',
        backgroundColor: '#525252',
        margin: 0,
        paddingLeft: 0,
        visibility: isMenuVisible ? 'visible' : 'hidden',
        overflowY: 'hidden',
        //transition: 'all 0.7s ease-in-out',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0, 0.35)'
      }
    }

    merge(styles, style)

    return(
      <div style={ styles.base }>
        { isMobile
          ? this.renderMobile(children, styles)
          : this.renderDesktop(children, styles)
        }
      </div>
    )
  }

  renderDesktop(children, styles){

    const links = React.Children
      .toArray(children)
      .reduce((obj, link)=>{
        const { append } = link.props
        obj[append || 'left'].push(React.cloneElement(
          link, { isMobile: false }
        ))
        return obj
      }, { left: [], right: []})

    return(
      <div style={ styles.bar }>
        <ul ref={ ul => this.leftLinks = ul } style={ styles.linkContainer }>{ links.left }</ul>
        <ul ref={ ul => this.rightLinks = ul } style={ styles.linkContainer }>{ links.right }</ul>
      </div>
      )

  }

  renderMobile(children, styles){

    const links = React.Children
      .toArray(children)
      .reduce((obj, link)=>{
        const { appendResponsive } = link.props
        obj[appendResponsive || 'menu'].push(React.cloneElement(
          link, { isMobile: appendResponsive !== 'bar' }
        ))
        return obj
      }, { bar: [], menu: [] })


    return(
      <div>

        <div style={ styles.bar }>
          <ul style={ styles.linkContainer }>
            { links.bar }
          </ul>
          <Button
            text={ <i className="material-icons" style={{ color: 'white' }}>menu</i>}
            style={ styles.menuButton }
            onClick={ this.toggleMobileMenu }
          />
        </div>

        <ul
          ref={ ul => this.menu = ul }
          style={ styles.menu }
          onClick={ this.handleMenuClick }
        >
          { links.menu }
        </ul>

      </div>
    )
  }
}


class NavbarLink extends React.Component {

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
        onMouseEnter={ this.handleHover }
        onMouseLeave={ this.handleHover }
      >
        { this.renderLinkType(styles) }

      </li>
    )
  }
}

export { Navbar, NavbarLink }
