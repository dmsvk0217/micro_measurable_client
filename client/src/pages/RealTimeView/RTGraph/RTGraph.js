import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./RTGraph.css";
import CustomDropDown from "../../../components/CustomDropDown/CustomDropDown";
import {
  selectLocationOptions,
  selectSubstanceOptions,
} from "../../../constants/selectOption";
import CurrentDate from "../../../components/CurrentDate";

import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(...registerables, annotationPlugin);

function RTGraph() {
  const [selectedLocation, setSelectedLocation] = useState("오석관");
  const handleSelectedLocation = (event) => {
    setSelectedLocation(event.target.value);
  };

  const [selectedSubstance, setSelectedSubstance] = useState("초미세먼지");
  const handleSelectedSubstance = (event) => {
    setSelectedSubstance(event.target.value);
  };

  // const chooseselectedSubstance = (item) => {
  //     setSelectedSubstance(item);

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
    labels: [
      "01시",
      "02시",
      "03시",
      "04시",
      "05시",
      "06시",
      "07시",
      "08시",
      "09시",
      "10시",
      "11시",
      "12시",
      "13시",
      "14시",
      "15시",
      "16시",
      "17시",
      "18시",
      "19시",
      "20시",
      "21시",
      "22시",
      "23시",
      "24시",
    ],
    datasets: [
      {
        label: selectedSubstance,
        data: [3, 6, 5, 3, 4, 2, 3, 20, 30, 45, 52, 60],
        fill: false,
        backgroundColor: "#CCCCCC",
        borderColor: "#CCCCCC",
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
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "#7D9DDB",
            borderWidth: 2,
          },
          line2: {
            type: "line",
            yMin: 16,
            yMax: 16,
            borderColor: "#6EB057",
            borderWidth: 2,
          },
          line3: {
            type: "line",
            yMin: 36,
            yMax: 36,
            borderColor: "#D7E067",
            borderWidth: 2,
          },
          line4: {
            type: "line",
            yMin: 76,
            yMax: 76,
            borderColor: "#BB7373",
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          suggestedMin: 0, // Suggests a minimum value for the scale
          suggestedMax: 80, // Suggests a maximum value for the scale
        },
      },
    },
  });

  return (
    <div className="RT-graph">
      <p className="RT-graph-title">| 그래프 보기 |</p>
      <div className="RT-graph-select-container">
        <div className="RT-graph-selectedLocation">
          <p>측정위치</p>
          <CustomDropDown
            optionData={selectLocationOptions}
            selectedValue={selectedLocation}
            handleSelectedValue={handleSelectedLocation}
          />
        </div>
        <div className="RT-graph-selectedSubstance">
          <p>측정물질</p>
          <CustomDropDown
            optionData={selectSubstanceOptions}
            selectedValue={selectedSubstance}
            handleSelectedValue={handleSelectedSubstance}
          />
        </div>
        <CurrentDate />
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default RTGraph;
