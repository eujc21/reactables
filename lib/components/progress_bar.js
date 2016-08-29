'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBar = exports.ProgressBar = function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar(props) {
    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));

    _this.state = { percentageComplete: 0 };

    _this.getPercentageComplete = function (completed, outOf) {

      var percentageComplete = Math.floor(completed / outOf * 100);

      if (percentageComplete > 100) percentageComplete = 100;

      return percentageComplete;
    };

    return _this;
  }

  _createClass(ProgressBar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var completed = _props.completed;
      var outOf = _props.outOf;

      this.setState({
        percentageComplete: this.getPercentageComplete(completed, outOf)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props2 = this.props;
      var completed = _props2.completed;
      var outOf = _props2.outOf;


      if (nextProps.outOf !== outOf || nextProps.completed !== completed) {
        this.setState({
          percentageComplete: this.getPercentageComplete(nextProps.completed, nextProps.outOf)
        });
      }
    }
  }, {
    key: 'renderUnits',
    value: function renderUnits(style) {
      var _props3 = this.props;
      var showUnits = _props3.showUnits;
      var units = _props3.units;
      var completed = _props3.completed;
      var outOf = _props3.outOf;
      var percentageComplete = this.state.percentageComplete;


      if (!showUnits) return;

      var display = units === 'number' ? completed + ' of ' + outOf : percentageComplete + '%';

      return _react2.default.createElement(
        'p',
        { className: 'units', style: style.units },
        display
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var width = _props4.width;
      var height = _props4.height;
      var completedColor = _props4.completedColor;
      var barColor = _props4.barColor;
      var alignUnits = _props4.alignUnits;
      var percentageComplete = this.state.percentageComplete;


      var baseCompletedColor = (0, _color2.default)(completedColor).hexString();
      var gradientCompletedColor = (0, _color2.default)(completedColor).lighten(0.5).hexString();

      var style = {
        base: {
          width: width
        },
        units: {
          width: '100%',
          textAlign: alignUnits,
          margin: 0,
          padding: 0
        },
        bar: {
          height: height,
          padding: 0,
          backgroundColor: (0, _color2.default)(barColor).hexString(),
          overflow: 'hidden',
          borderRadius: 3
        },
        completed: {
          transform: 'skew(-20deg)',
          height: '100%',
          width: 'calc(' + percentageComplete + '% + ' + (percentageComplete === 100 ? 8 : 0) + 'px',
          background: 'linear-gradient( to top right, ' + baseCompletedColor + ', ' + gradientCompletedColor + ')',
          marginLeft: -4,
          transition: 'width 1s'
        }
      };

      return _react2.default.createElement(
        'div',
        null,
        this.renderUnits(style),
        _react2.default.createElement(
          'div',
          { className: 'baseBar', style: style.bar },
          _react2.default.createElement('div', { className: 'completedBar', style: style.completed })
        )
      );
    }
  }]);

  return ProgressBar;
}(_react2.default.Component);

ProgressBar.propTypes = {
  completed: _react.PropTypes.number.isRequired,
  outOf: _react.PropTypes.number.isRequired,
  barColor: _react.PropTypes.string,
  completedColor: _react.PropTypes.string,
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  showUnits: _react.PropTypes.bool,
  units: _react.PropTypes.oneOf(['percent', 'number']),
  alignUnits: _react.PropTypes.oneOf(['left', 'right', 'center'])

};
ProgressBar.defaultProps = {
  completed: 0,
  outOf: 0,
  width: '100%',
  height: 26,
  barColor: 'red',
  completedColor: 'green',
  showUnits: false,
  units: 'percent',
  alignUnits: 'right'
};