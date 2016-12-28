'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HiddenPanel = function (_React$Component) {
  _inherits(HiddenPanel, _React$Component);

  function HiddenPanel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HiddenPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HiddenPanel.__proto__ || Object.getPrototypeOf(HiddenPanel)).call.apply(_ref, [this].concat(args))), _this), _this.calculateHeightOffset = function () {
      _this.setState({ length: window.innerHeight - _this.props.offSet });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HiddenPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.calculateHeightOffset, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.calculateHeightOffset, false);
    }
  }, {
    key: 'setVisibility',
    value: function setVisibility(style) {
      var _props = this.props,
          position = _props.position,
          isVisible = _props.isVisible,
          width = _props.width;

      style[position] = isVisible ? 0 : -width;
      return style;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          offSet = _props2.offSet,
          position = _props2.position,
          width = _props2.width,
          animationTime = _props2.animationTime,
          children = _props2.children;

      var height = window.innerHeight - this.props.offSet;

      var style = {
        top: 0,
        backgroundColor: 'transparent',
        width: position === 'right' || position === 'left' ? width : height,
        height: position === 'bottom' || position === 'top' ? width : height,
        position: 'fixed',
        zIndex: 1000000,
        transition: animationTime
      };

      // append positioning while visible
      style = this.setVisibility(style);

      //calculate offSet
      if (offSet) {
        style.top = position === 'left' || position === 'right' ? offSet : style.top;
      }

      return _react2.default.createElement(
        'div',
        { ref: function ref(panel) {
            return _this2.panel = panel;
          }, style: style },
        children
      );
    }
  }]);

  return HiddenPanel;
}(_react2.default.Component);

HiddenPanel.propTypes = {
  isVisible: _react.PropTypes.bool,
  offSet: _react.PropTypes.number,
  position: _react.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  animationTime: _react.PropTypes.string,
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};
HiddenPanel.defaultProps = {
  isVisible: false,
  position: 'right',
  animationTime: '1s',
  width: 200,
  offSet: 0
};
exports.default = HiddenPanel;