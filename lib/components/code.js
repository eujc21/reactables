import React, { PropTypes } from 'react';
import merge from 'lodash/merge';

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
        backgroundColor: '#32b1d1'
      },
      text: {
        color: '#ffffff',
        margin: 0,
        padding: 0
      }
    },
    code: {
      margin: 0,
      backgroundColor: 'rgba(56, 210, 224, 0.1)',
      padding: 10
    }

  };

  merge(style, styles);

  return React.createElement(
    'div',
    { style: style.base },
    React.createElement(
      'div',
      { style: style.header.base },
      React.createElement(
        'h5',
        { style: style.header.text },
        type.toUpperCase()
      )
    ),
    React.createElement(
      'pre',
      { style: style.code },
      React.createElement(
        'code',
        null,
        JsxString(children)
      )
    )
  );
};

Code.propTypes = {
  type: PropTypes.string.isRequired,
  styles: PropTypes.object
};

Code.defaultProps = {
  type: 'code'
};

export default Code;

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