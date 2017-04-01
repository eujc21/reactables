import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class Badge extends React.Component {

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    styles: PropTypes.object
  }

  static defaultProps = {
    text: '',
    styles: {}
  }

  render(){

    const { text, styles } = this.props

    let style = {
      backgroundColor: 'red',
      color: '#ffffff',
      borderRadius: 12,
      font: 'bold 11px/9px Helvetica, Verdana, Tahoma',
      height: 13,
      minWidth: 14,
      padding: '4px 3px 0 3px',
      textAlign: 'center'
    }

    merge(style, styles)

    return(
      <div style={ style }>
        { text }
      </div>
    )
  }
}
