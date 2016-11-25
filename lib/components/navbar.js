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

// ** usage ( using react-router Link )**
//
// <Navbar
//   brand={ <Link to={ '/' }> BRAND </Link> }
//   color={ '#ffffff' }
//   backgroundColor={ '#000000' }>
//   {[
//     { link: <Link to={ '/link1' }>Link 1</Link> },
//     { link: <Link to={ '/link2' }>Link 2</Link> }
//   ]}
// </Navbar>

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
          brand = _props.brand,
          height = _props.height,
          backgroundColor = _props.backgroundColor,
          color = _props.color,
          children = _props.children;


      var style = {
        base: {
          display: 'flex',
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          width: '100%',
          height: height,
          backgroundColor: backgroundColor,
          textDecoration: 'none'
        },
        brand: {
          display: 'flex',
          alignItems: 'center',
          height: height,
          color: color,
          padding: '0 15px'
        },
        bar: {
          base: {
            display: 'flex',
            alignItems: 'center'
          },
          link: {
            display: 'flex',
            alignItems: 'center',
            height: height,
            color: '#ffffff',
            padding: '0 15px',
            textDecoration: 'none'
          }
        }
      };
      return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement(
          'div',
          { style: style.brand },
          brand
        ),
        _react2.default.createElement(
          'div',
          { style: style.bar.base },
          children.map(function (child, i) {
            return _react2.default.createElement(
              'div',
              { key: i, style: style.bar.link },
              child.link
            );
          })
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

Navbar.propTypes = {
  height: _react.PropTypes.number,
  color: _react.PropTypes.string,
  backgroundColor: _react.PropTypes.string
};
Navbar.defaultProps = {
  height: 70,
  color: '#ffffff',
  backgroundColor: '#333333'
};
exports.default = Navbar;