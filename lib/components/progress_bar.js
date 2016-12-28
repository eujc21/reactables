'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBar = exports.ProgressBar = function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProgressBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = { percentageComplete: 0 }, _this.getPercentageComplete = function (completed, outOf) {

      var percentageComplete = Math.floor(completed / outOf * 100);

      if (percentageComplete > 100) percentageComplete = 100;

      return percentageComplete;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProgressBar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          completed = _props.completed,
          outOf = _props.outOf;

      this.setState({
        percentageComplete: this.getPercentageComplete(completed, outOf)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props2 = this.props,
          completed = _props2.completed,
          outOf = _props2.outOf;


      if (nextProps.outOf !== outOf || nextProps.completed !== completed) {
        this.setState({
          percentageComplete: this.getPercentageComplete(nextProps.completed, nextProps.outOf)
        });
      }
    }
  }, {
    key: 'renderUnits',
    value: function renderUnits(style) {
      var _props3 = this.props,
          showUnits = _props3.showUnits,
          units = _props3.units,
          completed = _props3.completed,
          outOf = _props3.outOf;
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
      var styles = this.props.styles;
      var percentageComplete = this.state.percentageComplete;


      var style = {
        base: {
          width: '100%'
        },
        units: {
          width: '100%',
          textAlign: 'right',
          margin: 0,
          padding: 0
        },
        bar: {
          height: 26,
          padding: 0,
          backgroundColor: '#FF0000',
          overflow: 'hidden',
          borderRadius: 3
        },
        completed: {
          transform: 'skew(-20deg)',
          height: '100%',
          width: 'calc(' + percentageComplete + '% + ' + (percentageComplete === 100 ? 8 : 0) + 'px',
          background: 'linear-gradient( to top right, ' + '#008000' + ', ' + '#00C000' + ')', //green, lighten(0.5))
          marginLeft: -4,
          transition: 'width 1s'
        }
      };

      (0, _merge2.default)(style, styles);

      return _react2.default.createElement(
        'div',
        { style: style.base },
        this.renderUnits(style),
        _react2.default.createElement(
          'div',
          { style: style.bar },
          _react2.default.createElement('div', { style: style.completed })
        )
      );
    }
  }]);

  return ProgressBar;
}(_react2.default.Component);

ProgressBar.propTypes = {
  completed: _react.PropTypes.number.isRequired,
  outOf: _react.PropTypes.number.isRequired,
  showUnits: _react.PropTypes.bool,
  units: _react.PropTypes.oneOf(['percent', 'number']),
  styles: _react.PropTypes.object
};
ProgressBar.defaultProps = {
  completed: 0,
  outOf: 0,
  showUnits: false,
  units: 'percent',
  styles: {}
};