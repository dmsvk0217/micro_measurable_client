import React, { useState, useEffect } from "react";
import "./NodeInfo.css";
import useMapStore from "../../../store/MapStore";
import {evaluateSubstance} from "../../../util.js";
import useNodeInfoStore from "../../../store/NodeInfoStore.js";

function NodeInfo() {

  const { setMapLocation, mapLocation, mapData } = useMapStore();
  const { nodes } = useNodeInfoStore();


  const [node, setNode] = useState();

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
    const node = nodes[0].location;
    setMapLocation(node);
  },[setMapLocation,nodes]);

  useEffect(() => {
    const filteredData = mapData.filter(item => item.nodeInfo.location === mapLocation);
    const lastElement = filteredData.length > 0 ? filteredData[0]:null;
    setNode(lastElement);

    console.log(lastElement);

  },[setNode, mapData, mapLocation]);

  useEffect(() => {
    setCh2oEval(evaluateSubstance("ch2o",node ? node.ch2o : '-'));
    setpm25Eval(evaluateSubstance("pm25",node ? node["pm2.5"] : '-'));
    setpm10Eval(evaluateSubstance("pm10",node ? node.pm10 : '-'));
  },[mapData,node, mapLocation]);



  return (
    <div className="node-info">
      <div className="node-info-header">
        <div className="selected-node">
          <div> {mapLocation} 대기질 정보</div>
          <div className="current-time" style={{ fontWeight: "400" }}>
            {node ? `${node.date} ${node.timestamp}`: '-'}
          </div>
        </div>
      </div>

      <div className="node-info-divider"></div>
      <div className="display-substance-container">
        <div className="one-substance-container">
          <div className="substance-name">초미세먼지</div>
          <div className="substance-name-en">PM-2.5</div>
          {/* <div>{node ? node["pm2.5"] : '-' } ㎍/㎥</div> */}
          <div className={`substance-value ${getSubstanceColor(pm25Eval)}`}>{node ? node["pm2.5"] : '-' } ㎍/㎥</div>
          <div className={`substance-status ${getSubstanceColor(pm25Eval)}`}>{ pm25Eval }</div>
        </div>
        <div className="one-substance-container">
          <div className="substance-name">미세먼지</div>
          <div className="substance-name-en">PM-10</div>
          <div className={`substance-value ${getSubstanceColor(pm10Eval)}`}>{node ? node.pm10 : '-'} ㎍/㎥</div>
          <div className={`substance-status ${getSubstanceColor(pm10Eval)}`}>{ pm10Eval }</div>
        </div>
        <div className="one-substance-container">
          <div className="substance-name">포름알데히드</div>
          <div className="substance-name-en">CH2O</div>
          <div className={`substance-value ${getSubstanceColor(ch2oEval)}`}>{node ? node.ch2o : '-'} ppm</div>
          <div className={`substance-status ${getSubstanceColor(ch2oEval)}`}>{ ch2oEval }</div>
        </div>
        <div className="node-info-divider"></div>

        <div className="value-container">
          <div className="one-value-container">
            <div className="value-name">풍향</div>
            <div>{node ? node["wind-direction"] : '-' }</div>
          </div>
          <div className="one-value-container">
            <div className="value-name">풍속</div>
            <div>{node ? node["wind-speed"] : '-' }m/s</div>
          </div>
          <div className="one-value-container">
            <div className="value-name">온도</div>
            <div>{node ? node.temperature : '-'}°C</div>
          </div>
          <div className="one-value-container">
            <div className="value-name">습도</div>
            <div>{node ? node.humidity : '-'}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NodeInfo;
