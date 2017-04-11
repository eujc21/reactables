import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

export default class ButtonGroup extends React.Component {
  static propTypes = {
    activeIndex: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    activeIndex: null
  }

  cloneWithProps(child, i){
    const { activeIndex } = this.props
    return React.cloneElement(child, {
      isActive: activeIndex === i
    })
  }

  onChange =(value, i)=>{
    const { onChange } = this.props
    if(onChange) onChange(value, i)
  }

  render(){
    const { children, style } = this.props

    const styles = {
      base: {
        borderRadius: 2,
      }
    }

    merge(styles, style)

    return(
      <div
        role="group"
      >
        { React.Children.toArray(children)
          .map((child, i) => this.cloneWithProps(child, i))}
      </div>
    )
  }
}