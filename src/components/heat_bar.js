import React, { PropTypes } from 'react'

export class HeatBar extends React.Component {

  static propTypes = {
    score: PropTypes.number.isRequired,
    outOf: PropTypes.number.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    barHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
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
    }),
    textColor: PropTypes.string,
    fontSize: PropTypes.number,
    isScoreVisible: PropTypes.bool
  }

  static defaultProps = {
    width: '100%',
    score: 0,
    outOf: 100,
    barHeight: 20,
    title: '',
    barColors: [ '#27ae60', '#dfea10', '#efec13', '#e74c3c' ],
    textColor: '#000',
    fontSize: 11,
    isScoreVisible: true
  }


  render(){
    const { score, outOf, width, barHeight, title, barColors, textColor, fontSize, isScoreVisible } = this.props
    const [ gradientOne, gradientTwo, gradientThree, gradientFour ] = barColors

    let style = {
      base: {
        width
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize,
        width
      },
      heatBar: {
        height: barHeight,
        background: `linear-gradient(to left, ${ gradientOne } 0%,${ gradientTwo } 40%,${ gradientThree } 60%,${ gradientFour } 100%)`,
        filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='${ gradientOne }', endColorstr='${ gradientFour }',GradientType=1 )`,
        padding: 0,
        width,
      },
      indicatorScore: {
        fontWeight: 'bold',
        margin: 0,
        color: textColor
      },
      indicatorLine: {
        height: 'inherit',
        borderLeft: '2px solid black',
        marginLeft: `${ score / outOf * 100 }%`,
      }
    }

    return(
      <div style={ style.base }>
        <div style={ style.header }>
          <span>{ title }</span>
          <span>{ isScoreVisible ? score : null }</span>
        </div>
        <div style={ style.heatBar }>
          <div style={ style.indicatorLine } />
        </div>
      </div>
    )
  }

}