import React from "react";
import "./LegendInfo.css";

function LegendInfo(props) {
  const legendTitle = props.legendTitle;
  const legendValueGood = props.legendValueGood;
  const legendValueNormal = props.legendValueNormal;
  const legendValueBad = props.legendValueBad;
  const legendValueWorse = props.legendValueWorse;
  return (
    <div className="legend-info">
      <p className="legend-title">
        <span className="option">{legendTitle}</span> 범례
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
          <p className="legend-option-content good">{legendValueGood}</p>
          <p className="legend-option-content normal">{legendValueNormal}</p>
          <p className="legend-option-content bad">{legendValueBad}</p>
          <p className="legend-option-content worse">{legendValueWorse}</p>
        </div>
      </div>
    </div>
  );
}

export default LegendInfo;
