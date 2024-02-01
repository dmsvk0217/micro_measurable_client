import React from "react";
import "./NodeInfo.css";
import CurrentDate from "../../../components/CurrentDate";
import useMapStore from "../../../store/MapStore";

function NodeInfo(props) {
  const selectedNode = props.electedNode;
  const handleNodeSelect = props.handleNodeSelect;

  const { tableData, graphData } = useMapStore();

  return (
    <div className="node-info">
      <div className="node-info-header">
        {/* <img src="img/leaf.png" alt="leaf" className="leaf" /> */}
        <div className="selected-node">
          <div>뉴턴홀 대기질 정보</div>
          <div className="current-time" style={{ fontWeight: "400" }}>
            2024년 01월 29일 17시
          </div>
        </div>
      </div>

      <div className="node-info-divider"></div>

      <div className="display-substance-container">
        <div className="one-substance-container">
          <div className="substance-name">초미세먼지</div>
          <div className="substance-name-en">PM-2.5</div>
          <div className="substance-value substance-good">151 ㎍/㎥</div>
          <div className="substance-status status-good">좋음</div>
        </div>
        <div className="one-substance-container">
          <div className="substance-name">미세먼지</div>
          <div className="substance-name-en">PM-10</div>
          <div className="substance-value substance-normal">120 ㎍/㎥</div>
          <div className="substance-status status-normal">보통</div>
        </div>
        <div className="one-substance-container">
          <div className="substance-name">포름알데히드</div>
          <div className="substance-name-en">CH2O</div>
          <div className="substance-value substance-worse">0.02 ppm</div>
          <div className="substance-status status-worse">나쁨</div>
        </div>
        <div className="node-info-divider"></div>

        <div className="value-container">
          <div className="one-value-container">
            <div className="value-name">풍향</div>
            <div>남서풍</div>
          </div>
          <div className="one-value-container">
            <div className="value-name">풍속</div>
            <div>5m/s</div>
          </div>
          <div className="one-value-container">
            <div className="value-name">온도</div>
            <div>7 °C</div>
          </div>
          <div className="one-value-container">
            <div className="value-name">습도</div>
            <div>30%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NodeInfo;
