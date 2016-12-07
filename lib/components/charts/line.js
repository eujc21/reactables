'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChart = undefined;

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

var LineChart = exports.LineChart = function (_React$Component) {
  _inherits(LineChart, _React$Component);

  function LineChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LineChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call.apply(_ref, [this].concat(args))), _this), _this.renderChart = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          xProp = _this$props.xProp,
          yProp = _this$props.yProp,
          xLabel = _this$props.xLabel,
          yLabel = _this$props.yLabel,
          title = _this$props.title,
          alignTitle = _this$props.alignTitle,
          initialWidth = _this$props.initialWidth,
          initialHeight = _this$props.initialHeight;


      var margin = {
        top: 10,
        right: 20,
        bottom: 50,
        left: 30
      };

      var width = _this.initialWidth - margin.left - margin.right;
      var height = _this.initialHeight - margin.top - margin.bottom;

      var svg = d3.select(_this.chartContainer).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).call(_utils.makeResponsive).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
      //.call(makeResponsive)


      data.forEach(function (dataset) {
        dataset.values.forEach(function (d) {
          d[xProp] = Date.parse(d[xProp]);
          d[yProp] = d[yProp];
        });
      });

      var xScale = d3.scaleTime().domain([d3.min(data, function (dataset) {
        return d3.min(dataset.values, function (d) {
          return d[xProp];
        });
      }), d3.max(data, function (dataset) {
        return d3.max(dataset.values, function (d) {
          return d[xProp];
        });
      })]).range([0, width]);

      var xAxis = d3.axisBottom(xScale).tickSize(10).tickPadding(5);

      svg.append('g').attr('transform', 'translate(0, ' + height + ')').call(xAxis).selectAll('text').style('text-anchor', 'end').attr('transform', 'rotate(-45)');

      var yScale = d3.scaleLinear().domain([d3.min(data, function (dataset) {
        return d3.min(dataset.values, function (d) {
          return d[yProp];
        });
      }), d3.max(data, function (dataset) {
        return d3.max(dataset.values, function (d) {
          return d[yProp];
        });
      })]).range([height, 0]);

      svg.append('g').call(d3.axisLeft(yScale));

      //use line OR area
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
        return area(d.values);
      }).style('stroke', function (d, i) {
        return ['#FF9900', '#3369E8'][i];
      }).style('stroke-width', 1).style('fill', 'none'); //give fill color for area fill


      /*===============*/
      /* Append Points */
      /*===============*/

      // Define the div for the tooltip
      // let div = d3.select("body").append("div")
      //   .attr("class", "tooltip")
      //   .style("opacity", 0)
      //   .style("position", 'absolute')
      //   .style('text-align', 'center')


      data.forEach(function (dataset) {
        svg.selectAll('circle').data(dataset.values).enter().append('circle').attr('cx', function (d) {
          return xScale(d[xProp]);
        }).attr('cy', function (d) {
          return yScale(d[yProp]);
        }).attr('r', function (d) {
          return 2;
        }).style('fill', 'black');

        // append tooltips
        // .on("mouseover", function(d) {
        //   div.transition()
        //     .duration(200)
        //     .style("opacity", .9);
        //   div.html('Tooltip' + "<br/>")
        //     .style("left", (d3.event.pageX - 30) + "px")
        //     .style("top", (d3.event.pageY - 28) + "px");
        // })
        // .on("mouseout", function(d) {
        //   div.transition()
        //     .duration(500)
        //     .style("opacity", 0);
        // });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LineChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initialWidth = this.chartContainer.clientWidth;
      this.initialHeight = this.chartContainer.clientHeight;
      this.renderChart();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(prevProps, prevState) {
      if (!(0, _isEqual2.default)(this.props.data, prevProps.data)) this.renderChart();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        ref: function ref(chartContainer) {
          _this2.chartContainer = chartContainer;
        },
        className: 'chart',
        style: { width: '100%', height: '100%', border: '1px solid black' } });
    }
  }]);

  return LineChart;
}(_react2.default.Component);

LineChart.propTypes = {
  data: _react.PropTypes.array.isRequired,
  xProp: _react.PropTypes.string.isRequired,
  yProp: _react.PropTypes.string.isRequired
};
LineChart.defaultProps = {
  initialWidth: 400,
  initialHeight: 300
};