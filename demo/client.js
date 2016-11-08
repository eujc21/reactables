import React from 'react'
import ReactDOM from 'react-dom'

import moment from 'moment'


import { DateTimePicker } from '../src/index'



class Test extends React.Component {
  state = { date: moment() }

  handleDateChange =(startDate, endDate)=>{

    if(endDate && startDate)
      console.log(startDate.toString(), endDate.toString())

    this.setState({ startDate, endDate})
  }

  handleClick=()=>{
    this.setState({ date: moment() })
  }

  render(){
    return(
      <div>
        <button onClick={ this.handleClick }>button</button>
        <DateTimePicker
          startDate={ this.state.startDate }
          endDate={ this.state.endDate }
          placeholder={ 'please select a date'}
          inputWidth={ 500 }
          isTimePicker
          isRangePicker
          onChange={ this.handleDateChange }
          timeFormat={ 'hh:mm a' }/>
      </div>
    )
  }
}

ReactDOM.render(
  <Test />, document.getElementById('root')
)
