function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';

var BaseLayout = function (_React$Component) {
  _inherits(BaseLayout, _React$Component);

  function BaseLayout() {
    _classCallCheck(this, BaseLayout);

    return _possibleConstructorReturn(this, (BaseLayout.__proto__ || Object.getPrototypeOf(BaseLayout)).apply(this, arguments));
  }

  return BaseLayout;
}(React.Component);

BaseLayout.propTypes = {
  breakPoints: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  })
};
BaseLayout.defaultProps = {
  breakPoints: {
    xs: 400,
    sm: 767,
    md: 991,
    lg: 1030,
    xl: 1440
  }
};
export default BaseLayout;