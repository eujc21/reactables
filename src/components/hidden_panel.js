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
    ])
  }

  static defaultProps = {
    isVisible: false,
    position: 'right',
    animationTime: '1s',
    width: 200,
    offSet: 0
  }

  state = {
    length: window.innerHeight - this.props.offSet
  }

  constructor(props){
    super(props)
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

  render(){

    const { offSet, isVisible, position, width, animationTime, children } = this.props
    const { length } = this.state


    let style = {
      backgroundColor: 'transparent',
      left: position === 'left' ? isVisible ? 0 : -width : null,
      right: position === 'right' ? isVisible ? 0 : -width : null,
      top: position === 'top' ? isVisible ? 0 : -width : null,
      paddingBottom: 120,
      bottom: position === 'bottom' ? isVisible ? 0 : -width : null,
      width: position === 'right' || position === 'left' ? width : length,
      height: position === 'bottom' || position === 'top' ? width : length,
      position: 'fixed',
      zIndex: 1000000,
      transition: animationTime,
    }

    //calculate offSet
    if(offSet){
      style.top = position === 'left' || position === 'right' ? offSet : style.top
    }

    return(
      <div style={ style }>
        { children }
      </div>
    )
  }
}



export default HiddenPanel