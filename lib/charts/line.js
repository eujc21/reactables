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

var _common = require('./common');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineChart = exports.LineChart = function (_React$Component) {
  _inherits(LineChart, _React$Component);

  function LineChart(props) {
    _classCallCheck(this, LineChart);

    var _this = _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this, props));

    _this.handlePointClick = function (set, d, i) {
      if (!_this.props.onClick) return;

      _this.props.onClick(set, d, i);
    };

    _this.appendXAxis = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          xTicks = _this$props.xTicks,
          xProp = _this$props.xProp,
          tickFontSize = _this$props.tickFontSize,
          xTicksAngled = _this$props.xTicksAngled;

      _this.xScale = d3.scaleTime().domain([d3.min(data, function (dataset) {
        return d3.min(dataset.values, function (d) {
          return d[xProp];
        });
      }), d3.max(data, function (dataset) {
        return d3.max(dataset.values, function (d) {
          return d[xProp];
        });
      })]).range([0, _this.width]);

      _this.xAxis = d3.axisBottom(_this.xScale).ticks(xTicks).tickSize(5).tickPadding(5);

      /* Append and Transform X Axis */
      _this.svg.append('g').attr('transform', 'translate(0, ' + _this.height + ')').call(_this.xAxis).style('stroke-width', 0.5).selectAll('text').style('text-anchor', 'end').style('font-size', tickFontSize + 'px').attr('transform', 'rotate(' + (xTicksAngled ? -45 : 0) + ')');
    };

    _this.appendYAxis = function () {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          yProp = _this$props2.yProp,
          yTicks = _this$props2.yTicks,
          tickFontSize = _this$props2.tickFontSize;

      _this.yScale = d3.scaleLinear().domain([d3.min(data, function (dataset) {
        return d3.min(dataset.values, function (d) {
          return d[yProp];
        });
      }), d3.max(data, function (dataset) {
        return d3.max(dataset.values, function (d) {
          return d[yProp];
        });
      })]).range([_this.height, 0]);

      _this.yAxis = d3.axisLeft(_this.yScale).ticks(yTicks).tickSize(5);

      _this.svg.append('g').call(_this.yAxis).style('font-size', tickFontSize + 'px').style('font-weight', '100').style('stroke-width', 0.5);
    };

    _this.appendGrid = function () {

      if (!_this.props.shouldShowGrid) return;

      _this.svg.append('g').attr('transform', 'translate(0, ' + _this.height + ')').call(_this.xAxis.tickSize(-_this.height, 0, 0).tickSizeOuter(0, 0, 0).tickFormat("")).style('stroke-width', 0.1);

      _this.svg.append('g').call(_this.yAxis.tickSize(-_this.width, 0, 0).tickSizeOuter(0, 0, 0).tickFormat("")).style('stroke-width', 0.1);
    };

    _this.appendAreas = function () {
      var _this$props3 = _this.props,
          data = _this$props3.data,
          xProp = _this$props3.xProp,
          yProp = _this$props3.yProp,
          lineColors = _this$props3.lineColors;


      var area = d3.area().x(function (d) {
        return _this.xScale(d[xProp]);
      }).y0(_this.height).y1(function (d) {
        return _this.yScale(d[yProp]);
      }).curve(d3.curveCatmullRom.alpha(0.5));

      _this.svg.selectAll('.area').data(data).enter().append('path').attr('d', function (d) {
        return area(d.values);
      }).style('fill', function (d, i) {
        return lineColors[i];
      }).style('fill-opacity', 0.5); //give fill color for area fill
    };

    _this.appendLines = function () {
      var _this$props4 = _this.props,
          data = _this$props4.data,
          xProp = _this$props4.xProp,
          yProp = _this$props4.yProp,
          lineColors = _this$props4.lineColors;


      var line = d3.line().x(function (d) {
        return _this.xScale(d[xProp]);
      }).y(function (d) {
        return _this.yScale(d[yProp]);
      }).curve(d3.curveCatmullRom.alpha(0.5));

      _this.svg.selectAll('.line').data(data).enter().append('path').attr('class', 'line').attr('d', function (d) {
        return line(d.values);
      }).style('stroke', function (d, i) {
        return lineColors[i];
      }).style('stroke-width', 1).style('fill', 'none');
    };

    _this.appendPoints = function () {
      var _this$props5 = _this.props,
          data = _this$props5.data,
          tooltip = _this$props5.tooltip,
          lineColors = _this$props5.lineColors,
          xProp = _this$props5.xProp,
          yProp = _this$props5.yProp,
          pointRadius = _this$props5.pointRadius;
      /*================*/
      /* Create Tooltip */
      /*================*/

      // Define the div for the tooltip

      var tooltipContainer = (0, _common.createTooltipContainer)();

      /*===============*/
      /* Append Points */
      /*===============*/
      data.forEach(function (dataset, setIndex) {
        _this.svg.selectAll('point').data(dataset.values).enter().append('circle').attr('cx', function (d) {
          return _this.xScale(d[xProp]);
        }).attr('cy', function (d) {
          return _this.yScale(d[yProp]);
        }).attr('r', function (d) {
          return pointRadius;
        }).style('fill', lineColors[setIndex]).style('cursor', _this.props.onClick ? 'pointer' : null)

        /*==============*/
        /* Call Tooltip */
        /*==============*/

        .on("mouseover", function (d, i) {

          tooltipContainer.transition().duration(200).style("opacity", 1);

          tooltipContainer.html((0, _common.renderTooltip)(tooltip, { dataset: dataset.name, data: d, index: i })).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px");
        }).on("mouseout", function (d) {
          tooltipContainer.transition().duration(500).style("opacity", 0);
        })

        /*================*/
        /* On Point Click */
        /*================*/

        .on("click", function (d, i) {
          return _this.handlePointClick(dataset.name, d, i);
        });
      });
    };

    _this.renderChart = function () {
      var _this$props6 = _this.props,
          initialWidth = _this$props6.initialWidth,
          initialHeight = _this$props6.initialHeight,
          margin = _this$props6.margin,
          title = _this$props6.title,
          titleFontSize = _this$props6.titleFontSize,
          xLabel = _this$props6.xLabel,
          yLabel = _this$props6.yLabel,
          labelFontSize = _this$props6.labelFontSize;

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
      _this.appendGrid();
      _this.appendAreas();
      _this.appendLines();
      _this.appendPoints();
    };

    _this.svg = {};
    _this.width = 0;
    _this.height = 0;
    return _this;
  }

  _createClass(LineChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // create base svg
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

  return LineChart;
}(_react2.default.Component);

LineChart.propTypes = {
  data: _react.PropTypes.array.isRequired,
  xProp: _react.PropTypes.string.isRequired,
  yProp: _react.PropTypes.string.isRequired,
  title: _react.PropTypes.string,
  xLabel: _react.PropTypes.string,
  yLabel: _react.PropTypes.string,
  initialWidth: _react.PropTypes.number,
  initialHeight: _react.PropTypes.number,
  isResponsive: _react.PropTypes.bool,
  tickFontSize: _react.PropTypes.number,
  labelFontSize: _react.PropTypes.number,
  titleFontSize: _react.PropTypes.number,
  margin: _react.PropTypes.shape({
    top: _react.PropTypes.number,
    right: _react.PropTypes.number,
    bottom: _react.PropTypes.number,
    left: _react.PropTypes.number
  }),

  lineColors: _react.PropTypes.array,
  onClick: _react.PropTypes.func,
  tooltip: _react.PropTypes.func,
  xTicksAngled: _react.PropTypes.bool,
  shouldShowGrid: _react.PropTypes.bool,
  xTicks: _react.PropTypes.number,
  yTicks: _react.PropTypes.number,
  pointRadius: _react.PropTypes.number
};
LineChart.defaultProps = {
  lineColors: ['#000000'],
  xTicksAngled: false,
  shouldShowGrid: false,
  xTicks: null,
  yTicks: null,
  pointRadius: 1.3,

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
    bottom: 35,
    left: 35
  }
};