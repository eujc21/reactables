import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

const Container =({ children, type, style })=>{

  const styles = {
    display: 'flex',
    width: '100%',
    overflowY: 'scroll',
    //backgroundColor: 'white'
  }

  merge(styles, style)

  return(
    <div style={ styles }>
      { children }
    </div>
  )

}

export default Container