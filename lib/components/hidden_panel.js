'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: 1. Allow for 'style' prop, 2. Optional alpha overlay,

var HiddenPanel = function (_React$Component) {
  _inherits(HiddenPanel, _React$Component);

  function HiddenPanel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HiddenPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HiddenPanel.__proto__ || Object.getPrototypeOf(HiddenPanel)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
      if (_this.props.onClick) _this.props.onClick();
    }, _this.onClickOutside = function (e) {
      if (_this.panel && _this.panel.contains(e.target)) return;

      if (!_this.props.isVisible) return;

      if (_this.props.onClickOutside) _this.props.onClickOutside();
    }, _this.calculateHeightOffset = function () {
      _this.setState({ length: window.innerHeight - _this.props.offSet });
    }, _this.setVisibility = function (styles) {
      var _this$props = _this.props,
          position = _this$props.position,
          isVisible = _this$props.isVisible,
          width = _this$props.width;

      styles.panel[position] = isVisible ? 0 : -width;
      return styles;
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
      document.removeEventListener('click', this.onClickOutside, false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isVisible) {
        document.addEventListener('click', this.onClickOutside, false);
      }

      if (nextProps.isVisible === false) {
        document.removeEventListener('click', this.onClickOutside, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          offSet = _props.offSet,
          position = _props.position,
          width = _props.width,
          animationTime = _props.animationTime,
          isVisible = _props.isVisible,
          style = _props.style,
          children = _props.children;

      var height = window.innerHeight - offSet;

      var styles = {
        panel: {
          top: 0,
          backgroundColor: 'transparent',
          width: position === 'right' || position === 'left' ? width : height,
          height: position === 'bottom' || position === 'top' ? width : height,
          position: 'fixed',
          zIndex: 1000000,
          transition: animationTime,
          boxSizing: 'border-box'
        },
        overlay: {
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 999999,
          backgroundColor: 'rgba(0,0,0,0.5)',
          transition: 'all ' + animationTime + ' ease-in-out'
        }
      };

      // append positioning while visible
      styles = this.setVisibility(styles);

      // merge styles
      (0, _merge2.default)(styles, style);

      //calculate offSet
      if (offSet) {
        styles.top = position === 'left' || position === 'right' ? offSet : styles.top;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          {
            ref: function ref(panel) {
              return _this2.panel = panel;
            },
            style: styles.panel
          },
          children
        ),
        isVisible ? _react2.default.createElement('div', { style: styles.overlay }) : null
      );
    }
  }]);

  return HiddenPanel;
}(_react2.default.Component);

HiddenPanel.propTypes = {
  isVisible: _react.PropTypes.bool,
  offSet: _react.PropTypes.number,
  position: _react.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  width: _react.PropTypes.number,
  animationTime: _react.PropTypes.string,
  style: _react.PropTypes.object,
  onClickOutside: _react.PropTypes.func,
  onClick: _react.PropTypes.func
};
HiddenPanel.defaultProps = {
  isVisible: false,
  position: 'right',
  animationTime: '0.5s',
  width: 200,
  offSet: 0,
  style: {}
};
exports.default = HiddenPanel;