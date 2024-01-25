import React from "react";
import "./StatisticsDayView.css";
import CustomGraph from "../../../components/CustomGraph/CustomGraph";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SDSelection from "./SDSelection/SDSelection";
import { chartData, chartOptions } from "./SDGraphConfig";
import { data, columns } from "./SDTableConfig";
import DownloadButton from "../../../components/DownloadButton/DownloadButton";

function StatisticsDayView() {
  return (
    <div className="SD-container">
      <p className="SD-title">통계 보기 &gt; 일별</p>
      <div className="SD-content-container">
        <SDSelection />
        <DownloadButton data={data}></DownloadButton>
        <CustomTable data={data} columns={columns}></CustomTable>
        <hr className="SD-hr"></hr>
        <CustomGraph data={chartData} options={chartOptions}></CustomGraph>
      </div>
    </div>
  );
}

export default StatisticsDayView;