import React, { PropTypes } from 'react'
import { Select } from '../select'
import { SelectOption } from '../select_option'
import { range } from './helpers'

export default class TimePicker extends React.Component {

  static propTypes = {
    hour: PropTypes.string,
    minute: PropTypes.string,
    period: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }


  constructor(props){
    super(props)

    this.minutes = []
    this.hours = []
    this.periods = ['AM', 'PM']

    this.minutes = [...range(0, 59)]
    this.hours = [...range(1, 12)]
  }

  handleTimeChange =(time, value)=>{
    const { hour, minute, period, onChange } = this.props

    const h = time === 'hour' ? value : hour
    const m = time === 'minute' ? value : minute
    const p = time === 'period' ? value : period

    onChange(h, m, p)
  }

  render(){
    const { date, hour, minute, period } = this.props

    const style = {
      base: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
      }
    }

    return(
      <div style={ style.base }>
        <Select
          height={ 22 }
          width={ 50 }
          defaultValue={ hour }
          onSelect={ (value)=>this.handleTimeChange('hour', value) }
          disabled={ date ? false : true }
        >
          { this.hours.map(hour => <SelectOption key={ hour } text={ hour } value={ hour }/>) }
        </Select>
        <span>:</span>
        <Select
          height={ 22 }
          width={ 50 }
          defaultValue={ minute }
          onSelect={ (value)=>this.handleTimeChange('minute', value) }
          disabled={ date ? false : true  }
        >
          { this.minutes.map(minute => <SelectOption key={ minute } text={ minute } value={ minute }/>) }
        </Select>

        <Select
          height={ 22 }
          width={ 50 }
          defaultValue={ period }
          onSelect={ (value)=>this.handleTimeChange('period', value) }
          disabled={ date ? false : true  }
        >
          { this.periods.map(p => <SelectOption key={ p } text={ p } value={ p }/>) }
        </Select>
      </div>
    )
  }
}