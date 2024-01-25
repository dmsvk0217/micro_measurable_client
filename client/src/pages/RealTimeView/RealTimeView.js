import React from "react";
import "./RealTimeView.css";
import RTSelection from "./RTSelection/RTSelection";
import { chartData,chartOptions } from "./RTGraphConfig"
import { data, columns } from "./RTTableConfig";
import CustomGraph from "../../components/CustomGraph/CustomGraph";
import CustomTable from "../../components/CustomTable/CustomTable";
import DownloadButton from "../../components/DownloadButton/DownloadButton";

function RealTimeView() {
  return (
    <div className="RT-container">
      <p className="RT-title">실시간 정보 보기</p>
      <div className="RT-content-container">
        <RTSelection />
        <DownloadButton data={data}></DownloadButton>
        <CustomTable data={data} columns={columns}></CustomTable>
        <hr className="SD-hr"></hr>
        <CustomGraph data={chartData} options={chartOptions}></CustomGraph>
      </div>
    </div>
  );
}

export default RealTimeView;
