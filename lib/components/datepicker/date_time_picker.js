'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('babel-polyfill');

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _date_input = require('./date_input');

var _date_input2 = _interopRequireDefault(_date_input);

var _datepicker = require('./datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _timepicker = require('./timepicker');

var _timepicker2 = _interopRequireDefault(_timepicker);

var _helpers = require('./helpers');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

require('../../styles/icons.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePicker = exports.DateTimePicker = function (_React$Component) {
  _inherits(DateTimePicker, _React$Component);

  function DateTimePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateTimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isCalendarVisible: false,
      startHour: '12',
      startMinute: '00',
      endHour: '12',
      endMinute: '00',
      startPeriod: 'AM',
      endPeriod: 'AM',
      startMonth: (0, _moment2.default)().utc().startOf('month'),
      endMonth: (0, _moment2.default)().utc().add(1, 'months').startOf('month'),
      startTime: (0, _moment2.default)().utc().startOf('day'),
      endTime: (0, _moment2.default)().utc().startOf('day')
    }, _this.onClickOutside = function (e) {
      if (_this.refs.main && _this.refs.main.contains(e.target)) {
        return;
      }

      _this.setState({
        isCalendarVisible: false
      });
    }, _this.handleDatePickerStartChange = function (startMonth) {
      _this.setState({ startMonth: startMonth });
    }, _this.handleDatePickerEndChange = function (endMonth) {
      _this.setState({ endMonth: endMonth });
    }, _this.onStartDateChange = function (date) {

      date = date.clone().startOf('day');
      var _this$state = _this.state,
          startMonth = _this$state.startMonth,
          endDate = _this$state.endDate;


      if (_this.props.isRangePicker) {
        endDate = endDate && date > endDate ? null : endDate;
      }

      _this.setState({
        startDate: date.clone(),
        startMonth: startMonth.month() !== date.month() ? date.clone() : startMonth.clone(),
        endDate: endDate
      });
    }, _this.onEndDateChange = function (date) {

      date = date.clone().startOf('day');
      var _this$state2 = _this.state,
          startDate = _this$state2.startDate,
          endMonth = _this$state2.endMonth;


      if (_this.props.isRangePicker) {
        startDate = startDate && date < startDate ? null : startDate;
      }

      _this.setState({
        endDate: date.clone(),
        endMonth: endMonth.month() !== date.month() ? date.clone() : endMonth.clone(),
        startDate: startDate
      });
    }, _this.handleTimePickerStartChange = function (startHour, startMinute, startPeriod) {
      var startTime = (0, _moment2.default)().utc().startOf('day').hours((0, _helpers.convertHours)(startHour, startPeriod)).minutes(parseInt(startMinute));

      _this.setState({
        startHour: startHour,
        startMinute: startMinute,
        startPeriod: startPeriod,
        startTime: startTime
      });
    }, _this.handleTimePickerEndChange = function (endHour, endMinute, endPeriod) {
      var endTime = (0, _moment2.default)().utc().startOf('day').hours((0, _helpers.convertHours)(endHour, endPeriod)).minutes(parseInt(endMinute));

      _this.setState({
        endHour: endHour,
        endMinute: endMinute,
        endPeriod: endPeriod,
        endTime: endTime
      });
    }, _this.handleInputClick = function () {
      _this.setState({ isCalendarVisible: !_this.state.isCalendarVisible });
    }, _this.renderDatePicker = function (style) {
      var _this$props = _this.props,
          isRangePicker = _this$props.isRangePicker,
          isTimePicker = _this$props.isTimePicker,
          dateFormat = _this$props.dateFormat;
      var _this$state3 = _this.state,
          startMonth = _this$state3.startMonth,
          endMonth = _this$state3.endMonth,
          startDate = _this$state3.startDate,
          endDate = _this$state3.endDate,
          startHour = _this$state3.startHour,
          endHour = _this$state3.endHour,
          startMinute = _this$state3.startMinute,
          endMinute = _this$state3.endMinute,
          startPeriod = _this$state3.startPeriod,
          endPeriod = _this$state3.endPeriod;


      return _react2.default.createElement(
        'div',
        { style: style.picker },
        _react2.default.createElement(
          'div',
          { style: style.calendar },
          isRangePicker ? _react2.default.createElement(
            'div',
            { style: style.rangeDisplay },
            'Start Date: ',
            startDate ? startDate.format(dateFormat) : '--'
          ) : null,
          _react2.default.createElement(_datepicker2.default, {
            month: startMonth,
            onChange: _this.handleDatePickerStartChange }),
          _react2.default.createElement(_calendar2.default, {
            isRangePicker: isRangePicker,
            selectedDate: startDate,
            rangeDate: endDate,
            calendarDate: startMonth,
            onDateChange: _this.onStartDateChange }),
          isTimePicker ? _react2.default.createElement(_timepicker2.default, {
            date: startDate,
            hour: startHour,
            minute: startMinute,
            period: startPeriod,
            onChange: _this.handleTimePickerStartChange }) : null
        ),
        isRangePicker ? _react2.default.createElement('div', { style: style.vr }) : null,
        isRangePicker ? _react2.default.createElement(
          'div',
          { style: style.calendar },
          _react2.default.createElement(
            'div',
            null,
            isRangePicker ? _react2.default.createElement(
              'div',
              { style: style.rangeDisplay },
              'End Date: ',
              endDate ? endDate.format(dateFormat) : '--'
            ) : null,
            _react2.default.createElement(_datepicker2.default, {
              month: endMonth,
              onChange: _this.handleDatePickerEndChange }),
            _react2.default.createElement(_calendar2.default, {
              isRangePicker: isRangePicker,
              selectedDate: endDate,
              rangeDate: startDate,
              calendarDate: endMonth,
              onDateChange: _this.onEndDateChange })
          ),
          isTimePicker ? _react2.default.createElement(_timepicker2.default, {
            date: endDate,
            hour: endHour,
            minute: endMinute,
            period: endPeriod,
            onChange: _this.handleTimePickerEndChange }) : null
        ) : null
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateTimePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.onClickOutside, false);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _state = this.state,
          startDate = _state.startDate,
          startTime = _state.startTime,
          endDate = _state.endDate,
          endTime = _state.endTime;
      var _props = this.props,
          isTimePicker = _props.isTimePicker,
          isRangePicker = _props.isRangePicker,
          onChange = _props.onChange;


      var date1 = null;
      var date2 = null;

      if (!(0, _isEqual2.default)(prevState.startDate, startDate) || !(0, _isEqual2.default)(prevState.endDate, endDate) || !(0, _isEqual2.default)(prevState.startTime, startTime) || !(0, _isEqual2.default)(prevState.endTime, endTime)) {
        date1 = startDate && isTimePicker ? (0, _helpers.appendTime)(startDate, startTime) : startDate;
        date2 = isRangePicker && endDate && isTimePicker ? (0, _helpers.appendTime)(endDate, endTime) : endDate;

        onChange(date1, date2);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.onClickOutside, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          startDate = _state2.startDate,
          endDate = _state2.endDate,
          startTime = _state2.startTime,
          endTime = _state2.endTime,
          isCalendarVisible = _state2.isCalendarVisible;
      var _props2 = this.props,
          dateFormat = _props2.dateFormat,
          timeFormat = _props2.timeFormat,
          isTimePicker = _props2.isTimePicker,
          inputWidth = _props2.inputWidth;


      var style = {
        base: {},
        picker: {
          padding: 10,
          backgroundColor: 'white',
          display: 'flex',
          position: 'absolute',
          visibility: isCalendarVisible ? 'visible' : 'hidden',
          width: 'auto',
          right: this.props.menuDirection === 'left' ? 0 : null,
          left: this.props.menuDirection === 'right' ? 0 : null,
          marginTop: 3,
          border: '1px solid #dcdcdc',
          borderRadius: 3,
          transition: '0.5s ease',
          opacity: isCalendarVisible ? 1 : 0,
          zIndex: 10000
        },
        rangeDisplay: {
          padding: 10,
          fontSize: 14
        },
        calendar: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        },
        vr: {
          borderLeft: '1px solid #ccc',
          height: 'inherit',
          width: 2,
          margin: '0 10px'
        }
      };
      return _react2.default.createElement(
        'div',
        { ref: 'main', style: style.base },
        _react2.default.createElement(_date_input2.default, {
          startDate: startDate,
          endDate: endDate,
          startTime: startTime,
          endTime: endTime,
          dateFormat: dateFormat,
          timeFormat: timeFormat,
          isTimePicker: isTimePicker,
          width: inputWidth,
          onClick: this.handleInputClick }),
        this.renderDatePicker(style)
      );
    }
  }]);

  return DateTimePicker;
}(_react2.default.Component);

DateTimePicker.propTypes = {
  isRangePicker: _react.PropTypes.bool,
  isDatePicker: _react.PropTypes.bool,
  isTimePicker: _react.PropTypes.bool,
  dateFormat: _react.PropTypes.string,
  timeFormat: _react.PropTypes.string,
  inputWidth: _react.PropTypes.number,
  onChange: _react.PropTypes.func
};
DateTimePicker.defaultProps = {
  isRangePicker: false,
  isDatePicker: true,
  isTimePicker: false,
  dateFormat: 'MMM DD, YYYY',
  timeFormat: 'hh:mm a',
  inputWidth: 300
};