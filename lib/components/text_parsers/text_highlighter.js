'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextHighlighter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _text_menu = require('./text_menu');

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//const regex = /#!#(.*?)#!#(.*?)#!#/gi

var TextHighlighter = exports.TextHighlighter = function (_React$Component) {
  _inherits(TextHighlighter, _React$Component);

  function TextHighlighter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextHighlighter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextHighlighter.__proto__ || Object.getPrototypeOf(TextHighlighter)).call.apply(_ref, [this].concat(args))), _this), _this.state = { pageX: 0, pageY: 0, matches: [], selection: '' }, _this.onClickOutside = function (e) {
      if (_this.main && _this.main.contains(e.target)) {
        return;
      }

      _this.setState({ selection: '' });
    }, _this.getRegex = function () {
      var _this$props = _this.props,
          delimiter = _this$props.delimiter,
          dataId = _this$props.dataId;

      return new RegExp('' + delimiter + (dataId ? '(.*?)' + delimiter : '') + '(.*?)' + delimiter, 'gi');
    }, _this.parseText = function (text) {
      var regex = _this.getRegex();
      var matches = [];

      var match = null;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          dataId: _this.props.dataId ? match[1] : null,
          value: _this.props.dataId ? match[2] : match[1]
        });
      }

      _this.setState({ matches: matches });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextHighlighter, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.parseText(this.props.text);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.onClickOutside);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (!(0, _isEqual2.default)(nextProps.text, this.props.text)) this.parseText(this.props.text);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.onClickOutside);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          text = _props.text,
          textMenuOptions = _props.textMenuOptions,
          styles = _props.styles;
      var matches = this.state.matches;

      var TEXT_HIGHLIGHTER = '#!__TEXT_HIGHLIGHTER__!#';
      var regex = this.getRegex();

      var style = {
        base: {
          position: 'relative'
        },
        highlighted: {
          position: 'relative',
          backgroundColor: 'red',
          color: 'white',
          borderRadius: 2,
          padding: '0 3px',
          cursor: 'pointer'
        }
      };

      (0, _merge2.default)(style, styles);

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(node) {
            return _this2.node = node;
          },
          style: style.base
        },
        text.replace(regex, TEXT_HIGHLIGHTER).split(TEXT_HIGHLIGHTER).map(function (segment, i) {
          return _react2.default.createElement(
            'span',
            { key: i },
            segment,
            matches[i] ? _react2.default.createElement(
              Highlighted,
              {
                styles: style.highlighted,
                textMenuOptions: textMenuOptions,
                dataId: matches[i].dataId
              },
              matches[i].value
            ) : null
          );
        })
      );
    }
  }]);

  return TextHighlighter;
}(_react2.default.Component);

TextHighlighter.propTypes = {
  delimiter: _react.PropTypes.string,
  dataId: _react.PropTypes.bool,
  text: _react.PropTypes.string,
  textMenuOptions: _react.PropTypes.array,
  styles: _react.PropTypes.object
};
TextHighlighter.defaultProps = {
  dataId: false,
  delimiter: '#!#',
  textMenuOptions: null,
  styles: { base: {}, highlighted: {} }
};

var Highlighted = function (_React$Component2) {
  _inherits(Highlighted, _React$Component2);

  function Highlighted() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, Highlighted);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = Highlighted.__proto__ || Object.getPrototypeOf(Highlighted)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = { shouldShowMenu: false }, _this3.onClickOutside = function (e) {
      if (_this3.node && _this3.node.contains(e.target)) return;

      _this3.setState({ shouldShowMenu: false });
    }, _this3.handleClick = function () {
      _this3.setState({
        shouldShowMenu: !_this3.state.shouldShowMenu
      });
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(Highlighted, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.onClickOutside);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.onClickOutside);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          styles = _props2.styles,
          textMenuOptions = _props2.textMenuOptions,
          dataId = _props2.dataId,
          children = _props2.children;


      return _react2.default.createElement(
        'span',
        {
          ref: function ref(node) {
            return _this4.node = node;
          },
          'data-id': dataId,
          style: styles,
          onClick: this.handleClick
        },
        children,
        _react2.default.createElement(_text_menu.TextMenu, {
          textMenuOptions: textMenuOptions,
          pageX: 0,
          pageY: 0,
          selection: this.state.shouldShowMenu ? children : ''
        })
      );
    }
  }]);

  return Highlighted;
}(_react2.default.Component);