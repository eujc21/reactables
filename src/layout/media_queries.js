import React, { PropTypes } from 'react'
import invertBy from 'lodash/invertBy'

const Size = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 5
}

export default function withMediaQueries(WrappedComponent, options = {}){

  const defaultBreakPoints = {
    xxl: Infinity, // xxl - greater than 1440
    xl: options.xl || 1440, // extra large  - between 1440 & 1030
    lg: options.lg || 1030, // large - between 1030 & 991
    md: options.md || 991,  // medium - between 991 & 767
    sm: options.sm || 768,  // small - between 767 & 414
    xs: options.xs || 414,  // extra small - below 414
  }

  const breakPoints = {...defaultBreakPoints, ...options}

  const pointsArray = Object.keys(breakPoints).map((key, i)=> {
    const Dict = invertBy(Size, value => parseInt(value))
    return breakPoints[Dict[i]]
  })

  function setWidthRanges(size){

    const index = Size[size]
    const prevIndex = Size[size] - 1

    const maxWidth = index === 5 ? Infinity : pointsArray[index]
    const minWidth = prevIndex < 0 ? 0 : pointsArray[prevIndex] + 1

    return {maxWidth, minWidth}
  }

  class WithMediaQueries extends React.Component{

    state = {
      orientation: '',
      mediaQuery: { size: '', minWidth: 0, maxWidth: 0 }
    }

    componentWillMount(){
      // break-points
      let mediaQuery = {}
      for(const size in breakPoints){
        this[size] = window.matchMedia(`(max-width: ${breakPoints[size]}px)`)
        this[size].addListener(this.handleSizeChange.bind(null, size))

        if(this[size].matches)
          mediaQuery = { sizeName: size, sizeValue: Size[size], ...setWidthRanges(size) }
      }

      //orientation
      this.orientation = window.matchMedia("(orientation: portrait)")
      this.orientation.addListener(this.handleOrientationChange)
      const orientation = this.orientation.matches ? 'portrait' : 'landscape'

      this.setState({ orientation, mediaQuery})
    }

    componentWillUnmount() {

      // break-points
      for(const size in breakPoints){
        this[size].removeListener(this.handleSizeChange)
      }

      // orientation
      this.orientation.removeListener(this.handleOrientationChange)
    }

    handleSizeChange =(size, e)=>{
      size = size === 'xl' ? e.matches ? 'xl' : 'xxl': size
      size = size === 'lg' ? e.matches ? 'lg' : 'xl' : size
      size = size === 'md' ? e.matches ? 'md' : 'lg' : size
      size = size === 'sm' ? e.matches ? 'sm' : 'md' : size
      size = size === 'xs' ? e.matches ? 'xs' : 'sm' : size

      this.setState({mediaQuery: { sizeName: size, sizeValue: Size[size], ...setWidthRanges(size) }})
    }

    handleOrientationChange =(e)=>{
      this.setState({ orientation: e.matches ? 'portrait' : 'landscape' })
    }


    render() {
      return <WrappedComponent { ...this.props } { ...this.state } breakPoints={ breakPoints } />
    }
  }

  return WithMediaQueries
}