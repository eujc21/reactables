'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextMenu = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextMenu = exports.TextMenu = function TextMenu(_ref) {
  var textMenuOptions = _ref.textMenuOptions,
      pageX = _ref.pageX,
      pageY = _ref.pageY,
      selection = _ref.selection;


  var style = {
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
      listStyleType: 'none',
      whiteSpace: 'nowrap'
    },
    arrowDown: {
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid #000',
      marginLeft: 5
    }
  };
  return _react2.default.createElement(
    'div',
    { style: style.base },
    _react2.default.createElement(
      'ul',
      { style: style.options },
      textMenuOptions ? textMenuOptions.map(function (option, i) {
        return _react2.default.cloneElement(option, {
          key: i,
          selection: selection
        });
      }) : null
    ),
    _react2.default.createElement('div', { style: style.arrowDown })
  );
};