import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'

export class TextHighlighter extends React.Component {

  state = { text: '', xPosition: 0, yPosition: 0 }

  onMouseUp =()=>{
    let span = document.createElement("span");
    span.style.fontWeight = "bold";
    span.style.color = "green";
    span.id = '__text_highlighter'

    const selection = document.getSelection()
    if (selection.rangeCount) {
      let range = selection.getRangeAt(0).cloneRange();
      range.surroundContents(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const element = document.getElementById('__text_highlighter')

    console.log(element)

    this.setState({
      text: selection.toString().trim(),
      pageX: element.offsetLeft,
      pageY: element.offsetTop
    })
  }

  onMouseDown =()=>{
    const element = document.getElementById('__text_highlighter')

    if(!element)
      return

    // move contents out of span
    while (element.firstChild) {
      element.parentNode.insertBefore(element.firstChild, element)
    }

    // remove span
    element.parentNode.removeChild(element)
  }

  render(){
    const { children } = this.props
    const { text, pageX, pageY } = this.state

    console.log(pageX, pageY)

    const style = {
      base:{

      },
      menu:{
        //opacity: text.length ? 1 : 0,
        left: pageX,
        top: pageY,
        position: 'absolute',
        color: 'white',
        backgroundColor: 'black',
        fontSize: 10,
        padding: 3,
        borderRadius: 2,
        boxShadow: '0px 2px 4px 0px rgba(0,0,0, 0.29)'
      }
    }
    return(
      <div
        ref={ node => this.node = node }
        style={ style.base }
        onMouseUp={ this.onMouseUp }
        onMouseDown={ this.onMouseDown }
      >
        { children }
        <div style={ style.menu }>Copy</div>
      </div>
    )
  }
}

