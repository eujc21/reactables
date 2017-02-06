'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextMenuOption = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextMenuOption = exports.TextMenuOption = function (_React$Component) {
  _inherits(TextMenuOption, _React$Component);

  function TextMenuOption() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextMenuOption);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextMenuOption.__proto__ || Object.getPrototypeOf(TextMenuOption)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
      var _this$props = _this.props,
          selection = _this$props.selection,
          onClick = _this$props.onClick;

      onClick(selection);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextMenuOption, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          styles = _props.styles;


      var style = {
        display: 'inline-block',
        padding: 6,
        cursor: 'pointer'
      };

      (0, _merge2.default)(style, styles);

      return _react2.default.createElement(
        'li',
        { style: style, onMouseDown: this.onClick },
        children
      );
    }
  }]);

  return TextMenuOption;
}(_react2.default.Component);

TextMenuOption.propTypes = {
  onClick: _react.PropTypes.func
};