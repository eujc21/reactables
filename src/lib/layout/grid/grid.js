import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

const Grid =({ children, style })=>{
  const styles = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
    paddingTop: 70
  }

  merge(styles, style)

  return (
    <div style={ styles }>
      { children }
    </div>
  )
}

export default Grid