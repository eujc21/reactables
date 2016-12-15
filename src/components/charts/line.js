import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'
import { makeResponsive } from './utils'
import moment from 'moment'

export class LineChart extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    xProp: PropTypes.string.isRequired,
    yProp: PropTypes.string.isRequired,
    initialWidth: PropTypes.number,
    initialHeight: PropTypes.number,
    isResponsive: PropTypes.bool,
    lineColors: PropTypes.array,
    backgroundColor: PropTypes.string,
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    tickFontSize: PropTypes.number,
    labelFontSize: PropTypes.number,
    titleFontSize: PropTypes.number,
    onClick: PropTypes.func,
    tooltip: PropTypes.func,
  }

  static defaultProps = {
    initialWidth: 800,
    initialHeight: 600,
    isResponsive: false,
    lineColors: ['#000000'],
    backgroundColor: '',
    title: '',
    xLabel: '',
    yLabel: '',
    tickFontSize: 6,
    labelFontSize: 6,
    titleFontSize: 6,
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

  handlePointClick =(d, i)=>{
    if(!this.props.onClick)
      return

    this.props.onClick(d, i)
  }

  renderChart =()=>{
    const { data, xProp, yProp, xLabel, yLabel, title, tickFontSize, labelFontSize, titleFontSize, lineColors, initialWidth, initialHeight, isResponsive } = this.props

    let margin = {
      top: 20,
      right: 20,
      bottom: 40,
      left: 40
    };

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

    data.forEach(dataset => {
      dataset.values.forEach(d => {
        d[xProp] = Date.parse(d[xProp]);
        d[yProp] = d[yProp];
      })
    })

    /* Y Scale and Axis*/
    let yScale = d3.scaleLinear()
      .domain([
        d3.min(data, dataset => d3.min(dataset.values, d => d[yProp])),
        d3.max(data, dataset => d3.max(dataset.values, d => d[yProp]))
      ])
      .range([height, 0])

    // let yAxis = d3.axisLeft(yScale)
    // svg.call(yAxis)

    svg
      .append('g')
      .call(d3.axisLeft(yScale))
      .style('font-size', `${tickFontSize}px`)


    /* X Scale and Axis */
    let xScale = d3.scaleTime()
      .domain([
        d3.min(data, dataset => d3.min(dataset.values, d => d[xProp])),
        d3.max(data, dataset => d3.max(dataset.values, d => d[xProp]))
      ])
      .range([0, width])

    let xAxis = d3.axisBottom(xScale)
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


    let area = d3.area()
      .x(d => xScale(d[xProp]))
      .y0(height)
      .y1(d => yScale(d[yProp]))
      .curve(d3.curveCatmullRom.alpha(0.5))

    let line = d3.line()
      .x(d => xScale(d[xProp]))
      .y(d => yScale(d[yProp]))
      .curve(d3.curveCatmullRom.alpha(0.5))


    //draw the line
    svg
      .selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => lineColors[i])
      .style('stroke-width', 1)
      .style('fill', 'none')

    svg
      .selectAll('.area')
      .data(data)
      .enter()
      .append('path')
      .attr('d', d => area(d.values))
      .style('fill', (d, i) => lineColors[i])
      .style('fill-opacity', 0.5)//give fill color for area fill


    /*================*/
    /* Create Tooltip */
    /*================*/

    // Define the div for the tooltip
    let div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", 'absolute')
      .style("pointer-events", 'none')

    /*===============*/
    /* Append Points */
    /*===============*/
    data.forEach(dataset =>{
      svg
        .selectAll('circle')
        .data(dataset.values)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[xProp]))
        .attr('cy', d => yScale(d[yProp]))
        .attr('r', d => 1.5)
        .style('fill', 'black')

        /*==============*/
        /* Call Tooltip */
        /*==============*/

        .on("mouseover", (d, i) => {

          div.transition()
            .duration(200)
            .style("opacity", .9)

          div
            .html( this.renderTooltipContent(d, i) )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");
        })

        .on("mouseout", d => {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        })

        /*================*/
        /* On Point Click */
        /*================*/

        .on("click", this.handlePointClick)
    })

    // append Y label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", labelFontSize)
      .text(yLabel);


    //append X label
    svg.append("text")
      .attr("transform", `translate(${width/2} , ${height + margin.bottom})`)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", labelFontSize)
      .text(xLabel);

  }

  renderTooltipContent =(d, i)=>{
    const { tooltip } = this.props

    if(!tooltip)
      return

    return renderToString(
      tooltip(d, i)
    )
  }

  render(){

    const style = {
      width: '100%',
      backgroundColor: this.props.backgroundColor
    }

    return(
      <div
        ref={(chartContainer) => { this.chartContainer = chartContainer }}
        className={ 'chart' }
        style={ style } />
    )
  }
}