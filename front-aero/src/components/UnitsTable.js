import { StarRateSharp } from '@material-ui/icons';
import React, {useState} from 'react'

import TableRender from './TableRender';


function createData(id, title, status,) {
  return { id, title, status, };
}

const rows = [
  createData(123, 'Инженер', 'Занят'),
  createData(215, 'Инженер', 'Занят'),
  createData(514, 'Инженер', 'Свободен'),
  createData(915, 'Инженер ', 'Занят'),
  createData(643, 'Инженер', "Занят"),
  createData(712, 'Инженер', 'Свободен'),
];

const headCells = [
  { id: 'id',     label: 'Номер' },
  { id: 'title',  label: 'Техника' },
  { id: 'status', label: 'Статус' },
];

export default function UnitsTable() {
  return (
    <div>
      <TableRender
        headCells={headCells}
        rows={rows}
        tableTitle={"Сотрудники"}
        />

    </div>
  )
}
