import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { mergeEvents } from '../utils/styles'

export default class Badge extends React.Component {

  static propTypes = {
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    value: PropTypes.node,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    icon: PropTypes.node,
    style: PropTypes.object,
    onClear: PropTypes.func,
    canClear: PropTypes.bool
  }

  static defaultProps = {
    text: '',
    style: {},
    isActive: false
  }

  state = { isHovered: false }

  onMouseOver =()=> {
    this.setState({ isHovered: true })
  }
  onMouseLeave =()=>{
    this.setState({ isHovered: false })
  }

  onClear =(e)=>{
    e.stopPropagation();
    const { onClear, value } = this.props
    if(onClear) onClear(value)
  }

  onClick =()=>{
    console.log('click')
    const { onClick, value } = this.props
    if(onClick) onClick(value)
  }

  render(){

    const { text, style, isActive, isDisabled, canClear } = this.props
    const { isHovered } = this.state


    let styles = {
      base:{
        display: 'inline-flex',
        flex: 'none',
        alignItems: 'center',
        alignSelf: 'flex-start',
        flexWrap: 'nowrap',
        flexGrow: 0,
        flexBasis: 'auto',
        whiteSpace: 'nowrap',
        backgroundColor: 'red',
        color: '#ffffff',
        borderRadius: 20,
        height: 20,
        width: 'auto',
        padding: '1px 6px',
        margin: 3,
        fontSize: 12,
        fontFamily: 'Helvetica, Verdana, Tahoma',
        verticalAlign: 'middle',
        transition: 'all 0.5s'
      },
      hovered: {
        backgroundColor: 'pink',
        cursor: 'default'
      },
      active: {

      },
      disabled:{

      }
    }

    merge(styles, style)

    const events = { isHovered, isActive, isDisabled }
    mergeEvents(styles, events)

    const Text =()=>{
      return (<p style={{ margin: 0, padding: 0, display: 'inline-block'}}>{ text }</p>)
    }

    const Icon =()=>{
      if(!canClear) return null

      return(
         <i style={{ display: 'inline-block', padding: 0, margin: 0, fontSize: 14}}
            className="material-icons"
            onClick={ this.onClear }>clear</i>
       )
    }

    return(
      <span
        style={ styles.base }
        onMouseOver={ this.onMouseOver }
        onMouseOut={ this.onMouseLeave }
        onClick={ this.onClick }
      >
        <Text />
        <Icon />
      </span>
    )
  }
}
