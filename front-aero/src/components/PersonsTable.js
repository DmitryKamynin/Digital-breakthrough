import { Button, Dialog, DialogTitle } from '@material-ui/core';
import React, { useContext,useState} from 'react';
import { Map } from 'react-yandex-maps';

import NavBar from '../components/NavBar';
import TableRenderPersons from '../components/TableRenderPersons';
import CreateObj from '../components/CreateObj';
import { CLOSE_CREATE_FORM, CLOSE_CHANGE_FORM } from '../constants';

import {GlobalContext} from '../state/context/globalStateContext';

import {useHttp} from '../hooks/useHttp';

import styles from '../styles/index.module.css';

const headCells = [
  { id: 'id',     label: 'Номер' },
  { id: 'first_name',  label: 'Имя' },
  { id: 'last_name', label: 'Фамилия' },
  { id: 'post', label: 'Должность' },
  { id: 'id_telegram', label: 'Телеграмм' },
];

export default function UnitsTable() {
  const { request } = useHttp();

  const { GlobalState, dispatch  } = useContext(GlobalContext);
  const persons = [...GlobalState.persons];


  const fields = [
    {label:'first_name' , name:'Имя:'},
    {label:'last_name' , name:'Фамилия:'},
    {label:'post' , name:'Должность:'},
    {label:'id_telegram' , name:'Телеграмм:'},
  ]
  const fields2 = [
    {label:'first_name' , name:'Имя:'},
    {label:'last_name' , name:'Фамилия:'},
    {label:'post' , name:'Должность:'},
    {label:'id_telegram' , name:'Телеграмм:'},
  ]

  const onCreteSubmit = async (values) => {
      const result = await request('http://185.185.69.68:8000/persons/?format=json', 'POST', values);
      dispatch({ type:"CREATED_PERSON", person: result.data});
  }

  const onChangeSubmit = async (values) => {
      values.id = GlobalState.id;
      const result = await request(`http://185.185.69.68:8000/persons/${GlobalState.id}`, 'PUT', values);
      dispatch({ type:"CHANGE_PERSON", person: result.data});
  }

  return (
    <div>
      <TableRenderPersons
        headCells={headCells}
        rows={persons}
        tableTitle={"Сотрудники"}
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
