# Reactables

Reactables is a collection of customizable React components.
This project is a work in progress.

## DateTimePicker

### Usage
```javascript
class MyComponent extends React.Component {
  state = { startDate: moment() }  
  
  handleDateChange =(startDate)=>{
    this.setState({startDate})
  }
  
  render(){
    return(
      <DateTimePicker 
        startDate={ this.state.startDate }
        onChange={ this.handleDateChange }
      />
    )
  }
}
```

### Dates
**- startDate: Moment**  
**- endDate: Moment**  
**- isRangePicker: Bool**  
**- dateFormat: String**  
**- onChange: Function: (startDate: Moment, endDate: Moment)**

Provide Moment dates to component through State. Optionally provide isRangePicker to select a date range.
```javascript
<DateTimePicker 
  isRangePicker 
  startDate={ this.state.startDate }
  endDate={ this.state.endDate }
  dateFormat={ 'YYYY MM DD' }
  onChange={ this.handleDateChange }
/>
```

### Time
**- isTimePicker: Bool**  
**- timeFormat: String**

If isTimePicker is true, the component will now be able to select a time. Dates will also be returned with the specified time.


```javascript
<DateTimePicker 
  isTimePicker 
  timeFormat={ 'hh:mm a' }
  startDate={ this.state.startDate }
/>
```

### Inputs
**- inputWidth: String, Number**   
**- placeholder: String**  
**- fontFamily: String**  
**- pickerDirection: String('left', 'right')**  
**- canClear: Bool**


```javascript
<DateTimePicker 
  startDate={ this.state.startDate }
  canClear
  inputWidth={ 300 }
  fontFamily={ 'Arial' }
  placeholder={ 'Please Select a Date' }
  pickerDirection={ 'right' }
/>
```


## Table

### Data
**- tableData: Array**
```javascript
<Table tableData={[
  {
    a: 1,
    b: Date.now() - 100000000,
    c: 3
  }, 
  {
    a: 4,
    b: Date.now(),
    c: 6
  }
]} />
```

### Headings
**- headings: Object**  
**- display: String**  
**- isSortable: Bool**  
**- width: Number, String**  
**- justify: String('left', 'center', 'right')**  

The provided Object should contain properties contained in tableData objects.
The headings properties can either be a String, modifying the column heading, or an Object modifying multiple properties.
```javascript
<Table 
  tableData={data} 
  headings={{
     a: 'Heading A',
     b: 'Heading B',
     c: {
       display: 'Heading C',
       isSortable: true,
       width: 100,
       justify: 'center'
     }
   }}
/>
```

### Formatters
**- formatters: Array**  

Edit a cell, with access to row data.
```javascript
<Table 
  tableData={data} 
  formatters={{
     b: (rowContent)=> moment(rowContent.b).format('YYYY-MM-DD')
   }}
/>
```

### Column Order
**- columnOrder: Array**  

Order by key
```javascript
<Table 
  tableData={data} 
  columnOrder={ ['c', 'a', 'b'] }
/>
```

### Exclude
**- exclude: Array**  

Excludes keys from tableData. Can't use 'include' prop if opted into 'exclude' 
```javascript
<Table 
  tableData={data} 
  exclude={['a']}
/>
```

### Include
**- include: Array**  

Include only specified keys from tableData. Can't use 'exclude' prop if opted into 'include' 
```javascript
<Table 
  tableData={data} 
  include={['b', 'c']} 
/>
```

### Striped
**- isStriped: Bool**   
**- stripeColor: String**

Styles table as striped.
```javascript
<Table 
  tableData={data} 
  isStriped={ true }
  stripeColor={ '#d4d4d4' }
/>
```

### Scrollable
**- isScrollable: Bool**  
**- height: String, Number**    

Optional fixed header with scrollable body. Specifying a height will set a scroll point for the table body.
```javascript
<Table 
  tableData={data} 
  isScrollable={ true }
  height={ 100 }
/>
```

### Width
**- width: String, Number**  

Optional fixed header with scrollable body. Specifying a height will set a scroll point for the table body.
```javascript
<Table 
  tableData={ data } 
  isScrollable={ true }
  width={ '70%' }
/>
```

### Sort, Order
**- onSort: Function: (sort, order)**  
**- sort: String - external sort key**  
**- order: String - external order ('asc', 'desc')**
 
Providing onSort disables the tables internal sorting. The method provided to onSort returns the key to be sorted and the order expected.
```javascript
<Table 
  tableData={ data } 
  onSort={ this.handleSort }
  sort={ 'a' }
  order={ 'asc' } 
/>
```

### Filter
**- filter: String**
```javascript
<Table 
  tableData={ data } 
  filter={ 'string to find' }
/>
```

### Clickable Rows
**- isSelectable: Bool**  
**- onRowClick: Function: (rowIndex)**  
**- selectColor: String**  
**- selectedIndex: Number**  

- isSelectable: Toggles row highlighting
- onRowClick: Function that returns a row index
- selectColor: Color for selected row
- selectedIndex: allows you to manually manage selected row. isSelectable must be false

```javascript
<Table 
  tableData={ data }
  isSelectable={ true }
  onRowClick={ this.handleRowClick }
  selectColor={ 'yellow' }
  selectedIndex={ 1 }
/>
```

### Controls 
**- controls: Function, Array**

Takes a function or array of functions that return a node.
```javascript
<Table 
 tableData={ data }
 controls={{
   e: (controlIndex, rowIndex, data)=> 
     <div key={ controlIndex } 
       style={{ cursor: 'pointer'}} 
       onClick={ ()=> this.handleTestClick(rowIndex, data) }
     >
       Item 1
     </div>,
   f: [
     (controlIndex, rowIndex, data)=> 
       <div 
         key={ controlIndex } 
         onClick={ ()=> this.handleTestClick(rowIndex, data)}>Item 1</div>,
     (controlIndex, rowIndex,  data)=> 
       <div 
         key={ controlIndex } 
         onClick={ ()=> this.handleTestClick(rowIndex, data)}>Item 2</div>
     ]  
 }}
/>
```
## HeatBar

**- score: Number**  
**- outOf: Number**  
**- width: Number, String**  
**- barHeight: Number, String**  
**- title: String**  
**- barColors: Array**  
**- textColor: String**  
**- fontSize: Number**  
**- isScoreVisible: Bool**  


```javascript
<HeatBar
  score={ 300 }
  outOf={ 600 }
  scoreTitle={ 'confidence' }
  barHeight={ 20 }
  title={ 'Heat Bar'}
  barColors={ [ '#27ae60', '#dfea10', '#efec13', '#e74c3c' ] }
  textColor={ '#000' }
  fontSize={ 11 }
  isScoreVisible={ true }
/>
```