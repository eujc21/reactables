import React, { PropTypes } from 'react'

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
  }

  static defaultProps = {
    isVisible: false,
    position: 'right',
    animationTime: '1s',
    width: 200,
    offSet: 0
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

  setVisibility(style){
    const { position, isVisible, width } = this.props
    style[position] = isVisible ? 0 : -width
    return style
  }

  render(){

    const { offSet, position, width, animationTime, children } = this.props
    const height = window.innerHeight - this.props.offSet


    let style = {
      top: 0,
      backgroundColor: 'transparent',
      width: (position === 'right' || position === 'left') ? width : height,
      height: (position === 'bottom' || position === 'top') ? width : height,
      position: 'fixed',
      zIndex: 1000000,
      transition: animationTime,
    }

    // append positioning while visible
    style = this.setVisibility(style)

    //calculate offSet
    if(offSet){
      style.top = position === 'left' || position === 'right' ? offSet : style.top
    }

    return(
      <div ref={ panel => this.panel = panel } style={ style }>
        { children }
      </div>
    )
  }
}

export default HiddenPanel
