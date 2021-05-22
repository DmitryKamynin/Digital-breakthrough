import React, { useEffect ,useState, useMemo} from 'react';
import { Map, Placemark } from 'react-yandex-maps';

import NavBar from '../components/NavBar';

import styles from '../styles/index.module.css';

export default function Main() {
    const [zoom, setZoom] = useState(14);

    const mapState = useMemo(() => ({
        center: [ 55.973304 ,37.417588],
        type: 'yandex#satellite',
        zoom,
        controls: ['zoomControl', 'fullscreenControl'],
        behaviors:['scrollZoom']
    }), [zoom]);
    console.log(mapState)
    console.log(zoom)
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
                    <Placemark
                        geometry={[1,1]}
                        properties={{
                            iconCaption: 'Title',
                            balloonContentBody:`</br>
                                                Режим работы:</br>
                                                </br>
                                                Телефон:</br>
                                                `,
                            }}
                            modules={
                                ['geoObject.addon.balloon']
                            }
                    />
                </Map>

            </div>
        </div>
    )
}

