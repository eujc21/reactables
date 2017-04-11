import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

export default class Nav extends React.Component {

  static propTypes = {
    initialTop: PropTypes.number,
    offsetTop: PropTypes.number,
    style: PropTypes.object
  }

  static defaultProps = {
    style: {},
    offsetTop: 0
  }

  state = { top: undefined }

  componentDidMount(){
    // set top and offset
    this.top = this.getTop(this.container)
    this.paddingTop = parseInt(window.getComputedStyle(this.container.parentNode).paddingTop)
    this.adjustOffset()

    window.addEventListener('scroll', this.adjustOffset)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.adjustOffset)
  }

  getTop =(el)=>{
    const element = el.getBoundingClientRect()
    const body = document.body
    const doc = document.documentElement

    const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop
    const clientTop = doc.clientTop || body.clientTop || 0

    return element.top +  scrollTop - clientTop
  }

  adjustOffset =()=>{
    const { offsetTop } = this.props
    const top = window.pageYOffset <= (this.top - this.paddingTop - offsetTop)
      ? (this.top - window.pageYOffset)
      : this.paddingTop + offsetTop

    this.setState ({top})
  }

  // pass position as a prop to NavLink
  setChildPosition =(index)=>{
    if(index === 0)
      return 'first'
    if(index === this.props.children.length - 1)
      return 'last'

    return 'middle'
  }

  render(){
    const { children, style } = this.props

    const styles = {
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

    merge(styles, style)

    return (
      <div ref={ container => this.container = container } style={ styles.base }>
        <ul style={ styles.nav }>
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