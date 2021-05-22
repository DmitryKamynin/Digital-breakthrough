import React, {useState, useContext} from 'react'
import {GlobalContext} from '../state/context/globalStateContext';

import TableRenderIssues from './TableRenderIssues';


const headCells = [
  { id: 'id',     label: 'Номер' },
  { id: 'title',  label: 'Проблема' },
  { id: 'status',  label: 'Статус' },
  { id: 'person',  label: 'Закреплена' },
  { id: 'unit',  label: 'Требуемая техника' },
  { id: 'time',  label: 'Назначена' },
];

export default function UnitsTable() {
  const { GlobalState } = useContext(GlobalContext);
  const issues = [...GlobalState.issues];

  const [rows, setRows] = useState(issues.map((item, index) => {
    item.id = index;
    return item;
  }))

  console.log(issues)

  return (
    <div>
      <TableRenderIssues
        headCells={headCells}
        rows={rows}
        tableTitle={"Проблемы"}
        />
    </div>
  )
}
