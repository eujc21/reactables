import React, { PropTypes, Component} from 'react';
import { mapObjIndexed } from 'ramda';
import Cell from './TableCell.component.js';

const Row =  map(Cell);

const RowWrapper = cells => (
  <div>
    {
      Row(cells)
    }
  </div>
);

export default RowWrapper;
