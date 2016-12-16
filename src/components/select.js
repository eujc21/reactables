import React, { PropTypes } from 'react'
import { SelectOption } from './select_option'

// ** usage **
//
//  <Select
//    placeholderText="Some Text"
//    onSelect={ this.handleSortChange }>
//    <option value="name">Name</option>
//  </Select>


export class Select extends React.Component {
  static propTypes = {
    placeholderText: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    isArrowVisible: PropTypes.bool,
    styles: PropTypes.object,
    children: PropTypes.arrayOf((propValue, key,) => {
      if (propValue[key].type !== SelectOption)
        return new Error('One or more children are not of type SelectOption')
    })
  }

  static defaultProps = {
    placeholderText: 'Select an option...',
    height: 37,
    width: '100%',
    isArrowVisible: true,
  }

  constructor(props){
    super(props)
  }

  handleSelect =(e)=>{

    const value = e.target.value

    if(value === '__placeholder')
      return this.props.onSelect(null)

    this.props.onSelect(value)
  }

  renderPlaceholder =()=>{
    const { placeholderText, isMultiple } = this.props

    if(isMultiple)
      return

    return(
      <option value="__placeholder">
        { placeholderText }
      </option>
    )
  }

  render(){
    const { children, defaultValue, value, disabled, isArrowVisible, styles } = this.props

    let style = {
      height: 37,
      width: '100%',
      paddingLeft: 5,
      fontSize: 14,
      textAlign: 'center',
      border: '1px solid #878686',
      borderRadius: 2,
      WebkitAppearance: isArrowVisible ? null : 'none'
    }

    style = {...style, ...styles }

    return(
      <select
        style={ style }
        defaultValue={ defaultValue }
        value={ value }
        onChange={ this.handleSelect }
        disabled={ disabled }
      >
          { this.renderPlaceholder() }
          { children.map((child, i) =>
            <option
              key={ i }
              value={ child.props.value }>
                { child.props.text }
            </option>
          )}
      </select>
    )
  }
}
