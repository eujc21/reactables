import React, { PropTypes } from 'react'
import moment from 'moment'
import merge from 'lodash/merge'
import '../../styles/icons.css'

export default class DateInput extends React.Component {

  static propTypes = {
    canClear: PropTypes.bool,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    endDate: PropTypes.object,
    startDate: PropTypes.object,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    width: PropTypes.number,
    placeholder: PropTypes.string,
    onInputClick: PropTypes.func,
    onClearClick: PropTypes.func,
    styles: PropTypes.object
  }

  handleInputClick =()=>{
    this.props.onInputClick()
  }

  handleClearClick =()=>{
    this.props.onClearClick()
  }

  render(){

    const { endDate, styles } = this.props

    const style = {
      base: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        border: '1px solid #EBE9ED',
        borderRadius: 2,
        padding: '3px 10px',
        fontSize: 14,
        marginBottom: 10,
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
        alignItems: 'center',
        width: '100%',
        cursor: 'text',
        margin: 0,
        padding: 0,
        height: 'inherit'
      },
      clearIcon:{
        alignSelf: 'center',
        color: 'black',
        cursor: 'pointer'
      }
    }

    merge(style, styles)
    return(
      <div style={ style.base }>
        <div style={ style.text } onClick={ this.handleInputClick }>
          { this.renderPlaceholder(style) }
          { this.renderStartDate() }
          { endDate ? <div style={ style.divider }>-</div> : null }
          { this.renderEndDate() }
        </div>
        { this.renderClearDatesIcon(style) }

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

  renderClearDatesIcon =(style)=>{
    const { startDate, endDate, canClear } =  this.props
    if(!canClear) return
    if(!startDate && !endDate) return

    return(
      <i style={ style.clearIcon } className="icon-cross-circle" onClick={ this.handleClearClick }/>
    )
  }
}