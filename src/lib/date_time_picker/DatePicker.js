import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownNode, DropdownMenu, DropdownOption} from '../index'
import { range } from './helpers'
import merge from 'lodash/merge'

export default class DatePicker extends React.Component {

  static propTypes = {
    month: PropTypes.object,
    onChange: PropTypes.func,
    style: PropTypes.object
  }

  state = { years: [], isYearDropdownActive: false }

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
    this.setState({
      isYearDropdownActive: false
    })
  }

  handleYearRangeChange =(increment)=>{
    const { years } = this.state
    const yrs = years.map(y => y + increment)

    this.setState({
      years: yrs,
      isYearDropdownActive: true
    })
  }

  handleDropdownNodeClick =()=>{
    this.setState({
      isYearDropdownActive: !this.state.isYearDropdownActive
    })
  }

  handleOutsideDropdownClick =()=>{
    this.setState({
      isYearDropdownActive: false
    })
  }

  render(){

    const { month, style } = this.props
    const { isYearDropdownActive } = this.state

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
        base:{
          display: 'flex',
          alignItems: 'center',
          padding: '2px 4px',
          backgroundColor: '#f4f4f4',
          border: '1px solid #ccc',
          borderRadius: 2
        }
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
            isActive={ isYearDropdownActive }
            onClickOutside={ this.handleOutsideDropdownClick }
          >
            <DropdownNode
              onClick={ this.handleDropdownNodeClick }
              style={ styles.year }
            >
              { month.format('YYYY') }
              <i style={ styles.icon } className="material-icons">keyboard_arrow_down</i>
            </DropdownNode>

            <DropdownMenu justify="right">
              { this.renderYears() }
            </DropdownMenu>

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