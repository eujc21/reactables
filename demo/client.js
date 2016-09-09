// ie11 support
//import 'babel-polyfill'


import React from 'react'
import ReactDOM from 'react-dom'

import { Table } from '../src/components/table'

ReactDOM.render(
  <div>
    <Table
      tableData={ [{a: 1, b: Date.now() - 100000000, c: 3}, {a: 4, b: Date.now(), c: 6}] }
      headings={{
        b: 'Heading B',
        delete:{
          display: 'Delete',
          isSortable: false
        }
      }}
      columnOrder={ ['c', 'a', 'b', 'delete'] }
      isStriped={ true }
      isHoverable={ true }
      sort={ '' }
      order={ '' }
      onSort={ ()=> console.log('')}
      controls={{
        delete: (controlIndex, rowIndex, data)=>
          <div key={ controlIndex }>
            <div>
              Item
            </div>
          </div>
      }}
    />
  </div>, document.getElementById('root')
)
