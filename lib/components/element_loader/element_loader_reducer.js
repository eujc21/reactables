'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.showElement = showElement;
exports.hideElement = hideElement;
exports.setElement = setElement;
exports.default = elementLoaderReducer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SHOW = exports.SHOW = 'element-loader/SHOW';
var HIDE = exports.HIDE = 'element-loader/HIDE';
var SET_ELEMENT = exports.SET_ELEMENT = 'element-loader/SET_ELEMENT';

function showElement(prefix) {
  return {
    type: SHOW,
    prefix: prefix
  };
}

function hideElement(prefix) {
  return {
    type: HIDE,
    prefix: prefix
  };
}

function setElement(prefix) {
  return {
    type: SET_ELEMENT,
    prefix: prefix
  };
}

function elementLoaderReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];


  var prefix = action.prefix;

  switch (action.type) {
    case SET_ELEMENT:
      return _extends({}, state, _defineProperty({}, prefix, 0));
    case SHOW:
      return _extends({}, state, _defineProperty({}, prefix, state[prefix] + 1));
    case HIDE:
      return _extends({}, state, _defineProperty({}, prefix, state[prefix] > 0 ? state[prefix] - 1 : 0));
    default:
      return state;
  }
}