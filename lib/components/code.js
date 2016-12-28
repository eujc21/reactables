'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Code = function Code(_ref) {
  var type = _ref.type,
      styles = _ref.styles,
      children = _ref.children;


  var style = {
    base: {
      border: '1px solid rgba(16,16,16,0.1)',
      borderRadius: 2,
      marginTop: 10
    },
    header: {
      base: {
        padding: 5,
        backgroundColor: '#F0AD4E'
      },
      text: {
        color: '#6E4A2A',
        margin: 0,
        padding: 0
      }
    },
    code: {
      margin: 0,
      backgroundColor: '#f8f5ec',
      padding: 10
    }

  };

  (0, _merge2.default)(style, styles);

  return _react2.default.createElement(
    'div',
    { style: style.base },
    _react2.default.createElement(
      'div',
      { style: style.header.base },
      _react2.default.createElement(
        'h5',
        { style: style.header.text },
        type.toUpperCase()
      )
    ),
    _react2.default.createElement(
      'pre',
      { style: style.code },
      _react2.default.createElement(
        'code',
        null,
        JsxString(children)
      )
    )
  );
};

Code.propTypes = {
  type: _react.PropTypes.string.isRequired,
  styles: _react.PropTypes.object
};

Code.defaultProps = {
  type: 'code'
};

exports.default = Code;


var JsxString = function JsxString(component) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


  if (!(component instanceof Object)) return component;

  var type = component.type.name || component.type;
  var props = component.props;
  var propsString = "";

  // handle Redux wrapped components
  if (component.type.name === 'Connect') type = component.type.WrappedComponent.name;

  for (var key in props) {
    if (key !== "children") {

      var propValue = props[key];
      var value = "";

      if (typeof propValue === 'string') {
        value = '"' + propValue + '"';
      } else if (propValue instanceof Function) {
        value = propValue.toString();
      } else if (propValue instanceof Object) {
        value = '{' + JSON.stringify(propValue).replace(/['"]+/g, '') + '}';
      } else {
        value = '{' + propValue + '}';
      }
      propsString += '\n\r ' + key + '=' + value;
    }
  }

  if (props.children) {
    counter += 2;
    var children = JsxString(props.children, counter);
    return '<' + type + propsString + '>\n' + Array(counter - 1).join(" ") + '  ' + children + '\n' + Array(counter - 1).join(" ") + '</' + type + '>';
  }

  return '<' + type + propsString + '/>';
};