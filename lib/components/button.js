'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ** usage **
//
//  <Button
//    text={
//      <div style={{ whiteSpace:'nowrap'}}>
//        <i
//          className="icon-plus"
//          style={{ fontSize: 14 }}/> New Campaign
//      </div>}
//    backgroundColor={ 'green' }
//    textColor={ 'white' }
//    onClick={ this.handleNewCampaignClick }/>

var Button = exports.Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.state = { isHovered: false };

    _this.handleClick = function () {
      if (_this.props.isDisabled) return;

      _this.props.onClick();
    };

    _this.handleMouseEnter = function () {
      if (_this.props.isDisabled) return;

      _this.setState({ isHovered: true });
    };

    _this.handleMouseLeave = function () {
      _this.setState({ isHovered: false });
    };

    _this.handleFocus = function (e) {
      e.target.blur();
    };

    return _this;
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          text = _props.text,
          textColor = _props.textColor,
          backgroundColor = _props.backgroundColor,
          border = _props.border,
          borderRadius = _props.borderRadius,
          width = _props.width,
          margin = _props.margin,
          fontSize = _props.fontSize,
          fontWeight = _props.fontWeight,
          fontFamily = _props.fontFamily,
          letterSpacing = _props.letterSpacing,
          isDisabled = _props.isDisabled;


      var style = {
        width: width,
        border: border,
        borderRadius: borderRadius,
        color: textColor,
        backgroundColor: backgroundColor,
        margin: margin,
        cursor: isDisabled ? null : 'pointer',
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        letterSpacing: letterSpacing,
        transition: 'box-shadow 0.5s ease',
        boxShadow: this.state.isHovered ? '0px 2px 4px 0px rgba(0,0,0, 0.35)' : null
      };

      return _react2.default.createElement(
        'button',
        {
          style: style,
          onClick: this.handleClick,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onFocus: this.handleFocus },
        text
      );
    }
  }]);

  return Button;
}(_react2.default.Component);

Button.propTypes = {
  text: _react.PropTypes.node,
  textColor: _react.PropTypes.string,
  fontSize: _react.PropTypes.number,
  fontWeight: _react.PropTypes.number,
  fontFamily: _react.PropTypes.string,
  letterSpacing: _react.PropTypes.number,
  backgroundColor: _react.PropTypes.string,
  width: _react.PropTypes.number,
  border: _react.PropTypes.string,
  borderRadius: _react.PropTypes.number,
  isHoverable: _react.PropTypes.bool,
  margin: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  isDisabled: _react.PropTypes.bool
};
Button.defaultProps = {
  text: 'Button',
  textColor: '#000000',
  fontSize: 12,
  fontWeight: 200,
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  letterSpacing: 1,
  backgroundColor: '#f9f9f9',
  border: 'none',
  borderRadius: 2,
  isHoverable: false,
  isDisabled: false
};