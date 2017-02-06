'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = exports.Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.onClickOutside = function (e) {
      if (_this.node && _this.node.contains(e.target)) return;

      _this.node.style.outline = null;
    }, _this.handleTextChange = function (e) {
      _this.props.onChange(e.target.value);
    }, _this.handleSubmit = function () {
      _this.props.onSubmit(_this.props.text);
    }, _this.handleClear = function () {
      _this.props.onChange('');
      _this.props.onSubmit(null);
    }, _this.handleKeyPress = function (e) {
      var text = _this.props.text;


      if (e.key === 'Enter') _this.props.onSubmit(text);
    }, _this.handleFocus = function (e) {
      e.target.parentNode.style.outline = '5px auto -webkit-focus-ring-color'; //#969599
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.onClickOutside, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.onClickOutside, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          placeholder = _props.placeholder,
          text = _props.text,
          iconClass = _props.iconClass,
          clearIconClass = _props.clearIconClass,
          styles = _props.styles;


      var style = {
        base: {
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          border: '1px solid #EBE9ED',
          borderRadius: 2,
          height: 30,
          backgroundColor: '#ffffff'
        },
        input: {
          display: 'flex',
          borderRadius: 'inherit',
          fontSize: 14,
          border: 'none',
          width: '100%',
          outline: 0,
          backgroundColor: 'inherit',
          boxSizing: 'border-box'
        },
        submitIcon: {
          fontSize: 16,
          cursor: 'pointer'
        },
        clearIcon: {
          fontSize: 14,
          cursor: 'pointer',
          padding: 3,
          marginRight: 3
        }
      };

      (0, _merge2.default)(style, styles);

      return _react2.default.createElement(
        'div',
        { ref: function ref(node) {
            return _this2.node = node;
          }, style: style.base },
        _react2.default.createElement('input', {
          style: style.input,
          value: text,
          type: 'text',
          placeholder: placeholder,
          onChange: this.handleTextChange,
          onKeyPress: this.handleKeyPress,
          onFocus: this.handleFocus
        }),
        text && text.length > 0 ? _react2.default.createElement('i', {
          className: clearIconClass,
          style: style.clearIcon,
          onClick: this.handleClear }) : null,
        iconClass ? _react2.default.createElement('i', {
          className: iconClass,
          style: style.submitIcon,
          onClick: this.handleSubmit }) : null
      );
    }
  }]);

  return Input;
}(_react2.default.Component);

Input.propTypes = {
  placeholder: _react.PropTypes.string,
  text: _react.PropTypes.string,
  iconClass: _react.PropTypes.string,
  clearIconClass: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  onSubmit: _react.PropTypes.func.isRequired,
  styles: _react.PropTypes.object
};
Input.defaultProps = {
  placeholder: 'Search...',
  text: '',
  styles: {},
  iconClass: 'icon-search',
  clearIconClass: 'icon-cross'
};