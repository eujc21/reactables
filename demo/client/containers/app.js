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
          }
        ]
      },
      {
        name: 'Data Set 2',
        values: [
          {
            "date": "1-May-12",
            "close": 45
          },
          {
            "date": "30-Apr-12",
            "close": 700
          },
          {
            "date": "27-Apr-12",
            "close": 66
          },
          {
            "date": "26-Apr-12",
            "close": 90.7
          },
          {
            "date": "25-Apr-12",
            "close": 12
          },
          {
            "date": "24-Apr-12",
            "close": 45.28
          },
          {
            "date": "23-Apr-12",
            "close": 62.7
          },
          {
            "date": "20-Apr-12",
            "close": 16.98
          },
          {
            "date": "19-Apr-12",
            "close": 256.44
          },
          {
            "date": "18-Apr-12",
            "close": 451.34
          },
          {
            "date": "17-Apr-12",
            "close": 332.7
          },
          {
            "date": "16-Apr-12",
            "close": 843.13
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
          name: 'port 80'
        },
        {
          name: 'Everything Else'
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
        },
        {
          name: 'port X'
        }],
      links: [
        {
          source: 1,
          target: 0,
          value: 2000
        },
        {
          source: 2,
          target: 0,
          value: 100
        },
        {
          source: 3,
          target: 0,
          value: 50
        },
        {
          source: 4,
          target: 0,
          value: 200
        },
        {
          source: 5,
          target: 0,
          value: 4
        },
        {
          source:5,
          target: 6,
          value: 40
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
          lineColors={ ['#000000', 'orange']}
          backgroundColor={ 'white' }
          isResponsive={ true }
          initialWidth={ 400 }
          initialHeight={ 200 }
          title={ 'Chart' }
          xLabel={ 'X Label' }
          yLabel={ 'Y Label' }
          labelFontSize={ 5 }
          tickFontSize={ 5 }
          xTicksAngled
          shouldShowGrid
          onClick={ (set, d, i) => console.log(set, d, i)}
          tooltip={ (set, d, i) =>
            <div style={{ backgroundColor: 'black', color: 'white', opacity: 0.9}}>
              <p>{set}</p>
            </div>
          }
        />

        <div style={{ maxWidth: 800}}>
          <Sankey
            data={ sankeyData2 }
            initialHeight={ 400 }
            initialWidth={ 600 }
            isResponsive={ true }
            onClick={ this.handleSankeyClick }/>
        </div>

        <BarChart
          isResponsive={ true }
          title={ 'Bar Chart' }
          data={ trajectoryData }
          xProp={ 'year' }
          yProp={ 'sale' }
          xLabel={ 'X Label' }
          yLabel={ 'Y Label' }
        />


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

