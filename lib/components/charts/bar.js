'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarChart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart = exports.BarChart = function (_React$Component) {
  _inherits(BarChart, _React$Component);

  function BarChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BarChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call.apply(_ref, [this].concat(args))), _this), _this.renderChart = function () {
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
          isResponsive = _this$props.isResponsive,
          initialWidth = _this$props.initialWidth,
          initialHeight = _this$props.initialHeight;


      var margin = {
        top: 20,
        right: 20,
        bottom: 60,
        left: 50
      };

      var width = initialWidth - margin.left - margin.right;
      var height = initialHeight - margin.top - margin.bottom;

      var svg = d3.select(_this.chartContainer).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).call(isResponsive ? _utils.makeResponsive : function () {}).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      // append title
      svg.append("text").attr("transform", 'translate( ' + width / 2 + ', ' + -margin.top / 2 + ' )').style("text-anchor", "middle").style("fill", "black").style("font-size", titleFontSize + 'px').text(title);

      /* Y Scale and Axis */
      var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
        return d[yProp];
      })]).range([height, 0]);

      var yAxis = d3.axisLeft(yScale);
      svg.call(yAxis);

      /* X Scale and Axis */
      var xScale = d3.scaleBand().padding(0.2).domain(data.map(function (d) {
        return d[xProp];
      })).range([0, width]);

      var xAxis = d3.axisBottom(xScale).ticks(5).tickSize(10).tickPadding(5);

      /* Append and Transform X Axis */
      svg.append('g').attr('transform', 'translate(0, ' + height + ')').call(xAxis).selectAll('text').style('text-anchor', 'end').style('font-size', tickFontSize + 'px').attr('transform', 'rotate(-45)');

      svg.selectAll('rect').data(data).enter().append('rect').style('fill', 'd6e9c6').style('stroke', '#31708f').style('stroke-width', '1').attr('x', function (d) {
        return xScale(d[xProp]);
      }).attr('y', function (d) {
        return yScale(d[yProp]);
      }).attr('width', function (d) {
        return xScale.bandwidth();
      }).attr('height', function (d) {
        return height - yScale(d[yProp]);
      });

      // append Y label
      svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margin.left).attr("x", 0 - height / 2).attr("dy", "1em").style("text-anchor", "middle").style("fill", "black").text(yLabel);

      //append X label
      svg.append("text").attr("transform", 'translate(' + width / 2 + ' , ' + (height + margin.bottom) + ')').style("text-anchor", "middle").style("fill", "black").text(xLabel);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BarChart, [{
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

      return _react2.default.createElement('div', {
        ref: function ref(chartContainer) {
          _this2.chartContainer = chartContainer;
        },
        style: { width: '100%' } });
    }
  }]);

  return BarChart;
}(_react2.default.Component);

BarChart.propTypes = {
  data: _react.PropTypes.array.isRequired,
  xProp: _react.PropTypes.string.isRequired,
  yProp: _react.PropTypes.string.isRequired,
  initialWidth: _react.PropTypes.number,
  initialHeight: _react.PropTypes.number,
  isResponsive: _react.PropTypes.bool,
  title: _react.PropTypes.string,
  xLabel: _react.PropTypes.string,
  yLabel: _react.PropTypes.string,
  tickFontSize: _react.PropTypes.number,
  labelFontSize: _react.PropTypes.number,
  titleFontSize: _react.PropTypes.number
};
BarChart.defaultProps = {
  initialWidth: 960,
  initialHeight: 500,
  isResponsive: false,
  title: '',
  xLabel: '',
  yLabel: '',
  tickFontSize: 12,
  labelFontSize: 12,
  titleFontSize: 12
};