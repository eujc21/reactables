'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieChart = undefined;

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

var PieChart = exports.PieChart = function (_React$Component) {
  _inherits(PieChart, _React$Component);

  function PieChart(props) {
    _classCallCheck(this, PieChart);

    var _this = _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).call(this, props));

    _this.renderChart = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          initialWidth = _this$props.initialWidth,
          initialHeight = _this$props.initialHeight,
          tooltip = _this$props.tooltip,
          margin = _this$props.margin,
          title = _this$props.title,
          titleFontSize = _this$props.titleFontSize,
          labelFontSize = _this$props.labelFontSize,
          labelProp = _this$props.labelProp,
          valueProp = _this$props.valueProp,
          colors = _this$props.colors,
          hideLabelPercentage = _this$props.hideLabelPercentage;

      // Calculate width and height

      _this.width = initialWidth - margin.left - margin.right;
      _this.height = initialHeight - margin.top - margin.bottom;
      _this.radius = Math.min(_this.width, _this.height) / 2;

      // common
      (0, _common.appendTitle)(_this.svg, title, titleFontSize, _this.width, margin);

      var total = data.reduce(function (t, d) {
        return t + d[valueProp];
      }, 0);

      var color = d3.scaleOrdinal().range(colors);

      var arc = d3.arc().outerRadius(_this.radius).innerRadius(0);

      var labelArc = d3.arc().outerRadius(_this.radius - 40).innerRadius(_this.radius - 40);

      var pie = d3.pie().sort(null).value(function (d) {
        return d[valueProp];
      });

      var g = _this.svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc').attr('fill', function (d) {

        return d.value / total * 100 < hideLabelPercentage ? 'transparent' : 'black';
      });

      // Define the div for the tooltip
      var tooltipContainer = (0, _common.createTooltipContainer)();

      g.append('path').attr('d', arc)
      // TODO: Add custom color with fill color
      .style('fill', function (d) {
        return d.data.fillColor || color(d.data[labelProp]);
      }).on("mouseover", function (d) {
        tooltipContainer.transition().duration(200).style("opacity", 1);

        tooltipContainer.html((0, _common.renderTooltip)(tooltip, { data: d.data, index: d.index })).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px");
      }).on("mouseout", function (d) {
        tooltipContainer.transition().duration(500).style("opacity", 0);
      });

      g.append('text').attr('transform', function (d) {
        return 'translate(' + labelArc.centroid(d) + ')';
      }).attr('dy', '.35em').text(function (d) {
        return d.data[labelProp];
      });
    };

    _this.svg = {};
    _this.width = 0;
    _this.height = 0;
    return _this;
  }

  _createClass(PieChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          initialWidth = _props.initialWidth,
          initialHeight = _props.initialHeight,
          margin = _props.margin,
          isResponsive = _props.isResponsive;


      this.GUID = (0, _common.generateGUID)();
      this.svg = (0, _common.initializePie)(this.chartContainer, this.GUID, initialWidth, initialHeight, margin, isResponsive);

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

  return PieChart;
}(_react2.default.Component);

PieChart.propTypes = {
  data: _react.PropTypes.array.isRequired,
  labelProp: _react.PropTypes.string.isRequired,
  valueProp: _react.PropTypes.string.isRequired,
  colors: _react.PropTypes.array,
  initialWidth: _react.PropTypes.number,
  initialHeight: _react.PropTypes.number,
  isResponsive: _react.PropTypes.bool,
  title: _react.PropTypes.string,
  labelFontSize: _react.PropTypes.number,
  titleFontSize: _react.PropTypes.number,
  hideLabelPercentage: _react.PropTypes.number,
  tooltip: _react.PropTypes.func,
  margin: _react.PropTypes.shape({
    top: _react.PropTypes.number,
    right: _react.PropTypes.number,
    bottom: _react.PropTypes.number,
    left: _react.PropTypes.number
  })
};
PieChart.defaultProps = {
  initialWidth: 960,
  initialHeight: 500,
  colors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
  isResponsive: false,
  title: '',
  xLabel: '',
  yLabel: '',
  labelFontSize: 12,
  titleFontSize: 12,
  hideLabelPercentage: 3,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};