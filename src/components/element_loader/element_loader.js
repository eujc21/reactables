import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { setElement } from './element_loader_reducer'
import './style.css'

class ElementLoader extends React.Component {

  static propTypes = {
    action: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
  }

  state = {
    style: {}
  }

  componentWillMount(){
    const { setElement, action } = this.props

    if(action)
      setElement(action)
  }

  componentDidMount(){
    const child = this.refs.child

    this.setState({
      style: {
        ...this.fixStylePrefix(child),
        height: child ? child.clientHeight : null,
        width: child ? child.clientWidth : null
      }
    })
  }

  fixStylePrefix=(element)=>{
    if(!element)
      return

    const style = window.getComputedStyle(element)
    return Object.keys(style).reduce((obj, key)=>{

      //capitalize webkit
      key = key.replace('webkit', 'Webkit')

      return {
        ...obj,
        [key]: style[key]
      }

    }, {})
  }

  render(){
    const { children, elements, action } = this.props

    return(
      <div>
        { elements[action]
          ? this.renderLoadingElement()
          : React.cloneElement(children, {ref: 'child'})
        }
      </div>
    )
  }

  renderLoadingElement =()=>{

    const { spinner } = this.props
    let style = {
      base:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      },
      span: {
        display: 'inline-block',
        width: 20,
        height: 20,
        margin: '0 5px',
        borderRadius: '100%',
        backgroundColor: '#3498db',
        opacity: 0
      }
    }

    return(
      <div style={{
        ...this.state.style,
        ...style.base
      }}>
        { spinner
          ? spinner
          : <div className='element-loader'>
              <span style={ style.span } />
              <span style={ style.span } />
              <span style={ style.span } />
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    elements: state.elementLoaderReducer
  }
}

export default connect(mapStateToProps, {
  setElement
})(ElementLoader)