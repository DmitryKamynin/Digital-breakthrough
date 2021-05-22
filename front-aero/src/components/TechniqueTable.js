import React, {useState} from 'react'

import TableRender from './TableRender';


function createData(id, title, status,) {
  return { id, title, status, };
}

const rows = [
  createData(123, 'Грузовик', 'Занят'),
  createData(215, 'Самосвал', 'Занят'),
  createData(514, 'Экскаватор', 'Свободен'),
  createData(915, 'Роторный погрузчик', 'Занят'),
  createData(643, 'Плужно-щеточная машина', "Занят"),
  createData(712, 'Плужно-щеточная машина с реагентом.', 'Свободен'),
  createData(214, 'Экскаватор', 'Свободен'),
  createData(251, 'Грузовик', 'Занят'),
  createData(673, 'Плужно-щеточная машина', 'Свободен'),
  createData(361, 'Экскаватор', 'Свободен'),
  createData(368, 'Роторный погрузчик', 'Свободен'),
  createData(125, 'Плужно-щеточная машина', 'Занят'),
  createData(746, 'Самосвал', 'Свободен'),
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
        tableTitle={"Техника"}
        />
    </div>
  )
}
