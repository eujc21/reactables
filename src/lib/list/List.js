import React, { PropTypes } from 'react'
import merge from 'lodash/merge'
import TweenMax from 'gsap/TweenMax'
import TransitionGroup from 'react-addons-transition-group'

export default class List extends React.Component{

  static propTypes = {
    listIndex: PropTypes.number,     // Only used for ListGroup animations
    selectedIndex: PropTypes.number, // Only used for ListGroup animations
    listAnimationTime: PropTypes.number, // Only used for ListGroup animations
    style: PropTypes.object
  }

  static defaultProps = {
    style: { base: {}, cells:{} },
  }

  /* Update state and set animation type */
  componentWillReceiveProps(nextProps){

    if(!nextProps.listIndex)
      return

    const { listIndex } = this.props

    // Press Back
    if((this.props.selectedIndex - 1) === nextProps.selectedIndex && (nextProps.selectedIndex === listIndex - 1)) {
      this.pop()
    }

    // Press Next
    if((this.props.selectedIndex + 1) === nextProps.selectedIndex && (nextProps.selectedIndex === listIndex)) {
      this.push()
    }
  }

  componentWillLeave (done) {
    TweenMax.fromTo(this.list, this.props.listAnimationTime, {x: 0, opacity: 1}, {x:0, opacity: 0.8, onComplete: done})
  }

  push=(done)=>{
    const { style } = this.props
    TweenMax.fromTo(this.list, this.props.listAnimationTime, {x: 0}, {x: -style.base.maxWidth || -414, opacity: 1, onComplete: ()=>{
      TweenMax.to(this.list, 0, {x: 0, onComplete: done})
    }})
  }

  pop=(done)=>{
    const { style } = this.props
    TweenMax.fromTo(this.list, this.props.listAnimationTime, {x: -style.base.maxWidth || -414}, {x: 0, onComplete: done})
  }

  render() {

    const { children, style, selectedIndex, listIndex } = this.props

    const styles = {
      base: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        width: '100%',
        height: '100%',
        maxWidth: 414,
        boxSizing: 'border-box',
        boxShadow: !selectedIndex ? '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)' : null,
        zIndex: listIndex
      },
      transitionGroup: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box'
      },
      fixedBar: {},
      cells:{
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        backgroundColor: 'white',
        width: '100%'
      },
      menuContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        width: '100%',
        height: '100%',
        maxWidth: 414,
        boxSizing: 'border-box'
      }
    }

    merge(styles, style)

    const childArray = React.Children.toArray(children)

    const fixedToolbar = childArray.filter(child =>{
      const isListToolbar = child.type.name === 'ListToolbar'
      const isFixed = child.props && (child.props.type === 'fixed')
      return isListToolbar && isFixed
    })

    const toolbar = childArray.filter(child =>{
      const isListToolbar = child.type.name === 'ListToolbar'
      const isFixed = child.props && (child.props.type !== 'fixed')
      return isListToolbar && isFixed
    })

    const cells = childArray.filter(child => child.type.name === 'ListCell')
    const menus =  childArray.filter(child => child.type.name === 'ListMenu')


    return (
      <div ref={ list => this.list = list } style={ styles.base }>
        <TransitionGroup style={ styles.transitionGroup }>
          <div style={ styles.fixedBar }>
            { fixedToolbar }
          </div>
          <div style={ styles.cells }>
            { cells }
          </div>
          { menus.filter(menu => menu.props.isVisible) }
        </TransitionGroup>
      </div>
    )
  }
}