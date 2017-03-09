import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

// TODO: 1. Allow for 'style' prop, 2. Optional alpha overlay,

class HiddenPanel extends React.Component {

  static propTypes = {
    isVisible: PropTypes.bool,
    offSet: PropTypes.number,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    animationTime: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object
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
    window.addEventListener('resize', this.calculateHeightOffset, false);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.calculateHeightOffset, false);
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

    const { offSet, position, width, animationTime, style, children } = this.props
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
      overlay: {}
    }

    // append positioning while visible
    styles = this.setVisibility(styles)

    merge(styles, style)

    //calculate offSet
    if(offSet){
      styles.top = position === 'left' || position === 'right' ? offSet : styles.top
    }

    return(
      <div style={ styles.panel }>
        { children }
      </div>
    )
  }
}

export default HiddenPanel
