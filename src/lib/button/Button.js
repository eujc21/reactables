import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class Button extends React.Component {
  static propTypes = {
    text: PropTypes.node,
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
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
    const { text, style } = this.props

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
        //boxShadow: '0px 2px 4px 0px rgba(0,0,0, 0.35)'
        cursor: 'pointer'
      },
      disabled:{
        cursor: 'default'
      },
      selected:{

      },
    }

    merge(styles, style)
    if(this.state.isHovered) merge(styles.base, styles.hovered)
    if(this.props.isSelected) merge(styles.base, styles.selected)
    if(this.props.isDisabled) merge(styles.base, styles.disabled)

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