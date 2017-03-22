import React, { PropTypes, Component } from 'react';

class TableHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className={'TableHeaderContainer'}>
        {'header'}
      </section>
    );
  }
}

TableHeader.propTypes = {

}
export default TableHeader;
