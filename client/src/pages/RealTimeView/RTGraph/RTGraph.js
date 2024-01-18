import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'
import './RTGraph.css'

function RTGraph(){

    const data = {
        labels: ['01시','02시','03시','04시','05시','06시','07시','08시','09시','10시','11시','12시','13시','14시','15시','16시','17시','18시','19시','20시','21시','22시','23시','24시'],
        datasets:[
            {
                label: '예시 테이터',
                data: [3,6,5,3,4,2,3,4,5,3,4,5],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    return (
        <div className='RT-graph'>
            <p className='RT-graph-title'>| 그래프 보기 |</p>
            <div className='RT-graph-select-container'>
                여기에...
            </div>
            <Line data={data} options={options} />
        </div>
    );
}

export default RTGraph;