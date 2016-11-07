var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import { SelectOption } from './select_option';

// ** usage **
//
//  <Select
//    placeholderText="Some Text"
//    onSelect={ this.handleSortChange }>
//    <option value="name">Name</option>
//  </Select>


export var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.handleSelect = function (e) {

      var value = e.target.value;

      if (value === '__placeholder') return _this.props.onSelect(null);

      _this.props.onSelect(value);
    };

    _this.renderPlaceholder = function () {
      var _this$props = _this.props,
          placeholderText = _this$props.placeholderText,
          isMultiple = _this$props.isMultiple;


      if (isMultiple) return;

      return React.createElement(
        'option',
        { value: '__placeholder' },
        placeholderText
      );
    };

    return _this;
  }

  _createClass(Select, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          height = _props.height,
          width = _props.width,
          defaultValue = _props.defaultValue,
          isArrowVisible = _props.isArrowVisible;


      var style = {
        base: {
          height: height,
          width: width,
          paddingLeft: 5,
          fontSize: 14,
          textAlign: 'center',
          border: '1px solid #878686',
          borderRadius: 2,
          WebkitAppearance: isArrowVisible ? null : 'none'
        }
      };

      return React.createElement(
        'select',
        {
          style: style.base,
          defaultValue: defaultValue,
          onChange: this.handleSelect },
        this.renderPlaceholder(),
        children.map(function (child, i) {
          return React.createElement(
            'option',
            {
              key: i,
              value: child.props.value },
            child.props.text
          );
        })
      );
    }
  }]);

  return Select;
}(React.Component);
Select.propTypes = {
  placeholderText: PropTypes.string,
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isArrowVisible: PropTypes.bool,
  children: PropTypes.arrayOf(function (propValue, key) {
    if (propValue[key].type !== SelectOption) return new Error('One or more children are not of type SelectOption');
  })
};
Select.defaultProps = {
  placeholderText: 'Select an option...',
  height: 37,
  width: '100%',
  isArrowVisible: true
};