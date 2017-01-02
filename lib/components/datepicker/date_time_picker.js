var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import 'babel-polyfill';

import Calendar from './calendar';
import DateInput from './date_input';
import DatePicker from './datepicker';
import TimePicker from './timepicker';

import moment from 'moment';
import isEqual from 'lodash/isEqual';

import '../../styles/icons.css';

export var DateTimePicker = function (_React$Component) {
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
      startMonth: moment().utc().startOf('month'),
      endMonth: moment().utc().add(1, 'months').startOf('month')
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
    }, _this.handleClearClick = function () {
      _this.setState({
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null
      });
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


      return React.createElement(
        'div',
        { style: style.picker },
        React.createElement(
          'div',
          { style: style.calendar },
          isRangePicker ? React.createElement(
            'div',
            { style: style.rangeDisplay },
            'Start Date: ',
            startDate ? startDate.format(dateFormat) : '--'
          ) : null,
          React.createElement(DatePicker, {
            month: startMonth,
            onChange: _this.handleDatePickerStartChange }),
          React.createElement(Calendar, {
            isRangePicker: isRangePicker,
            selectedDate: startDate,
            rangeDate: endDate,
            calendarDate: startMonth,
            onDateChange: _this.onStartDateChange }),
          isTimePicker ? React.createElement(TimePicker, {
            date: startDate,
            onChange: _this.handleTimePickerStartChange }) : null
        ),
        isRangePicker ? React.createElement('div', { style: style.vr }) : null,
        isRangePicker ? React.createElement(
          'div',
          { style: style.calendar },
          React.createElement(
            'div',
            null,
            isRangePicker ? React.createElement(
              'div',
              { style: style.rangeDisplay },
              'End Date: ',
              endDate ? endDate.format(dateFormat) : '--'
            ) : null,
            React.createElement(DatePicker, {
              month: endMonth,
              onChange: _this.handleDatePickerEndChange }),
            React.createElement(Calendar, {
              isRangePicker: isRangePicker,
              selectedDate: endDate,
              rangeDate: startDate,
              calendarDate: endMonth,
              onDateChange: _this.onEndDateChange })
          ),
          isTimePicker ? React.createElement(TimePicker, {
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
        startDate: startDate ? startDate.utc() : null,
        endDate: endDate ? endDate.utc() : null,
        startMonth: startDate ? startDate.clone().utc().startOf('month') : this.state.startMonth,
        endMonth: endDate ? endDate.clone().utc().startOf('month') : this.state.endMonth
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
        startDate: startDate ? startDate.utc() : null,
        endDate: endDate ? endDate.utc() : null,
        startMonth: startDate && !isEqual(this.props.startDate, startDate) ? startDate.clone().utc().startOf('month') : this.state.startMonth,
        endMonth: endDate && !isEqual(this.props.endDate, endDate) ? endDate.clone().utc().startOf('month') : this.state.endMonth
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _state = this.state,
          startDate = _state.startDate,
          endDate = _state.endDate;
      var onChange = this.props.onChange;


      if (!isEqual(prevState.startDate, startDate) || !isEqual(prevState.endDate, endDate)) {

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
          pickerDirection = _props2.pickerDirection,
          canClear = _props2.canClear;


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
          //width: isRangePicker ? 465 : 232,
          // minWidth: isRangePicker ? 465 : 232,
          // maxWidth: isRangePicker ? 465 : 232,
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
      return React.createElement(
        'div',
        { ref: 'main', style: style.base },
        React.createElement(DateInput, {
          canClear: canClear,
          startDate: startDate,
          endDate: endDate,
          startTime: startDate,
          endTime: endDate,
          dateFormat: dateFormat,
          timeFormat: timeFormat,
          isTimePicker: isTimePicker,
          placeholder: placeholder,
          width: inputWidth,
          onInputClick: this.handleInputClick,
          onClearClick: this.handleClearClick }),
        this.renderDatePicker(style)
      );
    }
  }]);

  return DateTimePicker;
}(React.Component);
DateTimePicker.propTypes = {
  isRangePicker: PropTypes.bool,
  isTimePicker: PropTypes.bool,
  canClear: PropTypes.bool,
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  inputWidth: PropTypes.number,
  fontFamily: PropTypes.string,
  startDate: function startDate(props, propName, componentName) {
    if (props[propName] && !moment.isMoment(props[propName])) {
      return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
    }
  },
  endDate: function endDate(props, propName, componentName) {
    if (props[propName] && !moment.isMoment(props[propName])) {
      return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
    }
  },
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  pickerDirection: PropTypes.oneOf(['left', 'right'])
};
DateTimePicker.defaultProps = {
  isRangePicker: false,
  isTimePicker: false,
  dateFormat: 'MMM DD, YYYY',
  timeFormat: 'hh:mm a',
  inputWidth: 300,
  fontFamily: 'Arial',
  placeholder: 'Select a Date',
  pickerDirection: 'right'
};