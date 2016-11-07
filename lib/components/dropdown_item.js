var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';

export var DropdownItem = function (_React$Component) {
  _inherits(DropdownItem, _React$Component);

  function DropdownItem(props) {
    _classCallCheck(this, DropdownItem);

    return _possibleConstructorReturn(this, (DropdownItem.__proto__ || Object.getPrototypeOf(DropdownItem)).call(this, props));
  }

  _createClass(DropdownItem, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return DropdownItem;
}(React.Component);
DropdownItem.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  shouldHideMenu: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  styles: PropTypes.object
};
DropdownItem.defaultProps = {
  shouldHideMenu: true
};