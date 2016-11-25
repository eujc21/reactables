import React, { PropTypes } from 'react'

export class Badge extends React.Component {

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    backgroundColor: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    text: '',
    backgroundColor: 'red',
    color: 'white'
  }

  render(){

    const { backgroundColor, color, text } = this.props

    let style = {
      backgroundColor,
      color,
      borderRadius: 12,
      font: 'bold 11px/9px Helvetica, Verdana, Tahoma',
      height: 13,
      minWidth: 14,
      padding: '4px 3px 0 3px',
      textAlign: 'center'
    }

    return(
      <div style={ style }>
        { text }
      </div>
    )
  }
}
