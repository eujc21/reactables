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

var _common = require('./common');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart = exports.BarChart = function (_React$Component) {
  _inherits(BarChart, _React$Component);

  function BarChart(props) {
    _classCallCheck(this, BarChart);

    var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props));

    _this.appendXAxis = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          xProp = _this$props.xProp,
          tickFontSize = _this$props.tickFontSize;


      _this.xScale = d3.scaleBand().padding(0.2).domain(data.map(function (d) {
        return d[xProp];
      })).range([0, _this.width]);

      var xAxis = d3.axisBottom(_this.xScale).tickSize(tickFontSize).tickPadding(5);

      _this.svg.append('g').attr('transform', 'translate(0, ' + _this.height + ')').call(xAxis).selectAll('text').style('text-anchor', 'end').style('font-size', tickFontSize + 'px').attr('transform', 'rotate(-45)');
    };

    _this.appendYAxis = function () {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          yProp = _this$props2.yProp,
          tickFontSize = _this$props2.tickFontSize;


      _this.yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
        return d[yProp];
      })]).range([_this.height, 0]);

      var yAxis = d3.axisLeft(_this.yScale).tickSize(tickFontSize).tickPadding(5);

      _this.svg.append('g').call(yAxis).style('font-size', tickFontSize + 'px').style('font-weight', '100').style('stroke-width', 0.5);
    };

    _this.appendBars = function () {
      var _this$props3 = _this.props,
          data = _this$props3.data,
          xProp = _this$props3.xProp,
          yProp = _this$props3.yProp,
          tooltip = _this$props3.tooltip;


      var tooltipContainer = (0, _common.createTooltipContainer)();

      _this.svg.selectAll('rect').data(data).enter().append('rect').style('fill', 'd6e9c6').style('stroke', '#31708f').style('stroke-width', '1').attr('x', function (d) {
        return _this.xScale(d[xProp]);
      }).attr('y', function (d) {
        return _this.yScale(d[yProp]);
      }).attr('width', function (d) {
        return _this.xScale.bandwidth();
      }).attr('height', function (d) {
        return _this.height - _this.yScale(d[yProp]);
      }).on("mouseover", function (d, i) {
        tooltipContainer.transition().duration(200).style("opacity", 1);

        tooltipContainer.html((0, _common.renderTooltip)(tooltip, { data: d, index: i })).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px");
      }).on("mouseout", function (d) {
        tooltipContainer.transition().duration(500).style("opacity", 0);
      });
    };

    _this.renderChart = function () {
      var _this$props4 = _this.props,
          initialWidth = _this$props4.initialWidth,
          initialHeight = _this$props4.initialHeight,
          margin = _this$props4.margin,
          title = _this$props4.title,
          titleFontSize = _this$props4.titleFontSize,
          xLabel = _this$props4.xLabel,
          yLabel = _this$props4.yLabel,
          labelFontSize = _this$props4.labelFontSize;

      // Calculate width and height

      _this.width = initialWidth - margin.left - margin.right;
      _this.height = initialHeight - margin.top - margin.bottom;

      // common
      (0, _common.appendTitle)(_this.svg, title, titleFontSize, _this.width, margin);
      (0, _common.appendXLabel)(_this.svg, xLabel, labelFontSize, _this.width, _this.height, margin);
      (0, _common.appendYLabel)(_this.svg, yLabel, labelFontSize, _this.height, margin);

      // chart
      _this.appendXAxis();
      _this.appendYAxis();
      _this.appendBars();
    };

    _this.svg = {};
    _this.width = 0;
    _this.height = 0;
    return _this;
  }

  _createClass(BarChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          initialWidth = _props.initialWidth,
          initialHeight = _props.initialHeight,
          margin = _props.margin,
          isResponsive = _props.isResponsive;


      this.GUID = (0, _common.generateGUID)();
      this.svg = (0, _common.initialize)(this.chartContainer, this.GUID, initialWidth, initialHeight, margin, isResponsive);

      this.renderChart();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(prevProps) {
      if (!(0, _isEqual2.default)(this.props, prevProps)) {
        (0, _common.remove)(this.svg);
        this.renderChart();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _common.remove)(this.svg, this.GUID);
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
        style: style,
        ref: function ref(chartContainer) {
          return _this2.chartContainer = chartContainer;
        }
      });
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
  titleFontSize: _react.PropTypes.number,
  tooltip: _react.PropTypes.func,
  colors: _react.PropTypes.array,
  margin: _react.PropTypes.shape({
    top: _react.PropTypes.number,
    right: _react.PropTypes.number,
    bottom: _react.PropTypes.number,
    left: _react.PropTypes.number
  })
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
  titleFontSize: 12,
  margin: {
    top: 20,
    right: 20,
    bottom: 60,
    left: 50
  }
};