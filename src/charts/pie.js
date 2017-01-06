import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'
import { initializePie, generateGUID, remove, appendTitle, createTooltipContainer, renderTooltip } from './common'

export class PieChart extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    labelProp: PropTypes.string.isRequired,
    valueProp: PropTypes.string.isRequired,
    colors: PropTypes.array,
    initialWidth: PropTypes.number,
    initialHeight: PropTypes.number,
    isResponsive: PropTypes.bool,
    title: PropTypes.string,
    labelFontSize: PropTypes.number,
    titleFontSize: PropTypes.number,
    tooltip: PropTypes.func,
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
    colors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
    isResponsive: false,
    title: '',
    xLabel: '',
    yLabel: '',
    labelFontSize: 12,
    titleFontSize: 12,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
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

    this.GUID = generateGUID()
    this.svg = initializePie(this.chartContainer, this.GUID, initialWidth, initialHeight, margin, isResponsive)

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


  renderChart =()=>{

    const { data, initialWidth, initialHeight, tooltip, margin, title, titleFontSize, labelFontSize, labelProp, valueProp, colors } = this.props

    // Calculate width and height
    this.width = initialWidth - margin.left - margin.right
    this.height = initialHeight - margin.top - margin.bottom
    this.radius = Math.min(this.width, this.height) / 2

    // common
    appendTitle(this.svg, title, titleFontSize, this.width, margin)

    const color = d3.scaleOrdinal()
      .range(colors);

    const arc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(0)

    const labelArc = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40)

    const pie = d3.pie()
      .sort(null)
      .value(d => d[valueProp])

    let g = this.svg
      .selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc')

    // Define the div for the tooltip
    let tooltipContainer = createTooltipContainer()

    g.append('path')
      .attr('d', arc)
      // TODO: Add custom color with fill color
      .style('fill', (d) => d.data.fillColor || color(d.data[labelProp]))
      .on("mouseover", (d) => {
        tooltipContainer.transition()
          .duration(200)
          .style("opacity", 1)

        tooltipContainer
          .html(renderTooltip(tooltip, {data: d.data, index: d.index}) )
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px")
      })

      .on("mouseout", d => {
        tooltipContainer.transition()
          .duration(500)
          .style("opacity", 0);
      })

    g.append('text')
      .attr('transform', (d)=> `translate(${labelArc.centroid(d)})`)
      .attr('dy', '.35em')
      .text((d)=> d.data[labelProp])
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