import React, { PropTypes } from 'react'
import merge from 'lodash/merge'
import { mergeEvents } from '../utils/styles'

export default class Button extends React.Component {
  static propTypes = {
    text: PropTypes.node,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    isDisabled: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object
  }

  static defaultProps = {
    text: 'Button',
    isDisabled: false,
    isSelected: false,
    style: {}
  }

  state = { isHovered: false }

  handleClick = () =>{
    const { isDisabled, onClick, value } = this.props
    if(isDisabled || !onClick) return
    onClick(value)
  }

  handleMouseOver = () =>{
    if(this.props.isDisabled) return
    this.setState({isHovered: true})
  }

  handleMouseLeave = () =>{
    this.setState({isHovered: false})
  }

  handleFocus = (e) =>{
    e.target.blur()
  }

  render(){
    const { text, style, isActive, isDisabled } = this.props
    const { isHovered } = this.state

    const styles = {
      base:{
        color: '#000000',
        fontSize: 12,
        fontWeight: 200,
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        border: 'none',
        borderRadius: 2,
        cursor: 'default',
        padding: 5,
        transition: 'all 0.5s ease'
      },
      hovered: {
        cursor: 'pointer'
      },
      disabled:{
        cursor: 'default'
      },
      selected:{

      },
    }

    // merge styles
    merge(styles, style)

    const events = {isActive, isHovered, isDisabled}
    mergeEvents(styles, events)

    return(
      <button
        style={ styles.base }
        onClick={ this.handleClick }
        onMouseOver={ this.handleMouseOver }
        onMouseLeave={ this.handleMouseLeave }
        onFocus={ this.handleFocus }
      >
        { text }
      </button>
    )
  }
}