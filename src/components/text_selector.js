import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import merge from 'lodash/merge'
import { TextMenuOption } from './text_menu_option'

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

      // TODO: add error handling if range is on non-text

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
      },
      menu:{
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

        <div style={ style.menu.base }>

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
      </div>
    )
  }
}



