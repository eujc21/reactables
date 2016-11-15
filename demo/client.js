import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { DateTimePicker, Button } from '../src/index'



class Test extends React.Component {

  state = { startDate: moment(), endDate: moment() }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        startDate: moment(),
        endDate: moment()
          .add(2, 'months')
          .add(3, 'days')
          .add(5, 'hours')
      })
    } , 3000)
  }

  handleDateChange =(startDate, endDate)=>{

    if(endDate && startDate)
      console.log(startDate.toString(), endDate.toString())

    this.setState({ startDate, endDate })
  }

  render(){

    console.log(window.location.search.split('=')[1])
    return(
      <div style={{ width: 300}}>
          <DateTimePicker
            startDate={ moment( Date.parse(window.location.search.split('=')[1]))}
            endDate={ this.state.endDate }
            placeholder={ 'please select a date' }
            inputWidth={ 300 }
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
