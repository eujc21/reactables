import React, { PropTypes } from 'react'

export default class Day extends React.Component {

  setStyles =()=>{
    const { date, selectedDate, calendarDate } = this.props
    const SELECTED_DATE = {
      color: 'white',
      opacity: 1,
      backgroundColor: 'blue'
    }

    const RANGE_DATE = {
      color: 'white',
      opacity: .5,
      backgroundColor: 'blue'
    }

    const CALENDAR_DATE = {
      color: 'black',
      opacity: 1,
      backgroundColor: 'white'
    }

    const OFF_CALENDAR_DATE = {
      color: '#dddddd',
      opacity: 1,
      backgroundColor: 'white'
    }

    if(selectedDate &&
      selectedDate.clone().format('YYYY-MM-DD') === date.clone().format('YYYY-MM-DD') &&
      date.month() === calendarDate.month() &&
      date.year() === calendarDate.year()){
      return SELECTED_DATE
    }

    if(this.isRangeDate() &&
      date.month() === calendarDate.month() &&
      date.year() === calendarDate.year() ) {
      return RANGE_DATE
    }

    if(date.month() === calendarDate.month() &&
      date.year() === calendarDate.year()) {
      return CALENDAR_DATE
    }

    return OFF_CALENDAR_DATE
  }

  onClick =()=>{
    const { date, onClick } = this.props
    onClick(date)
  }

  isRangeDate =()=>{
    const {selectedDate, rangeDate, date} = this.props

    if(!rangeDate || !selectedDate)
      return false

    const selected = selectedDate.clone().startOf('day')
    const ranged = rangeDate.clone().startOf('day')

    if(ranged === selected)
      return false

    if(selected < ranged) {
      return date.isBetween(selected.clone().subtract(1, 'days'), ranged.clone().add(1, 'days'))
    }

    if(selected > ranged){
      return date.isBetween(ranged.clone().subtract(1, 'days'), selected.clone().add(1, 'days'))

    }

  }

  render(){

    const { date } = this.props

    const style = {
      base: {
        display: 'inline-block',
        margin: 3,
        fontSize: 11,
        width: 24,
        lineHeight: '24px',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: 3,
        ...this.setStyles()
      }
    }
    return(
      <div style={ style.base } onClick={ this.onClick }>
        { date.date() }
      </div>
    )
  }
}