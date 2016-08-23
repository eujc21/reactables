import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

class Table extends React.Component {

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


  static propTypes = {
    tableData: PropTypes.array,
    controls: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.array])
    ),
    columnOrder: PropTypes.arrayOf(PropTypes.string),
    formatters: PropTypes.objectOf(PropTypes.func),
    computedFields: PropTypes.objectOf(PropTypes.func),
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
    order: PropTypes.string,
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
    tableData: this.props.tableData,
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
      _.forEach(data, (item, i)=> {
        if (_.isEqual(item, prevSelectedObject)) {
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

  componentWillMount =()=>{
    const { isSelectable, selectedIndex, include, exclude} = this.props
    if(include && exclude)
      console.warn('You must choose between using prop include or prop exclude')

    if(!isNaN(parseInt(selectedIndex)) && isSelectable){
      console.warn('Setting isSelectable === true means you are allowing the component to manage the selectedIndex. ' +
        'Only set selectedIndex if you want to manually manage this piece of state.')
    }
  }

  componentDidMount =()=> {

    this.setState({ cellWidth: this.getColumnWidths()})

    this.props.isScrollable ?
      window.addEventListener('resize', this.handleResize) : null
  }

  componentWillUnmount =()=> {
    this.props.isScrollable ?
      window.removeEventListener('resize', this.handleResize) : null

    this.props.isSelectable ?
      window.removeEventListener('click', this.onRowClick, false) : null
  }

  componentWillReceiveProps =(nextProps)=>{
    const { filter, tableData } = nextProps
    const { selectedIndex } = this.state

    let data = !_.isEqual(this.props.tableData, tableData) ? tableData : this.props.tableData
    let prevSelectedIndex = null

    if( filter.length > 0 ){
      const response = this._handleFilter(filter, data)
      data = response.data
      prevSelectedIndex = response.prevSelectedIndex
    }

    this.setState({
      tableData: data,
      selectedIndex:  prevSelectedIndex || selectedIndex,
      cellWidth: this.getColumnWidths(data)
    })
  }

  handleResize =()=>{
    this.setState({ cellWidth: this.getColumnWidths()})
  }

  getColumnWidths =(data)=>{
    const tableData = data || this.props.tableData
    const controls = this.props.controls
    const tableWidth = ReactDOM.findDOMNode(this).clientWidth
    const numberOfColumns = tableData.length > 0 ? Object.keys(tableData[0]).length + (controls.length > 0 ? 1 : 0) : 0
    return tableWidth / numberOfColumns
  }

  onMouseEnterRow =(e)=>{
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
    const { order, lastKey } = this.state
    const { onSort, headings, computedFields } = this.props

    const computedKeys = computedFields ? Object.keys(computedFields) : null

    function formatHeading(key){
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase() )
    }

    // Adjust data for template
    let tableHeadings = headings ?
      tableProperties.map(key => ({
        key,
        display: headings && headings[key].display ?
          headings[key].display : _.isString(headings[key]) ? headings[key] : formatHeading(key),
        isSortable: headings && headings[key].isSortable === false ? headings[key].isSortable : true,
        justify: headings && headings[key].justify ? headings[key].justify : 'left',
        width: headings && headings[key].width ? headings[key].width : null}))
      :
      tableProperties.map(property => ({
        key: property,
        display: formatHeading(property),
        isSortable: true
      }) )

    return(
      <thead style={ style.thead.base }>
      <tr style={ style.thead.tr }>
        { tableHeadings.map((heading, i) =>
          <th
            key={ i }
            style={ Object.assign({}, style.thead.th, { textAlign: heading.justify || 'left', width: heading.width }) }>

            <p
              style={ Object.assign({}, style.thead.p, { cursor: heading.isSortable === true ? 'pointer': 'default'}) }
              onClick={ ()=> {

                /* Only Use internal sort if heading is a computed field */
                if(computedKeys && computedKeys.some(key => key === heading.key) && heading.isSortable){
                  this.handleInternalSort(tableProperties[i])
                }
                /* Otherwise check for external onSort method */
                else if (heading.isSortable){
                  onSort ?
                    this.handleExternalSort(tableProperties[i]) :
                    this.handleInternalSort(tableProperties[i])
                }

              }
              }>
              { heading.display }
            </p>

            { lastKey === tableProperties[i] ?
              <i
                className={ order === 'asc' ? 'icon-arrow-up' : 'icon-arrow-down' }
                style={{ marginLeft: 5, fontSize: 12}}/> : null
            }

          </th>
        )}
      </tr>
      </thead>
    )
  }

  render(){
    let { tableData } = this.state

    const {
      controls,
      stripeColor,
      isStriped,
      isScrollable,
      width,
      height,
      selectColor,
      formatters,
      columnOrder,
      exclude,
      include,
      computedFields,
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
          width: '100%'
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
            width
          },
          striped: {
            backgroundColor: stripeColor,
            width
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
    }


    tableData = tableData.map((data, i) => {
      //add computed fields
      if(computedFields)
        Object.keys(computedFields).forEach(key => data[key] = computedFields[key]( data ))

      // add controls
      if(controls) {
        Object.keys(controls).forEach(key => {
          const control = _.isFunction(controls[key]) ? [controls[key]] : controls[key]
          data[key] = (
            <div key={ i }>
              { control.map((control, controlIndex)=>  control(controlIndex, i, data)) }
            </div>
          )
        })
      }
      return data
    })

    // Set column order or get properties
    let tableProperties = columnOrder ? columnOrder : tableData.length > 0 ? Object.keys(tableData[0])  : []

    // exclude properties
    tableProperties = exclude ? tableProperties.filter(property => exclude.indexOf(property) < 0) : tableProperties
    tableProperties = include ? tableProperties.filter(property => include.indexOf(property) >= 0) : tableProperties

    return(
      <div style={ style.base }>

        <table style={ style.table.base }>

          { this.renderTableHeadings(style, tableProperties) }

          <tbody style={ style.tbody.base }>
          { tableData.map((item, rowIndex) =>
            <tr
              key={ rowIndex }
              onMouseEnter={ this.onMouseEnterRow }
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
                    Object.assign({}, style.tbody.td, {
                      textAlign: headings && headings[propertyKey].justify
                    })
                  }>
                  {
                    /* Apply Formatters */
                    formatters && formatters[propertyKey] ?
                      formatters[propertyKey]( item[propertyKey] ) :
                      item[propertyKey]
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

export default Table
