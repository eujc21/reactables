import React, { PropTypes } from 'react'

// ** usage **
//
//  <Button
//    text={
//      <div style={{ whiteSpace:'nowrap'}}>
//        <i
//          className="icon-plus"
//          style={{ fontSize: 14 }}/> New Campaign
//      </div>}
//    backgroundColor={ 'green' }
//    textColor={ 'white' }
//    onClick={ this.handleNewCampaignClick }/>

export class Button extends React.Component {
  static propTypes = {
    text: PropTypes.node,
    textColor: PropTypes.string,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.number,
    fontFamily: PropTypes.string,
    letterSpacing: PropTypes.number,
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    border: PropTypes.string,
    borderRadius: PropTypes.number,
    isHoverable: PropTypes.bool,
    padding: PropTypes.oneOfType([ PropTypes.string,PropTypes.number]),
    margin: PropTypes.oneOfType([ PropTypes.string,PropTypes.number]),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    text: 'Button',
    textColor: '#000000',
    fontSize: 12,
    fontWeight: 200,
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    letterSpacing: 1,
    backgroundColor: '#f9f9f9',
    border: 'none',
    borderRadius: 2,
    isHoverable: false,
    isDisabled: false,
    padding: '5px 3px'
  }

  state = {isHovered: false}

  constructor(props){
    super(props)
  }

  handleClick = () =>{
    if(this.props.isDisabled)
      return

    this.props.onClick()
  }

  handleMouseEnter = () =>{
    if(this.props.isDisabled)
      return

    this.setState({isHovered: true})
  }

  handleMouseLeave = () =>{
    this.setState({isHovered: false})
  }

  handleFocus = (e) =>{
    e.target.blur()
  }

  render(){
    const {
      text,
      textColor,
      backgroundColor,
      border,
      borderRadius,
      width,
      height,
      margin,
      padding,
      fontSize,
      fontWeight,
      fontFamily,
      letterSpacing,
      isDisabled
    } = this.props

    let style = {
      width,
      height,
      border,
      borderRadius,
      color: textColor,
      backgroundColor,
      margin,
      padding,
      cursor: isDisabled ? null : 'pointer',
      fontSize,
      fontFamily,
      fontWeight,
      letterSpacing,
      transition: 'box-shadow 0.5s ease',
      boxShadow: this.state.isHovered ? '0px 2px 4px 0px rgba(0,0,0, 0.35)' : null
    }

    return(
      <button
        style={ style }
        onClick={ this.handleClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        onFocus={ this.handleFocus }>
        { text }
      </button>
    )
  }
}