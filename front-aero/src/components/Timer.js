import React, { useState } from 'react';
import useInterval from '../hooks/useInterval';

const RemainingTime = ({time}) => {
    const remainingTime = new Date(time)
    const hour = remainingTime.getUTCHours();
    const minutes = remainingTime.getMinutes() < 10 ? `0${remainingTime.getMinutes()}` : `${remainingTime.getMinutes()}`;
    const seconds = remainingTime.getSeconds() < 10 ? `0${remainingTime.getSeconds()}` : `${remainingTime.getSeconds()}`;

    return (
        <>
            {hour}:
            {minutes}:
            {seconds}
        </>
    )
}
const Timer = ({row}) => {
    let time = +(new Date(row.time_created)) + (row.time_lead * 60 * 60 * 1000);
    time -= +(new Date());

    const [timer, setTimer] = useState(time);
    const [delay, setDelay] = useState(1000);

    useInterval(() => {
        setTimer(timer - 1000);
        if(timer <= 0) setDelay(null)
    }, delay)

    return <RemainingTime time={timer}/>
};

export default Timer;;
