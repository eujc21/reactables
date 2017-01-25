'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavbarLink = exports.Navbar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./button');

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Navbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isMobile: false,
      isMenuVisible: false
    }, _this.calculateLinkWidth = function () {
      var leftWidth = parseInt(window.getComputedStyle(_this.leftLinks).width) || 0;
      var rightWidth = parseInt(window.getComputedStyle(_this.rightLinks).width) || 0;
      return leftWidth + rightWidth;
    }, _this.updateIsMobile = function () {
      var isMobile = !_this.mediaQuery.matches;
      _this.setState({
        isMobile: isMobile,
        isMenuVisible: false
      });
    }, _this.toggleMobileMenu = function () {
      _this.setState({
        isMenuVisible: !_this.state.isMenuVisible
      });
    }, _this.handleMenuClick = function () {
      _this.setState({
        isMenuVisible: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Navbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var responsiveWidth = this.props.responsiveWidth;


      var minWidth = responsiveWidth === 'auto' ? this.calculateLinkWidth() : responsiveWidth;

      this.mediaQuery = window.matchMedia('(min-width: ' + minWidth + 'px)');
      this.mediaQuery.addListener(this.updateIsMobile);
      this.updateIsMobile();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mediaQuery.removeListener(this.updateIsMobile);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          children = _props.children;
      var _state = this.state,
          isMobile = _state.isMobile,
          isMenuVisible = _state.isMenuVisible;


      var style = {
        base: {
          position: 'relative',
          width: '100%',
          zIndex: 9999
        },
        bar: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 70,
          backgroundColor: '#000000',
          top: 0,
          left: 0
        },
        linkContainer: {
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          height: '100%',
          listStyleType: 'none'
        },
        menuButton: {
          margin: '0 15px',
          padding: '5px 10px'
        },
        menu: {
          position: 'absolute',
          width: '100%',
          backgroundColor: '#525252',
          margin: 0,
          paddingLeft: 0,
          visibility: isMenuVisible ? 'visible' : 'hidden',
          overflowY: 'hidden',
          //transition: 'all 0.7s ease-in-out',
          boxShadow: '0px 2px 4px 0px rgba(0,0,0, 0.35)'
        }
      };

      (0, _merge2.default)(style, styles);

      return _react2.default.createElement(
        'div',
        { style: style.base },
        isMobile ? this.renderMobile(children, style) : this.renderDesktop(children, style)
      );
    }
  }, {
    key: 'renderDesktop',
    value: function renderDesktop(children, style) {
      var _this2 = this;

      var links = _react2.default.Children.toArray(children).reduce(function (obj, link) {
        var append = link.props.append;

        obj[append].push(_react2.default.cloneElement(link, { isMobile: false }));
        return obj;
      }, { left: [], right: [] });

      return _react2.default.createElement(
        'div',
        { style: style.bar },
        _react2.default.createElement(
          'ul',
          { ref: function ref(ul) {
              return _this2.leftLinks = ul;
            }, style: style.linkContainer },
          links.left
        ),
        _react2.default.createElement(
          'ul',
          { ref: function ref(ul) {
              return _this2.rightLinks = ul;
            }, style: style.linkContainer },
          links.right
        )
      );
    }
  }, {
    key: 'renderMobile',
    value: function renderMobile(children, style) {
      var _this3 = this;

      var links = _react2.default.Children.toArray(children).reduce(function (obj, link) {
        var appendResponsive = link.props.appendResponsive;

        obj[appendResponsive].push(_react2.default.cloneElement(link, { isMobile: appendResponsive !== 'bar' }));
        return obj;
      }, { bar: [], menu: [] });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: style.bar },
          _react2.default.createElement(
            'ul',
            { style: style.linkContainer },
            links.bar
          ),
          _react2.default.createElement(_button.Button, {
            text: _react2.default.createElement('i', { className: 'icon-hamburger' }),
            styles: style.menuButton,
            onClick: this.toggleMobileMenu
          })
        ),
        _react2.default.createElement(
          'ul',
          {
            ref: function ref(ul) {
              return _this3.menu = ul;
            },
            style: style.menu,
            onClick: this.handleMenuClick
          },
          links.menu
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

Navbar.propTypes = {
  styles: _react.PropTypes.object,
  responsiveWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  menuIcon: _react.PropTypes.node,
  appendMenuButton: _react.PropTypes.oneOf(['left', 'right'])
};
Navbar.defaultProps = {
  styles: {},
  responsiveWidth: 'auto',
  appendMenuButton: 'right'
};

var NavbarLink = function (_React$Component2) {
  _inherits(NavbarLink, _React$Component2);

  function NavbarLink() {
    var _ref2;

    var _temp2, _this4, _ret2;

    _classCallCheck(this, NavbarLink);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref2 = NavbarLink.__proto__ || Object.getPrototypeOf(NavbarLink)).call.apply(_ref2, [this].concat(args))), _this4), _this4.state = { isHovered: false }, _this4.handleHover = function () {
      _this4.setState({
        isHovered: !_this4.state.isHovered
      });
    }, _this4.setLinkColor = function (style) {
      var _this4$props = _this4.props,
          isActive = _this4$props.isActive,
          isMobile = _this4$props.isMobile;
      var isHovered = _this4.state.isHovered;


      if (isMobile) {
        if (isActive) (0, _merge2.default)(style.menuLink.base, style.menuLink.active);
        if (isHovered) (0, _merge2.default)(style.menuLink.base, style.menuLink.hover);
      } else {
        if (isActive) (0, _merge2.default)(style.link.base, style.link.active);
        if (isHovered) (0, _merge2.default)(style.link.base, style.link.hover);
      }

      return style;
    }, _temp2), _possibleConstructorReturn(_this4, _ret2);
  }

  _createClass(NavbarLink, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          to = _props2.to,
          isMobile = _props2.isMobile,
          styles = _props2.styles;


      var style = {
        base: {
          height: '100%',
          display: 'inline',
          padding: 0
        },
        link: {
          base: {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            margin: 0,
            padding: '0 15px',
            fontSize: 14,
            textDecoration: 'none',
            color: 'white',
            cursor: 'pointer'
          },
          active: {
            backgroundColor: '#cecece'
          },
          hover: {
            backgroundColor: '#cecece'
          }
        },
        menuLink: {
          base: {
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #282828',
            height: '100%',
            margin: 0,
            padding: '20px 15px',
            fontSize: 14,
            textDecoration: 'none',
            color: 'white',
            cursor: 'pointer'
          },
          active: {
            backgroundColor: '#cecece'
          },
          hover: {
            backgroundColor: '#cecece'
          }

        }
      };

      (0, _merge2.default)(style, styles);
      this.setLinkColor(style);

      return _react2.default.createElement(
        'li',
        { style: style.base, onMouseEnter: this.handleHover, onMouseLeave: this.handleHover },
        typeof to === 'string' ? _react2.default.createElement(
          'a',
          { style: isMobile ? style.menuLink.base : style.link.base, href: to },
          children
        ) : _react2.default.createElement(
          'a',
          { style: isMobile ? style.menuLink.base : style.link.base, onClick: to },
          children
        )
      );
    }
  }]);

  return NavbarLink;
}(_react2.default.Component);

NavbarLink.propTypes = {
  append: _react.PropTypes.oneOf(['left', 'right']),
  appendResponsive: _react.PropTypes.oneOf(['bar', 'menu', 'hide']),
  to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired,
  isActive: _react.PropTypes.bool
};
NavbarLink.defaultProps = {
  append: 'left',
  appendResponsive: 'menu',
  isActive: false
};
exports.Navbar = Navbar;
exports.NavbarLink = NavbarLink;