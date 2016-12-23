import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

class Select extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    isArrowVisible: PropTypes.bool,
    styles: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf((propValue, key, componentName) => {
        if (propValue[key].type !== SelectOption)
          return new Error('One or more children are not of type SelectOption')
      }),
      PropTypes.objectOf((propValue, key) =>{
        if(propValue.type !== SelectOption)
          return new Error('One or more children are not of type SelectOption')
      })
    ])
  }

  static defaultProps = {
    placeholder: 'Select an option...',
    isArrowVisible: true,
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
    const { children, defaultValue, value, disabled, isArrowVisible, styles } = this.props

    const style = {
      height: 37,
      width: '100%',
      paddingLeft: 5,
      fontSize: 14,
      textAlign: 'center',
      border: '1px solid #EBE9ED',//#878686',
      borderRadius: 2,
      WebkitAppearance: isArrowVisible ? null : 'none'
    }

    merge(style, styles)

    return(
      <select
        style={ style }
        defaultValue={ defaultValue }
        value={ value }
        onChange={ this.handleSelect }
        disabled={ disabled }
      >
        { this.renderPlaceholder() }
        { children }
      </select>
    )
  }
}

const SelectOption =({value, text})=>{
  return(
    <option
      value={ value }>
      { text }
    </option>
  )
}

SelectOption.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  value: PropTypes.node.isRequired
}

export { Select, SelectOption }

