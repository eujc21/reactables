import React from 'react'
import PropTypes from 'prop-types'

const Section =({ id, name, children })=>{

  const styles = {
    base:{
      //flex: 1,
      //width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 500,
      margin: '60px 0'
    },
    heading: { width: '100%',marginTop: 0, paddingTop: 0 },
    span: {
      //Adjusted for DOM id link
      marginTop: '-130px',
      paddingBottom: '130px',
      display: 'block'
    }
  }

  return (
    <div style={ styles.base }>
      <h2 style={ styles.heading }>
        <span style={ styles.span } id={ id } />
        { name }
      </h2>
      { children }
    </div>
  )
}

Section.propTypes = {
  name: PropTypes.string.isRequired
}

export default Section