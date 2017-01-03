import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'
import { initialize, remove, appendTitle, appendXLabel, appendYLabel } from './common'

export class BarChart extends React.Component {

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
    titleFontSize: PropTypes.number,
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
      bottom: 60,
      left: 50
    }
  }

  constructor(props){
    super(props)
    this.svg = {}
    this.width = 0
    this.height = 0
  }

  componentDidMount(){
    const { initialWidth, initialHeight, margin, isResponsive } = this.props

    // create base svg
    this.svg = initialize(this.chartContainer, initialWidth, initialHeight, margin, isResponsive)

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

  appendXAxis =()=>{

    const { data, xProp, tickFontSize } = this.props

    this.xScale = d3.scaleBand()
      .padding(0.2)
      .domain(data.map(d => d[xProp]))
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
    const { data, yProp, tickFontSize } = this.props

    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d=> d[yProp])])
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
    const { data, xProp, yProp } = this.props
    this.svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .style('fill', 'd6e9c6')
      .style('stroke', '#31708f')
      .style('stroke-width', '1')
      .attr('x', d => this.xScale(d[xProp]))
      .attr('y', d => this.yScale(d[yProp]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[yProp]))
  }

  renderChart =()=>{

    const { initialWidth, initialHeight, margin, title, titleFontSize, xLabel, yLabel, labelFontSize } = this.props

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