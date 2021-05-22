import React, {useState} from 'react'

import TableRender from './TableRender';


function createData(id, title, status,) {
  return { id, title, status, };
}

const rows = [
  createData(123, 'Снег',),
  createData(215, 'Обледенение', ),

];

const headCells = [
  { id: 'id',     label: 'Номер' },
  { id: 'title',  label: 'Проблема' },
];

export default function UnitsTable() {
  

  return (
    <div>
      <TableRender
        headCells={headCells}
        rows={rows}
        tableTitle={"Проблемы"}
        />
    </div>
  )
}
