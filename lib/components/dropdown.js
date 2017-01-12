'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownOption = exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isHighlighted: false, isMenuVisible: false }, _this.onClickOutside = function (e) {
      if (_this.main && _this.main.contains(e.target)) {
        return;
      }

      _this.setState({
        isMenuVisible: false,
        isHighlighted: false
      });
    }, _this.toggleButtonHighlight = function () {
      if (_this.props.isDisabled) return;

      _this.setState({
        isHighlighted: _this.state.isMenuVisible === true ? _this.state.isHighlighted : !_this.state.isHighlighted,
        isMenuVisible: _this.state.isHighlighted === true ? _this.state.isMenuVisible : false
      });
    }, _this.toggleMenu = function () {
      if (_this.props.isDisabled) return;

      _this.setState({
        isMenuVisible: !_this.state.isMenuVisible
      });
    }, _this.handleMenuClick = function () {
      _this.setState({
        isMenuVisible: false,
        isHighlighted: false
      });
    }, _this.setChildPosition = function (index) {
      if (index === 0) return 'first';
      if (index === _this.props.children.length - 1) return 'last';

      return 'middle';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dropdown, [{
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
          isDisabled = _props.isDisabled,
          children = _props.children,
          styles = _props.styles;


      var style = {
        base: {
          display: 'inline-block',
          position: 'relative'
        },
        node: {
          borderRadius: 3,
          transition: 'box-shadow 0.5s ease',
          boxShadow: this.state.isHighlighted ? '0px 2px 4px 0px rgba(0,0,0, 0.29)' : null,
          cursor: isDisabled ? null : 'pointer'

          // face:{
          //   transition: 'transform 0.5s ease-in-out',
          //   transform: this.state.isHighlighted && this.props.animate ? 'rotate(-90deg)' : null
          // }
        },
        menu: {
          position: 'absolute',
          visibility: this.state.isMenuVisible ? 'visible' : 'hidden',
          width: 'auto',
          minWidth: 200,
          right: this.props.menuDirection === 'left' ? 0 : null,
          left: this.props.menuDirection === 'right' ? 0 : null,
          marginTop: 3,
          backgroundColor: 'white',
          borderTop: '1px solid #dcdcdc',
          borderLeft: '1px solid #dcdcdc',
          borderRight: '1px solid #dcdcdc',
          borderRadius: 3,
          transition: '0.5s ease',
          opacity: this.state.isMenuVisible ? 1 : 0,
          zIndex: 10000
        }
      };

      (0, _merge2.default)(style, styles);

      return _react2.default.createElement(
        'span',
        { ref: function ref(main) {
            return _this2.main = main;
          }, style: style.base },
        _react2.default.createElement(
          'div',
          {
            style: style.node,
            onMouseEnter: this.toggleButtonHighlight,
            onMouseLeave: this.toggleButtonHighlight,
            onClick: this.toggleMenu },
          _react2.default.createElement(
            'div',
            { style: style.node },
            this.props.node
          )
        ),
        _react2.default.createElement(
          'div',
          { style: style.menu, onClick: this.handleMenuClick },
          _react2.default.Children.map(children, function (child, i) {
            return _react2.default.cloneElement(child, {
              position: _this2.setChildPosition(i)
            });
          })
        )
      );
    }
  }]);

  return Dropdown;
}(_react2.default.Component);

Dropdown.propTypes = {
  node: _react.PropTypes.node.isRequired,
  isDisabled: _react.PropTypes.bool,
  menuDirection: _react.PropTypes.string,
  children: _react.PropTypes.arrayOf(function (propValue, key) {
    if (propValue[key].type !== DropdownOption) return new Error('One or more children are not of type DropdownItem');
  }),
  styles: _react.PropTypes.object
};
Dropdown.defaultProps = {
  animate: false,
  menuDirection: 'right',
  isDisabled: false
};


var DropdownOption = function DropdownOption(_ref2) {
  var text = _ref2.text,
      position = _ref2.position,
      onClick = _ref2.onClick,
      styles = _ref2.styles;


  var onEnterMenuItem = function onEnterMenuItem(e) {
    e.target.style.backgroundColor = '#f9f9f9';
  };

  var onLeaveMenuItem = function onLeaveMenuItem(e) {
    e.target.style.backgroundColor = 'white';
  };

  var handleClick = function handleClick() {
    onClick();
  };

  var setBorderRadius = function setBorderRadius() {
    if (position === 'first') return '3px 3px 0 0';

    if (position === 'middle') return 0;

    if (position === 'last') return '0 0 3px 3px';
  };

  var style = {
    padding: 10,
    fontSize: 16,
    cursor: 'pointer',
    transition: '0.2s all',
    borderRadius: setBorderRadius(),
    borderBottom: '1px solid #dcdcdc'
  };

  (0, _merge2.default)(style, styles);

  return _react2.default.createElement(
    'div',
    {
      style: style,
      onMouseEnter: onEnterMenuItem,
      onMouseLeave: onLeaveMenuItem,
      onClick: handleClick
    },
    text
  );
};

DropdownOption.propTypes = {
  text: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.node]).isRequired,
  shouldHideMenu: _react.PropTypes.bool,
  onClick: _react.PropTypes.func.isRequired,
  styles: _react.PropTypes.object
};

DropdownOption.defaultProps = {
  shouldHideMenu: true
};

exports.Dropdown = Dropdown;
exports.DropdownOption = DropdownOption;