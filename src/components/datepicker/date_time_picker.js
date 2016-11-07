import React, { PropTypes } from 'react'
import 'babel-polyfill'

import Calendar from './calendar'
import DateInput from './date_input'
import DatePicker from './datepicker'
import TimePicker from './timepicker'
import { convertHours, appendTime } from './helpers'

import moment from 'moment'
import isEqual from 'lodash/isEqual'

import '../../styles/icons.css'

export class DateTimePicker extends React.Component {

  static propTypes = {
    isRangePicker: PropTypes.bool,
    isDatePicker: PropTypes.bool,
    isTimePicker: PropTypes.bool,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    inputWidth: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    isRangePicker: false,
    isDatePicker: true,
    isTimePicker: false,
    dateFormat: 'MMM DD, YYYY',
    timeFormat: 'hh:mm a',
    inputWidth: 300
  }

  state = {
    isCalendarVisible: false,
    startHour: '12',
    startMinute: '00',
    endHour: '12',
    endMinute: '00',
    startPeriod: 'AM',
    endPeriod: 'AM',
    startMonth: moment().utc().startOf('month'),
    endMonth: moment().utc().add(1, 'months').startOf('month'),
    startTime: moment().utc().startOf('day'),
    endTime: moment().utc().startOf('day')
  }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside, false)
  }

  componentDidUpdate(prevProps, prevState){
    const { startDate, startTime, endDate, endTime } = this.state
    const { isTimePicker, isRangePicker, onChange} = this.props

    let date1 = null
    let date2 = null

    if(!isEqual(prevState.startDate, startDate) ||
      !isEqual(prevState.endDate, endDate) ||
      !isEqual(prevState.startTime, startTime) ||
      !isEqual(prevState.endTime, endTime)
    ){
      date1 = startDate && isTimePicker ? appendTime(startDate, startTime) : startDate
      date2 = isRangePicker &&endDate &&isTimePicker  ? appendTime(endDate, endTime) : endDate

      onChange(date1, date2)
    }

  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside, false)
  }

  onClickOutside = (e) => {
    if (this.refs.main && this.refs.main.contains(e.target)) {
      return
    }

    this.setState({
      isCalendarVisible: false,
    })
  }

  handleDatePickerStartChange =(startMonth)=>{
    this.setState({startMonth})
  }

  handleDatePickerEndChange =(endMonth)=>{
    this.setState({endMonth})
  }

  onStartDateChange =(date)=>{

    date = date.clone().startOf('day')
    let { startMonth, endDate } = this.state

    if(this.props.isRangePicker){
      endDate = endDate && date > endDate ? null : endDate
    }

    this.setState({
      startDate: date.clone(),
      startMonth: startMonth.month() !== date.month() ? date.clone() : startMonth.clone(),
      endDate
    })

  }

  onEndDateChange =(date)=>{

    date = date.clone().startOf('day')
    let { startDate, endMonth } = this.state

    if(this.props.isRangePicker){
      startDate = startDate && date < startDate ? null : startDate
    }

    this.setState({
      endDate: date.clone(),
      endMonth: endMonth.month() !== date.month() ? date.clone() : endMonth.clone(),
      startDate
    })
  }

  handleTimePickerStartChange =(startHour, startMinute, startPeriod)=>{
    const startTime = moment().utc().startOf('day')
      .hours(convertHours(startHour, startPeriod))
      .minutes(parseInt(startMinute))


    this.setState({
      startHour,
      startMinute,
      startPeriod,
      startTime
    })
  }

  handleTimePickerEndChange =(endHour, endMinute, endPeriod)=>{
    const endTime =  moment().utc().startOf('day')
      .hours(convertHours(endHour, endPeriod))
      .minutes(parseInt(endMinute))

    this.setState({
      endHour,
      endMinute,
      endPeriod,
      endTime
    })
  }

  handleInputClick =()=>{
    this.setState({isCalendarVisible: !this.state.isCalendarVisible})
  }

  render(){
    const { startDate, endDate, startTime, endTime, isCalendarVisible } = this.state
    const { dateFormat, timeFormat, isTimePicker, inputWidth } = this.props

    const style = {
      base: {
      },
      picker: {
        padding: 10,
        backgroundColor: 'white',
        display: 'flex',
        position: 'absolute',
        visibility: isCalendarVisible ? 'visible' : 'hidden',
        width: 'auto',
        right: this.props.menuDirection === 'left' ? 0 : null,
        left: this.props.menuDirection === 'right' ? 0 : null,
        marginTop: 3,
        border: '1px solid #dcdcdc',
        borderRadius: 3,
        transition: '0.5s ease',
        opacity: isCalendarVisible ? 1 : 0,
        zIndex: 10000
      },
      rangeDisplay: {
        padding: 10,
        fontSize: 14
      },
      calendar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      },
      vr: {
        borderLeft: '1px solid #ccc',
        height: 'inherit',
        width: 2,
        margin: '0 10px'
      }
    }
    return(
      <div ref='main' style={ style.base }>
        <DateInput
          startDate={ startDate }
          endDate={ endDate }
          startTime={ startTime }
          endTime={ endTime }
          dateFormat={ dateFormat }
          timeFormat={ timeFormat }
          isTimePicker={ isTimePicker }
          width={ inputWidth }
          onClick={ this.handleInputClick }/>
        { this.renderDatePicker(style) }
      </div>
    )
  }

  renderDatePicker =(style)=> {
    const { isRangePicker, isTimePicker, dateFormat } = this.props
    const { startMonth, endMonth, startDate, endDate, startHour, endHour, startMinute, endMinute, startPeriod, endPeriod } = this.state

    return(
      <div style={ style.picker }>
        <div style={ style.calendar }>
          { isRangePicker ?
            <div style={ style.rangeDisplay }>
              Start Date: { startDate ? startDate.format(dateFormat) : '--' }
            </div> : null
          }
          <DatePicker
            month={ startMonth }
            onChange={ this.handleDatePickerStartChange }/>
          <Calendar
            isRangePicker={ isRangePicker }
            selectedDate={ startDate }
            rangeDate={ endDate }
            calendarDate={ startMonth }
            onDateChange={ this.onStartDateChange }/>

          { isTimePicker ?
            <TimePicker
              date={ startDate }
              hour={ startHour }
              minute={ startMinute }
              period={ startPeriod }
              onChange={ this.handleTimePickerStartChange }/> : null
          }
        </div>

        { isRangePicker ?
          <div style={ style.vr }/> : null
        }

        { isRangePicker ?
          <div style={ style.calendar }>
            <div>
              { isRangePicker ?
                <div style={ style.rangeDisplay }>
                  End Date: { endDate ? endDate.format(dateFormat) : '--' }
                </div> : null
              }
              <DatePicker
                month={ endMonth }
                onChange={ this.handleDatePickerEndChange }/>
              <Calendar
                isRangePicker={ isRangePicker }
                selectedDate={ endDate }
                rangeDate={ startDate }
                calendarDate={ endMonth }
                onDateChange={ this.onEndDateChange }/>
            </div>

            { isTimePicker ?
              <TimePicker
                date={ endDate }
                hour={ endHour }
                minute={ endMinute }
                period={ endPeriod }
                onChange={ this.handleTimePickerEndChange }/> : null
            }
          </div> : null }

      </div>
    )
  }

}