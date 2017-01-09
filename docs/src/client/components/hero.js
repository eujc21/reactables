import React from 'react'
const Hero =({title, tagline})=>{

  const style = {
    base: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 500,
      color: 'white',
      background: `linear-gradient( to bottom, ${ '#38d2e0' }, ${ '#32b1d1' })`
    },
    title: {
      fontSize: 36
    },
    tagline: {
      margin: 0
    }
  }

  return (
    <div style={ style.base }>
      <h1 style={ style.title }>{ title }</h1>
      <p style={ style.tagline }>{ tagline }</p>
    </div>
  )
}

export default Hero