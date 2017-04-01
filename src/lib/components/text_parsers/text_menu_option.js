import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export class TextMenuOption extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object
  }

  static defaultProps = {
    style: {}
  }

  onClick =()=>{
    const { selection, onClick } = this.props
    onClick(selection)
  }

  render(){
    const { children, style } = this.props

    const styles = {
      display: 'inline-block',
      padding: 6,
      cursor: 'pointer'
    }

    merge(styles, style)

    return(
      <li style={ styles } onMouseDown={ this.onClick }>
        { children }
      </li>
    )
  }
}