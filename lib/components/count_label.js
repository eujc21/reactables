'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountLabel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CountLabel = exports.CountLabel = function (_React$Component) {
  _inherits(CountLabel, _React$Component);

  function CountLabel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CountLabel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CountLabel.__proto__ || Object.getPrototypeOf(CountLabel)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          iconText = _this$props.iconText;

      onClick ? onClick(iconText) : null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CountLabel, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          iconText = _props.iconText,
          count = _props.count,
          onClick = _props.onClick,
          styles = _props.styles;


      var style = {
        base: {
          margin: 5,
          fontFamily: ' "Helvetica Neue", Helvetica, Arial, sans-serif'
        },
        icon: {
          display: 'inline-block',
          backgroundColor: 'blue',
          color: 'white',
          fontSize: 10,
          marginRight: 5,
          padding: 5,
          borderRadius: 2,
          cursor: onClick ? 'pointer' : null
        },
        count: {
          display: 'inline-block',
          color: 'black',
          fontSize: 10
        }
      };

      style.icon = Object.assign({}, style.icon, styles.icon);
      style.count = Object.assign({}, style.count, styles.count);

      return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement(
          'div',
          { style: style.icon, onClick: this.handleClick },
          iconText
        ),
        _react2.default.createElement(
          'div',
          { style: style.count },
          count
        )
      );
    }
  }]);

  return CountLabel;
}(_react2.default.Component);

CountLabel.propTypes = {
  styles: _react.PropTypes.object,
  iconText: _react.PropTypes.string,
  count: _react.PropTypes.number,
  onClick: _react.PropTypes.func
};
CountLabel.defaultProps = {
  count: 0,
  styles: {}
};