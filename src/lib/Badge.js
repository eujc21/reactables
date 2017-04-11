import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

export default class Badge extends React.Component {

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object
  }

  static defaultProps = {
    text: '',
    styles: {}
  }

  render(){

    const { text, style } = this.props

    let styles = {
      base:{
        backgroundColor: 'red',
        color: '#ffffff',
        borderRadius: 12,
        font: 'bold 11px/9px Helvetica, Verdana, Tahoma',
        height: 13,
        minWidth: 14,
        padding: '4px 3px 0 3px',
        textAlign: 'center'
      }
    }

    // let style = {
    //   base: {
    //     margin: 5,
    //     fontFamily: ' "Helvetica Neue", Helvetica, Arial, sans-serif',
    //   },
    //   icon:{
    //     display: 'inline-block',
    //     backgroundColor: 'blue',
    //     color: 'white',
    //     fontSize: 10,
    //     marginRight: 5,
    //     padding: 5,
    //     borderRadius: 2,
    //     cursor: onClick ? 'pointer' : null
    //   },
    //   count: {
    //     display: 'inline-block',
    //     color: 'black',
    //     fontSize: 10
    //   }
    // }

    merge(styles, styles)

    return(
      <div style={ styles.base }>
        { text }
      </div>
    )
  }
}
