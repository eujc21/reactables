import React, { PropTypes } from 'react'
import { Select } from '../select'
import { SelectOption } from '../select_option'
import { range } from './helpers'

export default class TimePicker extends React.Component {

  constructor(props){
    super(props)

    this.minutes = []
    this.hours = []
    this.periods = ['AM', 'PM']

    this.minutes = [...range(0, 59)]
    this.hours = [...range(1, 12)]
  }

  handleTimeChange =()=>{

  }

  render(){
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
          defaultValue={ '12' }
          onSelect={ this.handleTimeChange }>
          { this.hours.map(hour => <SelectOption key={ hour } text={ hour } value={ hour }/>) }
        </Select>
        <span>:</span>
        <Select
          height={ 22 }
          width={ 50 }
          defaultValue={ '00' }
          onSelect={ this.handleTimeChange }>
          { this.minutes.map(minute => <SelectOption key={ minute } text={ minute } value={ minute }/>) }
        </Select>

        <Select
          height={ 22 }
          width={ 50 }
          defaultValue={ 'AM' }
          onSelect={ this.handleTimeChange }>
          { this.periods.map(p => <SelectOption key={p } text={ p  } value={ p }/>) }
        </Select>
      </div>
    )
  }
}