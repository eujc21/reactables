import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

const Toolbar =({size, children, style})=>{

  const styles = {
    display: 'flex',
    backgroundColor: '#673AB7',
    flexShrink: 0,
    alignItems: 'center',
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.26)',
    transition: 'transform 0.3s ease-out',
    marginBottom: 40,
    padding: '0 16px',
    color: 'white',
    fontFamily: 'Helvetica Neue, Helvetica, Arial'
  }

  merge(styles, style)

  return(
    <div style={ styles }>
      { children }
    </div>
  )
}

export default Toolbar