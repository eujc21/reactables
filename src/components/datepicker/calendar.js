import React, { PropTypes } from 'react'
import Day from './day'

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


  onDateChange=(date)=>{
    this.props.onDateChange(date)
  }

  generateWeek(date){
    let nextDate = date.clone()
    const week = [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => {

      const day = nextDate.day()

      if(dayOfWeek < day){
        const offSet = dayOfWeek - day + 1
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
    const styles = {
      base: {
        backgroundColor: 'white',
        borderRadius: 3,
        minWidth: 210
      },
      day: {
        display: 'inline-block',
        fontSize: 11,
        width: 24,
        lineHeight: '24px',
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
      <div style={ styles.base }>
        { this.renderDaysOfTheWeek(styles) }
        { this.renderWeeks(weeks) }
      </div>
    )
  }

  renderDaysOfTheWeek =(styles)=>{

    return(
      <div>
        { this.daysOfTheWeek.map(day =>
          <div key={ day } style={ styles.day }>
            { day.substring(0, 2) }
          </div>)
        }
      </div>
    )
  }

  renderWeeks =(weeks)=>{
    const { selectedDate, rangeDate, calendarDate } = this.props
    const styles = {
      base: {
        whiteSpace: 'nowrap'
      }
    }
    return(
      <div style={ styles.base }>
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