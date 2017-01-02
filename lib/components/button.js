var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import merge from 'lodash/merge';

export var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isHovered: false }, _this.handleClick = function () {
      var _this$props = _this.props,
          isDisabled = _this$props.isDisabled,
          onClick = _this$props.onClick;

      if (isDisabled || !onClick) return;

      onClick();
    }, _this.handleMouseEnter = function () {
      if (_this.props.isDisabled) return;

      _this.setState({ isHovered: true });
    }, _this.handleMouseLeave = function () {
      _this.setState({ isHovered: false });
    }, _this.handleFocus = function (e) {
      e.target.blur();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          text = _props.text,
          isDisabled = _props.isDisabled,
          styles = _props.styles;


      var style = {
        color: '#000000',
        fontSize: 12,
        fontWeight: 200,
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        letterSpacing: 1,
        backgroundColor: '#f9f9f9',
        border: 'none',
        borderRadius: 2,
        cursor: isDisabled ? null : 'pointer',
        padding: 5,
        transition: 'box-shadow 0.5s ease',
        boxShadow: this.state.isHovered ? '0px 2px 4px 0px rgba(0,0,0, 0.35)' : null
      };

      merge(style, styles);

      return React.createElement(
        'button',
        {
          style: style,
          onClick: this.handleClick,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onFocus: this.handleFocus
        },
        text
      );
    }
  }]);

  return Button;
}(React.Component);
Button.propTypes = {
  text: PropTypes.node,
  isHoverable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  styles: PropTypes.object
};
Button.defaultProps = {
  text: 'Button',
  isHoverable: false,
  isDisabled: false,
  styles: {}
};