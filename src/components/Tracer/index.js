import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tracer.css';

export default function Tracer() {
    const [days, setDays] = useState([]);
    const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const [newDay, setNewDay] = useState('');
    const [systemA, setSystemA] = useState('');
    const [systemB, setSystemB] = useState('');
    const [systemC, setSystemC] = useState('');
    const [systemD, setSystemD] = useState('');

    const fetchData = () => {
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
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleClick = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Date: newDay,
                systemATime: systemA,
                systemBTime: systemB,
                systemCTime: systemC,
                systemDTime: systemD
            })
        };
    
        fetch('https://localhost:44310/api/tracer/days', requestOptions)
        .then(res => {
            setSystemA(0);
            setSystemB(0);
            setSystemC(0);
            setSystemD(0);
            setNewDay(0);
        });

        fetchData();
    }

    return(
        <Container>
        <Table responsive hover>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>A system</th>
                        <th>B system</th>
                        <th>C system</th>
                        <th>D system</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="date" onChange={e => setNewDay(e.target.value)}/></td>
                        <td><input type="text" onChange={e => setSystemA(e.target.value)}/></td>
                        <td><input type="text" onChange={e => setSystemB(e.target.value)}/></td>
                        <td><input type="text" onChange={e => setSystemC(e.target.value)}/></td>
                        <td><input type="text" onChange={e => setSystemD(e.target.value)}/></td>
                        <td><button type="button" onClick={handleClick}>Save</button></td>
                    </tr>
                </tbody>
            </Table>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>A system</th>
                        <th>B sytem</th>
                        <th>C system</th>
                        <th>D system</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {days.map(d => 
                        <tr key={d.Id}>
                            <td>{d.date.slice(0, 10)}</td>
                            <td>{d.systemATime}</td>
                            <td>{d.systemBTime}</td>
                            <td>{d.systemCTime}</td>
                            <td>{d.systemDTime}</td>
                            <td>{ d.systemATime + d.systemBTime + d.systemCTime + d.systemDTime }</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

