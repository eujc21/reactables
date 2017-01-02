var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import _ from 'lodash';

var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var A = 65;
var B = 66;
var ENTER = 13;

var KONAMI_CODE = [UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A, ENTER];

export var KonamiCode = function (_React$Component) {
  _inherits(KonamiCode, _React$Component);

  function KonamiCode() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, KonamiCode);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = KonamiCode.__proto__ || Object.getPrototypeOf(KonamiCode)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      userCode: [],
      isUnlocked: false
    }, _this.handleKeyPress = function (e) {
      var _this$state = _this.state,
          userCode = _this$state.userCode,
          isUnlocked = _this$state.isUnlocked;

      var i = userCode.length;

      if (!isUnlocked) _this.setState({
        userCode: e.keyCode === KONAMI_CODE[i] ? [].concat(_toConsumableArray(userCode), [e.keyCode]) : e.keyCode === UP ? [e.keyCode] : []
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(KonamiCode, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {

      if (_.isEqual(this.state.userCode, KONAMI_CODE)) {
        this.setState({
          isUnlocked: true,
          userCode: []
        });
        alert(this.props.message);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return KonamiCode;
}(React.Component);