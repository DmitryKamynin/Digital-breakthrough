import React, {useState, useContext} from 'react'

import TableRenderPersons from './TableRenderPersons';

import {GlobalContext} from '../state/context/globalStateContext';

const headCells = [
  { id: 'id',     label: 'Номер' },
  { id: 'first_name',  label: 'Имя' },
  { id: 'last_name', label: 'Фамилия' },
  { id: 'post', label: 'Должность' },
  { id: 'tg', label: 'Телеграмм' },
];

export default function UnitsTable() {
  const { GlobalState } = useContext(GlobalContext);
  const persons = [...GlobalState.persons];

  const [rows, setRows] = useState(persons.map((item, index) => {
    item.id = index;
    return item;
  }))

  console.log(persons);
  return (
    <div>
      <TableRenderPersons
        headCells={headCells}
        rows={rows}
        tableTitle={"Сотрудники"}
        />

    </div>
  )
}
