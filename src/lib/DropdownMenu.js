import React, { PropTypes } from 'react'
import merge from 'lodash/merge'
import { mergeEvents } from '../utils/styles'

export default class DropdownMenu extends React.Component {

  static propTypes = {
    onClick: PropTypes.func,
    _onClick: PropTypes.func, //private
    justify: PropTypes.oneOf(['left', 'right']),
    isActive: PropTypes.bool,
    style: PropTypes.object
  }

  static defaultProps = {
    justify: 'left',
    style: {}
  }

  onClick =()=>{
    const { onClick, _onClick } = this.props
    if(onClick) onClick()
    _onClick() //private on click
  }

  render() {

    const { style, justify, isActive } = this.props

    // set menu justification
    // can be overwritten in props.style
    const right = justify === 'right' ? 0 : null
    const left = justify === 'left' ? 0 : null

    const styles = {
      base: {
        position: 'absolute',
        width: 'auto',
        minWidth: 200,
        right,
        left,
        visibility: 'hidden',
        opacity: 0,
        backgroundColor: 'white',
        marginTop: 3,
        borderRadius: 2,
        zIndex: 10000,
        transition: '0.5s ease',
      },
      active:{
        visibility: 'visible',
        opacity: 1,
      },
      hovered: {},
      disabled: {}
    }

    merge(styles, style)

    const events = { isActive }
    mergeEvents(styles, events)

    return (
      <div style={ styles.base } onClick={ this.onClick }>
        { this.props.children }
      </div>
    )
  }
}