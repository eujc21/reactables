var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import { getTop } from '../utils/utils';
import merge from 'lodash/merge';

export var Nav = function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Nav);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Nav.__proto__ || Object.getPrototypeOf(Nav)).call.apply(_ref, [this].concat(args))), _this), _this.state = { top: undefined }, _this.adjustOffset = function () {
      var offsetTop = _this.props.offsetTop;

      var top = window.pageYOffset <= _this.top - _this.paddingTop - offsetTop ? _this.top - window.pageYOffset : _this.paddingTop + offsetTop;

      _this.setState({ top: top });
    }, _this.setChildPosition = function (index) {
      if (index === 0) return 'first';
      if (index === _this.props.children.length - 1) return 'last';

      return 'middle';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Nav, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // set top and offset
      this.top = getTop(this.container);
      this.paddingTop = parseInt(window.getComputedStyle(this.container.parentNode).paddingTop);
      this.adjustOffset();

      window.addEventListener('scroll', this.adjustOffset);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.adjustOffset);
    }

    // pass position as a prop to NavLink

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          styles = _props.styles;


      var style = {
        base: {
          position: 'relative',
          width: 200
        },
        nav: {
          position: 'fixed',
          top: this.state.top,
          listStyleType: 'none',
          borderTop: '1px solid #dcdcdc',
          borderLeft: '1px solid #dcdcdc',
          borderRight: '1px solid #dcdcdc',
          borderRadius: 5,
          width: 'inherit',
          padding: 0,
          margin: 0,
          zIndex: 10000,
          boxSizing: 'border-box'
        }
      };

      merge(style, styles);

      return React.createElement(
        'div',
        { ref: function ref(container) {
            return _this2.container = container;
          }, style: style.base },
        React.createElement(
          'ul',
          { style: style.nav },
          children ? React.Children.map(children, function (child, i) {
            return React.cloneElement(child, {
              position: _this2.setChildPosition(i)
            });
          }) : null
        )
      );
    }
  }]);

  return Nav;
}(React.Component);

Nav.propTypes = {
  initialTop: PropTypes.number,
  offsetTop: PropTypes.number,
  styles: PropTypes.object
};
Nav.defaultProps = {
  styles: {},
  offsetTop: 0
};
export var NavLink = function (_React$Component2) {
  _inherits(NavLink, _React$Component2);

  function NavLink() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, NavLink);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = NavLink.__proto__ || Object.getPrototypeOf(NavLink)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = { isHovered: false }, _this3.handleHover = function (e) {
      _this3.setState({
        isHovered: !_this3.state.isHovered
      });
    }, _this3.setBorderRadius = function () {
      var position = _this3.props.position;

      if (position === 'first') return '5px 5px 0 0';

      if (position === 'middle') return 0;

      if (position === 'last') return '0 0 5px 5px';
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(NavLink, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          to = _props2.to,
          children = _props2.children,
          styles = _props2.styles,
          hoverColor = _props2.hoverColor,
          backgroundColor = _props2.backgroundColor;


      var style = {
        base: {
          position: 'relative',
          backgroundColor: this.state.isHovered ? hoverColor : backgroundColor,
          borderBottom: '1px solid #dcdcdc',
          padding: 0,
          fontSize: 14,
          borderRadius: this.setBorderRadius()
        },
        link: {
          display: 'block',
          margin: 0,
          padding: '5px 3px',
          height: '100%',
          textDecoration: 'none',
          color: 'black'
        }
      };

      merge(style, styles);

      return React.createElement(
        'li',
        {
          style: style.base,
          onMouseEnter: this.handleHover,
          onMouseLeave: this.handleHover
        },
        typeof to === 'string' ? React.createElement(
          'a',
          { style: style.link, href: to },
          children
        ) : React.createElement(
          'a',
          { style: style.link, href: '', onClick: to },
          children
        )
      );
    }
  }]);

  return NavLink;
}(React.Component);
NavLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  styles: PropTypes.object,
  hoverColor: PropTypes.string,
  backgroundColor: PropTypes.string
};
NavLink.defaultProps = {
  styles: {},
  hoverColor: '#ffffff',
  backgroundColor: 'transparent'
};