import { select } from 'd3';
import { renderToString } from 'react-dom/server';

export function initialize(element, GUID, initialWidth, initialHeight, margin, isResponsive) {

  return select(element).append('svg').attr('width', initialWidth).attr('height', initialHeight).call(isResponsive ? function (svg) {
    return makeResponsive(svg, GUID);
  } : function () {}).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
}

export function remove(svg, GUID) {
  svg.selectAll("*").remove();
  if (GUID) select(window).on("resize." + GUID, null);
}

export function generateGUID() {
  var d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
}

export function makeResponsive(svg, GUID) {
  // get container + svg aspect ratio
  var container = select(svg.node().parentNode);

  var width = parseInt(svg.style("width"));
  var height = parseInt(svg.style("height"));
  var aspect = width / height;

  svg.attr("viewBox", '0 0 ' + width + ' ' + height).attr("preserveAspectRatio", "xMinYMid").call(resize);

  select(window).on("resize." + GUID, resize);

  // get width of container and resize svg to fit it
  function resize() {

    var containerWidth = parseInt(container.style("width"));
    //let containerHeight = parseInt(container.style("height"))

    svg.attr("width", containerWidth);
    svg.attr("height", containerWidth / aspect);
  }
}

export function appendTitle(svg, title, titleFontSize, width, margin) {

  if (!title) return;

  svg.append("text").attr("transform", 'translate( ' + width / 2 + ', ' + -margin.top / 2 + ' )').style("text-anchor", "middle").style("fill", "black").style("font-size", titleFontSize + 'px').text(title);
}

export function appendXLabel(svg, xLabel, labelFontSize, width, height, margin) {

  if (!xLabel) return;

  svg.append("text").attr("transform", 'translate(' + width / 2 + ' , ' + (height + margin.bottom) + ')').style("text-anchor", "middle").style("fill", "black").style("font-size", labelFontSize).text(xLabel);
}

export function appendYLabel(svg, yLabel, labelFontSize, height, margin) {

  if (!yLabel) return;

  svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margin.left).attr("x", 0 - height / 2).attr("dy", "1em").style("text-anchor", "middle").style("fill", "black").style("font-size", labelFontSize).text(yLabel);
}

export function createTooltipContainer() {
  return select("body").append("div").attr("class", "tooltip").style("opacity", 0).style("position", 'absolute').style("pointer-events", 'none');
}

export function renderTooltip(tooltip, obj) {

  if (!tooltip) return;

  return renderToString(tooltip(obj));
}