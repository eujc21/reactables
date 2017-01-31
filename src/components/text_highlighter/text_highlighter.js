import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'

export class TextHighlighter extends React.Component {

  state = { text: '', pageX: 0, pageY: 0 }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside, false);
  }

  onClickOutside = (e) => {
    if (this.node && this.node.contains(e.target))
      return

    this.setState({text: ''})
  }

  onMouseUp =()=>{
    // create a span with #__text_highlighter
    let span = document.createElement("span");
    span.id = '__text_highlighter'

    // get selection and attach span @ selection range
    const selection = document.getSelection()
    if (selection.rangeCount) {
      let range = selection.getRangeAt(0).cloneRange();
      range.surroundContents(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // get attached span element; assign offset to state
    const element = document.getElementById('__text_highlighter')

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

    const style = {
      base:{

      },
      menu:{
        base:{
          opacity: text.length ? 1 : 0,
          left: pageX + 10,
          top: pageY - 25,
          position: 'absolute',
        },
        options:{
          backgroundColor: 'black',
          color: 'white',
          fontSize: 12,
          padding: 3,
          borderRadius: 2,
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
    return(
      <div
        ref={ node => this.node = node }
        style={ style.base }
        onMouseUp={ this.onMouseUp }
        onMouseDown={ this.onMouseDown }
      >
        { children }
        <div style={ style.menu.base }>
          <div style={ style.menu.options }>Option 1</div>
          <div style={ style.menu.arrowDown }/>
        </div>
      </div>
    )
  }
}

