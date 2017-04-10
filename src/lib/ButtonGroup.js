import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class ButtonGroup extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  render(){
    const { children, style } = this.props

    const styles = {
      base: {
        borderRadius: 2,
      }
    }

    merge(styles, style)

    return(
      <div>
        { children }
      </div>
    )
  }
}