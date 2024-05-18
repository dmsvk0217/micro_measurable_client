import React, { useState, useEffect } from "react";
import "./NodeInfo.css";
import useMapStore from "../../../store/MapStore";
import {evaluateSubstance} from "../../../util.js";

function NodeInfo() {

  const { mapLocation, mapData } = useMapStore();
  console.log("🔶🔶", mapData);

  const node = mapData.filter(item => item.label === mapLocation)[0] ?? 
  { id:"-", date:"-", pm25:"-", pm10:"-", ch2o:"-", wind_direction:"-", wind_speed:"-", temperature:"-", humidity:"-"};
  console.log("🐟", node);

  const [ch2oEval, setCh2oEval] = useState("-");
  const [pm25Eval, setpm25Eval] = useState("-");
  const [pm10Eval, setpm10Eval] = useState("-");

  const getSubstanceColor = (val) => {
    if (val === "매우 나쁨") {
      return "worse";
    } else if (val === "나쁨") {
      return "bad";
    } else if (val.match("보통")) {
      return "normal";
    } else if (val.match("좋음")) {
      return "good";
    } else{
      return "undefined";
    }
  };

  useEffect(() => {
    setCh2oEval(evaluateSubstance("ch2o",node.ch2o));
    setpm25Eval(evaluateSubstance("pm25",node.pm25));
    setpm10Eval(evaluateSubstance("pm10",node.pm10));
  },[mapData,ch2oEval,pm25Eval,pm10Eval, mapLocation]);

  return (
    <div className="node-info">
      <div className="node-info-header">
        <div className="selected-node">
          <div> {mapLocation} 대기질 정보</div>
          <div className="current-time" style={{ fontWeight: "400" }}>
            {node.date}
          </div>
        </div>
      </div>

      <div className="node-info-divider"></div>
      <div className="display-substance-container">
        <div className="one-substance-container">
          <div className="substance-name">초미세먼지</div>
          <div className="substance-name-en">PM-2.5</div>
          <div className={`substance-value ${getSubstanceColor(pm25Eval)}`}>{node.pm25 ?? '-' } ㎍/㎥</div>
          <div className={`substance-status ${getSubstanceColor(pm25Eval)}`}>{ pm25Eval }</div>
        </div>
        <div className="one-substance-container">
          <div className="substance-name">미세먼지</div>
          <div className="substance-name-en">PM-10</div>
          <div className={`substance-value ${getSubstanceColor(pm10Eval)}`}>{node.pm10 ?? '-'} ㎍/㎥</div>
          <div className={`substance-status ${getSubstanceColor(pm10Eval)}`}>{ pm10Eval }</div>
        </div>
        <div className="one-substance-container">
          <div className="substance-name">포름알데히드</div>
          <div className="substance-name-en">CH2O</div>
          <div className={`substance-value ${getSubstanceColor(ch2oEval)}`}>{node.ch2o ?? '-'} ppm</div>
          <div className={`substance-status ${getSubstanceColor(ch2oEval)}`}>{ ch2oEval }</div>
        </div>
        <div className="node-info-divider"></div>

        <div className="value-container">
          <div className="one-value-container">
            <div className="value-name">풍향</div>
            <div>{node.wind_direction}</div>
          </div>
          <div className="one-value-container">
            <div className="value-name">풍속</div>
            <div>{node.wind_speed}m/s</div>
          </div>
          <div className="one-value-container">
            <div className="value-name">온도</div>
            <div>{node.temperature}°C</div>
          </div>
          <div className="one-value-container">
            <div className="value-name">습도</div>
            <div>{node.humidity}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NodeInfo;
