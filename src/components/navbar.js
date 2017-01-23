import React, { PropTypes } from 'react'
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
    isMobileMenuVisible: false
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
    const { leftLinks, rightLinks } = this
    const leftWidth = parseInt(window.getComputedStyle(leftLinks).width) || 0
    const rightWidth = parseInt(window.getComputedStyle(rightLinks).width) || 0
    return leftWidth + rightWidth
  }

  updateIsMobile =()=>{
    const isMobile = !this.mediaQuery.matches
    this.setState({
      isMobile,
      isMobileMenuVisible: false
    })
  }

  toggleMobileMenu =()=>{
    this.setState({
      isMobileMenuVisible: !this.state.isMobileMenuVisible
    })
  }

  render(){

    const { styles, children } = this.props
    const { isMobile, isMobileMenuVisible } = this.state

    let style = {
      base:{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 9999,
        width: '100%',
        height: 70,
        backgroundColor: '#000000',
        top: 0,
        left: 0,
      },
      mobileBase:{

      },
      links: {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        height: '100%',
        listStyleType: 'none'
      },
      mobileLinks: {

      }
    }

    merge(style, styles)

    const links = React.Children
      .toArray(children)
      .reduce((obj, link, i)=>{

        if(link.props.align === 'left'){

          obj.left.push(React.cloneElement(
            link, { isMobile }
          ))

        } else {

          obj.right.push(React.cloneElement(
            link, { isMobile }
          ))

        }
        return obj

      }, { left: [], right: []})

    return(
      <div style={ style.base }>

        <ul ref={ ul => this.leftLinks = ul } style={ style.links }>{ links.left }</ul>
        <ul ref={ ul => this.rightLinks = ul } style={ style.links }>{ links.right }</ul>

      </div>
    )
  }

  renderDesktopLinks(){

  }

  renderMobileLinks(){

  }
}

class NavbarLink extends React.Component {

  static propTypes =  {
    append: PropTypes.oneOf(['left', 'right']),
    appendResponsive: PropTypes.oneOf(['bar', 'menu', 'hide']),
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
  }

  static defaultProps = {
    align: 'left'
  }

  render() {

    const { children, to, append, appendResponsive, isMobile, styles } = this.props

    const style = {
      base: {
        height: '100%',
        display: 'inline',
        padding: 0,

      },
      mobileBase: {},
      link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        margin: 0,
        padding: '0 15px',
        fontSize: 14,
        textDecoration: 'none',
        color: 'white',
        cursor: 'pointer'
      },
      mobileLink: {}
    }

    merge(style, styles)

    return (
      <li style={ style.base }>
        { typeof to === 'string'
          ? <a style={ style.link } href={ to }>{ children }</a>
          : <a style={ style.link } onClick={ to }>{ children }</a>
        }
      </li>
    )
  }
}

export { Navbar, NavbarLink }
