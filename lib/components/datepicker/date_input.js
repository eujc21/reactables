var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import moment from 'moment';

var DateInput = function (_React$Component) {
  _inherits(DateInput, _React$Component);

  function DateInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      _this.props.onClick();
    }, _this.renderStartDate = function () {
      var _this$props = _this.props,
          startDate = _this$props.startDate,
          format = _this$props.format;


      return React.createElement(
        'div',
        null,
        moment.isMoment(startDate) ? startDate.clone().format(format) : React.createElement(
          'div',
          null,
          '\xA0 '
        )
      );
    }, _this.renderEndDate = function () {
      var _this$props2 = _this.props,
          endDate = _this$props2.endDate,
          format = _this$props2.format;

      if (!endDate) return;

      return React.createElement(
        'div',
        null,
        moment.isMoment(endDate) ? endDate.clone().format(format) : ''
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateInput, [{
    key: 'render',
    value: function render() {

      var style = {
        base: {
          backgroundColor: 'white',
          border: '1px solid black',
          borderRadius: 2,
          width: 300,
          padding: 3,
          fontSize: 14,
          marginBottom: 10,
          cursor: 'text'
        },
        divider: {
          margin: 0,
          padding: '0 6px'
        },
        text: {
          display: 'flex',
          margin: 0,
          padding: 0
        }
      };
      return React.createElement(
        'div',
        { style: style.base, onClick: this.handleClick },
        React.createElement(
          'div',
          { style: style.text },
          this.renderStartDate(),
          this.props.endDate ? React.createElement(
            'div',
            { style: style.divider },
            '-'
          ) : null,
          this.renderEndDate()
        )
      );
    }
  }]);

  return DateInput;
}(React.Component);

export default DateInput;