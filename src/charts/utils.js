import { select } from 'd3'

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

    let containerWidth = parseInt(container.style("width").slice(0, -2))
    //let containerHeight = parseInt(container.style("height"))

    svg.attr("width", containerWidth)
    svg.attr("height", containerWidth /aspect )

  }
}