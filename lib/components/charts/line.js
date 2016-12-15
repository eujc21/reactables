'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _utils = require('./utils');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineChart = exports.LineChart = function (_React$Component) {
  _inherits(LineChart, _React$Component);

  function LineChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LineChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call.apply(_ref, [this].concat(args))), _this), _this.handlePointClick = function (set, d, i) {
      if (!_this.props.onClick) return;

      _this.props.onClick(set, d, i);
    }, _this.renderChart = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          xProp = _this$props.xProp,
          yProp = _this$props.yProp,
          xLabel = _this$props.xLabel,
          yLabel = _this$props.yLabel,
          title = _this$props.title,
          tickFontSize = _this$props.tickFontSize,
          labelFontSize = _this$props.labelFontSize,
          titleFontSize = _this$props.titleFontSize,
          lineColors = _this$props.lineColors,
          initialWidth = _this$props.initialWidth,
          initialHeight = _this$props.initialHeight,
          isResponsive = _this$props.isResponsive,
          xTicksAngled = _this$props.xTicksAngled,
          shouldShowGrid = _this$props.shouldShowGrid;


      var margin = {
        top: 20,
        right: 20,
        bottom: 35,
        left: 35
      };

      var width = initialWidth - margin.left - margin.right;
      var height = initialHeight - margin.top - margin.bottom;

      var svg = d3.select(_this.chartContainer).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).call(isResponsive ? _utils.makeResponsive : function () {}).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      // append title
      svg.append("text").attr("transform", 'translate( ' + width / 2 + ', ' + -margin.top / 2 + ' )').style("text-anchor", "middle").style("fill", "black").style("font-size", titleFontSize + 'px').text(title);

      data.forEach(function (dataset) {
        dataset.values.forEach(function (d) {
          d[xProp] = Date.parse(d[xProp]);
          d[yProp] = d[yProp];
        });
      });

      /* Y Scale and Axis*/
      var yScale = d3.scaleLinear().domain([d3.min(data, function (dataset) {
        return d3.min(dataset.values, function (d) {
          return d[yProp];
        });
      }), d3.max(data, function (dataset) {
        return d3.max(dataset.values, function (d) {
          return d[yProp];
        });
      })]).range([height, 0]);

      var yAxis = d3.axisLeft(yScale).tickSize(5);

      svg.append('g').call(yAxis).style('font-size', tickFontSize + 'px').style('font-weight', '100').style('stroke-width', 0.5);

      // svg
      //   .append('g')
      //   .call(d3.axisLeft(yScale))
      //   .style('font-size', `${tickFontSize}px`)


      /* X Scale and Axis */
      var xScale = d3.scaleTime().domain([d3.min(data, function (dataset) {
        return d3.min(dataset.values, function (d) {
          return d[xProp];
        });
      }), d3.max(data, function (dataset) {
        return d3.max(dataset.values, function (d) {
          return d[xProp];
        });
      })]).range([0, width]);

      var xAxis = d3.axisBottom(xScale).tickSize(5).tickPadding(5);

      /* Append and Transform X Axis */
      svg.append('g').attr('transform', 'translate(0, ' + height + ')').call(xAxis).style('stroke-width', 0.5).selectAll('text').style('text-anchor', 'end').style('font-size', tickFontSize + 'px').attr('transform', 'rotate(' + (xTicksAngled ? -45 : 0) + ')');

      //append grid
      if (shouldShowGrid) {
        svg.append('g').attr('transform', 'translate(0, ' + height + ')').call(xAxis.tickSize(-height, 0, 0).tickSizeOuter(0, 0, 0).tickFormat("")).style('stroke-width', 0.1);

        svg.append('g').call(yAxis.tickSize(-width, 0, 0).tickSizeOuter(0, 0, 0).tickFormat("")).style('stroke-width', 0.1);
      }
      //end grid


      var area = d3.area().x(function (d) {
        return xScale(d[xProp]);
      }).y0(height).y1(function (d) {
        return yScale(d[yProp]);
      }).curve(d3.curveCatmullRom.alpha(0.5));

      var line = d3.line().x(function (d) {
        return xScale(d[xProp]);
      }).y(function (d) {
        return yScale(d[yProp]);
      }).curve(d3.curveCatmullRom.alpha(0.5));

      //draw the line
      svg.selectAll('.line').data(data).enter().append('path').attr('class', 'line').attr('d', function (d) {
        return line(d.values);
      }).style('stroke', function (d, i) {
        return lineColors[i];
      }).style('stroke-width', 1).style('fill', 'none');

      //append the area
      svg.selectAll('.area').data(data).enter().append('path').attr('d', function (d) {
        return area(d.values);
      }).style('fill', function (d, i) {
        return lineColors[i];
      }).style('fill-opacity', 0.5); //give fill color for area fill


      /*================*/
      /* Create Tooltip */
      /*================*/

      // Define the div for the tooltip
      var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0).style("position", 'absolute').style("pointer-events", 'none');

      /*===============*/
      /* Append Points */
      /*===============*/
      data.forEach(function (dataset, setIndex) {
        svg.selectAll('point').data(dataset.values).enter().append('circle').attr('cx', function (d) {
          return xScale(d[xProp]);
        }).attr('cy', function (d) {
          return yScale(d[yProp]);
        }).attr('r', function (d) {
          return 1.3;
        }).style('fill', lineColors[setIndex]).style('cursor', _this.props.onClick ? 'pointer' : null)

        /*==============*/
        /* Call Tooltip */
        /*==============*/

        .on("mouseover", function (d, i) {

          div.transition().duration(200).style("opacity", .9);

          div.html(_this.renderTooltipContent(dataset.name, d, i)).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px");
        }).on("mouseout", function (d) {
          div.transition().duration(500).style("opacity", 0);
        })

        /*================*/
        /* On Point Click */
        /*================*/

        .on("click", function (d, i) {
          return _this.handlePointClick(dataset.name, d, i);
        });
      });

      // append Y label
      svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margin.left).attr("x", 0 - height / 2).attr("dy", "1em").style("text-anchor", "middle").style("fill", "black").style("font-size", labelFontSize).text(yLabel);

      //append X label
      svg.append("text").attr("transform", 'translate(' + width / 2 + ' , ' + (height + margin.bottom) + ')').style("text-anchor", "middle").style("fill", "black").style("font-size", labelFontSize).text(xLabel);
    }, _this.renderTooltipContent = function (d, i) {
      var tooltip = _this.props.tooltip;


      if (!tooltip) return;

      return (0, _server.renderToString)(tooltip(d, i));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LineChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderChart();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(prevProps, prevState) {
      if (!(0, _isEqual2.default)(this.props.data, prevProps.data)) {
        d3.select(this.chartContainer).selectAll('svg').remove();
        this.renderChart();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        width: '100%',
        backgroundColor: this.props.backgroundColor
      };

      return _react2.default.createElement('div', {
        ref: function ref(chartContainer) {
          _this2.chartContainer = chartContainer;
        },
        className: 'chart',
        style: style });
    }
  }]);

  return LineChart;
}(_react2.default.Component);

LineChart.propTypes = {
  data: _react.PropTypes.array.isRequired,
  xProp: _react.PropTypes.string.isRequired,
  yProp: _react.PropTypes.string.isRequired,
  initialWidth: _react.PropTypes.number,
  initialHeight: _react.PropTypes.number,
  isResponsive: _react.PropTypes.bool,
  lineColors: _react.PropTypes.array,
  backgroundColor: _react.PropTypes.string,
  title: _react.PropTypes.string,
  xLabel: _react.PropTypes.string,
  yLabel: _react.PropTypes.string,
  tickFontSize: _react.PropTypes.number,
  labelFontSize: _react.PropTypes.number,
  titleFontSize: _react.PropTypes.number,
  onClick: _react.PropTypes.func,
  tooltip: _react.PropTypes.func,
  xTicksAngled: _react.PropTypes.bool,
  shouldShowGrid: _react.PropTypes.bool
};
LineChart.defaultProps = {
  initialWidth: 960,
  initialHeight: 500,
  isResponsive: false,
  lineColors: ['#000000'],
  backgroundColor: '',
  title: '',
  xLabel: '',
  yLabel: '',
  tickFontSize: 5,
  labelFontSize: 5,
  titleFontSize: 5,
  xTicksAngled: false,
  shouldShowGrid: false
};