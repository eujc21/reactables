'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Table)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      tableData: _this.props.tableData,
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
    }, _this.componentWillMount = function () {
      var _this$props = _this.props;
      var isSelectable = _this$props.isSelectable;
      var selectedIndex = _this$props.selectedIndex;
      var include = _this$props.include;
      var exclude = _this$props.exclude;

      if (include && exclude) console.warn('You must choose between using prop include or prop exclude');

      if (!isNaN(parseInt(selectedIndex)) && isSelectable) {
        console.warn('Setting isSelectable === true means you are allowing the component to manage the selectedIndex. ' + 'Only set selectedIndex if you want to manually manage this piece of state.');
      }
    }, _this.componentDidMount = function () {

      _this.setState({ cellWidth: _this.getColumnWidths() });

      _this.props.isScrollable ? window.addEventListener('resize', _this.handleResize) : null;
    }, _this.componentWillUnmount = function () {
      _this.props.isScrollable ? window.removeEventListener('resize', _this.handleResize) : null;

      _this.props.isSelectable ? window.removeEventListener('click', _this.onRowClick, false) : null;
    }, _this.componentWillReceiveProps = function (nextProps) {
      var filter = nextProps.filter;
      var tableData = nextProps.tableData;
      var selectedIndex = _this.state.selectedIndex;


      var data = !_lodash2.default.isEqual(_this.props.tableData, tableData) ? tableData : _this.props.tableData;
      var prevSelectedIndex = null;

      if (filter.length > 0) {
        var response = _this._handleFilter(filter, data);
        data = response.data;
        prevSelectedIndex = response.prevSelectedIndex;
      }

      _this.setState({
        tableData: data,
        selectedIndex: prevSelectedIndex || selectedIndex,
        cellWidth: _this.getColumnWidths(data)
      });
    }, _this.handleResize = function () {
      _this.setState({ cellWidth: _this.getColumnWidths() });
    }, _this.getColumnWidths = function (data) {
      var tableData = data || _this.props.tableData;
      var controls = _this.props.controls;
      var tableWidth = _reactDom2.default.findDOMNode(_this).clientWidth;
      var numberOfColumns = tableData.length > 0 ? Object.keys(tableData[0]).length + (controls.length > 0 ? 1 : 0) : 0;
      return tableWidth / numberOfColumns;
    }, _this.onMouseEnterRow = function (e) {
      var _this$props2 = _this.props;
      var isHoverable = _this$props2.isHoverable;
      var hoverColor = _this$props2.hoverColor;

      var element = _this._findNearestTableRow(e.target);

      if (isHoverable) {
        element.style.backgroundColor = hoverColor;
      }
    }, _this.onMouseLeaveRow = function (e, index) {
      var _this$props3 = _this.props;
      var isHoverable = _this$props3.isHoverable;
      var isStriped = _this$props3.isStriped;
      var stripeColor = _this$props3.stripeColor;
      var selectColor = _this$props3.selectColor;

      var element = _this._findNearestTableRow(e.target);

      if (isHoverable) {
        element.style.backgroundColor = isStriped === true && index % 2 === 0 ? index === _this.state.selectedIndex || index === _this.props.selectedIndex ? selectColor : stripeColor : index === _this.state.selectedIndex || index === _this.props.selectedIndex ? selectColor : '';
      }
    }, _this.onRowClick = function (e, index) {
      var _this$props4 = _this.props;
      var isSelectable = _this$props4.isSelectable;
      var onRowClick = _this$props4.onRowClick;


      if (isSelectable) {
        _this.setState({
          selectedIndex: index
        });
      }

      if (onRowClick) onRowClick(index);
    }, _this.handleInternalSort = function (key) {
      var _this$state = _this.state;
      var order = _this$state.order;
      var lastKey = _this$state.lastKey;
      var selectedIndex = _this$state.selectedIndex;
      var tableData = _this$state.tableData;
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
      var _this$state2 = _this.state;
      var order = _this$state2.order;
      var lastKey = _this$state2.lastKey;


      if (lastKey !== key) order = 'asc';

      order = order === 'asc' ? 'desc' : 'asc';

      _this.setState({
        order: order,
        lastKey: key
      });
      _this.props.onSort(key, order);
    }, _this.renderTableHeadings = function (style, tableProperties) {
      var _this$state3 = _this.state;
      var order = _this$state3.order;
      var lastKey = _this$state3.lastKey;
      var _this$props5 = _this.props;
      var onSort = _this$props5.onSort;
      var headings = _this$props5.headings;
      var computedFields = _this$props5.computedFields;


      var computedKeys = computedFields ? Object.keys(computedFields) : null;

      function formatHeading(key) {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
          return str.toUpperCase();
        });
      }

      // Adjust data for template
      var tableHeadings = headings ? tableProperties.map(function (key) {
        return {
          key: key,
          display: headings && headings[key].display ? headings[key].display : _lodash2.default.isString(headings[key]) ? headings[key] : formatHeading(key),
          isSortable: headings && headings[key].isSortable === false ? headings[key].isSortable : true,
          justify: headings && headings[key].justify ? headings[key].justify : 'left',
          width: headings && headings[key].width ? headings[key].width : null };
      }) : tableProperties.map(function (property) {
        return {
          key: property,
          display: formatHeading(property),
          isSortable: true
        };
      });

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
                style: Object.assign({}, style.thead.th, { textAlign: heading.justify || 'left', width: heading.width }) },
              _react2.default.createElement(
                'p',
                {
                  style: Object.assign({}, style.thead.p, { cursor: heading.isSortable === true ? 'pointer' : 'default' }),
                  onClick: function onClick() {

                    /* Only Use internal sort if heading is a computed field */
                    if (computedKeys && computedKeys.some(function (key) {
                      return key === heading.key;
                    }) && heading.isSortable) {
                      _this.handleInternalSort(tableProperties[i]);
                    }
                    /* Otherwise check for external onSort method */
                    else if (heading.isSortable) {
                        onSort ? _this.handleExternalSort(tableProperties[i]) : _this.handleInternalSort(tableProperties[i]);
                      }
                  } },
                heading.display
              ),
              lastKey === tableProperties[i] ? _react2.default.createElement('i', {
                className: order === 'asc' ? 'icon-arrow-up' : 'icon-arrow-down',
                style: { marginLeft: 5, fontSize: 12 } }) : null
            );
          })
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //    ** usage **
  //
  //    <Table
  //      tableData={ [{a: 1, b: Date.now() - 100000000, c: 3}, {a: 4, b: Date.now(), c: 6}] }
  //      headings={{
  //        a: 'Heading A',
  //        b: 'Heading B',
  //        c: {
  //          display: 'Heading C',
  //          isSortable: true,
  //          width: 100,
  //          justify: 'center'
  //        },
  //        d: {
  //          display: 'Computed',
  //          isSortable: true
  //        }
  //      }}
  //      columnOrder={ ['c', 'd', 'a', 'b'] }
  //      computedFields={{
  //        d: (obj) => obj.a * obj.c
  //      }}
  //      formatters={{
  //        b: (date)=> moment(date).format('YYYY-MM-DD')
  //      }}
  //      exclude={['a']} // excludes keys from tableData - (can't use include)
  //      include={['b', 'c']} // include keys from tableData - (can't use exclude)
  //      isStriped={ true }
  //      stripeColor={ '#d4d4d4' } // optional
  //      isScrollable={ true }
  //      height={ 100 } // height of tbody if isScrollable === true
  //      width={ '70%' || 500 } // optional table width - string or number(px)
  //      onSort={ this.handleSort } // external custom sort method
  //      onRowClick={ this.handleRowClick } // returns row index
  //      isSelectable={ true } //highlights clicked rows
  //      selectColor={ 'yellow' } // specify color of clicked rows
  //      selectedIndex={ 1 } //manually manage selected row. isSelectable must be false
  //      sort={ '' } //default sort
  //      order={ '' } //default order
  //      filter={ 'filter string' } // external string - (client-side filtering)
  //      controls={{
  //         e: (controlIndex, rowIndex, data)=> <div key={ controlIndex } style={{ cursor: 'pointer'}} onClick={ ()=> this.handleTestClick(rowIndex, data)}>Item 1</div>,
  //         f: [
  //          (controlIndex, rowIndex, data)=> <div key={ controlIndex } style={{ cursor: 'pointer', display: 'inline-block'}} onClick={ ()=> this.handleTestClick(rowIndex, data)}>Item 1</div>,
  //          (controlIndex, rowIndex,  data)=> <div key={ controlIndex } style={{ cursor: 'pointer', display: 'inline-block'}} onClick={ ()=> this.handleTestClick(rowIndex, data)}>Item 2</div>,
  //         ]
  //      }}
  //    />


  _createClass(Table, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tableData = this.state.tableData;
      var _props = this.props;
      var controls = _props.controls;
      var stripeColor = _props.stripeColor;
      var isStriped = _props.isStriped;
      var isScrollable = _props.isScrollable;
      var width = _props.width;
      var height = _props.height;
      var selectColor = _props.selectColor;
      var formatters = _props.formatters;
      var columnOrder = _props.columnOrder;
      var exclude = _props.exclude;
      var include = _props.include;
      var computedFields = _props.computedFields;
      var headings = _props.headings;


      var style = {
        base: {
          position: 'relative',
          width: width
        },
        table: {
          base: {
            borderCollapse: 'collapse',
            width: '100%'
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
            fontSize: 16,
            fontWeight: 300,
            width: this.state.cellWidth
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
            width: isScrollable ? this.state.cellWidth : null
          },
          controls: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }
      };

      tableData = tableData.map(function (data, i) {
        //add computed fields
        if (computedFields) Object.keys(computedFields).forEach(function (key) {
          return data[key] = computedFields[key](data);
        });

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
      });

      // Set column order or get properties
      var tableProperties = columnOrder ? columnOrder : tableData.length > 0 ? Object.keys(tableData[0]) : [];

      // exclude properties
      tableProperties = exclude ? tableProperties.filter(function (property) {
        return exclude.indexOf(property) < 0;
      }) : tableProperties;
      tableProperties = include ? tableProperties.filter(function (property) {
        return include.indexOf(property) >= 0;
      }) : tableProperties;

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
                      style: Object.assign({}, style.tbody.td, {
                        textAlign: headings && headings[propertyKey].justify
                      }) },

                    /* Apply Formatters */
                    formatters && formatters[propertyKey] ? formatters[propertyKey](item[propertyKey]) : item[propertyKey]
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
  computedFields: _react.PropTypes.objectOf(_react.PropTypes.func),
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
  order: _react.PropTypes.string,
  filter: _react.PropTypes.string,
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
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
  width: '100%'
};
exports.default = Table;