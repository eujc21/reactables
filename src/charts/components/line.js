import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'

export class Line extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    xProp: PropTypes.string.isRequired,
    yProp: PropTypes.string.isRequired,
    lineColors: PropTypes.array,
    onClick: PropTypes.func,
    tooltip: PropTypes.func,
    xTicksAngled: PropTypes.bool,
    shouldShowGrid: PropTypes.bool,
    xTicks: PropTypes.number,
    yTicks: PropTypes.number,
    pointRadius: PropTypes.number,
  }

  static defaultProps = {
    lineColors: ['#000000'],
    xTicksAngled: false,
    shouldShowGrid: false,
    xTicks: null,
    yTicks: null,
    pointRadius: 1.3
  }

  componentWillUpdate(prevProps, prevState){
    this.renderChart()
    if(!isEqual(this.props, prevProps)){
      d3.select(this.chartContainer).selectAll('svg').remove()
      this.renderChart()
    }
  }

  handlePointClick =(set, d, i)=>{
    if(!this.props.onClick)
      return

    this.props.onClick(set, d, i)
  }

  appendXAxis =(svg)=>{
    const { data, xTicks, xProp, tickFontSize, xTicksAngled, width, height} = this.props
    this.xScale = d3.scaleTime()
      .domain([
        d3.min(data, dataset => d3.min(dataset.values, d => d[xProp])),
        d3.max(data, dataset => d3.max(dataset.values, d => d[xProp]))
      ])
      .range([0, width])

    this.xAxis = d3.axisBottom(this.xScale)
      .ticks(xTicks)
      .tickSize(5)
      .tickPadding(5)


    /* Append and Transform X Axis */
    svg
      .append('g')
      .attr('transform', `translate(0, ${ height })`)
      .call(this.xAxis)
      .style('stroke-width', 0.5)
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('font-size', `${tickFontSize}px`)
      .attr('transform', `rotate(${xTicksAngled ? -45 : 0})`);
  }

  appendYAxis =(svg)=>{
    const { data, yProp, yTicks, tickFontSize, height } = this.props
    this.yScale = d3.scaleLinear()
      .domain([
        d3.min(data, dataset => d3.min(dataset.values, d => d[yProp])),
        d3.max(data, dataset => d3.max(dataset.values, d => d[yProp]))
      ])
      .range([height, 0])

    this.yAxis = d3.axisLeft(this.yScale)
      .ticks(yTicks)
      .tickSize(5)

    svg
      .append('g')
      .call(this.yAxis)
      .style('font-size', `${tickFontSize}px`)
      .style('font-weight', '100')
      .style('stroke-width', 0.5)

  }

  appendGrid =(svg)=>{

    const { width, height } = this.props

    if(!this.props.shouldShowGrid)
      return

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(
        this.xAxis.tickSize(-height, 0, 0)
          .tickSizeOuter(0, 0, 0)
          .tickFormat("")
      )
      .style('stroke-width', 0.1)

    svg.append('g')
      .call(
        this.yAxis.tickSize(-width, 0, 0)
          .tickSizeOuter(0, 0, 0)
          .tickFormat("")
      )
      .style('stroke-width', 0.1)
  }

  appendAreas =(svg)=>{
    const { data, xProp, yProp, lineColors, height } = this.props
    let area = d3.area()
      .x(d => this.xScale(d[xProp]))
      .y0(height)
      .y1(d => this.yScale(d[yProp]))
      .curve(d3.curveCatmullRom.alpha(0.5))

    svg
      .selectAll('.area')
      .data(data)
      .enter()
      .append('path')
      .attr('d', d => area(d.values))
      .style('fill', (d, i) => lineColors[i])
      .style('fill-opacity', 0.5)//give fill color for area fill
  }

  appendLines =(svg)=>{
    const { data, xProp, yProp, lineColors } = this.props

    let line = d3.line()
      .x(d => this.xScale(d[xProp]))
      .y(d => this.yScale(d[yProp]))
      .curve(d3.curveCatmullRom.alpha(0.5))

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
  }

  appendPoints =(svg)=>{
    const { data, tooltip, lineColors, xProp, yProp, pointRadius } = this.props
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
    data.forEach((dataset, setIndex) =>{
      svg
        .selectAll('point')
        .data(dataset.values)
        .enter()
        .append('circle')
        .attr('cx', d => this.xScale(d[xProp]))
        .attr('cy', d => this.yScale(d[yProp]))
        .attr('r', d => pointRadius)
        .style('fill', lineColors[setIndex])
        .style('cursor', this.props.onClick ? 'pointer' :  null)

        /*==============*/
        /* Call Tooltip */
        /*==============*/

        .on("mouseover", (d, i) => {

          div.transition()
            .duration(200)
            .style("opacity", .9)

          div
            .html(renderTooltipContent(dataset.name, d, i) )
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

        .on("click", (d, i)=> this.handlePointClick(dataset.name, d, i))
    })

    function renderTooltipContent(d, i){

      if(!tooltip)
        return

      return renderToString(
        tooltip(d, i)
      )
    }

  }

  renderChart =()=>{
    let svg = d3.select('g')
    console.log('RENDER CHART', svg)
    this.appendXAxis(svg)
    this.appendYAxis(svg)
    this.appendGrid(svg)
    this.appendAreas(svg)
    this.appendLines(svg)
    this.appendPoints(svg)
  }

  render(){
    return null
  }

}