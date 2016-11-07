import React, { PropTypes } from 'react'
import {Dropdown} from '../dropdown'
import {DropdownItem} from '../dropdown_item'
import { range } from './helpers'

export default class DatePicker extends React.Component {

  static propTypes = {
    month: PropTypes.object,
    onChange: PropTypes.func
  }

  state = { years: []}

  componentWillMount(){
    const year = this.props.month.clone().year()
    const years = [
      ...range(year - 5, year),
      ...range(year + 1, year + 5)
    ]

    this.setState({ years })
  }

  handleMonthChange =(increment)=> {
    const { month, onChange } = this.props
    onChange( month.clone().add(increment, 'months'))
  }

  handleYearChange =(year)=>{
    const { month, onChange } = this.props
    const date = month.set('year', year)
    onChange(date)
  }

  handleYearRangeChange =(increment)=>{
    const { years } = this.state
    if(increment === -1)
      this.setState({ years: [years[0] - 1, ...years]})

    if(increment === 1)
      this.setState({ years: [...years, years[years.length -1] + 1]})
  }

  render(){

    const { month } = this.props

    const style = {
      base:{
        display: 'flex',
        justifyContent: 'space-between',
        width: 'inherit'
      },
      arrow: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        padding: 10,
        cursor: 'pointer'
      },
      date: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 14,
        padding: 10,
      },
      month: {
        padding: '2px 5px 2px 2px',
        margin: 0
      },
      year: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        backgroundColor: '#f4f4f4',
        border: '1px solid #ccc',
        borderRadius: 2
      },
      icon: {
        fontSize: 6,
        paddingLeft: 3
      }
    }

    return(
      <div style={ style.base }>
        <div style={ style.arrow } onClick={ ()=>this.handleMonthChange(-1) }>
          <i className="icon-arrow-left"/>
        </div>
        <div style={ style.date }>
          <p style={ style.month }>{ month.format('MMM') }</p>

          <Dropdown
            face={
              <div style={ style.year }>
                { month.format('YYYY') }
                <i style={ style.icon } className="icon-arrow-down" />
              </div>
            }
            menuDirection={ 'right' }>
            { this.renderYears() }
          </Dropdown>

        </div>
        <div style={ style.arrow }>
          <i className="icon-arrow-right" onClick={ ()=>this.handleMonthChange(1) }/>
        </div>
      </div>

    )
  }

  renderYears(){
    const { years } = this.state

    const yearComponents = years.map(y =>
      <DropdownItem
        key={ y }
        text={ y }
        onClick={ ()=> this.handleYearChange(y) }/>
    )

    return [
      <DropdownItem
        key="decrement"
        text="..."
        shouldHideMenu={ false }
        onClick={ ()=> this.handleYearRangeChange(-1)}/>,

      ...yearComponents,

      <DropdownItem
        key="increment"
        text="..."
        shouldHideMenu={ false }
        onClick={ ()=> this.handleYearRangeChange(1) }/>
    ]
  }

}