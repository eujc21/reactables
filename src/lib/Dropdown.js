import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class Dropdown extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    onClickOutside: PropTypes.func,
    isActive: function(props, propName, componentName) {
      const exists = props[propName] || props[propName] === false

      if(props.onClickOutside && !exists)
        return new Error(`${propName} -  By providing onClickOutside to ${componentName}, the ${propName} prop must be handled.`)

      if (exists && typeof (props[propName]) !== 'boolean') {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed. Expected a boolean value.'
        );
      }
    },
  }

  static defaultProps = {
    style: {}
  }

  state = { isActive: false }

  get isActive (){
    const { isActive } = this.props
    const activeProp = isActive || isActive === false
    return activeProp ? isActive : this.state.isActive
  }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside, false);
  }

  onClick =()=>{
    const { onClick } = this.props
    const isActive = this.isActive

    if(onClick) return onClick()
    this.setState({isActive: !isActive})
  }

  onClickOutside = (e) => {
    const { onClickOutside } = this.props
    const isActive = this.isActive

    // if clicking inside the component, return
    if (this.main && this.main.contains(e.target)) return

    // if method is specified, return the method
    if(onClickOutside && isActive) return onClickOutside()

    // otherwise set the state to inactive
    if(isActive) this.setState({isActive: false})
  }

  cloneWithProps(child){
    // map the private on click from children up to this parent
    return React.cloneElement(child, {
      _onClick: this.onClick,
      isActive: child.props.isActive || this.isActive
    })
  }

  render(){

    const { style, children } = this.props

    let styles = {
      base:{
        display: 'inline-block',
        position: 'relative'
      }
    }

    merge(styles, style)

    return(
      <span ref={ main => this.main = main } style={ styles.base }>
        { React.Children.toArray(children)
          .map(child => this.cloneWithProps(child))
        }
      </span>
    )

  }
}
