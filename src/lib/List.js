import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import TweenMax from 'gsap/TweenMax'
import TransitionGroup from 'react-transition-group/TransitionGroup'


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
  componentDidUpdate(prevProps){

    const { listIndex, selectedIndex } = this.props

    if(!listIndex)
      return

    // Press Next
    if((selectedIndex - 1) === prevProps.selectedIndex && (prevProps.selectedIndex === listIndex - 1)) {
      this.push()
    }

    // Press Back
    if((selectedIndex + 1) === prevProps.selectedIndex && (prevProps.selectedIndex === listIndex)) {
      this.pop()
    }
  }

  componentWillLeave (done) {
    TweenMax.fromTo(
      this.list,
      this.props.listAnimationTime,
      {x: 0, opacity: 1},
      {x:0, opacity: 0.8, onComplete: done})
  }

  push=(done)=>{
    const { style } = this.props
    TweenMax.fromTo(
      this.list,
      this.props.listAnimationTime,
      {x: 0},
      {x: -style.base.maxWidth || -414, opacity: 1, onComplete: ()=>{
        TweenMax.to(
          this.list,
          0,
          {x: 0, onComplete: done})
    }})
  }

  pop=(done)=>{
    const { style } = this.props

    TweenMax.fromTo(
      this.list,
      this.props.listAnimationTime,
      {x: -style.base.maxWidth || -414},
      {x: 0, onComplete: done})
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
      container: {
        position: 'relative',
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
      }
    }

    merge(styles, style)

    const childArray = React.Children.toArray(children)

    const Toolbar = childArray.filter(child =>{
      const isListToolbar = child.type.name === 'ListToolbar'
      const isFixed = child.props && (child.props.type === 'fixed')
      return isListToolbar && isFixed
    })

    const Cells = childArray.filter(child => child.type.name === 'ListCell')
    const Menus = childArray.filter(child => child.type.name === 'ListMenu' && child.props.isVisible)

    return (
      <div ref={ list => this.list = list } style={ styles.base }>
        <TransitionGroup style={ styles.container }>

          { Menus }

          <div style={ styles.fixedBar }>
            { Toolbar }
          </div>

          <div style={ styles.cells }>
            { Cells }
          </div>

        </TransitionGroup>
      </div>
    )
  }
}