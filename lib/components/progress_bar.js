var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes } from 'react';
import Color from 'color';

export var ProgressBar = function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar(props) {
    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));

    _this.state = { percentageComplete: 0 };

    _this.getPercentageComplete = function (completed, outOf) {

      var percentageComplete = Math.floor(completed / outOf * 100);

      if (percentageComplete > 100) percentageComplete = 100;

      return percentageComplete;
    };

    return _this;
  }

  _createClass(ProgressBar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          completed = _props.completed,
          outOf = _props.outOf;

      this.setState({
        percentageComplete: this.getPercentageComplete(completed, outOf)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props2 = this.props,
          completed = _props2.completed,
          outOf = _props2.outOf;


      if (nextProps.outOf !== outOf || nextProps.completed !== completed) {
        this.setState({
          percentageComplete: this.getPercentageComplete(nextProps.completed, nextProps.outOf)
        });
      }
    }
  }, {
    key: 'renderUnits',
    value: function renderUnits(style) {
      var _props3 = this.props,
          showUnits = _props3.showUnits,
          units = _props3.units,
          completed = _props3.completed,
          outOf = _props3.outOf;
      var percentageComplete = this.state.percentageComplete;


      if (!showUnits) return;

      var display = units === 'number' ? completed + ' of ' + outOf : percentageComplete + '%';

      return React.createElement(
        'p',
        { className: 'units', style: style.units },
        display
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          width = _props4.width,
          height = _props4.height,
          completedColor = _props4.completedColor,
          barColor = _props4.barColor,
          alignUnits = _props4.alignUnits;
      var percentageComplete = this.state.percentageComplete;


      var baseCompletedColor = Color(completedColor).hexString();
      var gradientCompletedColor = Color(completedColor).lighten(0.5).hexString();

      var style = {
        base: {
          width: width
        },
        units: {
          width: '100%',
          textAlign: alignUnits,
          margin: 0,
          padding: 0
        },
        bar: {
          height: height,
          padding: 0,
          backgroundColor: Color(barColor).hexString(),
          overflow: 'hidden',
          borderRadius: 3
        },
        completed: {
          transform: 'skew(-20deg)',
          height: '100%',
          width: 'calc(' + percentageComplete + '% + ' + (percentageComplete === 100 ? 8 : 0) + 'px',
          background: 'linear-gradient( to top right, ' + baseCompletedColor + ', ' + gradientCompletedColor + ')',
          marginLeft: -4,
          transition: 'width 1s'
        }
      };

      return React.createElement(
        'div',
        null,
        this.renderUnits(style),
        React.createElement(
          'div',
          { className: 'baseBar', style: style.bar },
          React.createElement('div', { className: 'completedBar', style: style.completed })
        )
      );
    }
  }]);

  return ProgressBar;
}(React.Component);
ProgressBar.propTypes = {
  completed: PropTypes.number.isRequired,
  outOf: PropTypes.number.isRequired,
  barColor: PropTypes.string,
  completedColor: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showUnits: PropTypes.bool,
  units: PropTypes.oneOf(['percent', 'number']),
  alignUnits: PropTypes.oneOf(['left', 'right', 'center'])

};
ProgressBar.defaultProps = {
  completed: 0,
  outOf: 0,
  width: '100%',
  height: 26,
  barColor: 'red',
  completedColor: 'green',
  showUnits: false,
  units: 'percent',
  alignUnits: 'right'
};