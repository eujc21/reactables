import { select } from 'd3'

export function initialize(element, initialWidth, initialHeight, margin, isResponsive){

  const svg = select(element)
    .append('svg')
    .attr('width', initialWidth)
    .attr('height', initialHeight)
    .call( isResponsive ? makeResponsive : ()=>{} )
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  return svg
}

export function remove(svg){
  svg.selectAll("*").remove()
}

function generateGUID() {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  })
}


export function makeResponsive (svg){
  // get container + svg aspect ratio
  let container = select(svg.node().parentNode)

  let width = parseInt(svg.style("width"))
  let height = parseInt(svg.style("height"))
  let aspect = width / height

  svg.attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMid")
    .call(resize);

  select(window).on("resize." + generateGUID(), resize)

  // get width of container and resize svg to fit it
  function resize() {

    let containerWidth = parseInt(container.style("width"))
    //let containerHeight = parseInt(container.style("height"))

    svg.attr("width", containerWidth)
    svg.attr("height", containerWidth /aspect )

  }
}

export function appendTitle(svg, title, titleFontSize, width, margin){

  if(!title)
    return

  svg.append("text")
    .attr("transform", `translate( ${ width / 2 }, ${ -margin.top / 2 } )`)
    .style("text-anchor", "middle")
    .style("fill", "black")
    .style("font-size", `${titleFontSize}px`)
    .text(title);
}

export function appendXLabel(svg, xLabel, labelFontSize, width, height, margin){

  if(!xLabel)
    return

  svg.append("text")
    .attr("transform", `translate(${ width /2 } , ${ height + margin.bottom })`)
    .style("text-anchor", "middle")
    .style("fill", "black")
    .style("font-size", labelFontSize)
    .text(xLabel);
}

export function appendYLabel(svg, yLabel, labelFontSize, height, margin){

  if(!yLabel)
    return

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "black")
    .style("font-size", labelFontSize)
    .text(yLabel);
}