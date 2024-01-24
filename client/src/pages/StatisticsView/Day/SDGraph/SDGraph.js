import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
// import './SDGraph.css';

import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);


function SDGraph(){
    return (
        <div className='RT-graph'>
            <p className='RT-graph-title'>| 그래프 보기 |</p>
            
            {/* <Line data={data} options={options} /> */}
        </div>
    );
}

export default SDGraph;