import React, { PropTypes } from 'react'
import moment from 'moment'

export default class DateInput extends React.Component {

  static propTypes = {
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    endDate: PropTypes.object,
    startDate: PropTypes.object,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    width: PropTypes.number,
    placeholder: PropTypes.string
  }

  handleClick =()=>{
    this.props.onClick()
  }

  render(){

    const { endDate, width } = this.props

    const style = {
      base: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: 2,
        width: width,
        padding: 3,
        fontSize: 14,
        marginBottom: 10,
        cursor: 'text'
      },
      divider: {
        margin: 0,
        padding: '0 6px'
      },
      placeholder: {
        color: '#ccc'
      },
      text: {
        display: 'flex',
        margin: 0,
        padding: 0
      }
    }
    return(
      <div style={ style.base } onClick={ this.handleClick }>
        { }
        <div style={ style.text }>
          { this.renderPlaceholder(style) }
          { this.renderStartDate() }
          { endDate ? <div style={ style.divider }>-</div> : null }
          { this.renderEndDate() }
        </div>
      </div>
    )
  }

  renderPlaceholder =(style)=>{
    const { startDate, endDate, placeholder } = this.props
    if(!startDate && !endDate)
      return(
        (<div style={ style.placeholder }>{ placeholder }</div>)
      )
  }

  renderStartDate =()=>{
    const { startDate, startTime, dateFormat, timeFormat, isTimePicker } = this.props
    if(!startDate)
      return

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