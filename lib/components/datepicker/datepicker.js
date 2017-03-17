'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../../index');

var _helpers = require('./helpers');

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = { years: [] }, _this.handleMonthChange = function (increment) {
      var _this$props = _this.props,
          month = _this$props.month,
          onChange = _this$props.onChange;

      onChange(month.clone().add(increment, 'months'));
    }, _this.handleYearChange = function (year) {
      var _this$props2 = _this.props,
          month = _this$props2.month,
          onChange = _this$props2.onChange;

      var date = month.set('year', year);
      onChange(date);
    }, _this.handleYearRangeChange = function (increment) {
      var years = _this.state.years;

      if (increment === -1) _this.setState({ years: [years[0] - 1].concat(_toConsumableArray(years)) });

      if (increment === 1) _this.setState({ years: [].concat(_toConsumableArray(years), [years[years.length - 1] + 1]) });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var year = this.props.month.clone().year();
      var years = [].concat(_toConsumableArray((0, _helpers.range)(year - 5, year)), _toConsumableArray((0, _helpers.range)(year + 1, year + 5)));

      this.setState({ years: years });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          month = _props.month,
          style = _props.style;


      var styles = {
        base: {
          display: 'flex',
          justifyContent: 'space-between',
          width: 'inherit'
        },
        arrow: {
          display: 'flex',
          alignItems: 'center',
          fontSize: 12,
          padding: 10,
          cursor: 'pointer'
        },
        date: {
          display: 'flex',
          justifyContent: 'center',
          fontSize: 14,
          padding: 10
        },
        month: {
          padding: '2px 5px 2px 2px',
          margin: 0
        },
        year: {
          display: 'flex',
          alignItems: 'center',
          padding: '2px 4px',
          backgroundColor: '#f4f4f4',
          border: '1px solid #ccc',
          borderRadius: 2
        },
        icon: {
          fontSize: 14,
          paddingLeft: 3
        }
      };

      (0, _merge2.default)(styles, style);

      return _react2.default.createElement(
        'div',
        { style: styles.base },
        _react2.default.createElement(
          'div',
          { style: styles.arrow, onClick: function onClick() {
              return _this2.handleMonthChange(-1);
            } },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'keyboard_arrow_left'
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.date },
          _react2.default.createElement(
            'p',
            { style: styles.month },
            month.format('MMM')
          ),
          _react2.default.createElement(
            _index.Dropdown,
            {
              node: _react2.default.createElement(
                'div',
                { style: styles.year },
                month.format('YYYY'),
                _react2.default.createElement(
                  'i',
                  { style: styles.icon, className: 'material-icons' },
                  'keyboard_arrow_down'
                )
              ),
              menuDirection: 'right' },
            this.renderYears()
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.arrow },
          _react2.default.createElement(
            'i',
            { className: 'material-icons', onClick: function onClick() {
                return _this2.handleMonthChange(1);
              } },
            'keyboard_arrow_right'
          )
        )
      );
    }
  }, {
    key: 'renderYears',
    value: function renderYears() {
      var _this3 = this;

      var years = this.state.years;


      var yearComponents = years.map(function (y) {
        return _react2.default.createElement(_index.DropdownOption, {
          key: y,
          text: y,
          onClick: function onClick() {
            return _this3.handleYearChange(y);
          } });
      });

      return [_react2.default.createElement(_index.DropdownOption, {
        key: 'decrement',
        text: '...',
        shouldHideMenu: false,
        onClick: function onClick() {
          return _this3.handleYearRangeChange(-1);
        } })].concat(_toConsumableArray(yearComponents), [_react2.default.createElement(_index.DropdownOption, {
        key: 'increment',
        text: '...',
        shouldHideMenu: false,
        onClick: function onClick() {
          return _this3.handleYearRangeChange(1);
        } })]);
    }
  }]);

  return DatePicker;
}(_react2.default.Component);

DatePicker.propTypes = {
  month: _react.PropTypes.object,
  onChange: _react.PropTypes.func,
  style: _react.PropTypes.object
};
exports.default = DatePicker;