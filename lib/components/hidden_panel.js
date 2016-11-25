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

  function HiddenPanel(props) {
    _classCallCheck(this, HiddenPanel);

    var _this = _possibleConstructorReturn(this, (HiddenPanel.__proto__ || Object.getPrototypeOf(HiddenPanel)).call(this, props));

    _this.state = {
      length: window.innerHeight - _this.props.offSet
    };

    _this.calculateHeightOffset = function () {
      _this.setState({ length: window.innerHeight - _this.props.offSet });
    };

    return _this;
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
    key: 'render',
    value: function render() {
      var _props = this.props,
          offSet = _props.offSet,
          isVisible = _props.isVisible,
          position = _props.position,
          width = _props.width,
          animationTime = _props.animationTime,
          children = _props.children;
      var length = this.state.length;


      var style = {
        backgroundColor: 'transparent',
        left: position === 'left' ? isVisible ? 0 : -width : null,
        right: position === 'right' ? isVisible ? 0 : -width : null,
        top: position === 'top' ? isVisible ? 0 : -width : null,
        paddingBottom: 120,
        bottom: position === 'bottom' ? isVisible ? 0 : -width : null,
        width: position === 'right' || position === 'left' ? width : length,
        height: position === 'bottom' || position === 'top' ? width : length,
        position: 'fixed',
        zIndex: 1000000,
        transition: animationTime
      };

      //calculate offSet
      if (offSet) {
        style.top = position === 'left' || position === 'right' ? offSet : style.top;
      }

      return _react2.default.createElement(
        'div',
        { style: style },
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