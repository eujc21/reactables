import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable'

import TableHeader from './components/TableHeader.component';
import TableBody from './components/TableBody.component';

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Immutable.List(),
      filteredData: Immutable.List()
    }
  }
  componentWillMount() {
    this.setState({
      data: Immutable.fromJS(this.props.data),
      filteredData: Immutable.fromJS(this.props.data).toList(),
      headers: Immutable.fromJS(this.props.headers).toList(),
      activeHeaders: Immutable.fromJS(this.props.headers).toList()
    });
  }
  render() {
    return (
      <section className={'TableContainer'}>
        <TableHeader />
        <TableBody />
      </section>
    );
  }
}

Table.propTypes = {

};
