import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import TweenMax from 'gsap'

export default class ListMenu extends React.Component {

  static propTypes = {
    isVisible: PropTypes.bool
  }

  static defaultProps = {
    isVisible: false
  }

  componentDidMount(){
    this.height = this.getHeight()
  }

  componentWillEnter(done){
    this.slideUp(done)
  }

  componentWillLeave(done){
    this.slideDown(done)
  }

  getHeight =()=>{
    return this.menu
      ? parseInt(window.getComputedStyle(this.menu).height)
      : null
  }

  slideUp=(done)=>{
    this.height = this.getHeight()
    TweenMax.fromTo(
      this.menu,
      0.3,
      {y: this.height},
      {y: 0, onComplete: done}
    )

  }

  slideDown=(done)=>{
    this.height = this.getHeight()
    TweenMax.fromTo(
      this.menu,
      0.3,
      {y: 0},
      {y: this.height, onComplete: done}
    )

  }

  render(){
    const { children, style } = this.props
    const styles = {
      base:{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        width: '100%',
        height: '100%',
        maxWidth: 414,
        boxSizing: 'border-box',
        zIndex: 1
      },
      content:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        overflowY: 'scroll'
      }
    }

    merge(styles, style)

    const childArray = React.Children.toArray(children)
    const fixedToolbar = childArray.filter(child =>{
      return child.type.name === 'ListToolbar'
    })
    const content = childArray.filter(child => child.type.name !== 'ListToolbar')

    return(
      <div ref={ menu => this.menu = menu } style={ styles.base }>
        <div style={ styles.fixedBar}>
          { fixedToolbar }
        </div>
        <div style={ styles.content }>
          { content }
        </div>
      </div>
    )
  }
}