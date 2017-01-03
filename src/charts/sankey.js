import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import { sankey } from 'd3-sankey'
import isEqual from 'lodash/isEqual'
import { initialize, remove } from './common'
import '../styles/charts.css'


export class Sankey extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    initialWidth: PropTypes.number,
    initialHeight: PropTypes.number,
    isResponsive: PropTypes.bool,
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
    margin: {
      top: 1,
      right: 1,
      bottom: 6,
      left: 1
    }
  }

  constructor(props){
    super(props)

    this.svg = {}
    this.width = 0
    this.height = 0

    let formatNumber = d3.format(",.0f")
    this.formatter = (d) => formatNumber(d) //+ " TWh";
  }

  componentDidMount(){
    if(!this.props.data)
      return

    const { initialWidth, initialHeight, margin, isResponsive} = this.props

    // create base svg
    this.svg = initialize(this.chartContainer, initialWidth, initialHeight, margin, isResponsive)

    this.renderChart()
  }

  componentWillUpdate(prevProps){
    if(!isEqual(this.props.data, prevProps.data)){
      remove(this.svg)
      this.renderChart()
    }
  }

  componentWillUnmount(){
    remove(this.svg)
  }

  initializeSankey =()=>{
    const { data } = this.props
    this.sankey = sankey()
      .nodeWidth(15)
      .nodePadding(30)
      .size([this.width, this.height])
      .nodes(data.nodes)
      .links(data.links)
      .layout(32)
  }

  appendNodes =()=>{

    const { data, onClick } = this.props

    let color = d3.scaleOrdinal(d3.schemeCategory20)

    let node = this.svg
      .append("g")
      .selectAll(".node")
      .data(data.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
      .on("click", onClick)

    // .call(d3.drag()
    //   .subject(function(d) {
    //     return d;
    //   })
    //   .on("start", function() {
    //     this.parentNode.appendChild(this);
    //   })
    //   .on("drag", dragmove))

    node.append("rect")
      .attr("height", (d) => d.dy)
      .attr("width", this.sankey.nodeWidth())
      .style("fill", (d) => d.color = d.fillColor || color(d.name.replace(/ .*/, "")))
      .style("stroke", (d) => d.strokeColor || d3.rgb(d.color).darker(2))
      .append("title")
      .text((d) => d.name + "\n" + this.formatter(d.value))

    node.append("text")
      .attr("x", -6)
      .attr("y", (d) => d.dy / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text((d) => d.name)
      .filter((d) => d.x < this.width / 2)
      .attr("x", 6 + this.sankey.nodeWidth())
      .attr("text-anchor", "start")

    // function dragmove(d) {
    //   d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    //   sk.relayout();
    //   link.attr("d", path);
    // }
  }

  appendLinks =()=>{
    const { data } = this.props

    let path = this.sankey.link()

    let link = this.svg
      .append("g")
      .selectAll(".link")
      .data(data.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", (d) => Math.max(1, d.dy))
      .sort((a, b) => b.dy - a.dy)

    link.append("title")
      .text(d => d.source.name + " → " + d.target.name + "\n" + this.formatter(d.value))
  }

  renderChart =()=>{
    const { initialWidth, initialHeight, data, margin } = this.props

    if(!data)
      return

    this.width = initialWidth - margin.left - margin.right
    this.height = initialHeight - margin.top - margin.bottom

    this.initializeSankey()
    this.appendNodes()
    this.appendLinks()

  }

  render(){
    const style = {
      width: '100%',
      backgroundColor: this.props.backgroundColor,
    }

    return(
      <div
        ref={ chartContainer => this.chartContainer = chartContainer }
        style={ style }/>
    )
  }
}