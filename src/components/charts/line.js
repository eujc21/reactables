import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'
import { makeResponsive } from './utils'

export class LineChart extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    xProp: PropTypes.string.isRequired,
    yProp: PropTypes.string.isRequired
  }

  static defaultProps = {
    initialWidth: 400,
    initialHeight: 300
  }

  componentDidMount(){
    this.renderChart()
  }

  componentWillUpdate(prevProps, prevState){
    if(!isEqual(this.props.data, prevProps.data))
      this.renderChart()
  }

  renderChart =()=>{
    const { data, xProp, yProp, xLabel, yLabel, title, alignTitle, initialWidth, initialHeight } = this.props

    let margin = {
      top: 10,
      right: 20,
      bottom: 50,
      left: 30
    };

    let width = initialWidth - margin.left - margin.right
    let height = initialHeight - margin.top - margin.bottom

    let svg = d3.select(this.chartContainer)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call(makeResponsive)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)


    data.forEach(dataset => {
      dataset.values.forEach(d => {
        d[xProp] = Date.parse(d[xProp]);
        d[yProp] = d[yProp];
      })
    })


    let xScale = d3.scaleTime()
      .domain([
        d3.min(data, dataset => d3.min(dataset.values, d => d[xProp])),
        d3.max(data, dataset => d3.max(dataset.values, d => d[xProp]))
      ])
      .range([0, width])

    let xAxis = d3.axisBottom(xScale)
      .tickSize(10)
      .tickPadding(5);


    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    let yScale = d3.scaleLinear()
      .domain([
        d3.min(data, dataset => d3.min(dataset.values, d => d[yProp])),
        d3.max(data, dataset => d3.max(dataset.values, d => d[yProp]))
      ])
      .range([height, 0])

    svg
      .append('g')
      .call(d3.axisLeft(yScale))

    let area = d3.area()
      .x(d => xScale(d[xProp]))
      .y0(height)
      .y1(d => yScale(d[yProp]))
      .curve(d3.curveCatmullRom.alpha(0.5))

    let line = d3.line()
      .x(d => xScale(d[xProp]))
      .y(d => yScale(d[yProp]))
      //.curve(d3.curveCatmullRom.alpha(0.5))


    //draw the line
    svg
      .selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
      .style('stroke-width', 1)
      .style('fill', 'none')



    /*===============*/
    /* Append Points */
    /*===============*/


    data.forEach(dataset =>{
      console.log(dataset)
      svg
        .selectAll('circle')
        .data(dataset.values)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[xProp]))
        .attr('cy', d => yScale(d[yProp]))
        .attr('r', d => 2)
        .style('fill', 'black')
    })


    /*===============*/
    /*   Area Fill   */
    /*===============*/




  }

  render(){
    return(
      <div
        ref={(chartContainer) => { this.chartContainer = chartContainer }}
        id="somechart"
        className={ 'chart' }
        style={{ width: '100%', height: '100%' }} />
    )
  }
}