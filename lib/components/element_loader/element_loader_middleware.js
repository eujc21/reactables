'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = elementLoaderMiddleware;

var _element_loader_reducer = require('./element_loader_reducer');

var defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILURE'];

function elementLoaderMiddleware() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var promiseTypeSuffixes = config.actionTypeSuffixes || defaultTypeSuffixes;

  function stripPrefix(type, prefix) {
    return type.substring(0, type.length - prefix.length - 1);
  }

  return function (store) {
    return function (next) {
      return function (action) {

        if (action.type) {
          var _promiseTypeSuffixes = _slicedToArray(promiseTypeSuffixes, 3),
              REQUEST = _promiseTypeSuffixes[0],
              SUCCESS = _promiseTypeSuffixes[1],
              FAILURE = _promiseTypeSuffixes[2];

          var isRequest = new RegExp(REQUEST + '$', 'g');
          var isSuccess = new RegExp(SUCCESS + '$', 'g');
          var isFailure = new RegExp(FAILURE + '$', 'g');

          if (action.type.match(isRequest)) {
            var prefix = stripPrefix(action.type, REQUEST);
            store.dispatch((0, _element_loader_reducer.showElement)(prefix));
          } else if (action.type.match(isSuccess)) {
            var _prefix = stripPrefix(action.type, SUCCESS);
            store.dispatch((0, _element_loader_reducer.hideElement)(_prefix));
          } else if (action.type.match(isFailure)) {
            var _prefix2 = stripPrefix(action.type, FAILURE);
            store.dispatch((0, _element_loader_reducer.hideElement)(_prefix2));
          }
        }

        return next(action);
      };
    };
  };
}