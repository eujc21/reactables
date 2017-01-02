import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'

export class Base extends React.Component {

  static propTypes = {
    initialWidth: PropTypes.number,
    initialHeight: PropTypes.number,
    isResponsive: PropTypes.bool,
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    tickFontSize: PropTypes.number,
    labelFontSize: PropTypes.number,
    titleFontSize: PropTypes.number,
    backgroundColor: PropTypes.string,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    })
  }

  static defaultProps = {
    initialWidth: 960,
    initialHeight: 500,
    isResponsive: false,
    title: '',
    xLabel: '',
    yLabel: '',
    tickFontSize: 12,
    labelFontSize: 12,
    titleFontSize: 12,
    margin: {
      top: 20,
      right: 20,
      bottom: 35,
      left: 35
    }
  }

  componentDidMount(){
    this.initializeChart()
  }

  generateChartID =()=>{
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
      let r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    })
  }

  makeResponsive =(svg)=>{
    // get container + svg aspect ratio
    // TODO: get container with ref
    let container = d3.select(svg.node().parentNode)

    let width = parseInt(svg.style("width"))
    let height = parseInt(svg.style("height"))
    let aspect = width / height

    svg.attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

    d3.select(window).on("resize." + this.generateChartID(), resize)

    // get width of container and resize svg to fit it
    function resize() {

      let containerWidth = parseInt(container.style("width"))
      //let containerHeight = parseInt(container.style("height"))

      svg.attr("width", containerWidth)
      svg.attr("height", containerWidth /aspect )
    }
  }

  appendTitle =()=>{
    const { margin, title, titleFontSize } = this.props

    if(!title)
      return

    this.svg.append("text")
      .attr("transform", `translate( ${ this.width / 2 }, ${ -margin.top / 2 } )`)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", `${titleFontSize}px`)
      .text(title);
  }

  appendXLabel =()=>{
    const { margin, labelFontSize, xLabel } = this.props

    if(!xLabel)
      return

    this.svg.append("text")
      .attr("transform", `translate(${ this.width /2 } , ${ this.height + margin.bottom })`)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", labelFontSize)
      .text(xLabel);
  }

  appendYLabel =()=>{
    const { margin, labelFontSize, yLabel } = this.props

    if(!yLabel)
      return

    this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (this.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", labelFontSize)
      .text(yLabel);
  }


  initializeChart =()=>{
    const { margin, isResponsive, initialWidth, initialHeight } = this.props

    this.width = initialWidth - margin.left - margin.right;
    this.height = initialHeight - margin.top - margin.bottom;

    this.svg = d3.select(this.chartContainer)
      .append('svg')
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom)
      .call( isResponsive ? this.makeResponsive : ()=>{} )
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)


    this.appendTitle()
    this.appendXLabel()
    this.appendYLabel()
  }

  render(){
    const style = {
      width: '100%',
      backgroundColor: this.props.backgroundColor,
      border: '1px solid black'
    }

    return(
      <div
        style={ style }
        ref={ chartContainer => this.chartContainer = chartContainer }>
        { React.cloneElement(this.props.children, {
          width: this.width,
          height: this.height
        })}
      </div>
    )
  }
}