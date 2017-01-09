'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavbarLink = exports.Navbar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
  }

  _createClass(Navbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          children = _props.children;


      var style = {
        base: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 9999,
          top: 0,
          width: '100%',
          height: 70,
          backgroundColor: '#000000',
          transform: 'translateZ(0)',
          position: 'fixed',
          MozTransform: 'translatez(0)',
          MsTransform: 'translatez(0)',
          OTransform: 'translatez(0)',
          WebkitTransform: 'translateZ(0)',
          WebkitFontSmoothing: 'antialiased'
        },
        links: {
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          height: '100%',
          listStyleType: 'none'
        }
      };

      (0, _merge2.default)(style, styles);

      var links = _react2.default.Children.toArray(children).reduce(function (obj, link) {
        if (link.props.align === 'left') {
          obj.left.push(link);
        } else {
          obj.right.push(link);
        }
        return obj;
      }, { left: [], right: [] });

      return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement(
          'ul',
          { style: style.links },
          links.left
        ),
        _react2.default.createElement(
          'ul',
          { style: style.links },
          links.right
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

Navbar.propTypes = {
  styles: _react.PropTypes.object,
  mobileWidth: _react.PropTypes.number
};
Navbar.defaultProps = {
  styles: {}
};


var NavbarLink = function NavbarLink(_ref) {
  var to = _ref.to,
      children = _ref.children,
      styles = _ref.styles;


  var style = {
    base: {
      height: '100%',
      display: 'inline',
      padding: 0

    },
    link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      margin: 0,
      padding: '0 15px',
      fontSize: 14,
      textDecoration: 'none',
      color: 'white',
      cursor: 'pointer'
    }
  };

  (0, _merge2.default)(style, styles);

  return _react2.default.createElement(
    'li',
    {
      style: style.base
    },
    typeof to === 'string' ? _react2.default.createElement(
      'a',
      { style: style.link, href: to },
      children
    ) : _react2.default.createElement(
      'a',
      { style: style.link, onClick: to },
      children
    )
  );
};

NavbarLink.PropTypes = {
  align: _react.PropTypes.oneOf(['left', 'right']),
  to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired
};

NavbarLink.defaultProps = {
  align: 'left'
};

exports.Navbar = Navbar;
exports.NavbarLink = NavbarLink;