import React from 'react'
import PropTypes from 'prop-types'

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
    const { isDisabled, value, id, tabIndex } = this.props
    const isChecked = this.isChecked

    return (
      <input
        id={ id }
        type="checkbox"
        role="checkbox"
        value={ value }
        aria-checked={ isChecked }
        aria-disabled={ isDisabled }
        tabIndex={ tabIndex }
        checked={ isChecked }
        disabled={ isDisabled }
        onClick={ this.onClick }
        onChange={()=>{}}
        onMouseOver={ this.onMouseOver }
        onMouseLeave={ this.onMouseLeave }
      />
    )
  }
}
