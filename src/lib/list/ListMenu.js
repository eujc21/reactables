import React, { PropTypes } from 'react'
import merge from 'lodash/merge'
import TweenMax from 'gsap/TweenMax'

export default class ListMenu extends React.Component {

  componentDidMount() {
    console.log('didMount')
    this.slideUp()
  }

  componentWillLeave(done){
    this.slideDown(done)
  }

  slideUp=(done)=>{
    const height = window.getComputedStyle(this.menu).height

    TweenMax.fromTo(
      this.menu,
      0.3,
      {y: height},
      {y: -height, onComplete: done}
    )

  }

  slideDown=(done)=>{
    const height = window.getComputedStyle(this.menu).height

    TweenMax.fromTo(
      this.menu,
      0.3,
      {y: -height},
      {y: height, onComplete: done}
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
        boxSizing: 'border-box'
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
          { fixedToolbar}
        </div>
        <div style={ styles.content }>
          { content }
        </div>
      </div>
    )
  }
}