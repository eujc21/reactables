// ie11 support
//import 'babel-polyfill'


import React from 'react'
import ReactDOM from 'react-dom'

import { DateTimePicker } from '../src/components/datepicker/date_time_picker'

function handleDateChange(date1, date2){
  console.log(date1, date2)
}

ReactDOM.render(
  <div>
    <DateTimePicker inputWidth={ 500 } isRangePicker isTimePicker onChange={ handleDateChange }/>
  </div>, document.getElementById('root')
)
