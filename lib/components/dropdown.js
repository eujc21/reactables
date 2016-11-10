'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dropdown_item = require('./dropdown_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ** usage **
//
//  <Dropdown
//    face={
//      <div>
//        <i className="icon-name"/>
//      </div>
//  }>
//    <DropdownItem text="Item 1" onClick={ ()=>console.log('test') }/>
//  </Dropdown>


var Dropdown = exports.Dropdown = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isHighlighted: false, isMenuVisible: false }, _this.onClickOutside = function (e) {
      if (_this.refs.main && _this.refs.main.contains(e.target)) {
        return;
      }

      _this.setState({
        isMenuVisible: false,
        isHighlighted: false
      });
    }, _this.toggleButtonHighlight = function () {
      if (_this.props.isDisabled) return;

      _this.setState({
        isHighlighted: _this.state.isMenuVisible === true ? _this.state.isHighlighted : !_this.state.isHighlighted,
        isMenuVisible: _this.state.isHighlighted === true ? _this.state.isMenuVisible : false
      });
    }, _this.toggleMenu = function () {
      if (_this.props.isDisabled) return;

      _this.setState({
        isMenuVisible: !_this.state.isMenuVisible
      });
    }, _this.handleMenuClick = function (menuFunction, shouldHide) {
      menuFunction();
      _this.setState({
        isMenuVisible: !shouldHide,
        isHighlighted: false
      });
    }, _this.onEnterMenuItem = function (e) {
      e.target.style.backgroundColor = '#f9f9f9';
    }, _this.onLeaveMenuItem = function (e) {
      e.target.style.backgroundColor = 'white';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.onClickOutside, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.onClickOutside, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isDisabled = this.props.isDisabled;


      var style = {
        base: {
          position: 'relative'
        },
        button: {
          base: {
            borderRadius: 3,
            transition: 'box-shadow 0.5s ease',
            boxShadow: this.state.isHighlighted ? '0px 2px 4px 0px rgba(0,0,0, 0.29)' : null,
            cursor: isDisabled ? null : 'pointer'
          },
          face: {
            transition: 'transform 0.5s ease-in-out',
            transform: this.state.isHighlighted && this.props.animate ? 'rotate(-90deg)' : null
          }
        },
        menu: {
          base: {
            position: 'absolute',
            visibility: this.state.isMenuVisible ? 'visible' : 'hidden',
            width: 'auto',
            minWidth: 200,
            right: this.props.menuDirection === 'left' ? 0 : null,
            left: this.props.menuDirection === 'right' ? 0 : null,
            marginTop: 3,
            backgroundColor: 'white',
            border: '1px solid #dcdcdc',
            borderRadius: 3,
            //transition: '0.5s ease',
            opacity: this.state.isMenuVisible ? 1 : 0,
            zIndex: 10000
          },
          item: {
            base: {
              padding: 10,
              fontSize: 16,
              cursor: 'pointer',
              transition: '0.2s all'
            },
            secondary: {
              borderTop: '1px solid #dcdcdc'
            }
          }
        }
      };
      return _react2.default.createElement(
        'div',
        { ref: 'main', style: style.base },
        _react2.default.createElement(
          'div',
          {
            style: style.button.base,
            onMouseEnter: this.toggleButtonHighlight,
            onMouseLeave: this.toggleButtonHighlight,
            onClick: this.toggleMenu },
          _react2.default.createElement(
            'div',
            { style: style.button.face },
            this.props.face
          )
        ),
        _react2.default.createElement(
          'div',
          { style: style.menu.base },
          this.props.children.map(function (child, i) {
            return _react2.default.createElement(
              'div',
              { key: i,
                style: Object.assign({}, style.menu.item.base, i > 0 ? style.menu.item.secondary : {}, child.props.styles),
                onMouseEnter: _this2.onEnterMenuItem,
                onMouseLeave: _this2.onLeaveMenuItem,
                onClick: function onClick() {
                  return _this2.handleMenuClick(child.props.onClick, child.props.shouldHideMenu);
                } },
              child.props.text
            );
          })
        )
      );
    }
  }]);

  return Dropdown;
}(_react2.default.Component);

Dropdown.propTypes = {
  face: _react.PropTypes.node.isRequired,
  isDisabled: _react.PropTypes.bool,
  menuDirection: _react.PropTypes.string,
  children: _react.PropTypes.arrayOf(function (propValue, key) {
    if (propValue[key].type !== _dropdown_item.DropdownItem) return new Error('One or more children are not of type DropdownItem');
  })
};
Dropdown.defaultProps = {
  animate: false,
  menuDirection: 'left',
  isDisabled: false
};