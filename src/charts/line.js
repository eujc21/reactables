import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'
import { initialize, remove, appendTitle, appendXLabel, appendYLabel, createTooltipContainer, renderTooltip } from './common'

export class LineChart extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    xProp: PropTypes.string.isRequired,
    yProp: PropTypes.string.isRequired,
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    initialWidth: PropTypes.number,
    initialHeight: PropTypes.number,
    isResponsive: PropTypes.bool,
    tickFontSize: PropTypes.number,
    labelFontSize: PropTypes.number,
    titleFontSize: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    }),

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
    pointRadius: 1.3,

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

  constructor(props){
    super(props)
    this.svg = {}
    this.width = 0
    this.height = 0
  }

  componentDidMount(){
    this.renderChart()
  }

  componentWillUpdate(prevProps){
    if(!isEqual(this.props, prevProps)){
      remove(this.svg)
      this.renderChart()
    }
  }

  componentWillUnmount(){
    remove(this.svg)
  }

  handlePointClick =(set, d, i)=>{
    if(!this.props.onClick)
      return

    this.props.onClick(set, d, i)
  }

  appendXAxis =()=>{
    const { data, xTicks, xProp, tickFontSize, xTicksAngled } = this.props
    this.xScale = d3.scaleTime()
      .domain([
        d3.min(data, dataset => d3.min(dataset.values, d => d[xProp])),
        d3.max(data, dataset => d3.max(dataset.values, d => d[xProp]))
      ])
      .range([0, this.width])

    this.xAxis = d3.axisBottom(this.xScale)
      .ticks(xTicks)
      .tickSize(5)
      .tickPadding(5)


    /* Append and Transform X Axis */
    this.svg
      .append('g')
      .attr('transform', `translate(0, ${ this.height })`)
      .call(this.xAxis)
      .style('stroke-width', 0.5)
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('font-size', `${tickFontSize}px`)
      .attr('transform', `rotate(${xTicksAngled ? -45 : 0})`);
  }

  appendYAxis =()=>{
    const { data, yProp, yTicks, tickFontSize } = this.props
    this.yScale = d3.scaleLinear()
      .domain([
        d3.min(data, dataset => d3.min(dataset.values, d => d[yProp])),
        d3.max(data, dataset => d3.max(dataset.values, d => d[yProp]))
      ])
      .range([this.height, 0])

    this.yAxis = d3.axisLeft(this.yScale)
      .ticks(yTicks)
      .tickSize(5)

    this.svg
      .append('g')
      .call(this.yAxis)
      .style('font-size', `${tickFontSize}px`)
      .style('font-weight', '100')
      .style('stroke-width', 0.5)

  }

  appendGrid =()=>{

    if(!this.props.shouldShowGrid)
      return

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(
        this.xAxis.tickSize(-this.height, 0, 0)
          .tickSizeOuter(0, 0, 0)
          .tickFormat("")
      )
      .style('stroke-width', 0.1)

    this.svg.append('g')
      .call(
        this.yAxis.tickSize(-this.width, 0, 0)
          .tickSizeOuter(0, 0, 0)
          .tickFormat("")
      )
      .style('stroke-width', 0.1)
  }

  appendAreas =()=>{
    const { data, xProp, yProp, lineColors } = this.props

    let area = d3.area()
      .x(d => this.xScale(d[xProp]))
      .y0(this.height)
      .y1(d => this.yScale(d[yProp]))
      .curve(d3.curveCatmullRom.alpha(0.5))

    this.svg
      .selectAll('.area')
      .data(data)
      .enter()
      .append('path')
      .attr('d', d => area(d.values))
      .style('fill', (d, i) => lineColors[i])
      .style('fill-opacity', 0.5)//give fill color for area fill
  }

  appendLines =()=>{
    const { data, xProp, yProp, lineColors } = this.props

    let line = d3.line()
      .x(d => this.xScale(d[xProp]))
      .y(d => this.yScale(d[yProp]))
      .curve(d3.curveCatmullRom.alpha(0.5))

    this.svg
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

  appendPoints =()=>{
    const { data, tooltip, lineColors, xProp, yProp, pointRadius } = this.props
    /*================*/
    /* Create Tooltip */
    /*================*/

    // Define the div for the tooltip
    let tooltipContainer = createTooltipContainer()

    /*===============*/
    /* Append Points */
    /*===============*/
    data.forEach((dataset, setIndex) =>{
      this.svg
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

          tooltipContainer.transition()
            .duration(200)
            .style("opacity", 1)

          tooltipContainer
            .html(renderTooltip(tooltip, {dataset: dataset.name, data: d, index: i}) )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
        })

        .on("mouseout", d => {
          tooltipContainer.transition()
            .duration(500)
            .style("opacity", 0);
        })

        /*================*/
        /* On Point Click */
        /*================*/

        .on("click", (d, i)=> this.handlePointClick(dataset.name, d, i))
    })

  }

  renderChart =()=>{

    const { initialWidth, initialHeight, margin, isResponsive, title, titleFontSize, xLabel, yLabel, labelFontSize } = this.props

    // create base svg
    this.svg = initialize(this.chartContainer, initialWidth, initialHeight, margin, isResponsive)

    // Calculate width and height
    this.width = initialWidth - margin.left - margin.right
    this.height = initialHeight - margin.top - margin.bottom

    // common
    appendTitle(this.svg, title, titleFontSize, this.width, margin)
    appendXLabel(this.svg, xLabel, labelFontSize, this.width, this.height, margin)
    appendYLabel(this.svg, yLabel, labelFontSize, this.height, margin)

    // chart
    this.appendXAxis()
    this.appendYAxis()
    this.appendGrid()
    this.appendAreas()
    this.appendLines()
    this.appendPoints()
  }

  render(){
    const style = {
      width: '100%',
      backgroundColor: this.props.backgroundColor,
    }

    return(
      <div
        style={ style }
        ref={ chartContainer => this.chartContainer = chartContainer }
      />
    )
  }

}