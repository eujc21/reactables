import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class SearchBar extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  static defaultProps = {
    placeholder: 'Search...',
    text: '',
    style: {},
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

  onFocus =(e)=>{
    e.target.parentNode.style.outline = '5px auto -webkit-focus-ring-color' //#969599
  }

  onBlur =(e)=>{
    e.target.parentNode.style.outline = null
  }

  render(){
    const { placeholder, text, style } = this.props

    const styles = {
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

    merge(styles, style)

    return(

      <div ref={ node => this.node = node } style={ styles.base }>
        <input
          style={ styles.input }
          value={ text }
          type='text'
          placeholder={ placeholder }
          onChange={ this.handleTextChange }
          onKeyPress={ this.handleKeyPress }
          onFocus={ this.onFocus }
          onBlur={ this.onBlur }
        />
        { text && text.length > 0 ?
          <i
            className='material-icons'
            style={ styles.clearIcon }
            onClick={ this.handleClear }>clear</i> : null
        }

        <i
          className='material-icons'
          style={ styles.submitIcon }
          onClick={ this.handleSubmit }>
          search
        </i>
      </div>

    )
  }
}
