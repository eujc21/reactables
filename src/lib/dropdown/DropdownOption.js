import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

const DropdownOption =({ text, value, position, onClick, styles })=>{

  const onMouseOver = (e) =>{
    e.target.style.backgroundColor = '#f9f9f9'
  }

  const onMouseLeave = (e) =>{
    e.target.style.backgroundColor = 'white'
  }

  const handleClick =()=>{
    if(onClick) onClick(value)
  }

  const setBorderRadius =()=>{
    if(position === 'first')
      return '3px 3px 0 0'

    if(position === 'middle')
      return 0

    if(position === 'last')
      return '0 0 3px 3px'
  }

  const style = {
    padding: 10,
    fontSize: 16,
    cursor: 'pointer',
    transition: '0.2s all',
    borderRadius: setBorderRadius(),
    borderBottom: '1px solid #dcdcdc'
  }

  merge(style, styles)

  return (
    <div
      style={ style }
      onMouseOver={ onMouseOver }
      onMouseLeave={ onMouseLeave }
      onClick={ handleClick }
    >
      { text }
    </div>
  )
}

DropdownOption.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
  shouldHideMenu: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  styles: PropTypes.object
}

DropdownOption.defaultProps = {
  shouldHideMenu: true
}

export default DropdownOption