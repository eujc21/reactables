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
          xProp = _this$props.xProp,
          tickFontSize = _this$props.tickFontSize;


      _this.xScale = d3.scaleBand().padding(0.2).domain(_this.data.map(function (d) {
        return d[xProp];
      })).range([0, _this.width]);

      var xAxis = d3.axisBottom(_this.xScale).tickSize(tickFontSize).tickPadding(5);

      _this.svg.append('g').attr('transform', 'translate(0, ' + _this.height + ')').call(xAxis).selectAll('text').style('text-anchor', 'end').style('font-size', tickFontSize + 'px').attr('transform', 'rotate(-45)');
    };

    _this.appendYAxis = function () {
      var tickFontSize = _this.props.tickFontSize;


      _this.yScale = d3.scaleLinear().domain([0, d3.max(_this.data, function (d) {
        return d.total;
      })]).range([_this.height, 0]);

      var yAxis = d3.axisLeft(_this.yScale).tickSize(tickFontSize).tickPadding(5);

      _this.svg.append('g').call(yAxis).style('font-size', tickFontSize + 'px').style('font-weight', '100').style('stroke-width', 0.5);
    };

    _this.appendBars = function () {
      var _this$props2 = _this.props,
          xProp = _this$props2.xProp,
          yProp = _this$props2.yProp,
          colors = _this$props2.colors,
          tooltip = _this$props2.tooltip;


      var yKeys = Array.isArray(yProp) ? yProp : [yProp];

      var barColors = d3.scaleOrdinal().range(colors).domain(yKeys);

      _this.svg.append('g').selectAll('g').data(d3.stack().keys(yKeys)(_this.data)).enter().append('g').style('fill', function (d) {
        return barColors(d.key);
      }).selectAll('rect').data(function (d) {
        return d;
      }).enter().append('rect').attr('x', function (d) {
        return _this.xScale(d.data[xProp]);
      }).attr('y', function (d) {
        return _this.yScale(d[1]);
      }).attr('height', function (d) {
        return _this.yScale(d[0]) - _this.yScale(d[1]);
      }).attr('width', function (d) {
        return _this.xScale.bandwidth();
      })

      /* Tooltip */

      .on("mouseover", function (d, i) {
        _this.tooltipContainer.transition().duration(200).style("opacity", 1);

        _this.tooltipContainer.html((0, _common.renderTooltip)(tooltip, { data: d.data, index: i })).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px");
      }).on("mouseout", function (d) {
        _this.tooltipContainer.transition().duration(500).style("opacity", 0);
      });

      _this.appendLegend(yKeys, barColors);
    };

    _this.renderChart = function () {
      var _this$props3 = _this.props,
          data = _this$props3.data,
          yProp = _this$props3.yProp,
          initialWidth = _this$props3.initialWidth,
          initialHeight = _this$props3.initialHeight,
          margin = _this$props3.margin,
          title = _this$props3.title,
          titleFontSize = _this$props3.titleFontSize,
          xLabel = _this$props3.xLabel,
          yLabel = _this$props3.yLabel,
          labelFontSize = _this$props3.labelFontSize;

      // Calculate width and height

      _this.width = initialWidth - margin.left - margin.right;
      _this.height = initialHeight - margin.top - margin.bottom;

      // Map data totals
      var yKeys = Array.isArray(yProp) ? yProp : [yProp];

      _this.data = data.map(function (d) {
        d.total = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = yKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            d.total += d[key] || 0;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return d;
      });

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
    _this.data = [];
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
      this.tooltipContainer = (0, _common.createTooltipContainer)();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!(0, _isEqual2.default)(this.props, prevProps)) {
        (0, _common.remove)(this.svg);
        this.renderChart();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _common.remove)(this.svg, this.GUID);
      this.tooltipContainer.remove();
    }
  }, {
    key: 'appendLegend',
    value: function appendLegend(keys, colors) {
      var hasLegend = this.props.hasLegend;


      if (!hasLegend) return;

      var legend = this.svg.append("g").attr("font-family", "sans-serif").attr("font-size", 12).attr("text-anchor", "end").selectAll("g").data(keys.slice().reverse()).enter().append("g").attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

      legend.append("rect").attr("x", this.width + this.props.margin.right - 40).attr("width", 19).attr("height", 19).attr("fill", colors);

      legend.append("text").attr("x", this.width + this.props.margin.right - 45).attr("y", 12).attr("dy", "0.32em").text(function (d) {
        return d;
      });
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
  yProp: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]).isRequired,
  initialWidth: _react.PropTypes.number,
  initialHeight: _react.PropTypes.number,
  isResponsive: _react.PropTypes.bool,
  hasLegend: _react.PropTypes.bool,
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
  hasLegend: false,
  title: '',
  xLabel: '',
  yLabel: '',
  tickFontSize: 12,
  labelFontSize: 12,
  titleFontSize: 12,
  colors: ["#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
  margin: {
    top: 20,
    right: 20,
    bottom: 60,
    left: 50
  }
};