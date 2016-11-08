import React from 'react'
import ReactDOM from 'react-dom'

import moment from 'moment'


import { DateTimePicker, Button } from '../src/index'



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
        <Button onClick={ this.handleClick } text={ 'Click Me '}/>
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
