import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

// TODO: 1. Allow for 'style' prop, 2. Optional alpha overlay,

class HiddenPanel extends React.Component {

  static propTypes = {
    isVisible: PropTypes.bool,
    offSet: PropTypes.number,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    width: PropTypes.number,
    animationTime: PropTypes.string,
    style: PropTypes.object,
    onClickOutside: PropTypes.func,
    onClick: PropTypes.func
  }

  static defaultProps = {
    isVisible: false,
    position: 'right',
    animationTime: '0.5s',
    width: 200,
    offSet: 0,
    style: {}
  }

  componentDidMount(){
    window.addEventListener('resize', this.calculateHeightOffset, false)
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.calculateHeightOffset, false)
    document.removeEventListener('click', this.onClickOutside, false)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isVisible) {
      document.addEventListener('click', this.onClickOutside, false)
    }

    if(nextProps.isVisible === false ){
      document.removeEventListener('click', this.onClickOutside, false)
    }
  }

  onClick =()=>{
    if(this.props.onClick)
      this.props.onClick()
  }

  onClickOutside =(e)=>{
    if (this.panel && this.panel.contains(e.target))
      return

    if(!this.props.isVisible)
      return

    if(this.props.onClickOutside)
      this.props.onClickOutside()
  }

  calculateHeightOffset =()=>{
    this.setState({length: window.innerHeight - this.props.offSet})
  }

  setVisibility=(styles)=>{
    const { position, isVisible, width } = this.props
    styles.panel[position] = isVisible ? 0 : -width
    return styles
  }

  render(){

    const { offSet, position, width, animationTime, isVisible, style, children } = this.props
    const height = window.innerHeight - offSet

    let styles = {
      panel: {
        top: 0,
        backgroundColor: 'transparent',
        width: (position === 'right' || position === 'left') ? width : height,
        height: (position === 'bottom' || position === 'top') ? width : height,
        position: 'fixed',
        zIndex: 1000000,
        transition: animationTime,
        boxSizing: 'border-box'
      },
      overlay: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(0,0,0,0.5)',
        transition: `all ${animationTime} ease-in-out`
      }
    }

    // append positioning while visible
    styles = this.setVisibility(styles)

    // merge styles
    merge(styles, style)

    //calculate offSet
    if(offSet){
      styles.top = position === 'left' || position === 'right' ? offSet : styles.top
    }

    return(
      <div>
        <div
          ref={ panel => this.panel = panel }
          style={ styles.panel }
        >
          { children }
        </div>
        { isVisible ? <div style={ styles.overlay } /> : null }
      </div>
    )
  }
}

export default HiddenPanel
