// ie11 support
//import 'babel-polyfill'


import React from 'react'
import ReactDOM from 'react-dom'

import { DateTimePicker } from '../src/components/datepicker/date_time_picker'

ReactDOM.render(
  <div>
    <DateTimePicker isRangePicker isTimePicker onChange={ (date1, date2)=> console.log(date1, date2)}/>
  </div>, document.getElementById('root')
)
