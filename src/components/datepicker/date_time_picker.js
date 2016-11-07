import React, { PropTypes } from 'react'
import 'babel-polyfill'

import Calendar from './calendar'
import DateInput from './date_input'
import DatePicker from './datepicker'
import TimePicker from './timepicker'

import moment from 'moment'

import '../../styles/icons.css'

export class DateTimePicker extends React.Component {

  static propTypes = {
    isRangePicker: PropTypes.bool,
    isDatePicker: PropTypes.bool,
    isTimePicker: PropTypes.bool,
    format: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    isRangePicker: false,
    isDatePicker: true,
    isTimePicker: false,
    format: 'MMM DD, YYYY'
  }

  state = {
    isCalendarVisible: false,
    startTime: '',
    endTime: '',
    startMonth: moment().startOf('month'),
    endMonth: moment().add(1, 'months').startOf('month')
  }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside, false)
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

  handleTimePickerStartChange =(startTime)=>{
    this.setState({startTime})
  }

  handleTimePickerEndChange =(endTime)=>{
    this.setState({endTime})
  }


  handleInputClick =()=>{
    this.setState({isCalendarVisible: !this.state.isCalendarVisible})
  }

  render(){
    const { startDate, endDate, isCalendarVisible } = this.state

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
          format={ this.props.format }
          onClick={ this.handleInputClick }/>
        { this.renderDatePicker(style) }
      </div>
    )
  }

  renderDatePicker =(style)=> {
    const { isRangePicker, isTimePicker, format } = this.props
    const { startMonth, endMonth, startDate, endDate, startTime, endTime } = this.state

    return(
      <div style={ style.picker }>
        <div style={ style.calendar }>
          { isRangePicker ?
            <div style={ style.rangeDisplay }>
              Start Date: { startDate ? startDate.format(format) : '--' }
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
              time={ startTime }
              onChange={ this.handleTimePickerStartChange }/> : null
          }
        </div>

        { isRangePicker ?
          <div style={ style.vr }/> : null
        }

        { isRangePicker ?
          <div style={ style.calendar }>
            { isRangePicker ?
              <div style={ style.rangeDisplay }>
                End Date: { endDate ? endDate.format(format) : '--' }
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

            { isTimePicker ?
              <TimePicker
                time={ endTime }
                onChange={ this.handleTimePickerEndChange }/> : null
            }
          </div> : null }

      </div>
    )
  }

  renderRangeDisplay =()=>{
    if(!this.props.isRangePicker)
      return

    return(
      <div></div>
    )
  }


}