import React from "react";
import "./StatisticsDayView.css";
import SDTable from "./SDTable/SDTable";
import SDGraph from "./SDGraph/SDGraph";
import SDSelection from "./SDSelection/SDSelection";

function StatisticsDayView() {
  return (
    <div className="SD-container">
      <p className="SD-title">통계 보기 &gt; 일별</p>
      <div className="SD-content-container">
        <SDSelection />
        <SDTable />
        <hr className="SD-hr"></hr>
        <SDGraph />
      </div>
    </div>
  );
}

export default StatisticsDayView;