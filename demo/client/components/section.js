import React from 'react'

const Section =({ id, name, children })=>{

  const style = {
    base:{
      margin: '60px 0'
    }
  }

  return (
    <div id={ id } style={ style.base }>
      <h2>{ name }</h2>
      { children }
    </div>
  )
}

Section.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default Section