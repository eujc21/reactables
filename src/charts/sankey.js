import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import { sankey } from 'd3-sankey'
import isEqual from 'lodash/isEqual'
import { makeResponsive, remove } from './common'
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
  }

  componentDidMount(){
    if(!this.props.data)
      return

    this.renderChart()
  }

  componentWillUpdate(prevProps, prevState){
    if(!isEqual(this.props.data, prevProps.data)){
      remove(this.svg)
      this.renderChart()
    }
  }

  componentWillUnmount(){
    remove(this.svg)
  }

  renderChart =()=>{
    const { isResponsive, initialWidth, initialHeight, data, margin } = this.props

    if(!data)
      return

    let width = initialWidth - margin.left - margin.right;
    let height = initialHeight - margin.top - margin.bottom;

    let formatNumber = d3.format(",.0f")
    let format = (d) => {
      return formatNumber(d); //+ " TWh";
    }
    let color = d3.scaleOrdinal(d3.schemeCategory20);

    this.svg = d3.select(this.chartContainer)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call( isResponsive ? makeResponsive : ()=>{} )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let sk = sankey()
      .nodeWidth(15)
      .nodePadding(30)
      .size([width, height]);

    let path = sk.link();

    sk
      .nodes(data.nodes)
      .links(data.links)
      .layout(32);

    let link = this.svg.append("g").selectAll(".link")
      .data(data.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", (d) => {
        return Math.max(1, d.dy);
      })
      .sort((a, b) => {
        return b.dy - a.dy;
      });

    link.append("title")
      .text(d => {
        return d.source.name + " → " + d.target.name + "\n" + format(d.value);
      });

    let node = this.svg.append("g").selectAll(".node")
      .data(data.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", (d) => {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .on("click", this.props.onClick)

    // .call(d3.drag()
    //   .subject(function(d) {
    //     return d;
    //   })
    //   .on("start", function() {
    //     this.parentNode.appendChild(this);
    //   })
    //   .on("drag", dragmove))



    node.append("rect")
      .attr("height", (d) => {
        return d.dy;
      })
      .attr("width", sk.nodeWidth())
      .style("fill", (d) => {
        return d.color = d.fillColor || color(d.name.replace(/ .*/, ""));
      })
      .style("stroke", (d) => {
        return d.strokeColor || d3.rgb(d.color).darker(2);
      })
      .append("title")
      .text((d) => {
        return d.name + "\n" + format(d.value);
      });

    node.append("text")
      .attr("x", -6)
      .attr("y", (d) => {
        return d.dy / 2;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text((d) => {
        return d.name;
      })
      .filter((d) => {
        return d.x < width / 2;
      })
      .attr("x", 6 + sk.nodeWidth())
      .attr("text-anchor", "start");

    // function dragmove(d) {
    //   d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    //   sk.relayout();
    //   link.attr("d", path);
    // }

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