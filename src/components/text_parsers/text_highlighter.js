import React, { PropTypes } from 'react'
import merge from 'lodash/merge'
import { TextMenu } from './text_menu'
import isEqual from 'lodash/isEqual'

//const regex = /#!#(.*?)#!#(.*?)#!#/gi

export class TextHighlighter extends React.Component {

  static propTypes = {
    delimiter: PropTypes.string,
    dataId: PropTypes.bool,
    text: PropTypes.string,
    textMenuOptions: PropTypes.array,
    style: PropTypes.object
  }

  static defaultProps = {
    dataId: false,
    delimiter: '#!#',
    textMenuOptions: null,
    style: {base: {}, highlighted: {}}
  }

  state = { pageX: 0, pageY: 0, matches: [], selection: ''}

  componentWillMount(){
    this.parseText(this.props.text)
  }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside)
  }

  componentWillUpdate(nextProps, nextState){
    if(!isEqual(nextProps.text, this.props.text))
      this.parseText(this.props.text)
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
    const { delimiter, dataId } = this.props
    return new RegExp(`${delimiter}${ dataId ? '(.*?)' + delimiter : '' }(.*?)${delimiter}`, 'gi')
  }

  parseText =(text)=>{
    const regex = this.getRegex()
    let matches = []

    let match = null
    while((match = regex.exec(text)) !== null){
      matches.push({
        dataId: this.props.dataId ? match[1] : null,
        value: this.props.dataId ? match[2] : match[1]
      })
    }

    this.setState({matches})
  }


  render(){
    const { text, textMenuOptions, style } = this.props
    const { matches } = this.state
    const TEXT_HIGHLIGHTER = '#!__TEXT_HIGHLIGHTER__!#'
    const regex = this.getRegex()

    const styles = {
      base: {
        position: 'relative'
      },
      highlighted: {
        position: 'relative',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 2,
        padding: '0 3px',
        cursor: 'pointer'
      }
    }

    merge(styles, style)

    return(
      <div
        ref={ node => this.node = node }
        style={ styles.base }
      >
        { text
          .replace(regex, TEXT_HIGHLIGHTER)
          .split(TEXT_HIGHLIGHTER)
          .map((segment, i)=>
            <span key={ i }>
              { segment }

              { matches[i]
                ? <Highlighted
                    styles={ styles.highlighted }
                    textMenuOptions={ textMenuOptions }
                    dataId={ matches[i].dataId }
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
    const { styles, textMenuOptions, dataId, children } = this.props

    return(
      <span
        ref={ node => this.node = node }
        data-id={ dataId }
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
