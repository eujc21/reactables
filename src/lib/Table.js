import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import cloneDeep from 'lodash/cloneDeep'
import forEach from 'lodash/forEach'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'

export default class Table extends React.Component {

  static propTypes = {
    tableData: PropTypes.array,
    controls: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.array])
    ),
    columnOrder: PropTypes.arrayOf(PropTypes.string),
    formatters: PropTypes.objectOf(PropTypes.func),
    headings: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ),
    exclude: PropTypes.arrayOf(PropTypes.string),
    include: PropTypes.arrayOf(PropTypes.string),
    stripeColor: PropTypes.string,
    hoverColor: PropTypes.string,
    selectColor: PropTypes.string,
    isStriped: PropTypes.bool,
    isHoverable: PropTypes.bool,
    isScrollable: PropTypes.bool,
    isSelectable: PropTypes.bool,
    selectedIndex: PropTypes.number,
    onSort: PropTypes.func,
    onRowClick: PropTypes.func,
    sort: PropTypes.string,
    order: PropTypes.oneOf(['asc', 'desc']),
    filter: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  static defaultProps = {
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
  }

  state = {
    tableData: cloneDeep(this.props.tableData),
    order: this.props.order,
    lastKey: this.props.sort,
    cellWidth: 0,
    selectedIndex: -1
  }

  _findNearestTableRow =(element)=>{
    while(element.nodeName !== 'TR'){
      element = element.parentNode
    }
    return element
  }

  _findSelectedIndex =(data, prevSelectedObject)=>{
    let nextSelectedIndex = null
    if(this.props.isSelectable) {
      forEach(data, (item, i)=> {
        if (isEqual(item, prevSelectedObject)) {
          nextSelectedIndex = i
          return false
        }
      })
    }
    return nextSelectedIndex
  }

  _handleFilter =(input, tableData)=>{

    const { isSelectable } = this.props
    const { selectedIndex } = this.state
    const keys = Object.keys(this.props.tableData[0])

    // get the current selected object before the filter
    let prevSelectedObject = {}

    if(isSelectable)
      prevSelectedObject = tableData[selectedIndex]

    const data = tableData.reduce((array, item) => {

      for(var i = 0; i < keys.length; i++){
        const field = String(item[keys[i]])

        if ( field.toLowerCase().indexOf( input.toLowerCase() ) > -1 ) {
          if(input === '')
            return

          array.push(item)
          break;
        }
      }

      return array
    }, [])

    const prevSelectedIndex = this._findSelectedIndex(data, prevSelectedObject)

    return {data, prevSelectedIndex}
  }

  _getTableProperties =()=>{
    const { columnOrder, exclude, include, } = this.props
    const { tableData } = this.state

    let tableProperties = columnOrder ? columnOrder : tableData.length > 0 ? Object.keys(tableData[0])  : []

    // exclude properties
    tableProperties = exclude ? tableProperties.filter(property => exclude.indexOf(property) < 0) : tableProperties
    tableProperties = include ? tableProperties.filter(property => include.indexOf(property) >= 0) : tableProperties

    return tableProperties
  }

  _formatHeading =(key)=>{
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase() )
  }

  _getTableHeadings =()=>{
    const headings = this.props.headings
    const tableProperties = this._getTableProperties()

    return tableProperties.map(key => {
      if (headings && headings[key]) {
        // User-defined heading
        return {
          display: headings[key].display || this._formatHeading(key),
          isSortable: headings[key].isSortable === true,
          justify: headings[key].justify || 'left',
          width: headings[key].width || null
        }
      } else {
        // Default heading
        return {
          key: key,
          display: this._formatHeading(key),
          isSortable: true
        }
      }
    })
  }

  _addFields =(tableData)=>{
    const { controls } = this.props

    return [...tableData.map((data, i) => {

      // add controls
      if(controls) {
        Object.keys(controls).forEach(key => {
          const control = isFunction(controls[key]) ? [controls[key]] : controls[key]
          data[key] = (
            <div key={ i }>
              { control.map((control, controlIndex)=>  control(controlIndex, i, data)) }
            </div>
          )
        })
      }
      return data
    })]

  }

  componentWillMount(){
    const { isSelectable, selectedIndex, include, exclude} = this.props

    if(include && exclude)
      console.warn('You must choose between using prop include or prop exclude')

    if(!isNaN(parseInt(selectedIndex)) && isSelectable){
      console.warn('Setting isSelectable === true means you are allowing the component to manage the selectedIndex. ' +
        'Only set selectedIndex if you want to manually manage this piece of state.')
    }

  }

  componentDidMount(){

    const tableData = this._addFields(this.state.tableData)

    this.setState({
      cellWidth: this.getColumnWidths(),
      tableData
    })

    window.addEventListener('resize', this.handleResize)

  }

  componentWillUnmount(){

    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('click', this.onRowClick)

  }

  componentWillReceiveProps(nextProps){
    const { filter } = nextProps
    const { selectedIndex } = this.state

    //let data = !isEqual(this.props.tableData, nextProps.tableData) ? nextProps.tableData : this.state.tableData
    let data = this._addFields(nextProps.tableData)

    let prevSelectedIndex = null

    if( filter.length > 0 ){
      const response = this._handleFilter(filter, data)
      data = response.data
      prevSelectedIndex = response.prevSelectedIndex
    }

    this.setState({
      tableData: data,
      selectedIndex:  prevSelectedIndex || selectedIndex,
      cellWidth: this.getColumnWidths()
    })
  }

  handleResize =()=>{
    this.setState({ cellWidth: this.getColumnWidths() })
  }

  getColumnWidths =()=>{
    const { controls, include, exclude, columnOrder, headings, isScrollable } = this.props
    const { tableData } = this.state
    let tableWidth = ReactDOM.findDOMNode(this).clientWidth
    //const controlsCount = Object.keys(controls).length > 0 ? Object.keys(controls).length : 0

    // TODO: Address this bug with calculating column widths
    // TODO: Also needs initial data for calculation of width if scrollable
    if(!isScrollable)
      return

    let numberOfColumns = tableData.length > 0
      ? Object.keys(tableData[0]).length
      : 0

    if(include){
      numberOfColumns = include.length
    }

    if(exclude){
      numberOfColumns = numberOfColumns - exclude.length
    }

    if(columnOrder){
      numberOfColumns = columnOrder.length
    }

    // loop through headings
    if(headings && isScrollable){
      const counts = Object.keys(headings).reduce((obj, h) =>{
        if(headings[h].width){
          obj.offset = headings[h].width + obj.offset
          obj.cells = obj.cells + 1
        }
        return obj
      }, {cells: 0, offset: 0})

      tableWidth = tableWidth - counts.offset
      numberOfColumns = numberOfColumns - counts.cells
    }

    const cellWidth = tableWidth / numberOfColumns
    return cellWidth
  }

  onMouseOverRow =(e)=>{
    const { isHoverable, hoverColor } = this.props
    const element = this._findNearestTableRow(e.target)

    if(isHoverable){
      element.style.backgroundColor = hoverColor
    }
  }

  onMouseLeaveRow =(e, index)=>{
    const { isHoverable, isStriped, stripeColor, selectColor } = this.props
    const element = this._findNearestTableRow(e.target)

    if(isHoverable){
      element.style.backgroundColor = (isStriped === true) && (index % 2 === 0) ?
        index === this.state.selectedIndex || index === this.props.selectedIndex ? selectColor : stripeColor :
        index === this.state.selectedIndex || index === this.props.selectedIndex ? selectColor :  ''
    }
  }

  onRowClick =(e, index)=>{
    const { isSelectable, onRowClick } = this.props

    if(isSelectable){
      this.setState({
        selectedIndex: index
      })
    }

    if(onRowClick)
      onRowClick(index)
  }

  handleInternalSort =(key)=>{
    let { order, lastKey, selectedIndex, tableData } = this.state
    const { isSelectable } = this.props

    if(lastKey !== key)
      order = 'asc'

    // get the current selected object before the sort
    let prevSelectedObject = {}
    if(isSelectable)
      prevSelectedObject = tableData[selectedIndex]

    const data = tableData.sort((a, b) => {
      let itemOrder = 0
      if(a[key] < b[key]) {
        itemOrder = order === 'asc' ? 1 : -1
        return itemOrder
      }
      if(a[key] > b[key]) {
        itemOrder =order === 'asc' ? -1 : 1
        return itemOrder
      }
      return itemOrder
    })

    this.setState({
      tableData: data,
      order: order === 'asc' ? 'desc' : 'asc',
      lastKey: key,
      selectedIndex: this._findSelectedIndex(data, prevSelectedObject)
    })
  }

  handleExternalSort =(key)=>{
    let { order, lastKey } = this.state

    if(lastKey !== key)
      order = 'asc'

    order = order === 'asc' ? 'desc' : 'asc'

    this.setState({
      order: order,
      lastKey: key
    })
    this.props.onSort(key, order)
  }

  renderTableHeadings =(style, tableProperties)=>{
    const { order, lastKey, cellWidth } = this.state
    const { onSort } = this.props

    let tableHeadings = this._getTableHeadings()

    return(
      <thead style={ style.thead.base }>
      <tr style={ style.thead.tr }>
        { tableHeadings.map((heading, i) =>
          <th
            key={ i }
            style={{ ...style.thead.th,
              textAlign: heading.justify || 'left',
              width: heading.width || cellWidth
            }}>
            <p
              style={{ ...style.thead.p, cursor: heading.isSortable === true ? 'pointer': 'default' }}
              onClick={ ()=> {
               if (heading.isSortable){
                  onSort ?
                    this.handleExternalSort(tableProperties[i]) :
                    this.handleInternalSort(tableProperties[i])
                }
            }}>
              { heading.display }
              { lastKey === tableProperties[i] ?
                <i
                  className='material-icons'
                  style={{ marginLeft: 5, fontSize: 16}}>
                  { order === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }
                </i>: null
              }
            </p>
          </th>
        )}
      </tr>
      </thead>
    )
  }

  render(){
    let { tableData, cellWidth } = this.state

    const {
      stripeColor,
      isStriped,
      isScrollable,
      width,
      height,
      selectColor,
      formatters,
      headings
    } = this.props

    let style = {
      base:{
        position: 'relative',
        width
      },
      table:{
        base:{
          borderCollapse: 'collapse',
          width: '100%',
          tableLayout: 'fixed'
        }
      },
      thead:{
        base: {
          display: isScrollable ? 'block' : null,
          borderBottom: '1px solid #424242'
        },
        tr: {
          width
        },
        th:{
          whiteSpace: 'nowrap',
          textAlign: 'left',
          padding: '0 5px',
          height: 37,
          fontSize: 12,
          fontWeight: 300,
        },
        p: {
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          margin: 0
        },
        controls: {
          textAlign: 'center'
        }
      },
      tbody: {
        base: {
          display: isScrollable ? 'block' : null,
          overflow: isScrollable ? 'auto' : null,
          height: isScrollable ? height : null,
        },
        tr: {
          base: {
            width
          },
          striped: {
            backgroundColor: stripeColor,
            width
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
    }

    // Set column order or get properties
    let tableProperties = this._getTableProperties()

    return(
      <div style={ style.base }>

        <table style={ style.table.base }>

          { this.renderTableHeadings(style, tableProperties) }

          <tbody style={ style.tbody.base }>

          { tableData.map((item, rowIndex) =>
            <tr
              key={ rowIndex }
              onMouseOver={ this.onMouseOverRow }
              onMouseLeave={ (e)=> this.onMouseLeaveRow(e, rowIndex) }
              onClick={ (e)=> this.onRowClick(e, rowIndex) }
              style={
                Object.assign({},
                  (isStriped === true) && (rowIndex % 2 === 0) ? style.tbody.tr.striped : style.tbody.tr.base,
                  rowIndex === this.state.selectedIndex ? { backgroundColor: selectColor }:{},
                  rowIndex === this.props.selectedIndex ? { backgroundColor: selectColor }:{} )
              }>

              { tableProperties.map((propertyKey, propertyIndex) =>
                <td
                  key={ propertyIndex }
                  style={
                  { ...style.tbody.td,
                    textAlign: headings && headings[propertyKey] && headings[propertyKey].justify ? headings[propertyKey].justify :  null,
                    width: headings && headings[propertyKey] && headings[propertyKey].width ? headings[propertyKey].width : cellWidth,
                    maxWidth: headings && headings[propertyKey] && headings[propertyKey].width ? headings[propertyKey].width : cellWidth,
                    minWidth: headings && headings[propertyKey] && headings[propertyKey].minWidth ? headings[propertyKey].minWidth : null
                  }
                  }>
                  {
                    /* Apply Formatters */
                    formatters && formatters[propertyKey]
                      ? formatters[propertyKey]( item, rowIndex )
                      : item[propertyKey]
                  }
                </td>
              )}
            </tr>
          )}

          </tbody>

        </table>
      </div>
    )
  }
}
