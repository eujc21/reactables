import React, { PropTypes } from 'react'
import Color from 'color'

export class ProgressBar extends React.Component {
  static propTypes = {
    completed: PropTypes.number.isRequired,
    outOf: PropTypes.number.isRequired,
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
    completed: 0,
    outOf: 0,
    width: '100%',
    height: 26,
    barColor: 'red',
    completedColor: 'green',
    showUnits: false,
    units: 'percent',
    alignUnits: 'right'
  }

  state = { percentageComplete: 0 }

  constructor(props){
    super(props)
  }

  componentWillMount(){
    const { completed, outOf } = this.props
    this.setState({
      percentageComplete: this.getPercentageComplete(completed, outOf)
    })
  }

  componentWillReceiveProps(nextProps){
    const { completed, outOf } = this.props

    if(nextProps.outOf !== outOf || nextProps.completed !== completed){
      this.setState({
        percentageComplete: this.getPercentageComplete(nextProps.completed, nextProps.outOf)
      })
    }
  }

  getPercentageComplete =(completed, outOf)=>{

    let percentageComplete = Math.floor((completed / outOf) * 100)

    if(percentageComplete > 100)
      percentageComplete = 100

    return percentageComplete
  }

  renderUnits(style){
    const { showUnits, units, completed, outOf } = this.props
    const { percentageComplete } = this.state

    if(!showUnits)
      return

    const display = units === 'number'
      ? `${ completed } of ${ outOf }`
      : `${percentageComplete}%`

    return(
      <p className="units" style={ style.units }>
        { display }
      </p>
    )
  }


  render(){
    const { width, height, completedColor, barColor, alignUnits } = this.props
    const { percentageComplete } = this.state

    const baseCompletedColor = Color( completedColor ).hexString()
    const gradientCompletedColor = Color( completedColor ).lighten(0.5).hexString()

    const style = {
      base: {
        width,
      },
      units: {
        width: '100%',
        textAlign: alignUnits,
        margin: 0,
        padding: 0
      },
      bar: {
        height,
        padding: 0,
        backgroundColor: Color( barColor ).hexString(),
        overflow: 'hidden',
        borderRadius: 3
      },
      completed:{
        transform: 'skew(-20deg)',
        height: '100%',
        width: `calc(${ percentageComplete }% + ${ percentageComplete === 100 ? 8 : 0}px`,
        background: `linear-gradient( to top right, ${ baseCompletedColor }, ${ gradientCompletedColor })`,
        marginLeft: -4,
        transition: 'width 1s'
      }
    }

    return(
      <div>
        { this.renderUnits(style) }
        <div className="baseBar" style={ style.bar }>
          <div className="completedBar" style={ style.completed }></div>
        </div>
      </div>
    )
  }
}