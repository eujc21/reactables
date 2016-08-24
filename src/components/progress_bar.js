import React, { PropTypes } from 'react'
import Color from 'color'

export class ProgressBar extends React.Component {
  static propTypes = {
    completed: PropTypes.number,
    outOf: PropTypes.number,
    barColor: PropTypes.string,
    completedColor: PropTypes.string,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    showUnits: PropTypes.bool,
    units: PropTypes.oneOf(['percent', 'number']),
    alignUnits: PropTypes.oneOf(['left', 'right', 'center'])

  }

  static defaultProps = {
    width: '100%',
    height: 26,
    barColor: 'red',
    completedColor: 'green',
    completed: 0,
    showUnits: false,
    units: 'percent',
    alignUnits: 'right'
  }

  constructor(props){
    super(props)
  }


  render(){
    const { width, height, completedColor, barColor, outOf, completed, showUnits, units, alignUnits } = this.props

    let percentageComplete = Math.floor((completed / outOf) * 100)

    if(percentageComplete > 100)
      percentageComplete = 100

    const style = {
      base: {
        width,
      },
      units: {
        width: '100%',
        textAlign: alignUnits
      },
      bar: {
        height,
        padding: 0,
        backgroundColor: barColor,
        overflow: 'hidden',
        borderRadius: 3
      },
      completed:{
        transform: 'skew(-20deg)',
        height: '100%',
        width: `calc(${ percentageComplete }% + ${ percentageComplete === 100 ? 8 : 0}px`,
        background: `linear-gradient(
          to top right,
          ${ Color( completedColor ).hexString() }, 
          ${ Color( completedColor ).lighten(0.5).hexString() }
        )`,
        marginLeft: -4,
        transition: 'width 1s'
      }
    }

    return(
      <div>
        { showUnits ?
          <div style={ style.units }>
            {
              units === 'number'
                ? `${ completed } of ${ outOf }`
                : `${percentageComplete}%`
            }
          </div>
          : null
        }
        <div style={ style.bar }>
          <div style={ style.completed }></div>
        </div>
      </div>
    )
  }
}