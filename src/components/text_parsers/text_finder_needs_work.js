import React, { PropTypes } from 'react'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import flatMapDeep from 'lodash/flatMapDeep'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import has from 'lodash/has'
import escapeRegExp from 'lodash/escapeRegExp'
import uniq from 'lodash/uniq'

const TEXT_TAG = '#!#'

export class TextFinder extends React.Component {

  state = { position: 0, selector: {}, term: '' }

  static propTypes = {
    containerRef: PropTypes.object,
    terms: PropTypes.oneOfType([
      PropTypes.string, PropTypes.array
    ])
  }

  static defaultProps = {

  }

  componentDidMount(){

  }

  setScrollPosition =()=>{

  }

  wrapText =(child)=>{

    const { terms } = this.props

    if(!terms || !terms.length || !terms.trim())
      return child

    const regex = isString(terms)
      ? new RegExp(terms, 'gi')
      : terms.map(term => new RegExp(term, 'gi'))

    // child is not wrapped with node
    if(!React.isValidElement(child)){
      let matches = child.match(regex) || []
      matches = uniq(matches)
      for(let match of matches) {
        const escapedMatch = escapeRegExp(match)
        child = child.replace(new RegExp(escapedMatch, 'g'), `${TEXT_TAG}${match}${TEXT_TAG}`)
      }
      return child
    }

    let matches = child.props.children.match(regex) || []
    matches = uniq(matches)
    for (let match of matches){
      const escapedMatch = escapeRegExp(match)
      child = React.cloneElement(child,
        {children: child.props.children.replace(new RegExp(escapedMatch, 'g'), `${TEXT_TAG}${match}${TEXT_TAG}`)}
      )
    }
    return child
  }


  recursiveChildren=(children)=>{

    return React.Children.toArray(children).map(child =>{

      // if the child is a string w/ no node
      if(!React.isValidElement(child))
        return this.wrapText(child)

      // child.props.children is a string
      if(isString(child.props.children))
        return this.wrapText(child)

      return this.recursiveChildren(child.props.children)
    })
  }


  render(){
    const { children } = this.props


    // const isArray = Array.isArray(this.props.terms)
    // const terms = isArray ? this.props.terms : [this.props.terms]
    // for(let term in terms){
    //
    // }

    return(
      <div ref={ main => this.main = main }>
        { this.recursiveChildren(children) }
      </div>
    )
  }
}