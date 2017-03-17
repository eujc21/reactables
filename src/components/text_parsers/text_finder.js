import React, { PropTypes } from 'react'
import isEqual from 'lodash/isEqual'
import { Button } from '../button'

export class TextFinder extends React.Component {

  state = {position: 0, selector: null, elements: null}

  static propTypes = {
    element: PropTypes.string,
    attribute: PropTypes.string,
    attrValue: PropTypes.string,
    displayValue: PropTypes.string,
    scrollOffset: PropTypes.number,
    highlightClass: PropTypes.string,
    highlightStyle: PropTypes.object,
    elementToScroll: PropTypes.object,
    classToScrollTo: PropTypes.string
  }

  static defaultProps = {
    element: 'span',
    attribute: 'data-id',
    attrValue: '1',
    scrollOffset: 0,
    highlightClass: 'pulse-highlight'
  }

  componentDidMount(){
    this.findElements()
    .then(({elements, selector}) => {
      this.highlightAndMove(0, elements, 0)
      this.setState({elements, selector})
    })
  }

  componentDidUpdate(prevProps){
    if(!isEqual(prevProps, this.props)){
      const {elements, selector} = this.findElements()
      this.setState({elements, selector})
    }
  }

  findElements =()=>{
    const { element, attribute, attrValue } = this.props
    const selector = `${element}[${attribute}="${attrValue}"]`

    return new Promise((resolve, reject) => {
      let attempts = 0
      let interval = setInterval(()=>{
        const elements = document.querySelectorAll(selector)

        //resolve
        if(elements) {
          clearInterval(interval)
          resolve({ elements, selector })
        }

        //reject
        attempts = attempts + 1
        if(!elements && attempts >= 10) {
          reject()
          clearInterval(interval)
        }

      }, 250)
    })

  }

  highlightAndMove =(increment, elements, position)=>{
    const { elementToScroll, classToScrollTo, scrollOffset, highlightClass } = this.props

    elements = elements || this.state.elements
    position = position || this.state.position

    const nextPosition = position + increment
    const elementToHighlight = elements[nextPosition]
    const elementToClear = elements[position]

    if(!elementToHighlight)
      return

    function findClosestClass(element, className){
      while ((element = element.parentElement) && !element.classList.contains(className))
      return element
    }

    //scroll on click
    const closestScrollPoint = findClosestClass(elementToHighlight, 'hook')
    elementToScroll.scrollTop = closestScrollPoint.offsetTop - scrollOffset

    //remove class
    elementToClear.className = elementToClear.className.replace(highlightClass, '').trim()

    //add class
    elementToHighlight.className = elementToHighlight.className + ' ' + highlightClass

    this.setState({position: nextPosition})
  }

  clear =()=>{
    this.props.onClear()
  }

  render(){

    const { displayValue } = this.props

    const styles = {
      base:{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        height: 37,
        padding: '0 5px',
        backgroundColor: '#d3d3d3',
      },
      containerLeft: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      containerMid:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      containerRight: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      displayValue: {
        fontSize: 14,
        padding: 0,
        margin: 0
      },
      button:{
        marginLeft: 5
      }
    }

    if(displayValue.trim())
      return(
        <div style={ styles.base }>
          <div style={ styles.containerLeft }>
            <Button
              text="Clear"
              onClick={ this.clear }
              style={ styles.button }
            />
          </div>
          <div>
            <p style={ styles.displayValue }>
              Find: { displayValue }
            </p>
          </div>
          <div style={ styles.containerRight }>
            <Button
              text="Prev"
              onClick={ ()=> this.highlightAndMove(-1) }
              style={ styles.button }
            />
            <Button
              text="Next"
              onClick={ ()=> this.highlightAndMove(1) }
              style={ styles.button }
            />
          </div>
        </div>
      )

    return(<div />)
  }

}