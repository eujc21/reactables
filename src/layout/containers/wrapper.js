import React, { PropTypes } from 'react'

const Wrapper =({ children, direction })=>{
  const styles = {
    display: 'flex',
    flexDirection: direction
  }

  return(
    <div style={ styles }>
      { children }
    </div>
  )
}

Wrapper.propTypes = {
  direction: PropTypes.string.isRequired
}

Wrapper.defaultProps = {
  direction: 'column'
}

export default Wrapper