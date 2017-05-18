import React, { PropTypes, Component } from 'react';
import { compose, map, prop } from 'ramda';

import RowWrapper from './TableRow';

const getRows = compose(
  map(RowWrapper), // Parse cell array to RowWrapper to map.
  map(prop('cells')) // Retrieve cell array from row object.
);
// https://medium.com/let-s-learn/lets-learn-composing-react-components-with-ramda-5db457997554
// rows = [
//  {
//    cells:[
//      {
//        rowId: Number,
//        value: Any
//      }
//    ]
//  }
// ]
const TableBody = ({ rows }) => (
  <div>
    {
      getRows(rows)
    }
  </div>
);

export default TableBody;
