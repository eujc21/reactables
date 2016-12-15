import React from 'react'
import { connect } from 'react-redux'
import { testCall, testCall1 } from '../actions/test_actions'

import { DateTimePicker, Button, Table, Dropdown, DropdownItem, ElementLoader, TrajectoryChart, LineChart, BarChart, Sankey, HeatBar } from '../../../src/index'


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

  handleSankeyClick =(node, index) =>{
    console.log(node)
  }

  render(){

    const { tableData } = this.state

    const trajectoryData = [
      {
        "sale": 202,
        "year": 2000
      },

      {
        "sale": 179,
        "year": 2002
      },

      {
        "sale": 154,
        "year": 2003
      },

      {
        "sale": 215,
        "year": 2001
      },

      {
        "sale": 260,
        "year": 2010
      }
    ];

    const lineData = [
      {
        name: 'Data Set 1',
        values: [
          {
            "date": "1-May-12",
            "close": 58.13
          },
          {
            "date": "30-Apr-12",
            "close": 53.98
          },
          {
            "date": "27-Apr-12",
            "close": 67
          },
          {
            "date": "26-Apr-12",
            "close": 89.7
          },
          {
            "date": "25-Apr-12",
            "close": 99
          },
          {
            "date": "24-Apr-12",
            "close": 130.28
          },
          {
            "date": "23-Apr-12",
            "close": 166.7
          },
          {
            "date": "20-Apr-12",
            "close": 234.98
          },
          {
            "date": "19-Apr-12",
            "close": 345.44
          },
          {
            "date": "18-Apr-12",
            "close": 443.34
          },
          {
            "date": "17-Apr-12",
            "close": 543.7
          },
          {
            "date": "16-Apr-12",
            "close": 580.13
          },
          {
            "date": "13-Apr-12",
            "close": 605.23
          },
          {
            "date": "12-Apr-12",
            "close": 622.77
          },
          {
            "date": "11-Apr-12",
            "close": 626.2
          },
          {
            "date": "10-Apr-12",
            "close": 628.44
          },
          {
            "date": "9-Apr-12",
            "close": 636.23
          },
          {
            "date": "5-Apr-12",
            "close": 633.68
          },
          {
            "date": "4-Apr-12",
            "close": 624.31
          },
          {
            "date": "3-Apr-12",
            "close": 629.32
          },
          {
            "date": "2-Apr-12",
            "close": 618.63
          },
          {
            "date": "30-Mar-12",
            "close": 599.55
          },
          {
            "date": "29-Mar-12",
            "close": 609.86
          },
          {
            "date": "28-Mar-12",
            "close": 617.62
          },
          {
            "date": "27-Mar-12",
            "close": 614.48
          },
          {
            "date": "26-Mar-12",
            "close": 606.98
          }
        ]
      }
    ]

    const style = {
      container1: { border: '1px solid black', margin: 5, backgroundColor: '#d4d4d4'},
      container2: { width: 300, height: 200, border: '1px solid black', margin: 5}
    }



    const sankeyData2 = {
      nodes: [
        {
          name: '1.2.3.4',
          fillColor: 'orange',
          strokeColor: 'blue'

        },
        {
          name: '7.8.9.0'
        },
        {
          name: '5.4.2.6'
        },
        {
          name: '123'
        },
        {
          name: '234'
        },
        {
          name: '345'
        }],
      links: [
        {
          source: 0,
          target: 1,
          value: 6
        },
        {
          source: 1,
          target: 2,
          value: 3
        },
        {
          source: 0,
          target: 2,
          value: 3
        },
        {
          source: 0,
          target: 5,
          value: 1
        },
        {
          source: 4,
          target: 5,
          value: 4
        },
        {
          source: 2,
          target: 3,
          value: 1
        }
      ]
    }

    const color = 'color: blue'

    return(
      <div style={{ height: '100vh'}}>
        <Button
          text={ 'Filter Events' }
          textColor={ 'white' }
          backgroundColor={ 'blue' }
          padding={'10px 3px'}
          onClick={ ()=> console.log() }/>
        <DateTimePicker
          startDate={ this.state.startDate }
          canClear
          placeholder={ 'please select a date' }
          inputWidth={ 300 }
          isTimePicker
          onChange={ this.handleDateChange }
          timeFormat={ 'hh:mm a' }/>



          <ElementLoader action="TEST_CALL">

            <div style={ style.container1 }>
              Container dimensions can be calculated based on the size of the content or external responsive edges
            </div>

          </ElementLoader>

        <HeatBar score={ 300 } outOf={ 600 } title={ 'Testing' } fontSize={ 14 }/>


          <ElementLoader action="TEST_CALL_1">

            <div style={ style.container2 }>
              CSS dimensions
            </div>

          </ElementLoader>



        <LineChart
          data={ lineData }
          xProp="date"
          yProp="close"
          isResponsive={ true }
          initialWidth={ 400 }
          initialHeight={ 200 }
          title={ 'Chart' }
          xLabel={ 'X Label' }
          yLabel={ 'Y Label' }
          labelFontSize={ 6 }
          onClick={ (d, i) => console.log(d, i)}
          tooltip={ (d, i) =>
          <div style={{ backgroundColor: 'black', color: 'white', opacity: 0.9}}>
            <p>string</p>
          </div>
          }
        />

        <BarChart
          isResponsive={ true }
          title={ 'Bar Chart' }
          data={ trajectoryData }
          xProp={ 'year' }
          yProp={ 'sale' }
          xLabel={ 'X Label' }
          yLabel={ 'Y Label' }
        />


        <div style={{ maxWidth: 800}}>
          <Sankey
            data={ sankeyData2 }
            initialHeight={ 300 }
            initialWidth={ 600 }
            isResponsive={ true }
            onClick={ this.handleSankeyClick }/>
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

