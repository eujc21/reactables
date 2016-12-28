import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'
import { makeResponsive } from './utils'

//TODO: Add Props: margin, xTicks, yTicks

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
    xTicksAngled: PropTypes.bool,
    shouldShowGrid: PropTypes.bool,
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
    lineColors: ['#000000'],
    backgroundColor: '',
    title: '',
    xLabel: '',
    yLabel: '',
    tickFontSize: 5,
    labelFontSize: 5,
    titleFontSize: 5,
    xTicksAngled: false,
    shouldShowGrid: false,
    margin: {
      top: 20,
      right: 20,
      bottom: 35,
      left: 35
    }
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

  handlePointClick =(set, d, i)=>{
    if(!this.props.onClick)
      return

    this.props.onClick(set, d, i)
  }

  renderChart =()=>{
    const { data, xProp, yProp, xLabel, yLabel, title, tickFontSize, labelFontSize, titleFontSize, lineColors, initialWidth, initialHeight, isResponsive, xTicksAngled, shouldShowGrid, margin } = this.props


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

    let yAxis = d3.axisLeft(yScale)
      .tickSize(5)

    svg
      .append('g')
      .call(yAxis)
      .style('font-size', `${tickFontSize}px`)
      .style('font-weight', '100')
      .style('stroke-width', 0.5)

    // svg
    //   .append('g')
    //   .call(d3.axisLeft(yScale))
    //   .style('font-size', `${tickFontSize}px`)


    /* X Scale and Axis */
    let xScale = d3.scaleTime()
      .domain([
        d3.min(data, dataset => d3.min(dataset.values, d => d[xProp])),
        d3.max(data, dataset => d3.max(dataset.values, d => d[xProp]))
      ])
      .range([0, width])

    let xAxis = d3.axisBottom(xScale)
      .tickSize(5)
      .tickPadding(5)

    /* Append and Transform X Axis */
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .style('stroke-width', 0.5)
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('font-size', `${tickFontSize}px`)
      .attr('transform', `rotate(${xTicksAngled ? -45 : 0})`);



    //append grid
    if(shouldShowGrid) {
      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(
          xAxis.tickSize(-height, 0, 0)
            .tickSizeOuter(0, 0, 0)
            .tickFormat("")
        )
        .style('stroke-width', 0.1)

      svg.append('g')
        .call(
          yAxis.tickSize(-width, 0, 0)
            .tickSizeOuter(0, 0, 0)
            .tickFormat("")
        )
        .style('stroke-width', 0.1)
    }
    //end grid


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
      .attr('d', d => {
        console.log(d.values)
        return line(d.values)
      })
      .style('stroke', (d, i) => lineColors[i])
      .style('stroke-width', 1)
      .style('fill', 'none')

    //append the area
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
    data.forEach((dataset, setIndex) =>{
      svg
        .selectAll('point')
        .data(dataset.values)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[xProp]))
        .attr('cy', d => yScale(d[yProp]))
        .attr('r', d => 1.3)
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
            .html( this.renderTooltipContent(dataset.name, d, i) )
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