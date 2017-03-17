'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextSelector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _text_menu = require('./text_menu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextSelector = exports.TextSelector = function (_React$Component) {
  _inherits(TextSelector, _React$Component);

  function TextSelector() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextSelector.__proto__ || Object.getPrototypeOf(TextSelector)).call.apply(_ref, [this].concat(args))), _this), _this.state = { selection: '', pageX: 0, pageY: 0 }, _this.onClickOutside = function (e) {
      if (_this.node && _this.node.contains(e.target)) return;

      _this.setState({ selection: '' });
    }, _this.onMouseUp = function () {
      // create a span with #__text_highlighter
      var span = document.createElement("span");
      span.id = '__text_highlighter';

      // get selection and attach span @ selection range
      var select = document.getSelection();
      if (select.rangeCount) {
        var range = select.getRangeAt(0).cloneRange();

        try {
          range.surroundContents(span);
        } catch (e) {
          console.warn(e);
          return;
        }

        select.removeAllRanges();
        select.addRange(range);
      }

      // get attached span element; assign offset to state
      var element = document.getElementById('__text_highlighter');
      var selection = select.toString().trim();

      _this.setState({
        selection: selection,
        pageX: element.offsetLeft,
        pageY: element.offsetTop
      });

      if (_this.props.onSelect) _this.props.onSelect(selection);
    }, _this.onMouseDown = function (e) {
      _this.node.focus();
      var element = document.getElementById('__text_highlighter');

      if (!element) return;

      // move contents out of span
      while (element.firstChild) {
        element.parentNode.insertBefore(element.firstChild, element);
      }

      // remove span
      element.parentNode.removeChild(element);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextSelector, [{
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
          children = _props.children,
          textMenuOptions = _props.textMenuOptions,
          style = _props.style;
      var _state = this.state,
          selection = _state.selection,
          pageX = _state.pageX,
          pageY = _state.pageY;


      var styles = {
        base: {
          position: 'relative',
          userSelect: 'contain' }
      };

      (0, _merge2.default)(styles, style);

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(node) {
            return _this2.node = node;
          },
          style: styles.base,
          onMouseUp: this.onMouseUp,
          onMouseDown: this.onMouseDown
        },
        children,
        _react2.default.createElement(_text_menu.TextMenu, {
          textMenuOptions: textMenuOptions,
          pageX: pageX,
          pageY: pageY,
          selection: selection
        })
      );
    }
  }]);

  return TextSelector;
}(_react2.default.Component);

TextSelector.propTypes = {
  onSelect: _react.PropTypes.func,
  textMenuOptions: _react.PropTypes.array,
  style: _react.PropTypes.object
};
TextSelector.defaultProps = {
  onSelect: function onSelect() {},
  style: { base: {} }
};