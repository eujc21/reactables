var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import { Select, SelectOption } from '../../index';
import { range, convertHours } from './helpers';

var TimePicker = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

    _this.handleTimeChange = function (time, value) {
      if (!value) return;
      var _this$props = _this.props,
          date = _this$props.date,
          onChange = _this$props.onChange;


      var hour = time === 'hour' ? value : _this._hourForDate(date);
      var minute = time === 'minute' ? value : _this._minuteForDate(date);
      var period = time === 'period' ? value : _this._periodForDate(date);

      var d = date.clone().hours(convertHours(hour, period)).minutes(parseInt(minute));

      onChange(d);
    };

    _this.minutes = [];
    _this.hours = [];
    _this.periods = ['AM', 'PM'];

    _this.minutes = [].concat(_toConsumableArray(range(0, 59)));
    _this.hours = [].concat(_toConsumableArray(range(1, 12)));
    return _this;
  }

  _createClass(TimePicker, [{
    key: '_hourForDate',
    value: function _hourForDate(date) {
      if (date) {
        var hour = date.hour();
        hour = hour > 12 ? hour - 12 : hour;
        hour = hour === 0 ? 12 : hour;
        hour = String(hour);
        return hour.length === 1 ? '0' + hour : hour;
      }

      return '12';
    }
  }, {
    key: '_minuteForDate',
    value: function _minuteForDate(date) {
      if (date) {
        var minute = String(date.minute());
        return minute.length === 1 ? '0' + minute : minute;
      }

      return '00';
    }
  }, {
    key: '_periodForDate',
    value: function _periodForDate(date) {
      if (date) {
        return date.hour() >= 12 ? 'PM' : 'AM';
      }

      return 'AM';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var date = this.props.date;


      var style = {
        base: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10
        }
      };

      return React.createElement(
        'div',
        { style: style.base },
        React.createElement(
          Select,
          {
            height: 22,
            width: 50,
            value: this._hourForDate(date),
            onChange: function onChange(value) {
              return _this2.handleTimeChange('hour', value);
            },
            disabled: date ? false : true
          },
          this.hours.map(function (hour) {
            return React.createElement(SelectOption, { key: hour, text: hour, value: hour });
          })
        ),
        React.createElement(
          'span',
          null,
          ':'
        ),
        React.createElement(
          Select,
          {
            height: 22,
            width: 50,
            value: this._minuteForDate(date),
            onChange: function onChange(value) {
              return _this2.handleTimeChange('minute', value);
            },
            disabled: date ? false : true
          },
          this.minutes.map(function (minute) {
            return React.createElement(SelectOption, { key: minute, text: minute, value: minute });
          })
        ),
        React.createElement(
          Select,
          {
            height: 22,
            width: 50,
            value: this._periodForDate(date),
            onChange: function onChange(value) {
              return _this2.handleTimeChange('period', value);
            },
            disabled: date ? false : true
          },
          this.periods.map(function (p) {
            return React.createElement(SelectOption, { key: p, text: p, value: p });
          })
        )
      );
    }
  }]);

  return TimePicker;
}(React.Component);

TimePicker.propTypes = {
  date: PropTypes.object,
  onChange: PropTypes.func.isRequired
};
export default TimePicker;