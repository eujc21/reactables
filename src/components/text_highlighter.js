import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export class TextHighlighter extends React.Component {

  state = { pageX: 0, pageY: 0 }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  parseText =(text)=>{
    return text
  }

  render(){
    const { text, textMenuOptions, styles } = this.props
    const { pageX, pageY } = this.state

    const style = {
      base: {
        position: 'relative'
      },
      menu: {
        base: {
          visibility: selection.length ? 'visible' : 'hidden',
          left: pageX + 10,
          top: pageY - 27,
          position: 'absolute',
        },
        options: {
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
    }

    merge(style, styles)

    return(
      <div
        ref={ node => this.node = node }
        style={ style.base }
      >
        { text }
        <ul style={ style.menu.options }>
          { textMenuOptions
            ? textMenuOptions.map((option, i) =>
              React.cloneElement(option, {
                key:  i,
                selection
              }))
            : null
          }
        </ul>

        <div style={ style.menu.arrowDown }/>
      </div>
    )
  }
}