var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import moment from 'moment';
import '../../styles/icons.css';

var DateInput = function (_React$Component) {
  _inherits(DateInput, _React$Component);

  function DateInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleInputClick = function () {
      _this.props.onInputClick();
    }, _this.handleClearClick = function () {
      _this.props.onClearClick();
    }, _this.renderPlaceholder = function (style) {
      var _this$props = _this.props,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate,
          placeholder = _this$props.placeholder;

      if (!startDate && !endDate) return React.createElement(
        'div',
        { style: style.placeholder },
        placeholder
      );
    }, _this.renderStartDate = function () {
      var _this$props2 = _this.props,
          startDate = _this$props2.startDate,
          startTime = _this$props2.startTime,
          dateFormat = _this$props2.dateFormat,
          timeFormat = _this$props2.timeFormat,
          isTimePicker = _this$props2.isTimePicker;

      if (!startDate) return;

      var date = moment.isMoment(startDate) ? startDate.clone().format(dateFormat) : '';
      var time = moment.isMoment(startTime) ? startTime.clone().format(timeFormat) : '';
      return React.createElement(
        'div',
        null,
        date,
        ' ',
        isTimePicker ? time : ''
      );
    }, _this.renderEndDate = function () {
      var _this$props3 = _this.props,
          endDate = _this$props3.endDate,
          endTime = _this$props3.endTime,
          dateFormat = _this$props3.dateFormat,
          timeFormat = _this$props3.timeFormat,
          isTimePicker = _this$props3.isTimePicker;

      if (!endDate) return;

      var date = moment.isMoment(endDate) ? endDate.clone().format(dateFormat) : '';
      var time = moment.isMoment(endTime) ? endTime.clone().format(timeFormat) : '';
      return React.createElement(
        'div',
        null,
        date,
        ' ',
        isTimePicker ? time : ''
      );
    }, _this.renderClearDatesIcon = function (style) {
      var _this$props4 = _this.props,
          startDate = _this$props4.startDate,
          endDate = _this$props4.endDate,
          canClear = _this$props4.canClear;

      if (!canClear) return;
      if (!startDate && !endDate) return;

      return React.createElement('i', { style: style.icon, className: 'icon-cross-circle', onClick: _this.handleClearClick });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          endDate = _props.endDate,
          width = _props.width;


      var style = {
        base: {
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          border: '1px solid #EBE9ED',
          borderRadius: 2,
          width: width,
          padding: '3px 10px',
          fontSize: 14,
          marginBottom: 10
        },
        divider: {
          margin: 0,
          padding: '0 6px'
        },
        placeholder: {
          color: '#ccc'
        },
        text: {
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          cursor: 'text',
          margin: 0,
          padding: 0,
          height: 26
        },
        icon: {
          alignSelf: 'center',
          color: 'black',
          cursor: 'pointer'
        }
      };
      return React.createElement(
        'div',
        { style: style.base },
        React.createElement(
          'div',
          { style: style.text, onClick: this.handleInputClick },
          this.renderPlaceholder(style),
          this.renderStartDate(),
          endDate ? React.createElement(
            'div',
            { style: style.divider },
            '-'
          ) : null,
          this.renderEndDate()
        ),
        this.renderClearDatesIcon(style)
      );
    }
  }]);

  return DateInput;
}(React.Component);

DateInput.propTypes = {
  canClear: PropTypes.bool,
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  endDate: PropTypes.object,
  startDate: PropTypes.object,
  startTime: PropTypes.object,
  endTime: PropTypes.object,
  width: PropTypes.number,
  placeholder: PropTypes.string,
  onInputClick: PropTypes.func,
  onClearClick: PropTypes.func
};
export default DateInput;