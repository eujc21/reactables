import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { mergeEvents } from './utils/styles'

export default class ListCell extends React.Component {

  state = { isHovered: false }

  static propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    isSelected: false
  }

  handleClick =()=>{
    const {onClick} = this.props

    if(!onClick) return
    onClick()
  }

  onMouseOver =()=>{
    this.setState({isHovered: true})
  }

  onMouseLeave =()=>{
    this.setState({isHovered: false})
  }

  render() {
    const {children, style , isActive, isDisabled } = this.props
    const { isHovered } = this.state

    const styles = {
      base: {
        borderBottom: '1px solid #ccc',
        backgroundColor: '#fff'
      },
      hovered:{
        backgroundColor: '#BDBDBD',
        cursor: 'pointer'
      },
      active: {
        backgroundColor: '#BDBDBD'
      },
      disabled: {
        cursor: 'default'
      }
    }

    // merge styles
    merge(styles, style)

    // merge styles for events
    const events = {isActive, isDisabled, isHovered}
    mergeEvents(styles, events)

    return (
      <div style={ styles.base }
         onClick={ this.handleClick }
         onMouseLeave={ this.onMouseLeave }
         onMouseOver={ this.onMouseOver }
      >
        { children }
      </div>
    )
  }
}
