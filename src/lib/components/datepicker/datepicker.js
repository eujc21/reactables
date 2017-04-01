import React, { PropTypes } from 'react'
import { Dropdown, DropdownOption } from '../../index'
import { range } from './helpers'
import merge from 'lodash/merge'

export default class DatePicker extends React.Component {

  static propTypes = {
    month: PropTypes.object,
    onChange: PropTypes.func,
    style: PropTypes.object
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

    const { month, style } = this.props

    const styles = {
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
        fontSize: 14,
        paddingLeft: 3
      }
    }

    merge(styles, style)

    return(
      <div style={ styles.base }>
        <div style={ styles.arrow } onClick={ ()=>this.handleMonthChange(-1) }>
          <i className="material-icons">keyboard_arrow_left</i>
        </div>
        <div style={ styles.date }>
          <p style={ styles.month }>{ month.format('MMM') }</p>

          <Dropdown
            node={
              <div style={ styles.year }>
                { month.format('YYYY') }
                <i style={ styles.icon } className="material-icons">keyboard_arrow_down</i>
              </div>
            }
            menuDirection={ 'right' }>
            { this.renderYears() }
          </Dropdown>

        </div>
        <div style={ styles.arrow }>
          <i className="material-icons" onClick={ ()=>this.handleMonthChange(1) }>keyboard_arrow_right</i>
        </div>
      </div>

    )
  }

  renderYears(){
    const { years } = this.state

    const yearComponents = years.map(y =>
      <DropdownOption
        key={ y }
        text={ y }
        onClick={ ()=> this.handleYearChange(y) }/>
    )

    return [
      <DropdownOption
        key="decrement"
        text="..."
        shouldHideMenu={ false }
        onClick={ ()=> this.handleYearRangeChange(-1)}/>,

      ...yearComponents,

      <DropdownOption
        key="increment"
        text="..."
        shouldHideMenu={ false }
        onClick={ ()=> this.handleYearRangeChange(1) }/>
    ]
  }

}