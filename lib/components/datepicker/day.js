var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';

var Day = function (_React$Component) {
  _inherits(Day, _React$Component);

  function Day() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Day);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Day.__proto__ || Object.getPrototypeOf(Day)).call.apply(_ref, [this].concat(args))), _this), _this.setStyles = function () {
      var _this$props = _this.props,
          date = _this$props.date,
          selectedDate = _this$props.selectedDate,
          calendarDate = _this$props.calendarDate;

      var SELECTED_DATE = {
        color: 'white',
        opacity: 1,
        backgroundColor: 'blue'
      };

      var RANGE_DATE = {
        color: 'white',
        opacity: .5,
        backgroundColor: 'blue'
      };

      var CALENDAR_DATE = {
        color: 'black',
        opacity: 1,
        backgroundColor: 'white'
      };

      var OFF_CALENDAR_DATE = {
        color: '#dddddd',
        opacity: 1,
        backgroundColor: 'white'
      };

      if (selectedDate && selectedDate.clone().format('YYYY-MM-DD') === date.clone().format('YYYY-MM-DD') && date.month() === calendarDate.month() && date.year() === calendarDate.year()) {
        return SELECTED_DATE;
      }

      if (_this.isRangeDate() && date.month() === calendarDate.month() && date.year() === calendarDate.year()) {
        return RANGE_DATE;
      }

      if (date.month() === calendarDate.month() && date.year() === calendarDate.year()) {
        return CALENDAR_DATE;
      }

      return OFF_CALENDAR_DATE;
    }, _this.onClick = function () {
      var _this$props2 = _this.props,
          date = _this$props2.date,
          onClick = _this$props2.onClick;

      onClick(date);
    }, _this.isRangeDate = function () {
      var _this$props3 = _this.props,
          selectedDate = _this$props3.selectedDate,
          rangeDate = _this$props3.rangeDate,
          date = _this$props3.date;


      if (!rangeDate || !selectedDate) return false;

      if (rangeDate.clone().format('YYYY-MM-DD') === selectedDate.clone().format('YYYY-MM-DD')) return false;

      if (selectedDate.clone().format('YYYY-MM-DD') === rangeDate.clone().format('YYYY-MM-DD')) return true;

      if (selectedDate < rangeDate) {
        return date.isBetween(selectedDate.clone().subtract(1, 'days'), rangeDate.clone().add(1, 'days'));
      }

      if (selectedDate > rangeDate) {
        return date.isBetween(rangeDate.clone().subtract(1, 'days'), selectedDate.clone().add(1, 'days'));
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Day, [{
    key: 'render',
    value: function render() {
      var date = this.props.date;


      var style = {
        base: _extends({
          display: 'inline-block',
          padding: 4,
          margin: 3,
          fontSize: 12,
          width: 20,
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: 3
        }, this.setStyles())
      };
      return React.createElement(
        'div',
        { style: style.base, onClick: this.onClick },
        date.date()
      );
    }
  }]);

  return Day;
}(React.Component);

export default Day;