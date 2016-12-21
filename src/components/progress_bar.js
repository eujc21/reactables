import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export class ProgressBar extends React.Component {
  static propTypes = {
    completed: PropTypes.number.isRequired,
    outOf: PropTypes.number.isRequired,
    showUnits: PropTypes.bool,
    units: PropTypes.oneOf(['percent', 'number']),
    styles: PropTypes.object
  }

  static defaultProps = {
    completed: 0,
    outOf: 0,
    showUnits: false,
    units: 'percent',
    styles: {}
  }

  state = { percentageComplete: 0 }

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
    const { styles } = this.props
    const { percentageComplete } = this.state

    const style = {
      base: {
        width: '100%',
      },
      units: {
        width: '100%',
        textAlign: 'right',
        margin: 0,
        padding: 0
      },
      bar: {
        height: 26,
        padding: 0,
        backgroundColor: '#FF0000',
        overflow: 'hidden',
        borderRadius: 3
      },
      completed:{
        transform: 'skew(-20deg)',
        height: '100%',
        width: `calc(${ percentageComplete }% + ${ percentageComplete === 100 ? 8 : 0}px`,
        background: `linear-gradient( to top right, ${ '#008000' }, ${ '#00C000' })`, //green, lighten(0.5))
        marginLeft: -4,
        transition: 'width 1s'
      }
    }

   merge(style, styles)

    return(
      <div style={ style.base }>
        { this.renderUnits(style) }
        <div style={ style.bar }>
          <div style={ style.completed }></div>
        </div>
      </div>
    )
  }
}
