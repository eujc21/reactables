import React, { PropTypes } from 'react'
import merge from 'lodash/mergeWith'

export default class GridItem extends React.Component {

  state = { isHovered: false }

  onMouseOver=()=>{
    this.setState({ isHovered: true})
  }

  onMouseLeave=()=>{
    this.setState({ isHovered: false })
  }

  render(){
    const { children, style } = this.props

    const styles = {
      base:{
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        width: 370,
        height: 200,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
      },
      hovered:{
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        cursor: 'pointer'
      }

    }

    // merge
    merge(styles, style)

    if(this.state.isHovered)
      styles.base = {...styles.base, ...styles.hovered}

    return (
      <div
        onMouseOver={ this.onMouseOver }
        onMouseLeave={ this.onMouseLeave }
        style={ styles.base }>
        { children }
      </div>
    )
  }
}