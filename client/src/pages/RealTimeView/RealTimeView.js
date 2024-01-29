import React, { useEffect, useState } from "react";
import "./RealTimeView.css";
import RTSelection from "./RTSelection/RTSelection";
import { chartData, chartOptions } from "./RTGraphConfig";
import { columns } from "./RTTableConfig";
import CustomGraph from "../../components/CustomGraph/CustomGraph";
import CustomTable from "../../components/CustomTable/CustomTable";
import DownloadButton from "../../components/DownloadButton/DownloadButton";

import useRTSotre from "../../store/RTStore.js";
import { useRTDataMutation } from '../../hooks/useRTDataMutation.js';

import util from "../../util.js";



function RealTimeView() {
  const { tableData } = useRTSotre();
  const { mutate, isLoading } = useRTDataMutation();
  
  useEffect(() => {
    // Todo: 전체노드 전체물질 일평균 데이터 받기 - selectedDate: new Date() 로 변경해줘야 함.
    mutate({selectedLocation:"전체", selectedDate: new Date(2024, 0, 1), selectedUnit:"일평균", selectedHour:""});
  }, []);
  
  const transformedData = tableData ? util.generateResultFromResponse(tableData) : [];

  return (
    <div className="RT-container">
      <p className="RT-title">실시간 정보 보기</p>
      <div className="RT-content-container">
        <RTSelection />
        <DownloadButton data={transformedData}></DownloadButton>
        <CustomTable data={transformedData} columns={columns}></CustomTable>
        <hr className="SD-hr"></hr>
        <CustomGraph data={chartData} options={chartOptions}></CustomGraph>
      </div>
    </div>
  );
}

export default RealTimeView;

