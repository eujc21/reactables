import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import isEqual from 'lodash/isEqual'

let Margins = {
  top: 75,
  right: 75,
  bottom: 75,
  left: 75
};

export class TrajectoryChart extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string
  }

  static defaultProps = {
    data: [],
    width: 1600,
    height: 1000
  }

  componentWillUpdate(prevProps, prevState){
    if(!isEqual(this.props.data, prevProps.data)){
      d3.select(this.chartContainer).selectAll('svg').remove()
      this.renderChart()
    }
  }

  componentDidMount(){

    const { data, width, height, title, xLabel, yLabel } = this.props

    if(!title || title === ''){
      Margins.top = 0;
    }

    /*----------- Create Main SVG --------------*/

    let svg = d3.select("#chart").append("svg:svg")
      .attr("width", width)
      .attr("height", height);


    /*--------------- Create Scale --------------*/

    // Extent iterators
    function xAmounts(d) {
      return d.year
    }

    function yAmounts(d) {
      return d.sale
    }

    //extract max and min for x & y
    let xDomain = d3.extent(data, xAmounts);
    let yDomain = d3.extent(data, yAmounts);

    xDomain = [xDomain[0] - 3, xDomain[1] + 3];
    yDomain = [yDomain[0] - 50, yDomain[1] + 50];

    // scale (the margins used might need changing)
    const xScale = d3.scaleLinear()
      .range([Margins.left, width - Margins.right])
      .domain(xDomain);

    const yScale = d3.scaleLinear()
      .range([height - Margins.bottom, Margins.top])
      .domain(yDomain);


    /*----------------- Create Axes -----------------*/

    // axis creation
    const xAxis = d3.axis(xScale)

    const yAxis = d3.axis(yScale)
      .orient('left');

    // create secondary dotted y Axes
    const yDotted = d3.svg.axis()
      .scale(yScale)
      .tickSize(width)
      .orient('right');

    // apply x axis
    svg.append("svg:g")
      .attr('transform', `translate(0, ${ height - Margins.bottom })`)
      .attr('class', 'x axis')
      .call(xAxis);

    // apply y axis
    svg.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${ Margins.left }, 0)`)
      .call(yAxis);

    // apply dotted y axis
    let gy = svg.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${ Margins.left }, 0)`)
      .call(yDotted);

    gy.selectAll("g").filter((d) => {
      return d;
    })
    // 'minor' class defined in css
      .classed('minor', true);

    /*---------------- Create Points -------------*/

    //generate colors
    const color = d3.scale.category20();

    // generate points
    svg.selectAll('circle').data(data).enter()
      .append('svg:circle')
      .attr('r', (d)=> {
        let x = d.sale / 100;
        return Math.pow(x, 3)
      })
      .attr('cx', d => {
        return xScale(d.year)
      })
      .attr('cy', d => {
        return yScale(d.sale)
      })

      //apply colors
      .attr('fill', (d, i) => {
        return color(i)
      })

      //add click event
      .on('click', d => {
        //change page
        document.location.href = d.url;
        d3.event.stopPropagation();
      });


    /*------------ Create Arrow Marker -------------*/

    svg.append("svg:defs").selectAll("marker")
      .data(["arrow"])
      .enter().append("svg:marker")
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");


    /*---- Create Lines - Apply Scale - Append Arrow ----*/

    data.map(d => {
      svg.append('svg:line')
        .attr('x1', xScale(d.year))
        .attr('y1', yScale(d.sale))
        .attr('x2', xScale(d.year + 2))
        .attr('y2', yScale(d.sale + 10))
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
        // append the created arrow
        .attr("class", "link arrow")
        .attr("marker-end", "url(#arrow)");
    });


    /*----- Title & Labels --------*/

    //title
    if(title){
      svg.append('svg:text')
        .attr('x', (width / 2) + Margins.left)
        .attr('y', Margins.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('text-decoration', 'underline')
        .text(title);
    }


    //x label
    svg.append('svg:text')
      .attr('x', (width / 2) + Margins.left)
      .attr('transform', `translate(0, ${ height - (Margins.bottom / 2) })`)
      .attr('class', 'x axis')
      .text(xLabel);

    //y label
    svg.append('svg:text')
      .attr('transform', `translate(${ Margins.left / 2 }, ${ height / 2})rotate(-90)`)
      .text(yLabel);
  }

  render() {
    return (
      <div id="chart" />
    )

  }
}
