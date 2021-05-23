import { Button, Dialog, DialogTitle } from '@material-ui/core';
import React, { useContext,useState} from 'react';
import { Map } from 'react-yandex-maps';

import NavBar from '../components/NavBar';
import TableRenderUnits from '../components/TableRenderUnits';
import CreateObj from '../components/CreateObj';
import { CLOSE_CREATE_FORM, CLOSE_CHANGE_FORM } from '../constants';

import {GlobalContext} from '../state/context/globalStateContext';

import {useHttp} from '../hooks/useHttp';

import styles from '../styles/index.module.css';

const headCells = [
  { id: 'id',     label: 'Номер' },
  { id: 'title',  label: 'Техника' },
  { id: 'status', label: 'Статус' },
];

export default function TechniqueTable() {
  const { request } = useHttp();

  const { GlobalState, dispatch  } = useContext(GlobalContext);
  const units = [...GlobalState.units];

  const fields = [
    {label:'name' , name:'Название:'},
]

const fields2 = [
    {label:'name' , name:'Название:'},
    {label:'free' , name:'Статус (true or false)'},
]

  const onCreteSubmit = async (values) => {
      values.free = true;
      const result = await request('http://185.185.69.68:8000/units/?format=json', 'POST', values);
      dispatch({ type:"CREATED_UNITS", unit: result.data});
  }

  const onChangeSubmit = async (values) => {
      values.id = GlobalState.id;
      const result = await request('http://185.185.69.68:8000/units/?format=json', 'PUT', values);
      dispatch({ type:"CHANGE_UNITS", unit: result.data});
  }

  return (
    <div>
      <TableRenderUnits
        headCells={headCells}
        rows={units}
        tableTitle={"Техника"}
        />

            <Dialog
                open={GlobalState.create_form}
                onClose={() => dispatch( { type: CLOSE_CREATE_FORM } )}
            >   
            <DialogTitle>
                Новая единица
            </DialogTitle>
                <CreateObj fields={fields} submit={onCreteSubmit}/>
            </Dialog>

            <Dialog
                open={GlobalState.change_form}
                onClose={() => dispatch( { type: CLOSE_CHANGE_FORM } )}
            >   
            <DialogTitle>
                Редактировать технику
            </DialogTitle>
                <CreateObj fields={fields2} submit={onChangeSubmit}/>
            </Dialog>
    </div>
  )
}
