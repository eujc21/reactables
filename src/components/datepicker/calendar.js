import React, { PropTypes } from 'react'
import Day from './day'
import moment from 'moment'

export default class Calendar extends React.Component {
  constructor(props){
    super(props)
    this.daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }

  static propTypes = {
    selectedDate: PropTypes.object,
    rangeDate: PropTypes.object,
    calendarDate: PropTypes.object
  }

  state = {
    date: moment()
  }

  onDateChange=(date)=>{
    this.setState({
      date: date.clone()
    })

    this.props.onDateChange(date)
  }

  generateWeek(date){
    let nextDate = date.clone()
    const week = [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => {

      const day = nextDate.day()

      if(dayOfWeek < day){
        const offSet = dayOfWeek - day - 1
        return date.clone()
          .subtract(1, 'months')
          .endOf('month')
          .add(offSet, 'days')
      }

      const toAdd = nextDate.clone()
      nextDate = nextDate.clone().add({days: 1})
      return toAdd
    })

    return {week, nextDate}
  }


  render() {
    const style = {
      base: {
        width: 35*7,
        backgroundColor: 'white',
        borderRadius: 3
      },
      day: {
        display: 'inline-block',
        width: 20,
        fontSize: 12,
        padding: 4,
        margin: 3,
        textAlign: 'center',
        fontWeight: 'bold'
      }
    }

    const startOfMonth = this.props.calendarDate.clone().startOf('month')
    const endOfMonth = startOfMonth.clone().endOf('month')

    let date = startOfMonth.clone()
    let weeks = []

    while ( endOfMonth > date ){
      const { week, nextDate } = this.generateWeek(date)
      weeks.push(week)
      date = nextDate
    }

    return(
      <div style={ style.base }>
        { this.renderDaysOfTheWeek(style) }
        { this.renderWeeks(weeks) }
      </div>
    )
  }

  renderDaysOfTheWeek =(style)=>{

    return(
      <div>
        { this.daysOfTheWeek.map(day =>
          <div key={ day } style={ style.day }>
            { day.substring(0, 3) }
          </div>)
        }
      </div>
    )
  }

  renderWeeks =(weeks)=>{
    const { selectedDate, rangeDate, calendarDate } = this.props
    return(
      <div>
        { weeks.map((week, i) =>
          <div key={ i }>
            { week.map((date, i) =>
              <Day
                key={ i }
                date={ date }
                selectedDate={ selectedDate }
                rangeDate={ rangeDate }
                calendarDate={ calendarDate }
                onClick={ this.onDateChange }/>)
            }
          </div>
        )}
        </div>
    )
  }

}