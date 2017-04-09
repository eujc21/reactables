import React, { PropTypes } from 'react'
import Select from '../select/Select'
import SelectOption from '../select/SelectOption'
import { range, convertHours } from './helpers'
import merge from 'lodash/merge'

export default class TimePicker extends React.Component {

  static propTypes = {
    date: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  constructor(props){
    super(props)

    this.minutes = []
    this.hours = []
    this.periods = ['AM', 'PM']

    this.minutes = [...range(0, 59)]
    this.hours = [...range(1, 12)]
  }

  _hourForDate(date){
    if(date){
      let hour = date.hour()
      hour = hour > 12 ? hour - 12 : hour
      hour = hour === 0 ? 12 : hour
      hour = String(hour)
      return hour.length === 1 ? '0' + hour : hour
    }

    return '12'
  }

  _minuteForDate(date){
    if(date){
      let minute = String(date.minute())
      return minute.length === 1 ? '0' + minute : minute
    }

    return '00'
  }

  _periodForDate(date){
    if(date){
      return date.hour() >= 12 ? 'PM' : 'AM'
    }

    return 'AM'
  }

  handleTimeChange =(time, value)=>{
    if (!value) return
    const { date, onChange } = this.props

    const hour = time === 'hour' ? value : this._hourForDate(date)
    const minute = time === 'minute' ? value : this._minuteForDate(date)
    const period = time === 'period' ? value : this._periodForDate(date)

    const d = date.clone()
      .hours(convertHours(hour, period))
      .minutes(parseInt(minute))

    onChange(d)
  }

  render(){
    const { date, style } = this.props

    const styles = {
      base: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
      },
      select: {
        base:{
          height: 22,
          width: 50
        }
      }
    }

    merge(styles, style)

    return(
      <div style={ styles.base }>
        <Select
          value={ this._hourForDate(date) }
          onChange={ (value)=> this.handleTimeChange('hour', value) }
          disabled={ !date }
          style={ styles.select }
        >
          { this.hours.map(hour => <SelectOption key={ hour } text={ hour } value={ hour }/>) }

        </Select>
        <span>:</span>
        <Select
          value={ this._minuteForDate(date) }
          onChange={ (value)=>this.handleTimeChange('minute', value) }
          disabled={ !date }
          style={ styles.select }
        >
          { this.minutes.map(minute => <SelectOption key={ minute } text={ minute } value={ minute }/>) }

        </Select>

        <Select
          value={ this._periodForDate(date) }
          onChange={ (value)=>this.handleTimeChange('period', value) }
          disabled={ !date }
          style={ styles.select }
        >
          { this.periods.map(p => <SelectOption key={ p } text={ p } value={ p }/>) }

        </Select>
      </div>
    )
  }
}