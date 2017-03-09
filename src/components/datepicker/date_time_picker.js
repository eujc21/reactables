import React, { PropTypes } from 'react'
import 'babel-polyfill'

import Calendar from './calendar'
import DateInput from './date_input'
import DatePicker from './datepicker'
import TimePicker from './timepicker'

import moment from 'moment'
import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'

import '../../styles/icons.css'

export class DateTimePicker extends React.Component {

  static propTypes = {
    isRangePicker: PropTypes.bool,
    isTimePicker: PropTypes.bool,
    canClear: PropTypes.bool,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    startDate: function(props, propName, componentName) {
      if (props[propName] && !moment.isMoment(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    },
    endDate: function(props, propName, componentName) {
      if (props[propName] && !moment.isMoment(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    },
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    pickerDirection: PropTypes.oneOf(['left', 'right']),
    style: PropTypes.object
  }

  static defaultProps = {
    isRangePicker: false,
    isTimePicker: false,
    dateFormat: 'MMM DD, YYYY',
    timeFormat: 'hh:mm a',
    placeholder: 'Select a Date',
    pickerDirection: 'right',
    style: {}
  }

  state = {
    isCalendarVisible: false,
    startMonth: moment().utc().startOf('month'),
    endMonth: moment().utc().add(1, 'months').startOf('month'),
  }

  componentWillMount(){
    const { startDate, endDate } = this.props
    this.setState({
      startDate: startDate ? startDate.utc() : null,
      endDate: endDate ? endDate.utc() : null,
      startMonth: startDate ? startDate.clone().utc().startOf('month') : this.state.startMonth,
      endMonth: endDate ? endDate.clone().utc().startOf('month') : this.state.endMonth
    })
  }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside, false)
  }

  componentWillReceiveProps(nextProps){
    const { startDate, endDate } = nextProps

    this.setState({
      startDate: startDate ? startDate.utc() : null,
      endDate: endDate ? endDate.utc() : null,
      startMonth: startDate && !isEqual(this.props.startDate, startDate) ? startDate.clone().utc().startOf('month') : this.state.startMonth,
      endMonth: endDate && !isEqual(this.props.endDate, endDate) ? endDate.clone().utc().startOf('month') : this.state.endMonth
    })

  }

  componentDidUpdate(prevProps, prevState){
    const { startDate, endDate } = this.state
    const { onChange } = this.props

    if(!isEqual(prevState.startDate, startDate) ||
      !isEqual(prevState.endDate, endDate)){

      onChange(startDate, endDate)
    }

  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside, false)
  }

  onClickOutside = (e) => {
    if (this.main && this.main.contains(e.target)) {
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

    let { startMonth, startDate, endDate } = this.state
    date = date.clone()
    date = startDate ? date.hour(startDate.hour()).minute(startDate.minute()) : date

    if(this.props.isRangePicker){
      endDate = endDate && date.clone().startOf('day') > endDate.clone().startOf('day') ? null : endDate
    }

    this.setState({
      startDate: date,
      startMonth: startMonth.month() !== date.month() ? date.clone() : startMonth.clone(),
      endDate
    })

  }

  onEndDateChange =(date)=>{

    let { endMonth, endDate, startDate } = this.state
    date = date.clone()
    date = endDate ? date.hour(endDate.hour()).minute(endDate.minute()) : date

    if(this.props.isRangePicker){
      startDate = startDate && date.clone().startOf('day') < startDate.clone().startOf('day') ? null : startDate
    }

    this.setState({
      endDate: date,
      endMonth: endMonth.month() !== date.month() ? date.clone() : endMonth.clone(),
      startDate
    })
  }

  handleTimePickerStartChange =(date)=>{
    this.setState({
      startDate: date
    })
  }

  handleTimePickerEndChange =(date)=>{
    this.setState({
      endDate: date
    })
  }

  handleInputClick =()=>{
    this.setState({isCalendarVisible: !this.state.isCalendarVisible})
  }

  handleClearClick =()=>{
    this.setState({
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null
    })
  }

  render(){
    const { startDate, endDate, isCalendarVisible } = this.state
    const { dateFormat, timeFormat, isTimePicker, placeholder, pickerDirection, canClear, style } = this.props

    const styles = {
      base: {
        position: 'absolute',
        fontFamily: 'Arial',
        fontWeight: 200,
      },
      input: {},
      datePicker: {},
      timePicker: {},
      calendar: {},
      pickerContainer: {
        padding: 10,
        backgroundColor: 'white',
        display: 'flex',
        position: 'absolute',
        visibility: isCalendarVisible ? 'visible' : 'hidden',
        right: pickerDirection === 'left' ? 0 : null,
        left: pickerDirection === 'right' ? 0 : null,
        marginTop: 3,
        border: '1px solid #dcdcdc',
        borderRadius: 3,
        transition: '0.5s ease',
        opacity: isCalendarVisible ? 1 : 0,
        zIndex: 10000
      },
      calendarContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      },
      rangeDisplay: {
        padding: 10,
        fontSize: 14
      },
      verticalRule: {
        borderLeft: '1px solid #ccc',
        height: 'inherit',
        width: 2,
        margin: '0 10px'
      }
    }

    merge(styles, style)

    return(
      <div ref={ main => this.main = main } style={ styles.base }>
        <DateInput
          canClear={ canClear }
          startDate={ startDate }
          endDate={ endDate }
          startTime={ startDate }
          endTime={ endDate }
          dateFormat={ dateFormat }
          timeFormat={ timeFormat }
          isTimePicker={ isTimePicker }
          placeholder={ placeholder }
          onInputClick={ this.handleInputClick }
          onClearClick={ this.handleClearClick }
          style={ styles.input }
        />
        { this.renderDatePicker(styles) }
      </div>
    )
  }

  renderDatePicker =(styles)=> {
    const { isRangePicker, isTimePicker, dateFormat } = this.props
    const { startMonth, endMonth, startDate, endDate } = this.state

    return(
      <div style={ styles.pickerContainer }>
        <div style={ styles.calendarContainer }>
          { isRangePicker ?
            <div style={ styles.rangeDisplay }>
              Start Date: { startDate ? startDate.format(dateFormat) : '--' }
            </div> : null
          }
          <DatePicker
            month={ startMonth }
            onChange={ this.handleDatePickerStartChange }
            style={ styles.datePicker }
          />

          <Calendar
            isRangePicker={ isRangePicker }
            selectedDate={ startDate }
            rangeDate={ endDate }
            calendarDate={ startMonth }
            onDateChange={ this.onStartDateChange }
            style={ styles.calendar }
          />

          { isTimePicker ?
            <TimePicker
              date={ startDate }
              onChange={ this.handleTimePickerStartChange }
              style={ styles.timePicker }
            /> : null
          }
        </div>

        { isRangePicker ? <div style={ styles.verticalRule }/> : null }

        { isRangePicker ?
          <div style={ styles.calendarContainer }>
            <div>
              { isRangePicker ?
                <div style={ styles.rangeDisplay }>
                  End Date: { endDate ? endDate.format(dateFormat) : '--' }
                </div> : null
              }
              <DatePicker
                month={ endMonth }
                onChange={ this.handleDatePickerEndChange }
                styles={ styles.datePicker }
              />
              <Calendar
                isRangePicker={ isRangePicker }
                selectedDate={ endDate }
                rangeDate={ startDate }
                calendarDate={ endMonth }
                onDateChange={ this.onEndDateChange }
                style={ styles.calendar }
              />
            </div>

            { isTimePicker ?
              <TimePicker
                date={ endDate }
                onChange={ this.handleTimePickerEndChange }
                style={ styles.timePicker }
              /> : null
            }
          </div> : null }

      </div>
    )
  }

}