import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'
import { makeResponsive } from './utils'

export class BarChart extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    xProp: PropTypes.string.isRequired,
    yProp: PropTypes.string.isRequired
  }

  componentDidMount(){
    this.renderChart()
  }

  componentWillUpdate(prevProps, prevState){
    if(!isEqual(this.props.data, prevProps.data))
      this.renderChart()
  }

  renderChart =()=>{
    const { data, xProp, yProp, xLabel, yLabel, title, alignTitle } = this.props

    let margin = {
      top: 20,
      right: 20,
      bottom: 60,
      left: 50
    }

    let width = 400 - margin.left - margin.right
    let height = 565 - margin.top - margin.bottom

    let svg = d3.select(this.chartContainer)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', 'yellow')
      .call(makeResponsive)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // append title
    svg.append("text")
      .attr("transform", `translate( ${width/2}, ${-margin.top / 2 } )`)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text("Title");


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
      .tickPadding(5);

    /* Append and Transform X Axis */
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
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
      .text("Value");


    //append X label
    svg.append("text")
      .attr("transform", `translate(${width/2} , ${height + margin.bottom})`)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text("Date");


  }

  render(){
    return(
      <div
        ref={(chartContainer) => { this.chartContainer = chartContainer }}
        style={{ width: '100%', height: '100%' }} />
    )
  }
}