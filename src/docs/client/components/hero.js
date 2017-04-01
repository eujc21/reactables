import React from 'react'
const Hero =({title, tagline})=>{

  const styles = {
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
    <div style={ styles.base }>
      <h1 style={ styles.title }>{ title }</h1>
      <p style={ styles.tagline }>{ tagline }</p>
    </div>
  )
}

export default Hero