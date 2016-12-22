import React, { PropTypes } from 'react'
import { getTop } from '../utils/utils'

export class Nav extends React.Component {

  static propTypes = {
    initialTop: PropTypes.number
  }

  state = { top: undefined }

  componentDidMount(){
    // set top and offset
    this.top = getTop(this.container)
    this.paddingTop = parseInt(window.getComputedStyle(this.container.parentNode).paddingTop)

    window.addEventListener('scroll', this.adjustOffset)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.adjustOffset)
  }

  adjustOffset =()=>{
    const top = window.pageYOffset <= (this.top - this.paddingTop)
      ? (this.top - window.pageYOffset)
      : this.paddingTop

    this.setState ({top})
  }

  render(){
    const { children } = this.props

    const style = {
      base: {
        position: 'relative',
        width: 300,
      },
      nav: {
        position: 'fixed',
        top: this.state.top,
        listStyleType: 'none',
        border: '1px solid #f5f5f5',
        width: 'inherit',
        padding: 0,
        margin: 0,
        zIndex: 10000,
        boxSizing: 'border-box'
      }
    }

    return (
      <div ref={ container => this.container = container } style={ style.base }>
        <ul style={ style.nav }>
          { children }
        </ul>
      </div>
    )
  }

}

export const NavLink =({to, children})=>{

  const style = {}

  return(
    <li style={ style }>
      <a href={ to }>{ children }</a>
    </li>
  )
}