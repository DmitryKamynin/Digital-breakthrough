import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';


import styles from '../styles/navbar.module.css';

export default function NavBar() {
    useEffect(() => {}, [])
    return (
        <div className={styles.wrapper}>
            <Link to='/'>
                <div className={styles.logo}>
                    <img src='https://rsvsstsv2fnl-a.akamaihd.net/logo-rus-contrast.72225c23c57c9acb6867.svg' alt='icon'/>
                </div>
            </Link>

            <div>
                <Link className={styles.link} to='/'>
                    <p>
                        Задачи
                    </p>
                </Link>
                <Link className={styles.link} to='/map'>
                    <p>
                        Карта
                    </p>
                </Link>
                <Link className={styles.link} to='/technique'>
                    <p>
                        Техника
                    </p>
                </Link>
                <Link className={styles.link} to='/units'>
                    <p>
                        Сотрудники
                    </p>
                </Link>
            </div>
        </div>
    )
}
