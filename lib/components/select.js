var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import merge from 'lodash/merge';

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelect = function (e) {

      var value = e.target.value;

      if (value === '__placeholder') return _this.props.onChange(null);

      _this.props.onChange(value);
    }, _this.renderPlaceholder = function () {
      var _this$props = _this.props,
          placeholder = _this$props.placeholder,
          isMultiple = _this$props.isMultiple;


      if (isMultiple) return;

      return React.createElement(
        'option',
        { value: '__placeholder' },
        placeholder
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Select, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          defaultValue = _props.defaultValue,
          value = _props.value,
          disabled = _props.disabled,
          isArrowVisible = _props.isArrowVisible,
          styles = _props.styles;


      var style = {
        height: 37,
        width: '100%',
        paddingLeft: 5,
        fontSize: 14,
        textAlign: 'center',
        border: '1px solid #EBE9ED', //#878686',
        borderRadius: 2,
        WebkitAppearance: isArrowVisible ? null : 'none'
      };

      merge(style, styles);

      return React.createElement(
        'select',
        {
          style: style,
          defaultValue: defaultValue,
          value: value,
          onChange: this.handleSelect,
          disabled: disabled
        },
        this.renderPlaceholder(),
        children
      );
    }
  }]);

  return Select;
}(React.Component);

Select.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isArrowVisible: PropTypes.bool,
  styles: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(function (propValue, key, componentName) {
    if (propValue[key].type !== SelectOption) return new Error('One or more children are not of type SelectOption');
  }), PropTypes.objectOf(function (propValue, key) {
    if (propValue.type !== SelectOption) return new Error('One or more children are not of type SelectOption');
  })])
};
Select.defaultProps = {
  placeholder: 'Select an option...',
  isArrowVisible: true
};


var SelectOption = function SelectOption(_ref2) {
  var value = _ref2.value,
      text = _ref2.text;

  return React.createElement(
    'option',
    {
      value: value },
    text
  );
};

SelectOption.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.node.isRequired
};

export { Select, SelectOption };