'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.initializePie = initializePie;
exports.remove = remove;
exports.generateGUID = generateGUID;
exports.makeResponsive = makeResponsive;
exports.appendTitle = appendTitle;
exports.appendXLabel = appendXLabel;
exports.appendYLabel = appendYLabel;
exports.createTooltipContainer = createTooltipContainer;
exports.renderTooltip = renderTooltip;
exports.createLegend = createLegend;

var _d = require('d3');

var _server = require('react-dom/server');

function initialize(element, GUID, initialWidth, initialHeight, margin, isResponsive) {

  return (0, _d.select)(element).append('svg').attr('width', initialWidth).attr('height', initialHeight).call(isResponsive ? function (svg) {
    return makeResponsive(svg, GUID);
  } : function () {}).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
}

function initializePie(element, GUID, initialWidth, initialHeight, margin, isResponsive) {

  return (0, _d.select)(element).append('svg').attr('width', initialWidth).attr('height', initialHeight).call(isResponsive ? function (svg) {
    return makeResponsive(svg, GUID);
  } : function () {}).append('g').attr("transform", "translate(" + initialWidth / 2 + "," + initialHeight / 2 + ")");
}

function remove(svg, GUID) {
  svg.selectAll("*").remove();
  if (GUID) (0, _d.select)(window).on("resize." + GUID, null);
}

function generateGUID() {
  var d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
}

function makeResponsive(svg, GUID) {
  // get container + svg aspect ratio
  var container = (0, _d.select)(svg.node().parentNode);

  var width = parseInt(svg.style("width"));
  var height = parseInt(svg.style("height"));
  var aspect = width / height;

  svg.attr("viewBox", '0 0 ' + width + ' ' + height).attr("preserveAspectRatio", "xMinYMid").call(resize);

  (0, _d.select)(window).on("resize." + GUID, resize);

  // get width of container and resize svg to fit it
  function resize() {

    var containerWidth = parseInt(container.style("width"));
    //let containerHeight = parseInt(container.style("height"))

    svg.attr("width", containerWidth);
    svg.attr("height", containerWidth / aspect);
  }
}

function appendTitle(svg, title, titleFontSize, width, margin) {

  if (!title) return;

  svg.append("text").attr("transform", 'translate( ' + width / 2 + ', ' + -margin.top / 2 + ' )').style("text-anchor", "middle").style("fill", "black").style("font-size", titleFontSize + 'px').text(title);
}

function appendXLabel(svg, xLabel, labelFontSize, width, height, margin) {

  if (!xLabel) return;

  svg.append("text").attr("transform", 'translate(' + width / 2 + ' , ' + (height + margin.bottom) + ')').style("text-anchor", "middle").style("fill", "black").style("font-size", labelFontSize).text(xLabel);
}

function appendYLabel(svg, yLabel, labelFontSize, height, margin) {

  if (!yLabel) return;

  svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margin.left).attr("x", 0 - height / 2).attr("dy", "1em").style("text-anchor", "middle").style("fill", "black").style("font-size", labelFontSize).text(yLabel);
}

function createTooltipContainer() {
  return (0, _d.select)("body").append("div").attr("class", "tooltip").style("opacity", 0).style("position", 'absolute').style("pointer-events", 'none');
}

function renderTooltip(tooltip, obj) {

  if (!tooltip) return;

  return (0, _server.renderToString)(tooltip(obj));
}

function createLegend() {}