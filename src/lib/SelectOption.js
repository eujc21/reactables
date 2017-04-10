import React, { PropTypes } from 'react'

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

export default SelectOption