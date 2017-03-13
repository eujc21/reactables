import React, { PropTypes } from 'react'
import ListToolbar from './list_toolbar'
import merge from 'lodash/merge'
import { TweenMax } from 'gsap'

export default class List extends React.Component{

  static propTypes = {
    listIndex: PropTypes.number,     // Only used for ListGroup animations
    selectedIndex: PropTypes.number, // Only used for ListGroup animations
    transitionTime: PropTypes.number, // Only used for ListGroup animations
    style: PropTypes.object
  }

  static defaultProps = {
    style: {}
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
    TweenMax.fromTo(this.list, this.props.transitionTime, {x: 0, opacity: 1}, {x:0, opacity: 0.8, onComplete: done})
  }

  push=(done)=>{
    TweenMax.fromTo(this.list, this.props.transitionTime, {x: 0}, {x: -414, opacity: 1, onComplete: ()=>{
      TweenMax.to(this.list, 0, {x: 0, onComplete: done})
    }})
  }

  pop=(done)=>{
    TweenMax.fromTo(this.list, this.props.transitionTime, {x: -414}, {x: 0, onComplete: done})
  }

  render() {

    const { children, style, selectedIndex, listIndex } = this.props

    const styles = {
      base: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 414,
        boxSizing: 'border-box',
        boxShadow: !selectedIndex ? '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)' : null,
        zIndex: listIndex
      },
      fixedBar:{

      },
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

    function isFixedChild(child){
      const isListToolbar = child.type === ListToolbar
      const isFixed = child.props && (child.props.type === 'fixed')
      return isListToolbar && isFixed
    }

    const fixed = React.Children.toArray(children).filter(isFixedChild)
    const cells = React.Children.toArray(children).filter(child => !isFixedChild(child))

    return (
      <div ref={ list => this.list = list } style={ styles.base }>
        <div style={ styles.fixedBar }>
          { fixed }
        </div>
        <div style={ styles.cells }>
          { React.Children.toArray(cells) }
        </div>
      </div>
    )
  }
}