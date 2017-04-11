import React from 'react'
import PropTypes from 'prop-types'

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