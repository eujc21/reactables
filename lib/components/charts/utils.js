'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeResponsive = makeResponsive;
exports.appendTitle = appendTitle;
exports.appendXLabel = appendXLabel;
exports.appendYLabel = appendYLabel;
exports.rotateTicks = rotateTicks;

var _d = require('d3');

function generateGUID() {
  var d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
}

function makeResponsive(svg) {
  // get container + svg aspect ratio
  var container = (0, _d.select)(svg.node().parentNode);

  var width = parseInt(svg.style("width"));
  var height = parseInt(svg.style("height"));
  var aspect = width / height;

  svg.attr("viewBox", '0 0 ' + width + ' ' + height).attr("preserveAspectRatio", "xMinYMid").call(resize);

  (0, _d.select)(window).on("resize." + generateGUID(), resize);

  // get width of container and resize svg to fit it
  function resize() {

    var containerWidth = parseInt(container.style("width"));
    //let containerHeight = parseInt(container.style("height"))

    svg.attr("width", containerWidth);
    svg.attr("height", containerWidth / aspect);
  }
}

function appendTitle(title) {}

function appendXLabel(label) {}

function appendYLabel(label) {}

function rotateTicks() {}