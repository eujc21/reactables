import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import merge from 'lodash/merge'
import { TextMenu } from './text_menu'

export class TextSelector extends React.Component {

  static propTypes = {
    onSelect: PropTypes.func,
    textMenuOptions: PropTypes.array
  }

  state = { selection: '', pageX: 0, pageY: 0 }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside, false);
  }

  onClickOutside = (e) => {
    if (this.node && this.node.contains(e.target))
      return

    this.setState({selection: ''})
  }

  onMouseUp =()=>{
    // create a span with #__text_highlighter
    let span = document.createElement("span");
    span.id = '__text_highlighter'

    // get selection and attach span @ selection range
    const select = document.getSelection()
    if (select.rangeCount) {
      let range = select.getRangeAt(0).cloneRange()

      try {
        range.surroundContents(span);
      } catch(e) {
        console.warn(e)
        return
      }


      select.removeAllRanges();
      select.addRange(range);
    }

    // get attached span element; assign offset to state
    const element = document.getElementById('__text_highlighter')
    const selection = select.toString().trim()

    this.setState({
      selection,
      pageX: element.offsetLeft,
      pageY: element.offsetTop
    })


    if(this.props.onSelect)
      this.props.onSelect(selection)
  }

  onMouseDown =(e)=>{
    this.node.focus()
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
    const { children, textMenuOptions, styles } = this.props
    const { selection, pageX, pageY } = this.state

    const style = {
      base:{
        position: 'relative',
        userSelect: 'contain', // lacking browser support
      }
    }

    merge(style, styles)

    return(
      <div
        ref={ node => this.node = node }
        style={ style.base }
        onMouseUp={ this.onMouseUp }
        onMouseDown={ this.onMouseDown }
      >
        { children }
        <TextMenu
          textMenuOptions={ textMenuOptions }
          pageX={ pageX }
          pageY={ pageY }
          selection={ selection }
        />
      </div>
    )
  }
}



