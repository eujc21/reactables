import React, { PropTypes } from 'react'

// ** usage **
//
// <Input
//   text={ searchInput }
//   height={ 30 }
//   iconClass={ 'icon-search' } // optional
//   clearIconClass={ 'icon-clear' } //optional
//   border={ `1px solid ${ borderColor }` }
//   onChange={ this.handleSearchInputChange }
//   onSubmit={ this.handleSearchSubmit }/>

export class Input extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    fontSize: PropTypes.number,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    iconClass: PropTypes.string,
    clearIconClass: PropTypes.string,
    backgroundColor: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    placeholder: 'Search...',
    text: '',
    fontSize: 14,
    width: '100%',
    height: 30,
    backgroundColor: 'white'
  }

  constructor(props){
    super(props)
  }

  handleTextChange =(e)=>{
    this.props.onChange(e.target.value)
  }

  handleSubmit =()=>{
    const { text } = this.props
    this.props.onSubmit(text)
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

  render(){
    const {
      placeholder,
      text,
      fontSize,
      width,
      height,
      iconClass,
      clearIconClass,
      backgroundColor,
      border
    } = this.props

    let style = {
      base: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        border,
        borderRadius: 1,
        height,
        width,
        backgroundColor
      },
      input:{
        display: 'flex',
        borderRadius: 'inherit',
        fontSize: fontSize,
        border: 'none',
        width: '100%',
        outline: 0,
        backgroundColor
      },
      icon:{
        fontSize: 16,
        cursor: 'pointer'
      },
      clearButton: {
        fontSize: 14,
        cursor: 'pointer',
        padding: 3,
        marginRight: 3
      }
    }

    return(

      <div style={ style.base }>
        <input
          style={ style.input }
          value={ text }
          type='text'
          placeholder={ placeholder }
          onChange={ this.handleTextChange }
          onKeyPress={ this.handleKeyPress }/>
        { text && text.length > 0 ?
          <i
            className={ clearIconClass }
            style={ style.clearButton }
            onClick={ this.handleClear }/> : null }
        { iconClass ?
          <i
            className={ iconClass }
            style={ style.icon }
            onClick={ this.handleSubmit }/> : null }
      </div>

    )
  }
}
