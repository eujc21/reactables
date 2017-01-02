var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setElement } from './element_loader_reducer';
import '../../styles/spinner.css';

var ElementLoader = function (_React$Component) {
  _inherits(ElementLoader, _React$Component);

  function ElementLoader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ElementLoader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ElementLoader.__proto__ || Object.getPrototypeOf(ElementLoader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      style: {}
    }, _this.fixStylePrefix = function (element) {
      if (!element) return;

      var style = window.getComputedStyle(element);
      return Object.keys(style).reduce(function (obj, key) {

        //capitalize webkit
        key = key.replace('webkit', 'Webkit');

        return _extends({}, obj, _defineProperty({}, key, style[key]));
      }, {});
    }, _this.renderLoadingElement = function () {
      var spinner = _this.props.spinner;


      var style = {
        base: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        },
        span: {
          display: 'inline-block',
          width: 20,
          height: 20,
          margin: '0 5px',
          borderRadius: '100%',
          backgroundColor: '#3498db',
          opacity: 0
        }
      };

      return React.createElement(
        'div',
        { style: _extends({}, _this.state.style, style.base) },
        spinner ? spinner : React.createElement(
          'div',
          { className: 'element-loader' },
          React.createElement('span', { style: style.span }),
          React.createElement('span', { style: style.span }),
          React.createElement('span', { style: style.span })
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ElementLoader, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          setElement = _props.setElement,
          action = _props.action;


      if (action) setElement(action);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var child = this.refs.child;

      this.setState({
        style: _extends({}, this.fixStylePrefix(child), {
          height: child ? child.clientHeight : null,
          width: child ? child.clientWidth : null
        })
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          elements = _props2.elements,
          action = _props2.action;


      return React.createElement(
        'div',
        null,
        elements[action] ? this.renderLoadingElement() : React.cloneElement(children, { ref: 'child' })
      );
    }
  }]);

  return ElementLoader;
}(React.Component);

ElementLoader.propTypes = {
  action: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  spinner: PropTypes.node
};


function mapStateToProps(state) {
  return {
    elements: state.elementLoaderReducer
  };
}

export default connect(mapStateToProps, {
  setElement: setElement
})(ElementLoader);