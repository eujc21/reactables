import React, { PropTypes } from 'react'
import merge from 'lodash/merge'
import { mergeEvents } from '../utils/styles'

export default class DropdownOption extends React.Component{

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.node
    ]).isRequired,
    isDisabled: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    styles: PropTypes.object
  }

  static defaultProps = {
    shouldHideMenu: true
  }

  state = { isHovered: false, isLast: false }

  componentDidMount(){
    this.detectLast()
  }

  detectLast =()=>{
    const lastChild = this.node.parentNode.lastChild

    this.setState({
      isLast: lastChild === this.node
    })
  }

  onMouseOver = () =>{
    this.setState({
      isHovered: true
    })
  }

  onMouseLeave = () =>{
    this.setState({
      isHovered: false
    })
  }

  onClick =()=>{
    const { onClick, isDisabled, value } = this.props
    if (isDisabled) return
    if(onClick) onClick(value)
  }

  render() {

    const { style, isActive, isDisabled, text } = this.props
    const { isHovered, isLast } = this.state

    const styles = {
      base: {
        padding: 10,
        fontSize: 16,
        cursor: 'default',
        transition: '0.2s all',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #dcdcdc'
      },
      last:{
        borderBottom: null
      },
      active: {
        backgroundColor: '#f9f9f9',
        cursor: 'pointer'
      },
      hovered: {
        backgroundColor: '#f9f9f9',
        cursor: 'pointer'
      },
      disabled: {
        backgroundColor: '#dcdcdc',
        cursor: 'default'
      }

    }

    merge(styles, style)
    if(isLast) merge(styles.base, styles.last)

    const events = {isActive, isDisabled, isHovered}
    mergeEvents(styles, events)

    return (
      <div
        ref={ node => this.node = node }
        style={ styles.base }
        onMouseOver={ this.onMouseOver }
        onMouseLeave={ this.onMouseLeave }
        onClick={ this.onClick }
      >
        { text }
      </div>
    )
  }
}