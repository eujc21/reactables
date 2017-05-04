import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

export default class ProgressBar extends React.Component {
  static propTypes = {
    completed: PropTypes.number.isRequired,
    outOf: PropTypes.number.isRequired,
    showUnits: PropTypes.bool,
    units: PropTypes.oneOf(['percent', 'number']),
    type: PropTypes.oneOf(['heat', 'progress']),
    style: PropTypes.object,
    heatColors: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
      if (propValue.length !== 4) {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed. Array must contain 4 color strings'
        );
      }

      if (typeof propValue[key] !== 'string')
        return new Error('Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed. Array must contain Strings)'
        );
    }),
    progressColors: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
      if (propValue.length !== 2) {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed. Array must contain 2 color strings'
        );
      }

      if (typeof propValue[key] !== 'string')
        return new Error('Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed. Array must contain Strings)'
        );
    }),
  }

  static defaultProps = {
    completed: 0,
    outOf: 0,
    showUnits: false,
    units: 'percent',
    type: 'progress',
    style: {},
    progressColors: ['#008000', '#00C000'],
    heatColors: [ '#27ae60', '#dfea10', '#efec13', '#e74c3c' ],
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

  renderUnits(styles){
    const { showUnits, units, completed, outOf } = this.props
    const { percentageComplete } = this.state

    if(!showUnits)
      return

    const display = units === 'number'
      ? `${ completed } of ${ outOf }`
      : `${percentageComplete}%`

    return(
      <p className="units" style={ styles.units }>
        { display }
      </p>
    )
  }

  render(){
    const { style, heatColors, progressColors, type } = this.props
    const { percentageComplete } = this.state

    const [heatOne, heatTwo, heatThree, heatFour ] = heatColors
    const [progressOne, progressTwo] = progressColors

    const styles = {
      base: {
        width: '100%',
      },
      units: {
        width: '100%',
        textAlign: 'right',
        margin: 0,
        padding: 0
      },
      bar: {},
      completed:{},
      progressBar: {
        height: 26,
        padding: 0,
        backgroundColor: '#FF0000',
        overflow: 'hidden',
        borderRadius: 3
      },
      progressCompleted:{
        //transform: 'skew(-20deg)',
        height: '100%',
        width: `${ percentageComplete }%`,
        background: `linear-gradient( to top right, ${ progressOne }, ${ progressTwo })`,
        transition: 'width 1s'
      },
      heatBar: {
        height: 26,
        padding: 0,
        background: `linear-gradient(to left, ${ heatOne } 0%,${ heatTwo } 40%,${ heatThree } 60%,${ heatFour } 100%)`,
        overflow: 'hidden',
        borderRadius: 3
      },
      heatCompleted:{
        height: '100%',
        width: `${percentageComplete}%`,
        borderRight: '2px solid black',
        transition: 'width 1s'
      },
    }

   merge(styles, style)

    if(type === 'progress') {
      merge(styles.bar, styles.progressBar)
      merge(styles.completed, styles.progressCompleted)
    }

    if(type === 'heat') {
      merge(styles.bar, styles.heatBar)
      merge(styles.completed, styles.heatCompleted)
    }

    return(
      <div style={ styles.base }>
        { this.renderUnits(styles) }
        <div style={ styles.bar }>
          <div style={ styles.completed } />
        </div>
      </div>
    )
  }
}
