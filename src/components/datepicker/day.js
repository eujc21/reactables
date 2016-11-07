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

    if(rangeDate.clone().format('YYYY-MM-DD') === selectedDate.clone().format('YYYY-MM-DD'))
      return false

    if(selectedDate.clone().format('YYYY-MM-DD') === rangeDate.clone().format('YYYY-MM-DD'))
      return true

    if(selectedDate < rangeDate) {
      return date.isBetween(selectedDate.clone().subtract(1, 'days'), rangeDate.clone().add(1, 'days'))
    }

    if(selectedDate > rangeDate){
      return date.isBetween(rangeDate.clone().subtract(1, 'days'), selectedDate.clone().add(1, 'days'))

    }

  }

  render(){

    const { date } = this.props

    const style = {
      base: {
        display: 'inline-block',
        padding: 4,
        margin: 3,
        fontSize: 12,
        width: 20,
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