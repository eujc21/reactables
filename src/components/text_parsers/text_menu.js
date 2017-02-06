import React, { PropTypes } from 'react'

export const TextMenu = ({textMenuOptions, pageX, pageY, selection}) =>{

  const style = {
    base:{
      visibility: selection.length ? 'visible' : 'hidden',
      left: pageX + 10,
      top: pageY - 27,
      position: 'absolute',
    },
    options:{
      backgroundColor: 'black',
      color: 'white',
      fontSize: 12,
      borderRadius: 2,
      margin: 0,
      padding: 0,
      listStyleType: 'none',
      whiteSpace: 'nowrap'
    },
    arrowDown: {
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid #000',
      marginLeft: 5
    }
  }
  return(
    <div style={ style.base }>
      <ul style={ style.options }>
        { textMenuOptions
          ? textMenuOptions.map((option, i) =>
            React.cloneElement(option, {
              key:  i,
              selection
            }))
          : null
        }
      </ul>
      <div style={ style.arrowDown }/>
    </div>
  )
}