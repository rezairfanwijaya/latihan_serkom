import { useEffect, useState, useRef, useCallback } from 'react';

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
            text: 'Chart.js Bar Chart',
        },
    },
};


const labels = ["Statistik Pengunjung"];



const MyChart = () => {
    const [totalPengunjungAnak, settotalPengunjungAnak] = useState(0)
    const [totalPengunjungDewasa, settotalPengunjungDewasa] = useState(0)

    let ref = useRef(null)
    const downloadChart = useCallback(() => {
        const link = document.createElement("a")
        console.log(link.href)
        link.download = "chart.jpg"
        link.href = ref.current.toBase64Image()
        link.click()
    }, [])

    setInterval(() => {
        fetch("http://localhost:4444/reservasi/statistik", {
            method: "GET",
            headers: { 'content-type': 'application/json' }
        })
            .then(res => { return res.json() })
            .then(data => {
                settotalPengunjungAnak(data.data.total_pengunjung_anak)
                settotalPengunjungDewasa(data.data.total_pengunjung_dewasa)
            })
    }, 9000);

    const data = {
        labels,
        datasets: [
            {
                label: 'Anak-Anak',
                data: [totalPengunjungAnak],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dewasa',
                data: [totalPengunjungDewasa],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],


    };

    return (<>
        <div className="button flex justify-end">
            <button type='button' onClick={downloadChart} className="bg-blue-700 p-2 my-3 text-white rounded-md">Download as Image</button>
        </div>
        <Bar options={options} data={data} ref={ref} />
    </>);
}

export default MyChart;