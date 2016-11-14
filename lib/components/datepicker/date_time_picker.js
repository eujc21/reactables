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
      startMonth: (0, _moment2.default)().utc().startOf('month'),
      endMonth: (0, _moment2.default)().utc().add(1, 'months').startOf('month')
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
      var _this$state = _this.state,
          startMonth = _this$state.startMonth,
          startDate = _this$state.startDate,
          endDate = _this$state.endDate;

      date = date.clone();
      date = startDate ? date.hour(startDate.hour()).minute(startDate.minute()) : date;

      if (_this.props.isRangePicker) {
        endDate = endDate && date.clone().startOf('day') > endDate.clone().startOf('day') ? null : endDate;
      }

      _this.setState({
        startDate: date,
        startMonth: startMonth.month() !== date.month() ? date.clone() : startMonth.clone(),
        endDate: endDate
      });
    }, _this.onEndDateChange = function (date) {
      var _this$state2 = _this.state,
          endMonth = _this$state2.endMonth,
          endDate = _this$state2.endDate,
          startDate = _this$state2.startDate;

      date = date.clone();
      date = endDate ? date.hour(endDate.hour()).minute(endDate.minute()) : date;

      if (_this.props.isRangePicker) {
        startDate = startDate && date.clone().startOf('day') < startDate.clone().startOf('day') ? null : startDate;
      }

      _this.setState({
        endDate: date,
        endMonth: endMonth.month() !== date.month() ? date.clone() : endMonth.clone(),
        startDate: startDate
      });
    }, _this.handleTimePickerStartChange = function (date) {
      _this.setState({
        startDate: date
      });
    }, _this.handleTimePickerEndChange = function (date) {
      _this.setState({
        endDate: date
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
          endDate = _this$state3.endDate;


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
            onChange: _this.handleTimePickerEndChange }) : null
        ) : null
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateTimePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          startDate = _props.startDate,
          endDate = _props.endDate;

      this.setState({
        startDate: startDate,
        endDate: endDate
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.onClickOutside, false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var startDate = nextProps.startDate,
          endDate = nextProps.endDate;


      this.setState({
        startDate: startDate,
        endDate: endDate
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _state = this.state,
          startDate = _state.startDate,
          endDate = _state.endDate;
      var onChange = this.props.onChange;


      if (!(0, _isEqual2.default)(prevState.startDate, startDate) || !(0, _isEqual2.default)(prevState.endDate, endDate)) {

        onChange(startDate, endDate);
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
          isCalendarVisible = _state2.isCalendarVisible;
      var _props2 = this.props,
          dateFormat = _props2.dateFormat,
          timeFormat = _props2.timeFormat,
          isTimePicker = _props2.isTimePicker,
          inputWidth = _props2.inputWidth,
          fontFamily = _props2.fontFamily,
          placeholder = _props2.placeholder,
          pickerDirection = _props2.pickerDirection;


      var style = {
        base: {
          position: 'relative',
          fontFamily: fontFamily,
          fontWeight: 200,
          width: inputWidth
        },
        picker: {
          padding: 10,
          backgroundColor: 'white',
          display: 'flex',
          position: 'absolute',
          visibility: isCalendarVisible ? 'visible' : 'hidden',
          width: 'auto',
          right: pickerDirection === 'left' ? 0 : null,
          left: pickerDirection === 'right' ? 0 : null,
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
          startTime: startDate,
          endTime: endDate,
          dateFormat: dateFormat,
          timeFormat: timeFormat,
          isTimePicker: isTimePicker,
          placeholder: placeholder,
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
  fontFamily: _react.PropTypes.string,
  startDate: _react.PropTypes.object,
  endDate: _react.PropTypes.object,
  placeholder: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  pickerDirection: _react.PropTypes.oneOf(['left', 'right'])
};
DateTimePicker.defaultProps = {
  isRangePicker: false,
  isDatePicker: true,
  isTimePicker: false,
  dateFormat: 'MMM DD, YYYY',
  timeFormat: 'hh:mm a',
  inputWidth: 300,
  fontFamily: 'Arial',
  placeholder: 'Select a Date',
  pickerDirection: 'right'
};