import React from "react";

import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(...registerables, annotationPlugin);

const CustomGraph = ({ data, options}) => {
    return(
        <Line data={data} options={options} />
    );
}

export default CustomGraph;