import React, {useState, useContext} from 'react'
import {GlobalContext} from '../state/context/globalStateContext';

import TableRenderIssues from './TableRenderIssues';


const headCells = [
  { id: 'id',     label: 'Номер' },
  { id: 'title',  label: 'Проблема' },
  { id: 'status',  label: 'Статус' },
  { id: 'person',  label: 'Закреплена' },
  { id: 'coord',  label: 'Координаты' },
  { id: 'unit',  label: 'Требуемая техника' },
  { id: 'time',  label: 'Назначена' },
  { id: 'reamained_time',  label: 'Время на выполнение' },
  { id: 'comment',  label: 'Комментарий' },
];

export default function UnitsTable() {
  const { GlobalState } = useContext(GlobalContext);
  const issues = [...GlobalState.issues];

  return (
    <div>
      <TableRenderIssues
        headCells={headCells}
        rows={issues}
        tableTitle={"Проблемы"}
        />
    </div>
  )
}
