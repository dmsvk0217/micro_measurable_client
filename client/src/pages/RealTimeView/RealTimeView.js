import React from "react";
import "./RealTimeView.css";
import RTTable from "./RTTable/RTTable";
import RTGraph from "./RTGraph/RTGraph";
import RTSelection from "./RTSelection/RTSelection";

function RealTimeView() {
  return (
    <div className="RT-container">
      <p className="RT-title">실시간 정보 보기</p>
      <div className="RT-content-container">
        <RTSelection />
        <RTTable />
        <hr className="RT-hr"></hr>
        <RTGraph />
      </div>
    </div>
  );
}

export default RealTimeView;
