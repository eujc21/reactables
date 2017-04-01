import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class ListToolbar extends React.Component {

  static propTypes = {
    type: PropTypes.string
  }

  render() {

    const { children, style } = this.props

    const styles = {
      display: 'flex',
      flexShrink: 0,
      position: 'relative',
      width: '100%',
      maxWidth: 'inherit',
      boxSizing: 'border-box',
      backgroundColor: '#616161',
      color: '#fff',
      alignItems: 'center',
      transition: 'transform 0.3s ease-out',
      boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.26)',
      padding: '0 16px',
      height: 64
    }

    merge(styles, style)

    return (
      <div style={ styles }>
        { children }
      </div>
    )
  }
}