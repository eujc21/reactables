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

  svg.attr("viewBox", "0 0 " + width + " " + height)
    .attr("perserveAspectRatio", "xMinYMid")
    .call(resize);

  select(window).on("resize." + generateGUID(), resize);

  // get width of container and resize svg to fit it
  function resize() {

    let targetWidth = parseInt(container.style("width"));
    let containerHeight = parseInt(container.style("height"))

    console.log(targetWidth)
    svg.attr("width", targetWidth);
    svg.attr("height", containerHeight);
  }
}

export function appendTitle(title){

}

export function appendXLabel(label){

}

export function appendYLabel(label){

}

export function rotateTicks(){

}