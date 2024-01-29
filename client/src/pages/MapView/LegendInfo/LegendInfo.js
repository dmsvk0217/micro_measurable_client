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
      <div className="legend-content">
        <div className="legend-option-status">
          <p className="good">좋음</p>
          <p className="normal">보통</p>
          <p className="bad">나쁨</p>
          <p className="worse">매우 나쁨</p>
        </div>
        <div className="legend-option-value">
          <p className="good">{legendValueGood}</p>
          <p className="normal">{legendValueNormal}</p>
          <p className="bad">{legendValueBad}</p>
          <p className="worse">{legendValueWorse}</p>
        </div>
      </div>
    </div>
  );
}

export default LegendInfo;
