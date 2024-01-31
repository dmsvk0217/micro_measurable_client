import React, { useEffect, useState } from "react";
import "./RealTimeView.css";
import RTTableSelection from "./RTTableSelection/RTTableSelection.js";
import { graphDataConfig , graphOptionsConfig } from "./RTGraphConfig";
import { columns } from "./RTTableConfig";
import CustomGraph from "../../components/CustomGraph/CustomGraph";
import CustomTable from "../../components/CustomTable/CustomTable";
import DownloadButton from "../../components/DownloadButton/DownloadButton";

import useRTSotre from "../../store/RTStore.js";
import { useRTTableDataMutation } from '../../hooks/useRTDataMutation.js';
import RTGraphSelection from "./RTGraphSelection/RTGraphSelection.js";




function RealTimeView() {
  const { tableData, graphData } = useRTSotre();
  // const { mutate: tableMutate, isLoading } = useRTTableDataMutation();
  
  // useEffect(() => {
  //   // Todo: 전체노드 전체물질 일평균 데이터 받기 - selectedDate: new Date() 로 변경해줘야 함.
  //   tableMutate({selectedLocation:"전체", selectedDate: new Date(2024, 0, 1), selectedUnit:"일평균", selectedHour:""});
  // }, []);
  
  

  return (
    <div className="RT-container">
      <p className="RT-title">실시간 정보 보기</p>
      <div className="RT-content-container">
        <RTTableSelection/>
        <DownloadButton data={tableData?tableData:[]}></DownloadButton>
        <CustomTable data={tableData?tableData:[]} columns={columns}></CustomTable>
        <hr className="RT-hr"></hr>
        <RTGraphSelection/>
        <CustomGraph data={{ ...graphDataConfig, datasets: [{ ...graphDataConfig.datasets[0], data: graphData }] }} options={graphOptionsConfig}></CustomGraph>
      </div>
    </div>
  );
}

export default RealTimeView;