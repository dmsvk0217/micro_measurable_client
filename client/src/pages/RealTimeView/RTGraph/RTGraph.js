import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'
import './RTGraph.css'
import CurrentDate from '../../../components/CurrentDate';

import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);


function RTGraph(){
    
    const [isActiveLocation, setIsActiveLocation] = useState(false);
    const [activeLocationButton, setActiveLocationButton] = useState('▼');
    const [location,setLocation] = useState('node1');


    const handleLocationSelect = () => {
        setIsActiveLocation(true);
        setActiveLocationButton('▲');
    }

    const chooseLocation = (item) => {
        setIsActiveLocation(false);
        setActiveLocationButton('▼');
        setLocation(item);
    }


    const [isActiveMatter, setIsActiveMatter] = useState(false);
    const [activeMatterButton, setActiveMatterButton] = useState('▼');
    const [matter,setMatter] = useState('초미세먼지');


    const handleMatterSelect = () => {
        setIsActiveMatter(true);
        setActiveMatterButton('▲');
    }

    const chooseMatter = (item) => {
        setIsActiveMatter(false);
        setActiveMatterButton('▼');
        setMatter(item);
    }


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
        plugins: {
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
                  yMin: 15,
                  yMax: 15,
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
    };

    return (
        <div className='RT-graph'>
            <p className='RT-graph-title'>| 그래프 보기 |</p>
            <div className='RT-graph-select-container'>
                <div className='RT-graph-select-option-container'>
                    <p>측정위치</p>
                    <div className='RT-graph-location-dropdown'>
                        <button className='menu' onClick={()=>handleLocationSelect()}><span>{location}</span><span>{activeLocationButton}</span></button>
                        {isActiveLocation && (
                            <div className='options'>
                               <button onClick={() => chooseLocation('node1')}>node1</button>
                               <button onClick={() => chooseLocation('node2')}>node2</button>
                               <button onClick={() => chooseLocation('node3')}>node3</button>
                            </div>
                        )}
                    </div>
                    <p>측정물질</p>
                    <div className='RT-graph-matter-dropdown'>
                        <button className='menu' onClick={()=>handleMatterSelect()}><span>{matter}</span><span>{activeMatterButton}</span></button>
                        
                        {isActiveMatter && (
                            <div className='options'>
                               <button onClick={() => chooseMatter('초미세먼지')}>초미세먼지</button>
                               <button onClick={() => chooseMatter('미세먼지')}>미세먼지</button>
                               <button onClick={() => chooseMatter('포름알데히드')}>포름알데히드</button>
                            </div>
                        )}
                    </div>
                    <CurrentDate/>
                </div>
                <div>버튼</div>
            </div>
            <Line data={data} options={options} />
        </div>
    );
}

export default RTGraph;