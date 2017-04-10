import React, { PropTypes } from 'react'
import merge from 'lodash/merge'
import { mergeEvents } from '../utils/styles'

export default class DropdownNode extends React.Component {

  static propTypes = {
    onClick: PropTypes.func,
    _onClick: PropTypes.func, //private
    isDisabled: PropTypes.bool,
    isActive: PropTypes.bool,
    style: PropTypes.object
  }

  static defaultProps = {
    style: {}
  }

  state = { isHovered: false }

  onClick = () =>{
    const { isDisabled, onClick, _onClick } = this.props
    if(isDisabled) return
    if(onClick) onClick()
    _onClick() // private on click
  }

  onMouseOver =()=>{
    this.setState({isHovered: true})
  }

  onMouseLeave =()=>{
    this.setState({isHovered: false})
  }

  render() {
    const { isDisabled, isActive, style } = this.props
    const { isHovered } = this.state

    const styles = {
      base: {
        display: 'flex',
        alignItems: 'center',
        color: '#000000',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        backgroundColor: '#cdcdcd',
        border: 'none',
        borderRadius: 2,
        cursor: 'default',
        padding: 5,
        transition: 'all 0.5s ease'
      },
      active: {
        cursor: 'pointer'
      },
      hovered: {
        cursor: 'pointer'
      },
      disabled: {
        cursor: 'default'
      },
    }

    merge(styles, style)

    const events = { isActive, isDisabled, isHovered }
    mergeEvents(styles, events)

    return (
      <div
        style={ styles.base }
        onMouseOver={ this.onMouseOver }
        onMouseLeave={ this.onMouseLeave }
        onClick={ this.onClick }>
          { this.props.children }
      </div>
    )
  }

}
