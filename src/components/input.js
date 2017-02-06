import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export class Input extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    iconClass: PropTypes.string,
    clearIconClass: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    styles: PropTypes.object
  }

  static defaultProps = {
    placeholder: 'Search...',
    text: '',
    styles: {},
    iconClass: 'icon-search',
    clearIconClass: 'icon-cross'
  }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside, false)
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside, false)
  }

  onClickOutside = (e) => {
    if (this.node && this.node.contains(e.target))
      return

    this.node.style.outline = null
  }

  handleTextChange =(e)=>{
    this.props.onChange(e.target.value)
  }

  handleSubmit =()=>{
    this.props.onSubmit(this.props.text)
  }

  handleClear =()=>{
    this.props.onChange('')
    this.props.onSubmit(null)
  }

  handleKeyPress =(e)=>{
    const { text } = this.props

    if (e.key === 'Enter')
      this.props.onSubmit(text)
  }

  handleFocus =(e)=>{
    e.target.parentNode.style.outline = '5px auto -webkit-focus-ring-color' //#969599
  }

  render(){
    const { placeholder, text, iconClass, clearIconClass, styles } = this.props

    const style = {
      base: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        border: '1px solid #EBE9ED',
        borderRadius: 2,
        height: 30,
        backgroundColor: '#ffffff'
      },
      input:{
        display: 'flex',
        borderRadius: 'inherit',
        fontSize: 14,
        border: 'none',
        width: '100%',
        outline: 0,
        backgroundColor: 'inherit',
        boxSizing: 'border-box'
      },
      submitIcon:{
        fontSize: 16,
        cursor: 'pointer'
      },
      clearIcon: {
        fontSize: 14,
        cursor: 'pointer',
        padding: 3,
        marginRight: 3
      }
    }

    merge(style, styles)

    return(

      <div ref={ node => this.node = node } style={ style.base }>
        <input
          style={ style.input }
          value={ text }
          type='text'
          placeholder={ placeholder }
          onChange={ this.handleTextChange }
          onKeyPress={ this.handleKeyPress }
          onFocus={ this.handleFocus }
        />
        { text && text.length > 0 ?
          <i
            className={ clearIconClass }
            style={ style.clearIcon }
            onClick={ this.handleClear }/> : null }
        { iconClass ?
          <i
            className={ iconClass }
            style={ style.submitIcon }
            onClick={ this.handleSubmit }/> : null }
      </div>

    )
  }
}
