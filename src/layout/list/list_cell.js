import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class ListCell extends React.Component {

  state = { isHovered: false }

  static propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object
  }

  handleClick =()=>{
    this.props.onClick()
  }

  onMouseEnter =()=>{
    this.setState({isHovered: true})
  }

  onMouseLeave =()=>{
    this.setState({isHovered: false})
  }

  render() {
    const {children, style} = this.props

    const styles = {
      base: {
        //width: 'inherit',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#fff'

      },
      hovered:{
        backgroundColor: '#BDBDBD',
        cursor: 'pointer'
      }
    }

    // merge styles
    merge(styles, style)

    // merge hovered styles
    if(this.state.isHovered)
      merge(styles.base, styles.hovered)

    return (
      <div style={ styles.base }
         onClick={ this.handleClick }
         onMouseLeave={ this.onMouseLeave }
         onMouseOver={ this.onMouseEnter }
      >
        { children }
      </div>
    )
  }
}
