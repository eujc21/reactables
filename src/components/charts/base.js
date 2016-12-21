import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'
import { makeResponsive } from './utils'

export class BaseChart extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    xProp: PropTypes.string.isRequired,
    yProp: PropTypes.string.isRequired,
    initialWidth: PropTypes.number,
    initialHeight: PropTypes.number,
    isResponsive: PropTypes.bool,
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    tickFontSize: PropTypes.number,
    labelFontSize: PropTypes.number,
    titleFontSize: PropTypes.number
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
    titleFontSize: 12
  }

  componentDidMount(){
    this.renderChart()
  }

  componentWillUpdate(prevProps, prevState){
    if(!isEqual(this.props.data, prevProps.data)){
      d3.select(this.chartContainer).selectAll('svg').remove()
      this.renderChart()
    }
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
    let container = select(svg.node().parentNode)

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

  }

  appendXAxis =()=>{

  }

  appendYAxis =()=>{

  }




  renderChart =()=>{
    const { data, xProp, yProp, xLabel, yLabel, title, tickFontSize, labelFontSize, titleFontSize, isResponsive, initialWidth, initialHeight } = this.props

    let margin = {
      top: 20,
      right: 20,
      bottom: 60,
      left: 50
    }

    let width = initialWidth - margin.left - margin.right;
    let height = initialHeight - margin.top - margin.bottom;

    let svg = d3.select(this.chartContainer)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call( isResponsive ? makeResponsive : ()=>{} )
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // append title
    svg.append("text")
      .attr("transform", `translate( ${width/2}, ${-margin.top / 2 } )`)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", `${titleFontSize}px`)
      .text(title);


    /* Y Scale and Axis */
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d=> d[yProp])])
      .range([height, 0]);

    let yAxis = d3.axisLeft(yScale);
    svg.call(yAxis);

    /* X Scale and Axis */
    let xScale = d3.scaleBand()
      .padding(0.2)
      .domain(data.map(d => d[xProp]))
      .range([0, width]);

    let xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickSize(10)
      .tickPadding(5)

    /* Append and Transform X Axis */
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('font-size', `${tickFontSize}px`)
      .attr('transform', 'rotate(-45)');


    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .style('fill', 'd6e9c6')
      .style('stroke', '#31708f')
      .style('stroke-width', '1')
      .attr('x', d => xScale(d[xProp]))
      .attr('y', d => yScale(d[yProp]))
      .attr('width', d => xScale.bandwidth())
      .attr('height', d => height - yScale(d[yProp]))



    // append Y label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text(yLabel);


    //append X label
    svg.append("text")
      .attr("transform", `translate(${width/2} , ${height + margin.bottom})`)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text(xLabel);


  }

  render(){
    return(
      <div
        ref={(chartContainer) => { this.chartContainer = chartContainer }}
        style={{ width: '100%'}} />
    )
  }
}