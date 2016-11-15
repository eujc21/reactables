import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { DateTimePicker, Button } from '../src/index'



class Test extends React.Component {

  state = { startDate: moment(), endDate: moment().add(3, 'days') }

  handleDateChange =(startDate, endDate)=>{

    if(endDate && startDate)
      console.log(startDate.toString(), endDate.toString())

    this.setState({ startDate, endDate })
  }

  render(){
    return(
      <div style={{ width: 100}}>
          <DateTimePicker
            startDate={ this.state.startDate }
            endDate={ this.state.endDate }
            placeholder={ 'please select a date' }
            inputWidth={ 100 }
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
