import React from 'react'
import PropTypes from 'prop-types'
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
    onKeyPress: PropTypes.func,
    style: PropTypes.object,
    tabIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    _buttonGroupClick: PropTypes.func,
    _buttonGroupIndex: PropTypes.number
  }

  static defaultProps = {
    text: 'Button',
    tabIndex: 0,
    isDisabled: false,
    isActive: false,
    style: {},
  }

  state = { isHovered: false }

  onClick = (e) =>{
    const { isDisabled, onClick, value, _buttonGroupIndex, _buttonGroupClick } = this.props
    if(isDisabled) return

    if(onClick) onClick(value, e)
    if(_buttonGroupClick) _buttonGroupClick(value, _buttonGroupIndex, e)

    this.toggleAria(e.target)
  }

  onChange=(e)=>{
    const { onChange, value } = this.props
    if(onChange) onChange(value, e)
  }

  onKeyPress =(e)=>{
    const { onClick, onKeyPress, value } = this.props
    if (e.keyCode === 32 || e.keyCode === 13) {
      const handler = onKeyPress || onClick
      handler(value)
      this.toggleAria(e.target)
    }
  }

  onMouseOver = () =>{
    if(this.props.isDisabled) return
    this.setState({isHovered: true})
  }

  onMouseLeave = () =>{
    this.setState({isHovered: false})
  }

  toggleAria =(e)=> {
    const pressed = (e.getAttribute("aria-pressed") === "true")
    e.setAttribute("aria-pressed", !pressed)
  }

  onFocus =(e)=>{
    const { onFocus } = this.props
    if(onFocus) onFocus(e)
  }

  onBlur =(e)=>{
    const { onBlur } = this.props
    if(onBlur) onBlur(e)
  }

  render(){
    const { value, text, style, tabIndex, isActive, isDisabled } = this.props
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
        transition: 'all 0.5s ease',
        outline: 'none',
        boxSizing: 'border-box'
      },
      hovered: {
        backgroundColor: '#E1E1E1',
        cursor: 'pointer'
      },
      disabled:{
        cursor: 'default'
      },
      active:{
        backgroundColor: '#bfbfbf',
        cursor: 'pointer'
      }
    }

    // merge styles
    merge(styles, style)
    const events = {isActive, isHovered, isDisabled}
    mergeEvents(styles, events)

    return(
      <button
        ref={ node => this.node = node }
        style={ styles.base }
        value={ value }
        onClick={ this.onClick }
        onChange={ this.onChange}
        onKeyPress={ this.onKeyPress }
        onMouseOver={ this.onMouseOver }
        onMouseLeave={ this.onMouseLeave }
        onFocus={ this.onFocus }
        onBlur={ this.onBlur }
        role="button"
        aria-pressed="false"
        tabIndex={ tabIndex }
      >
        { text }
      </button>
    )
  }
}