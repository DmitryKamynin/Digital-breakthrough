import React, { useEffect ,useState, useMemo} from 'react';
import { Map, Placemark } from 'react-yandex-maps';

import NavBar from '../components/NavBar';

import useInterval from '../hooks/useInterval';

import styles from '../styles/index.module.css';

const createProblem = (coord, name, id) => ({
    coord,
    name,
    id,
})

const createTransport = (coord, name, status, target) => ({
    coord,
    name,
    status,
    target,
})

const Problems = [
    createProblem([55.9769,37.4238], 'Снег', 2),
    createProblem([55.9733,37.4053], 'Обледенение', 1),
]

const Transports = [
    createTransport([55.9830,37.3601], 'Плужно-щеточная машина с реагентом.', 'В работе', 2 ),
    createTransport([55.9801,37.4368], 'Экскаватор', 'В работе', 1)
]


export default function Main() {
    const [zoom, setZoom] = useState(13);

    const mapState = useMemo(() => ({
        center: [ 55.973304 ,37.417588],
        type: 'yandex#satellite',
        zoom,
        controls: ['zoomControl', 'fullscreenControl'],
        behaviors:['scrollZoom']
    }), [zoom]);

    const [transports, setTransports] = useState(Transports);
    const [problems, setProblems] = useState(Problems);

    const [delay, setDelay] = useState(10000);

    const [currPoint, setPoint] = useState([0,0]);

    const points = [
        [[55.9830,37.3601],[55.9814,37.3608], [55.9798,37.3617], [55.9783,37.3625], [55.9771,37.3631], [55.9756,37.3636], [55.9744,37.3652], [55.9739,37.3672], [55.9730,37.3705], [55.9724,37.3731], [55.9716,37.3761], [55.9709,37.3782], [55.9707,37.3813], [55.9712,37.3841], [55.9715,37.3871], [55.9725,37.3934], [55.9729,37.3962] ,[55.9735,37.3998], [55.9733,37.4053] ], 
        [[55.9801,37.4368],[55.9801,37.4370], [55.9798,37.4346], [55.9796,37.4320], [55.9793,37.4300], [55.9790,37.4281], [55.9783,37.4274], [55.9775,37.4278], [55.9773,37.4258], [55.9769,37.4238]], 
    ];

    useInterval(() => {
        setTransports( prevstate => {
            let prev = [...prevstate];
            const p0 = points[0];
            const p1 = points[1];
            const index1 = currPoint[0];
            const index2 = currPoint[1];
 
            prev[0].coord = p0[index1];

            prev[1].coord = p1[index2];
            return prev;
        });
        setPoint( prevstate => {
            let prev = [...prevstate];
            if(prev[0] < points[0].length - 1) prev[0] += 1;
            if(prev[1] < points[1].length - 1) prev[1] += 1;
            return prev;
        });

    }, delay)


    return (
        <div className={styles.wrapper}>
            <NavBar/>
            <div className={styles.contentWrapper}>
                <Map
                    width='1200px'
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
                                iconImageHref: '/track.png',
                                iconImageSize: [20, 20],
                            }}
                            modules={
                                ['geoObject.addon.balloon']
                            }
                        /> ) )
                    }
                    {
                        problems.map( item => ( <Placemark
                            key={item.coord[0]}
                            geometry={ item.coord }
                            properties={{
                                iconCaption: 'Title',
                                balloonContentBody:`${item.name}</br>`,
                            }}
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: '/problem.png',
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

