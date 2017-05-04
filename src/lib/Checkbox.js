import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { mergeEvents } from './utils/styles'

export default class Checkbox extends React.Component{

  static propTypes = {
    isChecked: function(props, propName, componentName) {
      const exists = props[propName] || props[propName] === false

      // if(exists && !props.onClick)
      //   return new Error(`${propName} -  By providing ${propName} to ${componentName}, the onClick prop must be handled.`)

      // if(props.onClick && !exists)
      //   return new Error(`${propName} -  By providing onClick to ${componentName}, the ${propName} prop must be handled.`)

      if (exists && typeof (props[propName]) !== 'boolean') {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed. Expected a boolean value.'
        );
      }
    },
    isDisabled: PropTypes.bool,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    tabIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ]),
    onClick: PropTypes.func
  }

  static defaultProps = {
    id: null,
    name: null,
    value: '',
    tabIndex: 0,
    isDisabled: false,
  }

  state = { isChecked: false, isHovered: false }

  get isChecked(){
    const { isChecked } = this.props
    const checkedProp = isChecked || isChecked === false
    return checkedProp ? isChecked : this.state.isChecked
  }

  onClick =(e)=>{
    const { isDisabled, onClick, value } = this.props
    if(isDisabled) return

    if(onClick)
      onClick(!this.isChecked, value, e)

    if(this.props.isChecked) return
    this.setState({isChecked: !this.isChecked})
  }

  onMouseOver =()=>{
    this.setState({
      isHovered: true
    })
  }

  onMouseLeave =()=>{
    this.setState({
      isHovered: false
    })
  }

  render() {
    const { isDisabled, value, id, tabIndex, name, style } = this.props
    const { isHovered } = this.state

    const styles = {
      container:{
        base:{position: 'block'}
      },
      input: {
        base: {
          position: 'absolute',
          height: 0,
          opacity: 0,
          overflow: 'hidden',
          width: 0
        }
      },
      checkbox:{
        base:{
          backgroundColor: 'white',
          borderRadius: 2,
          border: '1px solid black',
          color: 'white',
          padding: 0,
          cursor: 'default',
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          MsUserSelect:'none',
          userSelect: 'none',
          boxSizing: 'border-box',
          margin: 3
        },
        hovered:{

        },
        disabled:{
          backgroundColor: 'grey'
        },
        checked:{
          border: '1px solid blue',
          backgroundColor: 'blue',
          color: 'white'
        }
      }

    }

    merge(styles, style)

    if(this.isChecked) merge(styles.checkbox.base, styles.checkbox.checked)

    const events = { isDisabled, isHovered }
    mergeEvents(styles.checkbox, events)

    return (
      <span style={ styles.container.base }>
        <input
          style={ styles.input.base }
          id={ id }
          type="checkbox"
          role="checkbox"
          name={ name }
          value={ value }
          aria-checked={ this.isChecked }
          aria-disabled={ isDisabled }
          tabIndex={ tabIndex }
          checked={ this.isChecked }
          disabled={ isDisabled }
          onChange={()=>{}}
          onMouseOver={ this.onMouseOver }
          onMouseLeave={ this.onMouseLeave }
        />
          <i style={ styles.checkbox.base }
             className="material-icons"
             role="checkbox"
             aria-checked={ this.isChecked }
             aria-disabled={ isDisabled }
             onClick={ this.onClick }>check</i>
      </span>
    )
  }
}
