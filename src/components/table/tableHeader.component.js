import React, { PropTypes, Component } from 'react';

class SASS {
  constructor(){

  }
  create(configuration){

  }
}

const scss = (styles, ...args) => {

}

const styles = SASS.create({
  tableHeaderContainer:{
    backgroundColor: 'red',
    tableCell: {
      ':hover': {
        display: 'block'
      }
    }
  }
});

export class TableHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    <section
      style={
        scss(
          styles.tableHeaderContainer ||
          this.props.tableHeadeContainer
        )
      }
    >
      <div
        style={
          scss(
            styles.tableCell ||
            this.props.tableCell
          )
        }
    </section>
  }
}
