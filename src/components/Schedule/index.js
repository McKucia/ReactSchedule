import React, { useState, useEffect } from 'react';
import LineChart from '../LineChart';

function Schedule() {
    const [days, setDays] = useState([]);
    const [dates, setDates] = useState([]);
    const [systemA, setSystemA] = useState([]);
    const [systemB, setSystemB] = useState([]);
    const [systemC, setSystemC] = useState([]);
    const [systemD, setSystemD] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        };
    
        fetch('https://localhost:44310/api/tracer/days', requestOptions)
        .then(response => response.json())
        .then(res =>  setDays(res));

        days.map(d => { 
            setDates(oldArray => [...oldArray, d.date.slice(0, 10)]);
            setSystemA(oldArray => [...oldArray, d.exercises[0].time]);
            setSystemB(oldArray => [...oldArray, d.exercises[1].time]);
            setSystemC(oldArray => [...oldArray, d.exercises[2].time]);
            setSystemD(oldArray => [...oldArray, d.exercises[3].time]);
        });

        console.log(days);

    }, []);

    return (
        <div>
            <LineChart 
                dates={dates} 
                systemA={systemA} 
                systemB={systemB}
                systemC={systemC}
                systemD={systemD}/>
        </div>
    );
}

export default Schedule;