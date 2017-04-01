import React, { PropTypes } from 'react'

const BaseContainer =({ children, direction, type })=>{

  const styles = {
    display: 'flex',
    flexDirection: direction,
    position: 'relative',
    width: '100%',
    height: '100vh'
  }
  return(
    <div style={ styles }>
      { children }
    </div>
  )
}

BaseContainer.propTypes = {
  direction: PropTypes.string.isRequired
}

BaseContainer.defaultProps = {
  direction: 'column'
}

export default BaseContainer