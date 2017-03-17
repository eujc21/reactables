import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export class Button extends React.Component {
  static propTypes = {
    text: PropTypes.node,
    isHoverable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object
  }

  static defaultProps = {
    text: 'Button',
    isHoverable: false,
    isDisabled: false,
    style: {}
  }

  state = { isHovered: false }

  handleClick = () =>{
    const { isDisabled, onClick } = this.props
    if(isDisabled || !onClick)
      return

    onClick()
  }

  handleMouseEnter = () =>{
    if(this.props.isDisabled)
      return

    this.setState({isHovered: true})
  }

  handleMouseLeave = () =>{
    this.setState({isHovered: false})
  }

  handleFocus = (e) =>{
    e.target.blur()
  }

  render(){
    const { text, isDisabled, style } = this.props

    const styles = {
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
      transition: 'box-shadow 0.5s ease',
      boxShadow: this.state.isHovered ? '0px 2px 4px 0px rgba(0,0,0, 0.35)' : null
    }

    merge(styles, style)

    return(
      <button
        style={ styles }
        onClick={ this.handleClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        onFocus={ this.handleFocus }
      >
        { text }
      </button>
    )
  }
}