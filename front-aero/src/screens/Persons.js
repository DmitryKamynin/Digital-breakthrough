import React, { useEffect ,useState} from 'react';
import { Map } from 'react-yandex-maps';

import NavBar from '../components/NavBar';
import PersonsTable from '../components/PersonsTable';

import styles from '../styles/index.module.css';

export default function Main() {


    return (
        <div className={styles.wrapper}>
            <NavBar/>
            <div className={styles.contentWrapper}>
                <PersonsTable/>
            </div>
        </div>
    )
}

