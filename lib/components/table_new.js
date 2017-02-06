'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = exports.Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Table.__proto__ || Object.getPrototypeOf(Table)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      tableData: _lodash2.default.cloneDeep(_this.props.tableData),
      order: _this.props.order,
      lastKey: _this.props.sort,
      cellWidth: 0,
      selectedIndex: -1
    }, _this._findNearestTableRow = function (element) {
      while (element.nodeName !== 'TR') {
        element = element.parentNode;
      }
      return element;
    }, _this._findSelectedIndex = function (data, prevSelectedObject) {
      var nextSelectedIndex = null;
      if (_this.props.isSelectable) {
        _lodash2.default.forEach(data, function (item, i) {
          if (_lodash2.default.isEqual(item, prevSelectedObject)) {
            nextSelectedIndex = i;
            return false;
          }
        });
      }
      return nextSelectedIndex;
    }, _this._handleFilter = function (input, tableData) {
      var isSelectable = _this.props.isSelectable;
      var selectedIndex = _this.state.selectedIndex;

      var keys = Object.keys(_this.props.tableData[0]);

      // get the current selected object before the filter
      var prevSelectedObject = {};

      if (isSelectable) prevSelectedObject = tableData[selectedIndex];

      var data = tableData.reduce(function (array, item) {

        for (var i = 0; i < keys.length; i++) {
          var field = String(item[keys[i]]);

          if (field.toLowerCase().indexOf(input.toLowerCase()) > -1) {
            if (input === '') return;

            array.push(item);
            break;
          }
        }

        return array;
      }, []);

      var prevSelectedIndex = _this._findSelectedIndex(data, prevSelectedObject);

      return { data: data, prevSelectedIndex: prevSelectedIndex };
    }, _this._getTableProperties = function () {
      var _this$props = _this.props,
          columnOrder = _this$props.columnOrder,
          exclude = _this$props.exclude,
          include = _this$props.include;
      var tableData = _this.state.tableData;


      var tableProperties = columnOrder ? columnOrder : tableData.length > 0 ? Object.keys(tableData[0]) : [];

      // exclude properties
      tableProperties = exclude ? tableProperties.filter(function (property) {
        return exclude.indexOf(property) < 0;
      }) : tableProperties;
      tableProperties = include ? tableProperties.filter(function (property) {
        return include.indexOf(property) >= 0;
      }) : tableProperties;

      return tableProperties;
    }, _this._formatHeading = function (key) {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
        return str.toUpperCase();
      });
    }, _this._getTableHeadings = function () {
      var headings = _this.props.headings;
      var tableProperties = _this._getTableProperties();

      return tableProperties.map(function (key) {
        if (headings && headings[key]) {
          // User-defined heading
          return {
            display: headings[key].display || _this._formatHeading(key),
            isSortable: headings[key].isSortable === true,
            justify: headings[key].justify || 'left',
            width: headings[key].width || null
          };
        } else {
          // Default heading
          return {
            key: key,
            display: _this._formatHeading(key),
            isSortable: true
          };
        }
      });
    }, _this._addFields = function (tableData) {
      var controls = _this.props.controls;


      return [].concat(_toConsumableArray(tableData.map(function (data, i) {

        // add controls
        if (controls) {
          Object.keys(controls).forEach(function (key) {
            var control = _lodash2.default.isFunction(controls[key]) ? [controls[key]] : controls[key];
            data[key] = _react2.default.createElement(
              'div',
              { key: i },
              control.map(function (control, controlIndex) {
                return control(controlIndex, i, data);
              })
            );
          });
        }
        return data;
      })));
    }, _this.handleResize = function () {
      _this.setState({ cellWidth: _this.getColumnWidths() });
    }, _this.getColumnWidths = function () {
      var _this$props2 = _this.props,
          include = _this$props2.include,
          exclude = _this$props2.exclude,
          columnOrder = _this$props2.columnOrder,
          headings = _this$props2.headings,
          isScrollable = _this$props2.isScrollable;
      var tableData = _this.state.tableData;

      var tableWidth = _reactDom2.default.findDOMNode(_this).clientWidth;

      // TODO: Address this bug with calculating column widths
      // TODO: Also needs initial data for calculation of width if scrollable
      if (!isScrollable) return;

      var numberOfColumns = tableData.length > 0 ? Object.keys(tableData[0]).length : 0;

      if (include) {
        numberOfColumns = include.length;
      }

      if (exclude) {
        numberOfColumns = numberOfColumns - exclude.length;
      }

      if (columnOrder) {
        numberOfColumns = columnOrder.length;
      }

      // loop through headings
      if (headings && isScrollable) {
        var counts = Object.keys(headings).reduce(function (obj, h) {
          if (headings[h].width) {
            obj.offset = headings[h].width + obj.offset;
            obj.cells = obj.cells + 1;
          }
          return obj;
        }, { cells: 0, offset: 0 });

        tableWidth = tableWidth - counts.offset;
        numberOfColumns = numberOfColumns - counts.cells;
      }

      var cellWidth = tableWidth / numberOfColumns;
      return cellWidth;
    }, _this.onMouseEnterRow = function (e) {
      var _this$props3 = _this.props,
          isHoverable = _this$props3.isHoverable,
          hoverColor = _this$props3.hoverColor;

      var element = _this._findNearestTableRow(e.target);

      if (isHoverable) {
        element.style.backgroundColor = hoverColor;
      }
    }, _this.onMouseLeaveRow = function (e, index) {
      var _this$props4 = _this.props,
          isHoverable = _this$props4.isHoverable,
          isStriped = _this$props4.isStriped,
          stripeColor = _this$props4.stripeColor,
          selectColor = _this$props4.selectColor;

      var element = _this._findNearestTableRow(e.target);

      if (isHoverable) {
        element.style.backgroundColor = isStriped === true && index % 2 === 0 ? index === _this.state.selectedIndex || index === _this.props.selectedIndex ? selectColor : stripeColor : index === _this.state.selectedIndex || index === _this.props.selectedIndex ? selectColor : '';
      }
    }, _this.onRowClick = function (e, index) {
      var _this$props5 = _this.props,
          isSelectable = _this$props5.isSelectable,
          onRowClick = _this$props5.onRowClick;


      if (isSelectable) {
        _this.setState({
          selectedIndex: index
        });
      }

      if (onRowClick) onRowClick(index);
    }, _this.handleInternalSort = function (key) {
      var _this$state = _this.state,
          order = _this$state.order,
          lastKey = _this$state.lastKey,
          selectedIndex = _this$state.selectedIndex,
          tableData = _this$state.tableData;
      var isSelectable = _this.props.isSelectable;


      if (lastKey !== key) order = 'asc';

      // get the current selected object before the sort
      var prevSelectedObject = {};
      if (isSelectable) prevSelectedObject = tableData[selectedIndex];

      var data = tableData.sort(function (a, b) {
        var itemOrder = 0;
        if (a[key] < b[key]) {
          itemOrder = order === 'asc' ? 1 : -1;
          return itemOrder;
        }
        if (a[key] > b[key]) {
          itemOrder = order === 'asc' ? -1 : 1;
          return itemOrder;
        }
        return itemOrder;
      });

      _this.setState({
        tableData: data,
        order: order === 'asc' ? 'desc' : 'asc',
        lastKey: key,
        selectedIndex: _this._findSelectedIndex(data, prevSelectedObject)
      });
    }, _this.handleExternalSort = function (key) {
      var _this$state2 = _this.state,
          order = _this$state2.order,
          lastKey = _this$state2.lastKey;


      if (lastKey !== key) order = 'asc';

      order = order === 'asc' ? 'desc' : 'asc';

      _this.setState({
        order: order,
        lastKey: key
      });
      _this.props.onSort(key, order);
    }, _this.renderTableHeadings = function (style, tableProperties) {
      var _this$state3 = _this.state,
          order = _this$state3.order,
          lastKey = _this$state3.lastKey,
          cellWidth = _this$state3.cellWidth;
      var onSort = _this.props.onSort;


      var tableHeadings = _this._getTableHeadings();

      return _react2.default.createElement(
        'thead',
        { style: style.thead.base },
        _react2.default.createElement(
          'tr',
          { style: style.thead.tr },
          tableHeadings.map(function (heading, i) {
            return _react2.default.createElement(
              'th',
              {
                key: i,
                style: _extends({}, style.thead.th, {
                  textAlign: heading.justify || 'left',
                  width: heading.width || cellWidth
                }) },
              _react2.default.createElement(
                'p',
                {
                  style: _extends({}, style.thead.p, { cursor: heading.isSortable === true ? 'pointer' : 'default' }),
                  onClick: function onClick() {
                    if (heading.isSortable) {
                      onSort ? _this.handleExternalSort(tableProperties[i]) : _this.handleInternalSort(tableProperties[i]);
                    }
                  } },
                heading.display
              ),
              lastKey === tableProperties[i] ? _react2.default.createElement('i', {
                className: order === 'asc' ? 'icon-arrow-up' : 'icon-arrow-down',
                style: { marginLeft: 5, fontSize: 6 } }) : null
            );
          })
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Table, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          isSelectable = _props.isSelectable,
          selectedIndex = _props.selectedIndex,
          include = _props.include,
          exclude = _props.exclude;


      if (include && exclude) console.warn('You must choose between using prop include or prop exclude');

      if (!isNaN(parseInt(selectedIndex)) && isSelectable) {
        console.warn('Setting isSelectable === true means you are allowing the component to manage the selectedIndex. ' + 'Only set selectedIndex if you want to manually manage this piece of state.');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      var tableData = this._addFields(this.state.tableData);

      this.setState({
        cellWidth: this.getColumnWidths(),
        tableData: tableData
      });

      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('click', this.onRowClick);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var filter = nextProps.filter;
      var selectedIndex = this.state.selectedIndex;

      //let data = !_.isEqual(this.props.tableData, nextProps.tableData) ? nextProps.tableData : this.state.tableData

      var data = this._addFields(nextProps.tableData);

      var prevSelectedIndex = null;

      if (filter.length > 0) {
        var response = this._handleFilter(filter, data);
        data = response.data;
        prevSelectedIndex = response.prevSelectedIndex;
      }

      this.setState({
        tableData: data,
        selectedIndex: prevSelectedIndex || selectedIndex,
        cellWidth: this.getColumnWidths()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          tableData = _state.tableData,
          cellWidth = _state.cellWidth;
      var _props2 = this.props,
          stripeColor = _props2.stripeColor,
          isStriped = _props2.isStriped,
          isScrollable = _props2.isScrollable,
          width = _props2.width,
          height = _props2.height,
          selectColor = _props2.selectColor,
          formatters = _props2.formatters,
          headings = _props2.headings,
          styles = _props2.styles;


      var style = {
        base: {
          position: 'relative',
          width: width
        },
        table: {
          base: {
            borderCollapse: 'collapse',
            width: '100%',
            tableLayout: 'fixed'
          }
        },
        thead: {
          base: {
            display: isScrollable ? 'block' : null,
            borderBottom: '1px solid #424242'
          },
          tr: {
            width: width
          },
          th: {
            whiteSpace: 'nowrap',
            textAlign: 'left',
            padding: '0 5px',
            height: 37,
            fontSize: 12,
            fontWeight: 300
          },
          p: {
            padding: 0,
            margin: 0,
            display: 'inline-block'
          },
          controls: {
            textAlign: 'center'
          }
        },
        tbody: {
          base: {
            display: isScrollable ? 'block' : null,
            overflow: isScrollable ? 'auto' : null,
            height: isScrollable ? height : null
          },
          tr: {
            base: {
              width: width
            },
            striped: {
              backgroundColor: stripeColor,
              width: width
            }
          },
          td: {
            padding: '5px 5px',
            wordWrap: 'break-word'
          },
          controls: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }
      };

      _lodash2.default.merge(style, styles);

      // Set column order or get properties
      var tableProperties = this._getTableProperties();

      return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement(
          'table',
          { style: style.table.base },
          this.renderTableHeadings(style, tableProperties),
          _react2.default.createElement(
            'tbody',
            { style: style.tbody.base },
            tableData.map(function (item, rowIndex) {
              return _react2.default.createElement(
                'tr',
                {
                  key: rowIndex,
                  onMouseEnter: _this2.onMouseEnterRow,
                  onMouseLeave: function onMouseLeave(e) {
                    return _this2.onMouseLeaveRow(e, rowIndex);
                  },
                  onClick: function onClick(e) {
                    return _this2.onRowClick(e, rowIndex);
                  },
                  style: Object.assign({}, isStriped === true && rowIndex % 2 === 0 ? style.tbody.tr.striped : style.tbody.tr.base, rowIndex === _this2.state.selectedIndex ? { backgroundColor: selectColor } : {}, rowIndex === _this2.props.selectedIndex ? { backgroundColor: selectColor } : {}) },
                tableProperties.map(function (propertyKey, propertyIndex) {
                  return _react2.default.createElement(
                    'td',
                    {
                      key: propertyIndex,
                      style: _extends({}, style.tbody.td, {
                        textAlign: headings && headings[propertyKey] && headings[propertyKey].justify ? headings[propertyKey].justify : null,
                        width: headings && headings[propertyKey] && headings[propertyKey].width ? headings[propertyKey].width : cellWidth,
                        maxWidth: headings && headings[propertyKey] && headings[propertyKey].width ? headings[propertyKey].width : cellWidth,
                        minWidth: headings && headings[propertyKey] && headings[propertyKey].minWidth ? headings[propertyKey].minWidth : null
                      }) },

                    /* Apply Formatters */
                    formatters && formatters[propertyKey] ? formatters[propertyKey](item) : item[propertyKey]
                  );
                })
              );
            })
          )
        )
      );
    }
  }]);

  return Table;
}(_react2.default.Component);

Table.propTypes = {
  tableData: _react.PropTypes.array,
  controls: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array])),
  columnOrder: _react.PropTypes.arrayOf(_react.PropTypes.string),
  formatters: _react.PropTypes.objectOf(_react.PropTypes.func),
  headings: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object])),
  exclude: _react.PropTypes.arrayOf(_react.PropTypes.string),
  include: _react.PropTypes.arrayOf(_react.PropTypes.string),
  stripeColor: _react.PropTypes.string,
  hoverColor: _react.PropTypes.string,
  selectColor: _react.PropTypes.string,
  isStriped: _react.PropTypes.bool,
  isHoverable: _react.PropTypes.bool,
  isScrollable: _react.PropTypes.bool,
  isSelectable: _react.PropTypes.bool,
  selectedIndex: _react.PropTypes.number,
  onSort: _react.PropTypes.func,
  onRowClick: _react.PropTypes.func,
  sort: _react.PropTypes.string,
  order: _react.PropTypes.oneOf(['asc', 'desc']),
  filter: _react.PropTypes.string,
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  styles: _react.PropTypes.object
};
Table.defaultProps = {
  tableData: [],
  controls: {},
  stripeColor: '#f4f4f4',
  hoverColor: '#d3d3d3',
  selectColor: 'yellow',
  isHoverable: false,
  isStriped: false,
  isScrollable: false,
  isSelectable: false,
  onSort: null,
  onRowClick: null,
  selectedIndex: null,
  filter: '',
  sort: '',
  order: 'asc',
  width: '100%',
  styles: {}
};