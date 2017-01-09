import React from 'react'

const Section =({ id, name, children })=>{

  const style = {
    base:{
      //flex: 1,
      width: '100%',
      maxWidth: 500,
      margin: '60px 0'
    },
    heading: { marginTop: 0, paddingTop: 0 },
    span: {
      //Adjusted for DOM id link
      marginTop: '-130px',
      paddingBottom: '130px',
      display: 'block'
    }
  }

  return (
    <div style={ style.base }>
      <h2 style={ style.heading }>
        <span style={ style.span } id={ id } />
        { name }
      </h2>
      { children }
    </div>
  )
}

Section.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default Section