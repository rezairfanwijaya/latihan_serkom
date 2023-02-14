import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Statistik pengunjung',
        },
    },
}

const labels = ['Statistik Pengunjung'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Anak-Anak',
            data: [1],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dewasa',
            data: [4],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


const Try = () => {
    return (<>
        <div className="cover container mx-auto px-16">
            <Bar options={options} data={data} />
        </div>
    </>
    )
}

export default Try;