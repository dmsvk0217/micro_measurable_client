import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
// import './SMGraph.css';

import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);


function SMGraph(){

    const [location,setLocation] = useState('오석관');
    const handleLocationChange = (event) => {
        setLocation(event.target.value); 
    };

    const [matter,setMatter] = useState('초미세먼지');
    const handleMatterChange = (event) => {
        setMatter(event.target.value); 
    };
    // const chooseMatter = (item) => {
    //     setMatter(item);

    //     const newOptions = { ...options };

    //     if(item === "초미세먼지"){
    //         newOptions.scales.y.ticks.suggestedMax = 80;
    //         newOptions.scales.y.ticks.stepSize = 10;

    //         newOptions.plugins.annotation.annotations.line2.yMax = 16;
    //         newOptions.plugins.annotation.annotations.line3.yMax = 36;
    //         newOptions.plugins.annotation.annotations.line4.yMax = 76;

    //         newOptions.plugins.annotation.annotations.line2.yMin = 16;
    //         newOptions.plugins.annotation.annotations.line3.yMin = 36;
    //         newOptions.plugins.annotation.annotations.line4.yMin = 76;

    //     }
    //     if(item === "미세먼지"){
    //         newOptions.scales.y.ticks.suggestedMax = 160;
    //         newOptions.scales.y.ticks.stepSize = 20;

    //         newOptions.plugins.annotation.annotations.line2.yMax = 31;
    //         newOptions.plugins.annotation.annotations.line3.yMax = 81;
    //         newOptions.plugins.annotation.annotations.line4.yMax = 151;

    //         newOptions.plugins.annotation.annotations.line2.yMin = 31;
    //         newOptions.plugins.annotation.annotations.line3.yMin = 81;
    //         newOptions.plugins.annotation.annotations.line4.yMin = 151;
    //     }
    //     setOptions(newOptions);
    // }
    const data = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: [
            {
                label: matter,
                data: [5, 15, 26, 20, 45, 32, 42, 60, 43],
                fill: false,
                backgroundColor: '#CCCCCC',
                borderColor: '#CCCCCC',
            },
        ],
    };
    const [options, setOptions] = useState({
        plugins: {
            legend: {
                display: false,
            },
            annotation: {
              annotations: {
                line1: {
                  type: 'line',
                  yMin: 0,
                  yMax: 0,
                  borderColor: '#7D9DDB',
                  borderWidth: 2,
                },
                line2: {
                  type: 'line',
                  yMin: 16,
                  yMax: 16,
                  borderColor: '#6EB057',
                  borderWidth: 2,
                },
                line3: {
                    type: 'line',
                    yMin: 36,
                    yMax: 36,
                    borderColor: '#D7E067',
                    borderWidth: 2,
                },
                line4: {
                    type: 'line',
                    yMin: 76,
                    yMax: 76,
                    borderColor: '#BB7373',
                    borderWidth: 2,
                },
              }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                    suggestedMin: 0, // Suggests a minimum value for the scale
                    suggestedMax: 80, // Suggests a maximum value for the scale
                  }
            }
        }
    });


    return (
        <div className='SM-graph'>
            <p className='SM-graph-title'>| 그래프 보기 |</p>
            
            <Line data={data} options={options} />
        </div>
    );
}

export default SMGraph;