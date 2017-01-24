import React, { PropTypes } from 'react'
import { Button } from './button'
import merge from 'lodash/merge'

class Navbar extends React.Component {
  static propTypes = {
    styles: PropTypes.object,
    responsiveWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    menuIcon: PropTypes.node,
    appendMenuButton: PropTypes.oneOf(['left', 'right']),
  }

  static defaultProps = {
    styles: {},
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

    const { styles, children } = this.props
    const { isMobile, isMenuVisible } = this.state

    let style = {
      base: {
        position: 'fixed',
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
      },
      menu:{
        backgroundColor: '#525252',
        margin: 0,
        paddingLeft: 0,
        visibility: isMenuVisible ? 'visible' : 'hidden',
        overflowY: 'hidden',
        //transition: 'all 0.7s ease-in-out',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0, 0.35)'
      }
    }

    merge(style, styles)

    return(
      <div style={ style.base }>
        { isMobile
          ? this.renderMobile(children, style)
          : this.renderDesktop(children, style)
        }
      </div>
    )
  }

  renderDesktop(children, style){

    const links = React.Children
      .toArray(children)
      .reduce((obj, link)=>{
        const { append } = link.props
        obj[append].push(React.cloneElement(
          link, { isMobile: false }
        ))
        return obj
      }, { left: [], right: []})

    return(
      <div style={ style.bar }>
        <ul ref={ ul => this.leftLinks = ul } style={ style.linkContainer }>{ links.left }</ul>
        <ul ref={ ul => this.rightLinks = ul } style={ style.linkContainer }>{ links.right }</ul>
      </div>
      )

  }

  renderMobile(children, style){

    const links = React.Children
      .toArray(children)
      .reduce((obj, link)=>{
        const { appendResponsive } = link.props
        obj[appendResponsive].push(React.cloneElement(
          link, { isMobile: appendResponsive !== 'bar' }
        ))
        return obj
      }, { bar: [], menu: [] })


    return(
      <div>

        <div style={ style.bar }>
          <ul style={ style.linkContainer }>
            { links.bar }
          </ul>
          <Button
            text={ <i className="icon-hamburger"/>}
            styles={ style.menuButton }
            onClick={ this.toggleMobileMenu }
          />
        </div>

        <ul
          ref={ ul => this.menu = ul }
          style={ style.menu }
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
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    append: 'left',
    appendResponsive: 'menu',
    isActive: false
  }

  state = { isHovered: false }

  handleHover =()=>{
    this.setState({
      isHovered: !this.state.isHovered
    })
  }

  setLinkColor =(style)=> {

    const { isActive, isMobile } = this.props
    const { isHovered } = this.state

    if(isMobile) {
      if(isActive)
        merge(style.menuLink.base, style.menuLink.active)
      if(isHovered)
        merge(style.menuLink.base, style.menuLink.hover)
    } else {
      if(isActive)
        merge(style.link.base, style.link.active)
      if(isHovered)
        merge(style.link.base, style.link.hover)
    }

    return style
  }

  render() {

    const { children, to, isMobile, styles } = this.props

    let style = {
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

    merge(style, styles)
    this.setLinkColor(style)

    return (
      <li style={ style.base } onMouseEnter={ this.handleHover } onMouseLeave={ this.handleHover }>
        { typeof to === 'string'
          ? <a style={ isMobile ? style.menuLink.base : style.link.base } href={ to }>{ children }</a>
          : <a style={ isMobile ? style.menuLink.base : style.link.base } onClick={ to }>{ children }</a>
        }
      </li>
    )
  }
}

export { Navbar, NavbarLink }
