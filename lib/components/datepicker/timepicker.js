'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _select = require('../select');

var _select_option = require('../select_option');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePicker = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

    _this.handleTimeChange = function (time, value) {
      var _this$props = _this.props,
          hour = _this$props.hour,
          minute = _this$props.minute,
          period = _this$props.period,
          onChange = _this$props.onChange;


      var h = time === 'hour' ? value : hour;
      var m = time === 'minute' ? value : minute;
      var p = time === 'period' ? value : period;

      onChange(h, m, p);
    };

    _this.minutes = [];
    _this.hours = [];
    _this.periods = ['AM', 'PM'];

    _this.minutes = [].concat(_toConsumableArray((0, _helpers.range)(0, 59)));
    _this.hours = [].concat(_toConsumableArray((0, _helpers.range)(1, 12)));
    return _this;
  }

  _createClass(TimePicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          date = _props.date,
          hour = _props.hour,
          minute = _props.minute,
          period = _props.period;


      var style = {
        base: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10
        }
      };

      return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement(
          _select.Select,
          {
            height: 22,
            width: 50,
            defaultValue: hour,
            onSelect: function onSelect(value) {
              return _this2.handleTimeChange('hour', value);
            },
            disabled: date ? false : true
          },
          this.hours.map(function (hour) {
            return _react2.default.createElement(_select_option.SelectOption, { key: hour, text: hour, value: hour });
          })
        ),
        _react2.default.createElement(
          'span',
          null,
          ':'
        ),
        _react2.default.createElement(
          _select.Select,
          {
            height: 22,
            width: 50,
            defaultValue: minute,
            onSelect: function onSelect(value) {
              return _this2.handleTimeChange('minute', value);
            },
            disabled: date ? false : true
          },
          this.minutes.map(function (minute) {
            return _react2.default.createElement(_select_option.SelectOption, { key: minute, text: minute, value: minute });
          })
        ),
        _react2.default.createElement(
          _select.Select,
          {
            height: 22,
            width: 50,
            defaultValue: period,
            onSelect: function onSelect(value) {
              return _this2.handleTimeChange('period', value);
            },
            disabled: date ? false : true
          },
          this.periods.map(function (p) {
            return _react2.default.createElement(_select_option.SelectOption, { key: p, text: p, value: p });
          })
        )
      );
    }
  }]);

  return TimePicker;
}(_react2.default.Component);

TimePicker.propTypes = {
  hour: _react.PropTypes.string,
  minute: _react.PropTypes.string,
  period: _react.PropTypes.string,
  onChange: _react.PropTypes.func.isRequired
};
exports.default = TimePicker;