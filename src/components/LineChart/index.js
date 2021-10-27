import React from 'react';
import { Line } from 'react-chartjs-2';
import './plot.css';
import * as Utils from '../../utils.js';

export default function LineChart() {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
    let delayed;

    return (
        <div id="plot">
            <Line
                data={{
                    labels: months,
                    datasets: [
                    {
                        label: 'System 1',
                        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                        borderWidth: 4,
                        tension: 0.3,
                        cubicInterpolationMode: 'monotone',
                        borderColor: Utils.CHART_COLORS.green,
                    },
                    {
                        label: 'System 2',
                        data: [3, 4, 12, 5, 8, 4, 6, 12, 14, 16, 33, 32],
                        borderWidth: 4,
                        tension: 0.3,
                        cubicInterpolationMode: 'monotone',
                        borderColor: Utils.CHART_COLORS.blue
                    },
                    {
                        label: 'System 3',
                        data: [8, 20, 21, 24, 12, 2, 5, 2, 4, 11, 5, 0],
                        borderWidth: 4,
                        tension: 0.3,
                        cubicInterpolationMode: 'monotone',
                        borderColor: Utils.CHART_COLORS.red
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
                }}
                height={300}
            />
        </div>
    );
} 