'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrajectoryChart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Margins = {
  top: 75,
  right: 75,
  bottom: 75,
  left: 75
};

var TrajectoryChart = exports.TrajectoryChart = function (_React$Component) {
  _inherits(TrajectoryChart, _React$Component);

  function TrajectoryChart() {
    _classCallCheck(this, TrajectoryChart);

    return _possibleConstructorReturn(this, (TrajectoryChart.__proto__ || Object.getPrototypeOf(TrajectoryChart)).apply(this, arguments));
  }

  _createClass(TrajectoryChart, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(prevProps, prevState) {
      if (!(0, _isEqual2.default)(this.props.data, prevProps.data)) {
        d3.select(this.chartContainer).selectAll('svg').remove();
        this.renderChart();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          width = _props.width,
          height = _props.height,
          title = _props.title,
          xLabel = _props.xLabel,
          yLabel = _props.yLabel;


      if (!title || title === '') {
        Margins.top = 0;
      }

      /*----------- Create Main SVG --------------*/

      var svg = d3.select("#chart").append("svg:svg").attr("width", width).attr("height", height);

      /*--------------- Create Scale --------------*/

      // Extent iterators
      function xAmounts(d) {
        return d.year;
      }

      function yAmounts(d) {
        return d.sale;
      }

      //extract max and min for x & y
      var xDomain = d3.extent(data, xAmounts);
      var yDomain = d3.extent(data, yAmounts);

      xDomain = [xDomain[0] - 3, xDomain[1] + 3];
      yDomain = [yDomain[0] - 50, yDomain[1] + 50];

      // scale (the margins used might need changing)
      var xScale = d3.scaleLinear().range([Margins.left, width - Margins.right]).domain(xDomain);

      var yScale = d3.scaleLinear().range([height - Margins.bottom, Margins.top]).domain(yDomain);

      /*----------------- Create Axes -----------------*/

      // axis creation
      var xAxis = d3.axis(xScale);

      var yAxis = d3.axis(yScale).orient('left');

      // create secondary dotted y Axes
      var yDotted = d3.svg.axis().scale(yScale).tickSize(width).orient('right');

      // apply x axis
      svg.append("svg:g").attr('transform', 'translate(0, ' + (height - Margins.bottom) + ')').attr('class', 'x axis').call(xAxis);

      // apply y axis
      svg.append('svg:g').attr('class', 'y axis').attr('transform', 'translate(' + Margins.left + ', 0)').call(yAxis);

      // apply dotted y axis
      var gy = svg.append('svg:g').attr('class', 'y axis').attr('transform', 'translate(' + Margins.left + ', 0)').call(yDotted);

      gy.selectAll("g").filter(function (d) {
        return d;
      })
      // 'minor' class defined in css
      .classed('minor', true);

      /*---------------- Create Points -------------*/

      //generate colors
      var color = d3.scale.category20();

      // generate points
      svg.selectAll('circle').data(data).enter().append('svg:circle').attr('r', function (d) {
        var x = d.sale / 100;
        return Math.pow(x, 3);
      }).attr('cx', function (d) {
        return xScale(d.year);
      }).attr('cy', function (d) {
        return yScale(d.sale);
      })

      //apply colors
      .attr('fill', function (d, i) {
        return color(i);
      })

      //add click event
      .on('click', function (d) {
        //change page
        document.location.href = d.url;
        d3.event.stopPropagation();
      });

      /*------------ Create Arrow Marker -------------*/

      svg.append("svg:defs").selectAll("marker").data(["arrow"]).enter().append("svg:marker").attr("id", String).attr("viewBox", "0 -5 10 10").attr("refX", 10).attr("refY", 0).attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5");

      /*---- Create Lines - Apply Scale - Append Arrow ----*/

      data.map(function (d) {
        svg.append('svg:line').attr('x1', xScale(d.year)).attr('y1', yScale(d.sale)).attr('x2', xScale(d.year + 2)).attr('y2', yScale(d.sale + 10)).attr('stroke-width', 1).attr('stroke', 'black')
        // append the created arrow
        .attr("class", "link arrow").attr("marker-end", "url(#arrow)");
      });

      /*----- Title & Labels --------*/

      //title
      if (title) {
        svg.append('svg:text').attr('x', width / 2 + Margins.left).attr('y', Margins.top / 2).attr('text-anchor', 'middle').style('font-size', '16px').style('text-decoration', 'underline').text(title);
      }

      //x label
      svg.append('svg:text').attr('x', width / 2 + Margins.left).attr('transform', 'translate(0, ' + (height - Margins.bottom / 2) + ')').attr('class', 'x axis').text(xLabel);

      //y label
      svg.append('svg:text').attr('transform', 'translate(' + Margins.left / 2 + ', ' + height / 2 + ')rotate(-90)').text(yLabel);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { id: 'chart' });
    }
  }]);

  return TrajectoryChart;
}(_react2.default.Component);

TrajectoryChart.propTypes = {
  data: _react.PropTypes.array,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  title: _react.PropTypes.string,
  xLabel: _react.PropTypes.string,
  yLabel: _react.PropTypes.string
};
TrajectoryChart.defaultProps = {
  data: [],
  width: 1600,
  height: 1000
};