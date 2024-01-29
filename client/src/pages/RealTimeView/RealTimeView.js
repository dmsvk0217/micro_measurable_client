import React, { useEffect, useState } from "react";
import "./RealTimeView.css";
import RTSelection from "./RTSelection/RTSelection";
import RTGraphSelection from "./RTGraphSelection/RTGraphSelection";

import { chartData, chartOptions } from "./RTGraphConfig";
import { data, columns } from "./RTTableConfig";
import CustomGraph from "../../components/CustomGraph/CustomGraph";
import CustomTable from "../../components/CustomTable/CustomTable";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import axios from "axios";
import util from "../../util.js";

function RealTimeView() {
  const [tableData, setTableData] = useState({});
  useEffect(() => {
    // Todo: tableData에 1월1일 전체노드 전체물질 일평균 데이터 받기
    async function fetchInitData() {
      const requestURL =
        "http://localhost:4000/api/all-nodes/all-substances/daily-averages";
      const requestBody = {
        date: "2024-01-01",
      };
      try {
        const response = await axios.post(requestURL, requestBody);
        console.log("🚀 ~ useEffect ~ response.data:", response.data);
        const result = util.generateResultFromResponse(response.data);
        setTableData(result);
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
      }
    }
    fetchInitData();
  }, []);
  console.log(tableData);

  return (
    <div className="RT-container">
      <p className="RT-title">실시간 정보 보기</p>
      <div className="RT-content-container">
        <RTSelection />
        <DownloadButton data={tableData}></DownloadButton>
        <CustomTable data={tableData} columns={columns}></CustomTable>
        <hr className="SD-hr"></hr>
        <RTGraphSelection />
        <CustomGraph data={chartData} options={chartOptions}></CustomGraph>
      </div>
    </div>
  );
}

export default RealTimeView;
