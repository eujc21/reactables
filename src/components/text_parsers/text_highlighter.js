import React, { PropTypes } from 'react'
import merge from 'lodash/merge'
import { TextMenu } from './text_menu'

//const regex = /#!#(.*?)#!#(.*?)#!#/gi

export class TextHighlighter extends React.Component {

  static propTypes = {
    delimiter: PropTypes.string,
    id: PropTypes.bool,
    text: PropTypes.string,
    textMenuOptions: PropTypes.array
  }

  static defaultProps = {
    id: false,
    textMenuOptions: null
  }

  state = { pageX: 0, pageY: 0, matches: [], selection: ''}

  componentWillMount(){
    this.parseText(this.props.text)
  }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside)
  }

  componentWillUpdate(){
    // this.parseText(this.props.text)
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside)
  }

  onClickOutside = (e) => {
    if (this.main && this.main.contains(e.target)) {
      return
    }

    this.setState({selection: ''})
  }

  getRegex=()=>{
    const { delimiter, id } = this.props
    return new RegExp(`${delimiter}${ id ? '(.*?)' + delimiter : '' }(.*?)${delimiter}`, 'gi')
  }

  parseText =(text)=>{
    const regex = this.getRegex()
    let matches = []

    let match = null
    while((match = regex.exec(text)) !== null){
      matches.push({
        id: this.props.id ? match[1] : null,
        value: this.props.id ? match[2] : match[1]
      })
    }

    this.setState({matches})
  }


  render(){
    const { text, textMenuOptions, styles } = this.props
    const { matches } = this.state
    const TEXT_HIGHLIGHTER = '#!__TEXT_HIGHLIGHTER__!#'
    const regex = this.getRegex()

    const style = {
      base: {
        position: 'relative'
      },
      highlighted: {
        position: 'relative',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 2,
        cursor: 'pointer'
      }
    }

    merge(style, styles)

    return(
      <div
        ref={ node => this.node = node }
        style={ style.base }
      >
        { text
          .replace(regex, TEXT_HIGHLIGHTER)
          .split(TEXT_HIGHLIGHTER)
          .map((segment, i)=>
            <span key={ i }>
              { segment }

              { matches[i]
                ? <Highlighted
                    styles={ style.highlighted }
                    textMenuOptions={ textMenuOptions }
                  >
                    { matches[i].value }
                  </Highlighted>
                : null
              }
            </span>)
        }

      </div>
    )
  }
}

class Highlighted extends React.Component {

  state = { shouldShowMenu: false }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside)
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside)
  }

  onClickOutside = (e) => {
    if (this.node && this.node.contains(e.target))
      return

    this.setState({shouldShowMenu: false})
  }

  handleClick =()=>{
    this.setState({
      shouldShowMenu: !this.state.shouldShowMenu
    })
  }

  render(){
    const { styles, textMenuOptions, children } = this.props

    return(
      <span
        ref={ node => this.node = node }
        style={ styles }
        onClick={ this.handleClick }
      >
        { children }
        <TextMenu
          textMenuOptions={ textMenuOptions }
          pageX={ 0 }
          pageY={ 0 }
          selection={ this.state.shouldShowMenu ? children : '' }
        />
      </span>
    )
  }
}
