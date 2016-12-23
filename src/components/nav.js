import React, { PropTypes } from 'react'
import { getTop } from '../utils/utils'
import merge from 'lodash/merge'

export class Nav extends React.Component {

  static propTypes = {
    initialTop: PropTypes.number,
    offsetTop: PropTypes.number,
    styles: PropTypes.object
  }

  static defaultProps = {
    styles: {},
    offsetTop: 0
  }

  state = { top: undefined }

  componentDidMount(){
    // set top and offset
    this.top = getTop(this.container)
    this.paddingTop = parseInt(
      window.getComputedStyle(this.container.parentNode).paddingTop
    )
    this.adjustOffset()

    window.addEventListener('scroll', this.adjustOffset)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.adjustOffset)
  }

  adjustOffset =()=>{
    const { offsetTop } = this.props
    const top = window.pageYOffset <= (this.top - this.paddingTop - offsetTop)
      ? (this.top - window.pageYOffset)
      : this.paddingTop + offsetTop

    this.setState ({top})
  }

  setChildPosition =(index)=>{
    if(index === 0)
      return 'first'
    if(index === this.props.children.length - 1)
      return 'last'

    return 'middle'
  }

  render(){
    const { children, styles } = this.props

    const style = {
      base: {
        position: 'relative',
        width: 200,
      },
      nav: {
        position: 'fixed',
        top: this.state.top,
        listStyleType: 'none',
        borderTop: '1px solid #dcdcdc',
        borderLeft: '1px solid #dcdcdc',
        borderRight: '1px solid #dcdcdc',
        borderRadius: 5,
        width: 'inherit',
        padding: 0,
        margin: 0,
        zIndex: 10000,
        boxSizing: 'border-box'
      }
    }

    merge(style, styles)

    return (
      <div ref={ container => this.container = container } style={ style.base }>
        <ul style={ style.nav }>
          {
            children ? React.Children.map(children, (child, i) => {
              return React.cloneElement(child, {
                position: this.setChildPosition(i)
              })
            }) : null
          }
        </ul>
      </div>
    )
  }

}

export class NavLink extends React.Component {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    styles: PropTypes.object
  }

  static defaultProps = {
    styles: {}
  }

  state = { isHovered: false }

  handleHover =(e)=>{
    this.setState({
      isHovered: !this.state.isHovered
    })
  }

  setBorderRadius =()=>{
    const { position } = this.props
    if(position === 'first')
      return '5px 5px 0 0'

    if(position === 'middle')
      return 0

    if(position === 'last')
      return '0 0 5px 5px'
  }

  render(){
    const { to, children, styles } = this.props

    const style = {
      base: {
        position: 'relative',
        backgroundColor: this.state.isHovered ? '#ffffff' : '#d4d4d4',
        borderBottom: '1px solid #dcdcdc',
        padding: 0,
        fontSize: 14,
        borderRadius: this.setBorderRadius()
      },
      link:{
        display: 'block',
        margin: 0,
        padding: 10,
        height: '100%',
        textDecoration: 'none',
        color: 'black'
      }
    }

    merge(style, styles)

    return(
      <li
        style={ style.base }
        onMouseEnter={ this.handleHover }
        onMouseLeave={ this.handleHover }
      >
        { typeof to === 'string'
          ? <a style={ style.link } href={ to }>{ children }</a>
          : <a style={ style.link } href='' onClick={ to }>{ children }</a>
        }
      </li>
    )
  }
}