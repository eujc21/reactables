import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

export default class ButtonGroup extends React.Component {
  static propTypes = {
    activeValue: PropTypes.number,
    onClick: PropTypes.func,
    style: PropTypes.object,
    buttonStyle: PropTypes.object
  }

  static defaultProps = {
    activeValue: null,
    style: {},
    buttonStyle: {}
  }

  state = { activeValue: null }

  onChange =(value)=>{
    const { onChange, activeValue } = this.props

    if(onChange) onChange(value)

    // set activeValue externally if specified
    if(activeValue) return

    this.setState({activeValue: value})
  }

  render(){
    const { children, buttonStyle, style, activeValue } = this.props

    const groupStyles = {
      base:{
        display: 'inline-block'
      }
    }

    merge(groupStyles, style)

    const array = React.Children.toArray(children)
    const Children = array.map((child, i) =>{

      const buttonStyles = {
        base: {
          margin: 0
        },
        firstButton: {
          borderRadius: '2px 0 0 2px',
          borderRight: '1px solid #bfbfbf'
        },
        midButton:{
          borderRadius: 0,
          borderRight: '1px solid #bfbfbf',
        },
        lastButton:{
          borderRadius: '0 2px 2px 0'
        }
      }

      merge(buttonStyles, buttonStyle)

      // determine position for style merge
      const isFirst = i === 0
      const isLast = i === array.length - 1
      const isMid = !isFirst && !isLast

      if (isFirst) merge(buttonStyles.base, buttonStyles.firstButton)
      if (isLast) merge(buttonStyles.base, buttonStyles.lastButton)
      if (isMid) merge(buttonStyles.base, buttonStyles.midButton)

      return React.cloneElement(child, {
        isActive: child.props.value === activeValue,
        _buttonGroupClick: this.onChange,
        _buttonGroupIndex: i,
        style: { base: {...child.props.style.base, ...buttonStyles.base, } }
      })
    })

    return(
      <div style={ groupStyles.base } role="group">
        { Children }
      </div>
    )
  }
}