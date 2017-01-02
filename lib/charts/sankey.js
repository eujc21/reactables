var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import { sankey } from 'd3-sankey';
import isEqual from 'lodash/isEqual';
import { makeResponsive, remove } from './common';
import '../styles/charts.css';

export var Sankey = function (_React$Component) {
  _inherits(Sankey, _React$Component);

  function Sankey(props) {
    _classCallCheck(this, Sankey);

    var _this = _possibleConstructorReturn(this, (Sankey.__proto__ || Object.getPrototypeOf(Sankey)).call(this, props));

    _this.renderChart = function () {
      var _this$props = _this.props,
          isResponsive = _this$props.isResponsive,
          initialWidth = _this$props.initialWidth,
          initialHeight = _this$props.initialHeight,
          data = _this$props.data,
          margin = _this$props.margin;


      if (!data) return;

      var width = initialWidth - margin.left - margin.right;
      var height = initialHeight - margin.top - margin.bottom;

      var formatNumber = d3.format(",.0f");
      var format = function format(d) {
        return formatNumber(d); //+ " TWh";
      };
      var color = d3.scaleOrdinal(d3.schemeCategory20);

      _this.svg = d3.select(_this.chartContainer).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).call(isResponsive ? makeResponsive : function () {}).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var sk = sankey().nodeWidth(15).nodePadding(30).size([width, height]);

      var path = sk.link();

      sk.nodes(data.nodes).links(data.links).layout(32);

      var link = _this.svg.append("g").selectAll(".link").data(data.links).enter().append("path").attr("class", "link").attr("d", path).style("stroke-width", function (d) {
        return Math.max(1, d.dy);
      }).sort(function (a, b) {
        return b.dy - a.dy;
      });

      link.append("title").text(function (d) {
        return d.source.name + " → " + d.target.name + "\n" + format(d.value);
      });

      var node = _this.svg.append("g").selectAll(".node").data(data.nodes).enter().append("g").attr("class", "node").attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      }).on("click", _this.props.onClick);

      // .call(d3.drag()
      //   .subject(function(d) {
      //     return d;
      //   })
      //   .on("start", function() {
      //     this.parentNode.appendChild(this);
      //   })
      //   .on("drag", dragmove))


      node.append("rect").attr("height", function (d) {
        return d.dy;
      }).attr("width", sk.nodeWidth()).style("fill", function (d) {
        return d.color = d.fillColor || color(d.name.replace(/ .*/, ""));
      }).style("stroke", function (d) {
        return d.strokeColor || d3.rgb(d.color).darker(2);
      }).append("title").text(function (d) {
        return d.name + "\n" + format(d.value);
      });

      node.append("text").attr("x", -6).attr("y", function (d) {
        return d.dy / 2;
      }).attr("dy", ".35em").attr("text-anchor", "end").attr("transform", null).text(function (d) {
        return d.name;
      }).filter(function (d) {
        return d.x < width / 2;
      }).attr("x", 6 + sk.nodeWidth()).attr("text-anchor", "start");

      // function dragmove(d) {
      //   d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
      //   sk.relayout();
      //   link.attr("d", path);
      // }
    };

    _this.svg = {};
    _this.width = 0;
    _this.height = 0;
    return _this;
  }

  _createClass(Sankey, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.data) return;

      this.renderChart();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(prevProps, prevState) {
      if (!isEqual(this.props.data, prevProps.data)) {
        remove(this.svg);
        this.renderChart();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      remove(this.svg);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        width: '100%',
        backgroundColor: this.props.backgroundColor
      };

      return React.createElement('div', {
        ref: function ref(chartContainer) {
          return _this2.chartContainer = chartContainer;
        },
        style: style });
    }
  }]);

  return Sankey;
}(React.Component);
Sankey.propTypes = {
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
};
Sankey.defaultProps = {
  initialWidth: 960,
  initialHeight: 500,
  isResponsive: false,
  margin: {
    top: 1,
    right: 1,
    bottom: 6,
    left: 1
  }
};