import React, { PropTypes } from 'react'

export class CountLabel extends React.Component {

  static propTypes = {
    styles: PropTypes.object,
    iconText: PropTypes.string,
    count: PropTypes.number,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    count: 0,
    backgroundColor: 'blue',
    textColor: 'white',
    styles: {}
  }

  handleClick =()=>{
    const { onClick, iconText } = this.props
    onClick ? onClick(iconText) : null
  }

  render(){
    const { iconText, count, backgroundColor, textColor, onClick, styles } = this.props

    let style = {
      base: {
        margin: 5,
        fontFamily: ' "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
      icon:{
        display: 'inline-block',
        backgroundColor: backgroundColor,
        color: textColor,
        fontSize: 10,
        marginRight: 5,
        padding: 5,
        borderRadius: 2,
        cursor: onClick ? 'pointer' : null
      },
      count: {
        display: 'inline-block',
        color: 'white',
        fontSize: 10
      }
    }

    style.icon = Object.assign({}, style.icon, styles.icon)

    console.log(style)

    return(
      <div style={ style.base }>
        <div style={ style.icon } onClick={ this.handleClick }>{ iconText }</div>
        <div style={ style.count }>{ count }</div>
      </div>
    )
  }
}