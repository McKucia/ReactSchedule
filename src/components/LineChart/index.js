import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './plot.css';
import * as Utils from '../../utils.js';

function LineChart() {
    const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

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
        .then(res =>  {
            res.map(d => { 
                setDates(oldArray => [...oldArray, d.date.slice(0, 10)]);
                setSystemA(oldArray => [...oldArray, d.systemATime]);
                setSystemB(oldArray => [...oldArray, d.systemBTime]);
                setSystemC(oldArray => [...oldArray, d.systemCTime]);
                setSystemD(oldArray => [...oldArray, d.systemDTime]);
            });
        });

    }, []);

    let delayed;
        return (
            <div id="plot">
                <Line
                    data={{
                        labels: dates,
                        datasets: [
                            {
                                label: 'System A',
                                data: systemA,
                                borderWidth: 4,
                                tension: 0.3,
                                cubicInterpolationMode: 'monotone',
                                borderColor: Utils.CHART_COLORS.red,
                            },
                            {
                                label: 'System B',
                                data: systemB,
                                borderWidth: 4,
                                tension: 0.3,
                                cubicInterpolationMode: 'monotone',
                                borderColor: Utils.CHART_COLORS.yellow
                            },
                            {
                                label: 'System C',
                                data: systemC,
                                borderWidth: 4,
                                tension: 0.3,
                                cubicInterpolationMode: 'monotone',
                                borderColor: Utils.CHART_COLORS.blue,
                            },
                            {
                                label: 'System D',
                                data: systemD,
                                borderWidth: 4,
                                tension: 0.3,
                                cubicInterpolationMode: 'monotone',
                                borderColor: Utils.CHART_COLORS.green
                            }
                        ]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        animation: {
                            onComplete: () => {
                            delayed = true;
                            },
                            delay: (context) => {
                            let delay = 0;
                            if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                delay = context.dataIndex * 50 + context.datasetIndex * 10;
                            }
                            return delay;
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Your monthly progress'
                            }
                        }
                    }}
                    height={300}
                />
            </div>
        );
    
} 

export default LineChart;