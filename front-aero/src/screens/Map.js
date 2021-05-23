import React, { useEffect, useContext ,useState, useMemo} from 'react';
import { Map, Placemark } from 'react-yandex-maps';
import {GlobalContext} from '../state/context/globalStateContext';

import NavBar from '../components/NavBar';

import useInterval from '../hooks/useInterval';

import styles from '../styles/index.module.css';

const createTransport = (id, coord, name, status, target, type) => ({
    id,
    coord,
    name,
    status,
    target,
    type,
})

const Transports = [
    createTransport(1, [55.9672,37.3882], 'Плужно-щеточная машина с реагентом.', 'В работе', 18, 1 ),
    createTransport(2, [55.9747,37.3648], 'Экскаватор', 'В работе', 19, 3),
    createTransport(3, [55.9734,37.4424], 'Самосвал', 'В работе', 20, 2),
    createTransport(4, [55.9653,37.3894], 'Роторный погрузчик', 'Свободен', null, 4),
    createTransport(5, [55.9845,37.4332], 'Плужно-щеточная машина', 'Свободен', null, 5),
]


export default function Main() {
    const { GlobalState } = useContext(GlobalContext);
    const issues = [...GlobalState.issues];

    const mapState = useMemo(() => ({
        center: [ 55.973304 ,37.417588],
        type: 'yandex#satellite',
        zoom: 13,
        controls: ['zoomControl', 'fullscreenControl'],
        behaviors:['default']
    }), []);

    const [transports, setTransports] = useState(Transports);

    const [delay, setDelay] = useState(5000);

    const setRoute = () => {
        const route = [...transports].map((item, i) => {
                        const carTarget = issues.find(iss => iss.id === item.target);
                        if(carTarget){
                            if(item.coord[0] > carTarget.lat) item.coord[0] -= 0.00099;
                            if(item.coord[1] > carTarget.long) item.coord[1] -= 0.00099;
                            if(item.coord[0] < carTarget.lat) item.coord[0] += 0.00099;
                            if(item.coord[1] < carTarget.lat) item.coord[1] += 0.00099;
                        }
                        else {
                            if(i < 2 && i < issues.length) item.target = issues[i] && issues[i].id;
                        }
                        return item;
        })
        setTransports(route);
    }
    // setRoute()
    useEffect(() => {
        return () => setDelay(null)
    }, [])

    useInterval(() => {
        setRoute();
    }, delay)

    const setIconIssue = (name) => {
        if(name === 'Погрузка снега, находящегося в местах временного размещения') return '/snow3.svg';
        if(name === 'Подметание') return '/snow2.svg';
        return '/snow4.svg'
    }
    const setIconUnits = (type) => {
        if(type === 1) return '/car1.svg';
        if(type === 2) return '/car2.svg';
        if(type === 3) return '/car3.svg';
        if(type === 4) return '/car4.svg';
        return '/car5.svg';
    }

    const getTime = (row) => {
        const date = new Date(row.time_created);
        return `${date.getHours()}:${date.getMinutes()}`
    }

    return (
        <div className={styles.wrapper}>
            <NavBar/>
            <div className={styles.contentWrapper}>
                <Map
                    width='100%'
                    height='800px'
                    state={mapState}
                    modules={['control.ZoomControl', 'control.FullscreenControl']}
                >
                    
                    {
                        transports.map( item => ( <Placemark
                            key={item.coord[0]}
                            geometry={ item.coord }
                            properties={{
                                iconCaption: 'Title',
                                balloonContentBody:`${item.name}</br>
                                                    Статус:${item.status}
                                                    `,
                            }}
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: setIconUnits(item.type),
                                iconImageSize: [30, 30],
                            }}
                            modules={
                                ['geoObject.addon.balloon']
                            }
                        /> ) )
                    }
                    {
                        issues
                            .filter(item => item.status !== 'Завершена')
                            .map( item => ( <Placemark
                                key={item.lat}
                                geometry={ [item.lat, item.long] }
                                properties={{
                                    iconCaption: 'Title',
                                    balloonContentBody:`Тип: ${item.issue}</br>
                                                        Назначена: ${item.person}</br>
                                                        Создана: ${getTime(item)}</br>
                                                        Необходимая техника: ${item.unit}</br>`,
                                }}
                                options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: setIconIssue(item.issue),
                                    iconImageSize: [20, 20],
                                }}
                                modules={
                                    ['geoObject.addon.balloon']
                                }
                        /> ) )
                    }
                    
                </Map>

            </div>
        </div>
    )
}

