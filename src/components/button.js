import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export class Button extends React.Component {
  static propTypes = {
    text: PropTypes.node,
    isHoverable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object
  }

  static defaultProps = {
    text: 'Button',
    isHoverable: false,
    isDisabled: false,
    isSelected: false,
    style: {}
  }

  state = { isHovered: false }

  handleClick = () =>{
    const { isDisabled, onClick } = this.props
    if(isDisabled || !onClick)
      return

    onClick()
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
    const { text, isDisabled, isSelected, style } = this.props
    const { isHovered } = this.state

    const styles = {
      base:{
        color: '#000000',
        fontSize: 12,
        fontWeight: 200,
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        letterSpacing: 1,
        backgroundColor: '#f9f9f9',
        border: 'none',
        borderRadius: 2,
        cursor: isDisabled ? null : 'pointer',
        padding: 5,
        transition: 'box-shadow 0.5s ease'
      },
      hovered: {
        boxShadow: '0px 2px 4px 0px rgba(0,0,0, 0.35)'
      },
      selected:{

      },
      disabled:{

      }
    }
    merge(styles, style)

    if(isHovered) merge(styles.base, styles.hovered)
    if(isSelected) merge(styles.base, styles.selected)
    if(isDisabled) merge(styles.base, styles.disabled)

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