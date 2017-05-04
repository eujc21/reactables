import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

export default class Select extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf((propValue, key, componentName) => {
        if (propValue[key].type.name !== 'SelectOption')
          return new Error('One or more children are not of type SelectOption')
      }),
      PropTypes.objectOf((propValue, key) =>{
        if(propValue.type.name !== 'SelectOption')
          return new Error('One or more children are not of type SelectOption')
      })
    ])
  }

  static defaultProps = {
    placeholder: 'Select an option...',
    isDisabled: false,
    style: {}
  }

  handleSelect =(e)=>{

    const value = e.target.value

    if(value === '__placeholder')
      return this.props.onChange(null)

    this.props.onChange(value)
  }

  renderPlaceholder =()=>{
    const { placeholder, isMultiple } = this.props

    if(isMultiple)
      return

    return(
      <option value="__placeholder">
        { placeholder }
      </option>
    )
  }

  render(){
    const { children, defaultValue, value, isDisabled, style } = this.props

    const styles = {
      base: {
        height: 37,
        width: '100%',
        paddingLeft: 5,
        fontSize: 14,
        textAlign: 'center',
        border: '1px solid #EBE9ED',//#878686',
        borderRadius: 2,
        WebkitAppearance: null
      }
    }

    merge(styles, style)

    return(
      <select
        style={ styles.base }
        defaultValue={ defaultValue }
        value={ value }
        onChange={ this.handleSelect }
        disabled={ isDisabled }
      >
        { this.renderPlaceholder() }
        { children }
      </select>
    )
  }
}