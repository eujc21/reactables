'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeatBar = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatBar = exports.HeatBar = function (_React$Component) {
  _inherits(HeatBar, _React$Component);

  function HeatBar() {
    _classCallCheck(this, HeatBar);

    return _possibleConstructorReturn(this, (HeatBar.__proto__ || Object.getPrototypeOf(HeatBar)).apply(this, arguments));
  }

  _createClass(HeatBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          score = _props.score,
          outOf = _props.outOf,
          title = _props.title,
          barColors = _props.barColors,
          isScoreVisible = _props.isScoreVisible,
          style = _props.style;

      var _barColors = _slicedToArray(barColors, 4),
          gradientOne = _barColors[0],
          gradientTwo = _barColors[1],
          gradientThree = _barColors[2],
          gradientFour = _barColors[3];

      var styles = {
        base: {
          width: '100%'
        },
        header: {
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          width: 'inherit'
        },
        bar: {
          height: 26,
          background: 'linear-gradient(to left, ' + gradientOne + ' 0%,' + gradientTwo + ' 40%,' + gradientThree + ' 60%,' + gradientFour + ' 100%)',
          filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=\'' + gradientOne + '\', endColorstr=\'' + gradientFour + '\',GradientType=1 )',
          padding: 0,
          width: 'inherit'
        },
        score: {
          fontWeight: 'bold',
          margin: 0,
          color: '#000000'
        },
        indicatorLine: {
          height: 'inherit',
          borderLeft: '2px solid black',
          marginLeft: score / outOf * 100 + '%'
        }
      };

      (0, _merge2.default)(styles, style);

      return _react2.default.createElement(
        'div',
        { style: styles.base },
        _react2.default.createElement(
          'div',
          { style: styles.header },
          _react2.default.createElement(
            'span',
            null,
            title
          ),
          _react2.default.createElement(
            'span',
            null,
            isScoreVisible ? score : null
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.bar },
          _react2.default.createElement('div', { style: styles.indicatorLine })
        )
      );
    }
  }]);

  return HeatBar;
}(_react2.default.Component);

HeatBar.propTypes = {
  score: _react.PropTypes.number.isRequired,
  outOf: _react.PropTypes.number.isRequired,
  title: _react.PropTypes.string,
  isScoreVisible: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  barColors: _react.PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
    if (propValue.length !== 4) {
      return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. Validation failed. Array must contain 4 color strings');
    }

    if (typeof propValue[key] !== 'string') return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. Validation failed. Array must contain Strings)');
  })
};
HeatBar.defaultProps = {
  score: 0,
  outOf: 100,
  title: '',
  barColors: ['#27ae60', '#dfea10', '#efec13', '#e74c3c'],
  isScoreVisible: true,
  style: {}
};