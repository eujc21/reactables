'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBar = exports.ProgressBar = function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar(props) {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ProgressBar).call(this, props));
  }

  _createClass(ProgressBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var completedColor = _props.completedColor;
      var barColor = _props.barColor;
      var outOf = _props.outOf;
      var completed = _props.completed;
      var showUnits = _props.showUnits;
      var units = _props.units;
      var alignUnits = _props.alignUnits;


      var percentageComplete = Math.floor(completed / outOf * 100);

      if (percentageComplete > 100) percentageComplete = 100;

      var style = {
        base: {
          width: width
        },
        units: {
          width: '100%',
          textAlign: alignUnits
        },
        bar: {
          height: height,
          padding: 0,
          backgroundColor: barColor,
          overflow: 'hidden',
          borderRadius: 3
        },
        completed: {
          transform: 'skew(-20deg)',
          height: '100%',
          width: 'calc(' + percentageComplete + '% + ' + (percentageComplete === 100 ? 8 : 0) + 'px',
          background: 'linear-gradient(\n          to top right,\n          ' + (0, _color2.default)(completedColor).hexString() + ', \n          ' + (0, _color2.default)(completedColor).lighten(0.5).hexString() + '\n        )',
          marginLeft: -4,
          transition: 'width 1s'
        }
      };

      return _react2.default.createElement(
        'div',
        null,
        showUnits ? _react2.default.createElement(
          'div',
          { style: style.units },
          units === 'number' ? completed + ' of ' + outOf : percentageComplete + '%'
        ) : null,
        _react2.default.createElement(
          'div',
          { style: style.bar },
          _react2.default.createElement('div', { style: style.completed })
        )
      );
    }
  }]);

  return ProgressBar;
}(_react2.default.Component);

ProgressBar.propTypes = {
  completed: _react.PropTypes.number,
  outOf: _react.PropTypes.number,
  barColor: _react.PropTypes.string,
  completedColor: _react.PropTypes.string,
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  showUnits: _react.PropTypes.bool,
  units: _react.PropTypes.oneOf(['percent', 'number']),
  alignUnits: _react.PropTypes.oneOf(['left', 'right', 'center'])

};
ProgressBar.defaultProps = {
  width: '100%',
  height: 26,
  barColor: 'red',
  completedColor: 'green',
  completed: 0,
  showUnits: false,
  units: 'percent',
  alignUnits: 'right'
};