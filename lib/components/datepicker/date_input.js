'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

require('../../styles/icons.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    }, _this.renderPlaceholder = function (styles) {
      var _this$props = _this.props,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate,
          placeholder = _this$props.placeholder;

      if (!startDate && !endDate) return _react2.default.createElement(
        'div',
        { style: styles.placeholder },
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

      var date = _moment2.default.isMoment(startDate) ? startDate.clone().format(dateFormat) : '';
      var time = _moment2.default.isMoment(startTime) ? startTime.clone().format(timeFormat) : '';
      return _react2.default.createElement(
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

      var date = _moment2.default.isMoment(endDate) ? endDate.clone().format(dateFormat) : '';
      var time = _moment2.default.isMoment(endTime) ? endTime.clone().format(timeFormat) : '';
      return _react2.default.createElement(
        'div',
        null,
        date,
        ' ',
        isTimePicker ? time : ''
      );
    }, _this.renderClearDatesIcon = function (styles) {
      var _this$props4 = _this.props,
          startDate = _this$props4.startDate,
          endDate = _this$props4.endDate,
          canClear = _this$props4.canClear;

      if (!canClear) return;
      if (!startDate && !endDate) return;

      return _react2.default.createElement('i', { style: styles.clearIcon, className: 'icon-cross-circle', onClick: _this.handleClearClick });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          endDate = _props.endDate,
          style = _props.style;


      var styles = {
        base: {
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          border: '1px solid #EBE9ED',
          borderRadius: 2,
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
          height: 'inherit'
        },
        clearIcon: {
          alignSelf: 'center',
          color: 'black',
          cursor: 'pointer'
        }
      };

      (0, _merge2.default)(styles, style);
      return _react2.default.createElement(
        'div',
        { style: styles.base },
        _react2.default.createElement(
          'div',
          { style: styles.text, onClick: this.handleInputClick },
          this.renderPlaceholder(styles),
          this.renderStartDate(),
          endDate ? _react2.default.createElement(
            'div',
            { style: styles.divider },
            '-'
          ) : null,
          this.renderEndDate()
        ),
        this.renderClearDatesIcon(styles)
      );
    }
  }]);

  return DateInput;
}(_react2.default.Component);

DateInput.propTypes = {
  canClear: _react.PropTypes.bool,
  dateFormat: _react.PropTypes.string,
  timeFormat: _react.PropTypes.string,
  endDate: _react.PropTypes.object,
  startDate: _react.PropTypes.object,
  startTime: _react.PropTypes.object,
  endTime: _react.PropTypes.object,
  width: _react.PropTypes.number,
  placeholder: _react.PropTypes.string,
  onInputClick: _react.PropTypes.func,
  onClearClick: _react.PropTypes.func,
  style: _react.PropTypes.object
};
exports.default = DateInput;