import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class HeatBar extends React.Component {

  static propTypes = {
    score: PropTypes.number.isRequired,
    outOf: PropTypes.number.isRequired,
    title: PropTypes.string,
    isScoreVisible: PropTypes.bool,
    style: PropTypes.object,
    barColors: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
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
    })
  }

  static defaultProps = {
    score: 0,
    outOf: 100,
    title: '',
    barColors: [ '#27ae60', '#dfea10', '#efec13', '#e74c3c' ],
    isScoreVisible: true,
    style: {}
  }


  render(){
    const { score, outOf, title, barColors, isScoreVisible, style } = this.props
    const [ gradientOne, gradientTwo, gradientThree, gradientFour ] = barColors

    const styles = {
      base: {
        width: '100%'
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 11,
        width: 'inherit'
      },
      bar: {
        height: 26,
        background: `linear-gradient(to left, ${ gradientOne } 0%,${ gradientTwo } 40%,${ gradientThree } 60%,${ gradientFour } 100%)`,
        filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='${ gradientOne }', endColorstr='${ gradientFour }',GradientType=1 )`,
        padding: 0,
        width: 'inherit',
      },
      score: {
        fontWeight: 'bold',
        margin: 0,
        color: '#000000'
      },
      indicatorLine: {
        height: 'inherit',
        borderLeft: '2px solid black',
        marginLeft: `${ score / outOf * 100 }%`,
      }
    }

    merge(styles, style)

    return(
      <div style={ styles.base }>
        <div style={ styles.header }>
          <span>{ title }</span>
          <span>{ isScoreVisible ? score : null }</span>
        </div>
        <div style={ styles.bar }>
          <div style={ styles.indicatorLine } />
        </div>
      </div>
    )
  }

}