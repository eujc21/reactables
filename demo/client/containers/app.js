import React from 'react'
import { connect } from 'react-redux'
import { testCall, testCall1 } from '../actions/test_actions'

import { DateTimePicker, Button, Table, Dropdown, DropdownItem, ElementLoader } from '../../../src/index'

class App extends React.Component {

  state = {
    startDate: undefined,
    endDate: undefined,
    tableData: [{
      a: 1,
      b: Date.now() - 100000000,
      c: 3
    },
      {
        a: 4,
        b: Date.now(),
        c: 6
      }]
  }

  componentDidMount(){
    this.props.testCall()
    this.props.testCall1()
  }

  handleDateChange =(startDate, endDate)=>{

    if(endDate && startDate)
      console.log(startDate.toString(), endDate.toString())

    this.setState({ startDate, endDate })
  }

  handleTestClick =(index, data)=>{
    this.setState({
      tableData: this.state.tableData.map(data => {
        data.isSelected = true
        return data
      })
    })
  }

  render(){

    const { tableData } = this.state

    const style = {
      container1: { border: '1px solid black', margin: 5, backgroundColor: '#d4d4d4'},
      container2: { width: 300, height: 200, border: '1px solid black', margin: 5}
    }


    return(
      <div style={{ width: 500}}>
        <Button
          text={ 'Filter Events' }
          textColor={ 'white' }
          backgroundColor={ 'blue' }
          padding={'10px 3px'}
          onClick={ ()=> console.log() }/>
        <DateTimePicker
          startDate={ this.state.startDate }
          placeholder={ 'please select a date' }
          inputWidth={ 300 }
          isTimePicker
          onChange={ this.handleDateChange }
          timeFormat={ 'hh:mm a' }/>
        <div>





          <ElementLoader action="TEST_CALL">

            <div style={ style.container1 }>
              Container dimensions can be calculated based on the size of the content or external responsive edges
            </div>

          </ElementLoader>


          <ElementLoader action="TEST_CALL_1">

            <div style={ style.container2 }>
              CSS dimensions
            </div>

          </ElementLoader>



        </div>

      </div>
    )
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, {
  testCall,
  testCall1
})(App)

