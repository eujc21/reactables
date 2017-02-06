import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export class TextMenuOption extends React.Component {
  static propTypes = {
    onClick: PropTypes.func
  }

  onClick =()=>{
    const { selection, onClick } = this.props
    onClick(selection)
  }

  render(){
    const { children, styles } = this.props

    const style = {
      display: 'inline-block',
      padding: 6,
      cursor: 'pointer'
    }

    merge(style, styles)

    return(
      <li style={ style } onMouseDown={ this.onClick }>
        { children }
      </li>
    )
  }
}