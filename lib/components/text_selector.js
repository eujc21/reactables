'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextSelectorOption = exports.TextSelector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

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

        // TODO: add error handling if range is on non-text

        range.surroundContents(span);
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
          menuOptions = _props.menuOptions;
      var _state = this.state,
          selection = _state.selection,
          pageX = _state.pageX,
          pageY = _state.pageY;


      var style = {
        base: {},
        menu: {
          base: {
            visibility: selection.length ? 'visible' : 'hidden',
            left: pageX + 10,
            top: pageY - 27,
            position: 'absolute'
          },
          options: {
            backgroundColor: 'black',
            color: 'white',
            fontSize: 12,
            borderRadius: 2,
            margin: 0,
            padding: 0,
            listStyleType: 'none'
          },
          arrowDown: {
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #000',
            marginLeft: 5
          }
        }
      };
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(node) {
            return _this2.node = node;
          },
          style: style.base,
          onMouseUp: this.onMouseUp,
          onMouseDown: this.onMouseDown
        },
        children,
        _react2.default.createElement(
          'div',
          { style: style.menu.base },
          _react2.default.createElement(
            'ul',
            { style: style.menu.options },
            menuOptions ? menuOptions.map(function (option, i) {
              return _react2.default.cloneElement(option, {
                key: i,
                selection: selection
              });
            }) : null
          ),
          _react2.default.createElement('div', { style: style.menu.arrowDown })
        )
      );
    }
  }]);

  return TextSelector;
}(_react2.default.Component);

TextSelector.propTypes = {
  onSelect: _react.PropTypes.func,
  menuOptions: _react.PropTypes.array
};

var TextSelectorOption = exports.TextSelectorOption = function (_React$Component2) {
  _inherits(TextSelectorOption, _React$Component2);

  function TextSelectorOption() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, TextSelectorOption);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = TextSelectorOption.__proto__ || Object.getPrototypeOf(TextSelectorOption)).call.apply(_ref2, [this].concat(args))), _this3), _this3.onClick = function () {
      var _this3$props = _this3.props,
          selection = _this3$props.selection,
          onClick = _this3$props.onClick;

      onClick(selection);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(TextSelectorOption, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      var style = {
        display: 'inline-block',
        padding: 6,
        cursor: 'pointer'
      };

      return _react2.default.createElement(
        'li',
        { style: style, onMouseDown: this.onClick },
        children
      );
    }
  }]);

  return TextSelectorOption;
}(_react2.default.Component);

TextSelectorOption.propTypes = {
  onClick: _react.PropTypes.func
};