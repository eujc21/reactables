import React from 'react'

export const Nav =({ children })=>{

  const style = {
    base: {
      position: 'relative',
      width: 300,
      padding: '0 10px',
    },
    nav: {
      position: 'fixed',
      width: '100%',
      listStyleType: 'none',
      zIndex: 10000
    }
  }

  return (
    <div style={ style.base }>
      <ul style={ style.nav }>
        { children }
      </ul>
    </div>
  )
}

export const NavLink =({to, children})=>{
  return(
    <li>
      <a href={ to }>{ children }</a>
    </li>
  )
}