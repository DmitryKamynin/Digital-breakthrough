import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useContext,useState} from 'react';
import { Map } from 'react-yandex-maps';

import NavBar from '../components/NavBar';
import TaskTable from '../components/TaskTable';
import CreateObj from '../components/CreateObj';
import { CLOSE_CREATE_FORM, CLOSE_CHANGE_FORM, CLOSE_COMMENTS } from '../constants';

import {GlobalContext} from '../state/context/globalStateContext';

import {useHttp} from '../hooks/useHttp';

import styles from '../styles/index.module.css';

export default function Main() {
    const { request } = useHttp();
    const { GlobalState, dispatch } = useContext(GlobalContext);

    const fields = [
        {label:'issue' , name:'Тип задачи:'},
        {label:'unit' , name:'Необходимая техника:'},
        {label:'person' , name:'Назначить на:'},
        {label:'time_lead' , name:'Время на выполнение:'},
        {label:'lat' , name:'Широта:'},
        {label:'long' , name:'Долгота:'},
    ]

    const fields2 = [
        {label:'issue' , name:'Тип задачи:'},
        {label:'unit' , name:'Необходимая техника:'},
        {label:'person' , name:'Назначить на:'},
        {label:'status' , name:'Статус:'},
        {label:'time_lead' , name:'Время на выполнение:'},
        {label:'lat' , name:'Широта:'},
        {label:'long' , name:'Долгота:'},
    ]

    const fields3 = [
        {label:'comment', name:"Комментарий"}
    ]

    const onCreteSubmit = async (values) => {
        const result = await request('http://185.185.69.68:8000/issues/?format=json', 'POST', values);
        dispatch({ type:"CREATED", issue: result.data});
    }

    const onChangeSubmit = async (values) => {
        values.id = GlobalState.id;
        const result = await request(`http://185.185.69.68:8000/issues/${GlobalState.id}?format=json`, 'PUT', values);
        dispatch({ type:"CHANGE", issue: result.data});
    }


    return (
        <div className={styles.wrapper}>
            <NavBar/>
            <div className={styles.contentWrapper}>
                <TaskTable/>
            </div>
            
            <Dialog
                open={GlobalState.create_form}
                onClose={() => dispatch( { type: CLOSE_CREATE_FORM } )}
            >   
            <DialogTitle>
                Новая задача
            </DialogTitle>
                <DialogContent><CreateObj fields={fields} submit={onCreteSubmit}/></DialogContent>
            </Dialog>



            <Dialog
                open={GlobalState.change_form}
                onClose={() => dispatch( { type: CLOSE_CHANGE_FORM } )}
            >   
            <DialogTitle>
                Редактировать задачу
            </DialogTitle>
                <DialogContent><CreateObj fields={fields2} submit={onChangeSubmit}/></DialogContent>
            </Dialog>



            <Dialog
                open={GlobalState.comments}
                onClose={() => dispatch( { type: CLOSE_COMMENTS } )}
            >   
            <DialogTitle>
                Комментарий к задаче
            </DialogTitle>
            <DialogContent>
                Задача не прокоментирована...
                <CreateObj fields={fields3} submit={onChangeSubmit}/>
            </DialogContent>
                
            </Dialog>

        </div>
    )
}

