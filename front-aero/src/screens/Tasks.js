import React, { useEffect ,useState} from 'react';
import { Map } from 'react-yandex-maps';

import NavBar from '../components/NavBar';
import TechniqueTable from '../components/TechniqueTable';
import UnitsTable from '../components/UnitsTable';

import styles from '../styles/index.module.css';

export default function Main() {
    useEffect(() => {
        console.log('ok?')
    }, [])

    return (
        <div className={styles.wrapper}>
            <NavBar/>
            <div className={styles.contentWrapper}>
                
            </div>
        </div>
    )
}

