'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ** usage **
//
// <Input
//   text={ searchInput }
//   height={ 30 }
//   iconClass={ 'icon-search' } // optional
//   clearIconClass={ 'icon-clear' } //optional
//   border={ `1px solid ${ borderColor }` }
//   onChange={ this.handleSearchInputChange }
//   onSubmit={ this.handleSearchSubmit }/>

var Input = exports.Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.handleTextChange = function (e) {
      _this.props.onChange(e.target.value);
    };

    _this.handleSubmit = function () {
      var text = _this.props.text;

      _this.props.onSubmit(text);
    };

    _this.handleClear = function () {
      _this.props.onChange('');
      _this.props.onSubmit(null);
    };

    _this.handleKeyPress = function (e) {
      var text = _this.props.text;


      if (e.key === 'Enter') _this.props.onSubmit(text);
    };

    return _this;
  }

  _createClass(Input, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          placeholder = _props.placeholder,
          text = _props.text,
          fontSize = _props.fontSize,
          width = _props.width,
          height = _props.height,
          iconClass = _props.iconClass,
          clearIconClass = _props.clearIconClass,
          backgroundColor = _props.backgroundColor,
          border = _props.border;


      var style = {
        base: {
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          border: border,
          borderRadius: 1,
          height: height,
          width: width,
          backgroundColor: backgroundColor
        },
        input: {
          display: 'flex',
          borderRadius: 'inherit',
          fontSize: fontSize,
          border: 'none',
          width: '100%',
          outline: 0,
          backgroundColor: backgroundColor
        },
        icon: {
          fontSize: 16,
          cursor: 'pointer'
        },
        clearButton: {
          fontSize: 14,
          cursor: 'pointer',
          padding: 3,
          marginRight: 3
        }
      };

      return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement('input', {
          style: style.input,
          value: text,
          type: 'text',
          placeholder: placeholder,
          onChange: this.handleTextChange,
          onKeyPress: this.handleKeyPress }),
        text && text.length > 0 ? _react2.default.createElement('i', {
          className: clearIconClass,
          style: style.clearButton,
          onClick: this.handleClear }) : null,
        iconClass ? _react2.default.createElement('i', {
          className: iconClass,
          style: style.icon,
          onClick: this.handleSubmit }) : null
      );
    }
  }]);

  return Input;
}(_react2.default.Component);

Input.propTypes = {
  placeholder: _react.PropTypes.string,
  text: _react.PropTypes.string,
  fontSize: _react.PropTypes.number,
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  iconClass: _react.PropTypes.string,
  clearIconClass: _react.PropTypes.string,
  backgroundColor: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  onSubmit: _react.PropTypes.func.isRequired
};
Input.defaultProps = {
  placeholder: 'Search...',
  text: '',
  fontSize: 14,
  width: '100%',
  height: 30,
  backgroundColor: 'white'
};