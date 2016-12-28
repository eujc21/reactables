import React from 'react'
const Hero =({title, tagline})=>{

  const style = {
    base: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 500,
      color: 'white',
      backgroundColor: 'blue'
    },
    title: {
      fontSize: 36
    }

  }

  return (
    <div style={ style.base }>
      <h1 style={ style.title }>{ title }</h1>
      <p>{ tagline }</p>
    </div>
  )
}

export default Hero