import React, { PropTypes } from 'react'
import moment from 'moment'

export default class DateInput extends React.Component {

  static propTypes = {
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    endDate: PropTypes.object,
    startDate: PropTypes.object,
    startTime: PropTypes.object,
    endTime: PropTypes.object
  }

  handleClick =()=>{
    this.props.onClick()
  }

  render(){

    const { endDate } = this.props

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
          { endDate ? <div style={ style.divider }>-</div> : null }
          { this.renderEndDate() }
        </div>
      </div>
    )
  }

  renderStartDate =()=>{
    const { startDate, startTime, dateFormat, timeFormat, isTimePicker } = this.props
    if(!startDate)
      return(<div>&nbsp;</div>)

    const date = moment.isMoment(startDate) ? startDate.clone().format( dateFormat ) : ''
    const time = moment.isMoment(startTime) ? startTime.clone().format( timeFormat ) : ''
    return(
      <div>
        { date } { isTimePicker ? time : ''}
      </div>
    )
  }

  renderEndDate =()=>{
    const { endDate, endTime, dateFormat, timeFormat, isTimePicker } = this.props
    if(!endDate)
      return

    const date = moment.isMoment(endDate) ? endDate.clone().format( dateFormat ) : ''
    const time = moment.isMoment(endTime) ? endTime.clone().format( timeFormat ) : ''
    return(
      <div>
        { date } { isTimePicker ? time : ''}
      </div>
    )
  }
}