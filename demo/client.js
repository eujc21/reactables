import React from 'react'
import ReactDOM from 'react-dom'

import moment from 'moment'


import { DateTimePicker } from '../src/index'



class Test extends React.Component {
  state = { date: moment() }

  handleDateChange =(date1, date2)=>{
    console.log(date1, date2)
    this.setState({ date: date1})
  }

  handleClick=()=>{
    this.setState({ date: moment() })
  }

  render(){
    return(
      <div>
        <button onClick={ this.handleClick }>button</button>
        <DateTimePicker
          startDate={ this.state.date }
          inputWidth={ 500 }
          isTimePicker
          onChange={ this.handleDateChange }
          timeFormat={ 'hh:mm a' }/>
      </div>
    )
  }
}

ReactDOM.render(
  <Test />, document.getElementById('root')
)
