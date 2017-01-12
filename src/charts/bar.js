import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'
import { initialize, generateGUID, remove, appendTitle, appendXLabel, appendYLabel, createTooltipContainer, renderTooltip } from './common'

export class BarChart extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    xProp: PropTypes.string.isRequired,
    yProp: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
    initialWidth: PropTypes.number,
    initialHeight: PropTypes.number,
    isResponsive: PropTypes.bool,
    hasLegend: PropTypes.bool,
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    tickFontSize: PropTypes.number,
    labelFontSize: PropTypes.number,
    titleFontSize: PropTypes.number,
    tooltip: PropTypes.func,
    colors: PropTypes.array,
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
    hasLegend: false,
    title: '',
    xLabel: '',
    yLabel: '',
    tickFontSize: 12,
    labelFontSize: 12,
    titleFontSize: 12,
    colors: ["#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
    margin: {
      top: 20,
      right: 20,
      bottom: 60,
      left: 50
    }
  }

  constructor(props){
    super(props)
    this.svg = {}
    this.width = 0
    this.height = 0
    this.data = []
  }

  componentDidMount(){
    const { initialWidth, initialHeight, margin, isResponsive } = this.props

    this.GUID = generateGUID()
    this.svg = initialize(this.chartContainer, this.GUID, initialWidth, initialHeight, margin, isResponsive)

    this.renderChart()
  }

  componentWillUpdate(prevProps){
    if(!isEqual(this.props, prevProps)){
      remove(this.svg)
      this.renderChart()
    }
  }

  componentWillUnmount(){
    remove(this.svg, this.GUID)
  }

  appendXAxis =()=>{

    const { xProp, tickFontSize } = this.props

    this.xScale = d3.scaleBand()
      .padding(0.2)
      .domain(this.data.map(d => d[xProp]))
      .range([0, this.width]);

    let xAxis = d3.axisBottom(this.xScale)
      .tickSize(tickFontSize)
      .tickPadding(5)

    this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('font-size', `${tickFontSize}px`)
      .attr('transform', 'rotate(-45)');
  }

  appendYAxis =()=>{
    const { tickFontSize } = this.props

    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, d=> d.total)])
      .range([this.height, 0]);

    let yAxis = d3.axisLeft(this.yScale)
      .tickSize(tickFontSize)
      .tickPadding(5)

    this.svg
      .append('g')
      .call(yAxis)
      .style('font-size', `${tickFontSize}px`)
      .style('font-weight', '100')
      .style('stroke-width', 0.5)
  }

  appendBars =()=>{
    const { xProp, yProp, colors, tooltip } = this.props

    let yKeys = Array.isArray(yProp) ? yProp : [yProp]

    let barColors = d3.scaleOrdinal()
      .range(colors)
      .domain(yKeys)

    let tooltipContainer = createTooltipContainer()

    this.svg.append('g')
      .selectAll('g')
      .data(d3.stack().keys(yKeys)(this.data))
      .enter().append('g')
        .style('fill', d => barColors(d.key))
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
        .attr('x', d =>  this.xScale(d.data[xProp]))
        .attr('y', d => this.yScale(d[1]))
        .attr('height', d => this.yScale(d[0]) - this.yScale(d[1]))
        .attr('width', d => this.xScale.bandwidth())

      /* Tooltip */

      .on("mouseover", (d, i) => {
        tooltipContainer.transition()
          .duration(200)
          .style("opacity", 1)

        tooltipContainer
          .html(renderTooltip(tooltip, {data: d.data, index: i}) )
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px")
      })

      .on("mouseout", d => {
        tooltipContainer.transition()
          .duration(500)
          .style("opacity", 0);
      })


    this.appendLegend(yKeys, barColors)
  }

  appendLegend(keys, colors){
    const { hasLegend } = this.props

    if(!hasLegend)
      return

    let legend = this.svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", (d, i) => "translate(0," + i * 20 + ")")

    legend.append("rect")
      .attr("x", this.width + this.props.margin.right - 40)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", colors)

    legend.append("text")
      .attr("x", this.width + this.props.margin.right - 45)
      .attr("y", 12)
      .attr("dy", "0.32em")
      .text(d => d)
  }

  renderChart =()=>{

    const { data, yProp, initialWidth, initialHeight, margin, title, titleFontSize, xLabel, yLabel, labelFontSize } = this.props

    // Calculate width and height
    this.width = initialWidth - margin.left - margin.right
    this.height = initialHeight - margin.top - margin.bottom

    // Map data totals
    const yKeys = Array.isArray(yProp) ? yProp : [yProp]

    this.data = data.map( d =>{
      d.total = 0
      for(let key of yKeys){
        d.total += d[key] || 0
      }
      return d
    })

    // common
    appendTitle(this.svg, title, titleFontSize, this.width, margin)
    appendXLabel(this.svg, xLabel, labelFontSize, this.width, this.height, margin)
    appendYLabel(this.svg, yLabel, labelFontSize, this.height, margin)

    // chart
    this.appendXAxis()
    this.appendYAxis()
    this.appendBars()
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
