import React from 'react'
import ReactDOM from 'react-dom'


import { DateTimePicker } from '../lib'

function handleDateChange(date1, date2){
  console.log(date1, date2)
}

ReactDOM.render(
  <div>
    <DateTimePicker inputWidth={ 500 } isRangePicker isTimePicker onChange={ handleDateChange }/>
  </div>, document.getElementById('root')
)
