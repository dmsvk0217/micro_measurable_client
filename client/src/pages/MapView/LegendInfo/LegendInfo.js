import React, { useState, useEffect } from "react";
import "./LegendInfo.css";
import useMapStore from "../../../store/MapStore";

function LegendInfo() {

  const { selectedSubstance } = useMapStore();

  // const [legendTitle, setLegendTitle] = useState('초미세먼지');
  const [legendValue, setLegendValue] = useState(["0~15","16~35","36~75","76~"]);


  useEffect(() => {
    if (selectedSubstance.match('초미세먼지')) {
      setLegendValue(["0~15","16~35","36~75","76~"]);
    } else if (selectedSubstance.match('미세먼지')) { 
      setLegendValue(["0~30","31~80","81~150","151~"]);
    } else { //포름알데히드 혹은 오류
      setLegendValue(["-","-","-","-"]);
    }
  },[selectedSubstance]);
  

  return (
    <div className="legend-info">
      <p className="legend-title">
        <span className="option">{ selectedSubstance }</span> 범례
      </p>

      <div className="legend-divider"></div>

      <div className="legend-container">
        <div className="legend-option-status">
          <p className="legend-option-content">등급</p>
          <p className="legend-option-content legend-status-good">좋음</p>
          <p className="legend-option-content legend-status-normal">보통</p>
          <p className="legend-option-content legend-status-bad">나쁨</p>
          <p className="legend-option-content legend-status-worse">매우 나쁨</p>
        </div>
        <div className="legend-option-value">
          <p className="legend-option-content">지수범위</p>
          <p className="legend-option-content good">{legendValue[0]}</p>
          <p className="legend-option-content normal">{legendValue[1]}</p>
          <p className="legend-option-content bad">{legendValue[2]}</p>
          <p className="legend-option-content worse">{legendValue[3]}</p>
        </div>
      </div>
    </div>
  );
}

export default LegendInfo;
