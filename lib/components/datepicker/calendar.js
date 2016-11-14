'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.onDateChange = function (date) {
      _this.props.onDateChange(date);
    };

    _this.renderDaysOfTheWeek = function (style) {

      return _react2.default.createElement(
        'div',
        null,
        _this.daysOfTheWeek.map(function (day) {
          return _react2.default.createElement(
            'div',
            { key: day, style: style.day },
            day.substring(0, 2)
          );
        })
      );
    };

    _this.renderWeeks = function (weeks) {
      var _this$props = _this.props,
          selectedDate = _this$props.selectedDate,
          rangeDate = _this$props.rangeDate,
          calendarDate = _this$props.calendarDate;

      var style = {
        base: {
          whiteSpace: 'nowrap'
        }
      };
      return _react2.default.createElement(
        'div',
        { style: style.base },
        weeks.map(function (week, i) {
          return _react2.default.createElement(
            'div',
            { key: i },
            week.map(function (date, i) {
              return _react2.default.createElement(_day2.default, {
                key: i,
                date: date,
                selectedDate: selectedDate,
                rangeDate: rangeDate,
                calendarDate: calendarDate,
                onClick: _this.onDateChange });
            })
          );
        })
      );
    };

    _this.daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return _this;
  }

  _createClass(Calendar, [{
    key: 'generateWeek',
    value: function generateWeek(date) {
      var nextDate = date.clone();
      var week = [0, 1, 2, 3, 4, 5, 6].map(function (dayOfWeek) {

        var day = nextDate.day();

        if (dayOfWeek < day) {
          var offSet = dayOfWeek - day + 1;
          return date.clone().subtract(1, 'months').endOf('month').add(offSet, 'days');
        }

        var toAdd = nextDate.clone();
        nextDate = nextDate.clone().add({ days: 1 });
        return toAdd;
      });

      return { week: week, nextDate: nextDate };
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        base: {
          backgroundColor: 'white',
          borderRadius: 3
        },
        day: {
          display: 'inline-block',
          fontSize: 11,
          width: 24,
          lineHeight: '24px',
          margin: 3,
          textAlign: 'center',
          fontWeight: 'bold'
        }
      };

      var startOfMonth = this.props.calendarDate.clone().startOf('month');
      var endOfMonth = startOfMonth.clone().endOf('month');

      var date = startOfMonth.clone();
      var weeks = [];

      while (endOfMonth > date) {
        var _generateWeek = this.generateWeek(date),
            week = _generateWeek.week,
            nextDate = _generateWeek.nextDate;

        weeks.push(week);
        date = nextDate;
      }

      return _react2.default.createElement(
        'div',
        { style: style.base },
        this.renderDaysOfTheWeek(style),
        this.renderWeeks(weeks)
      );
    }
  }]);

  return Calendar;
}(_react2.default.Component);

Calendar.propTypes = {
  selectedDate: _react.PropTypes.object,
  rangeDate: _react.PropTypes.object,
  calendarDate: _react.PropTypes.object
};
exports.default = Calendar;