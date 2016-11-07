import React from 'react'
import moment from 'moment'

export default class DateInput extends React.Component {

  handleClick =()=>{
    this.props.onClick()
  }

  render(){

    const style = {
      base: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: 2,
        width: 300,
        padding: 3,
        fontSize: 14,
        marginBottom: 10,
        cursor: 'text'
      },
      divider: {
        margin: 0,
        padding: '0 6px'
      },
      text: {
        display: 'flex',
        margin: 0,
        padding: 0
      }
    }
    return(
      <div style={ style.base } onClick={ this.handleClick }>
        <div style={ style.text }>
          { this.renderStartDate() }
          { this.props.endDate ? <div style={ style.divider }>-</div> : null }
          { this.renderEndDate() }
        </div>
      </div>
    )
  }

  renderStartDate =()=>{
    const { startDate, format } = this.props

    return(
      <div>
        { moment.isMoment(startDate) ? startDate.clone().format( format ) : <div>&nbsp; </div> }
      </div>
    )
  }

  renderEndDate =()=>{
    const { endDate, format } = this.props
    if(!endDate)
      return

    return(
      <div>{ moment.isMoment(endDate) ? endDate.clone().format( format ) : '' }</div>
    )
  }
}