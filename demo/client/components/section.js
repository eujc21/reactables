import React from 'react'

const Section =({ name, children })=>{

  const style = {
    base:{
      margin: '60px 0'
    }
  }

  return (
    <div style={ style.base }>
      <h4>{ name }</h4>
      { children }
    </div>
  )
}

Section.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default Section