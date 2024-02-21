import React, { useEffect, useState } from "react";
import "./RealTimeView.css";
import RTTableSelection from "./RTTableSelection/RTTableSelection.js";
import { createGraphDataConfig , createGraphOptionsConfig } from "./RTGraphConfig";
import { columns } from "./RTTableConfig";
import CustomGraph from "../../components/CustomGraph/CustomGraph";
import CustomTable from "../../components/CustomTable/CustomTable";
import DownloadButton from "../../components/DownloadButton/DownloadButton";

import useRTSotre from "../../store/RTStore.js";
import RTGraphSelection from "./RTGraphSelection/RTGraphSelection.js";


function RealTimeView() {
  const { tableData, graphData, graphSubstance, setGraphLocation, setGraphSubstance } = useRTSotre();

  const [graphOptionsConfig, setGraphOptionsConfig] = useState({});
  const [graphDataConfig, setGraphDataConfig] = useState([]);

  useEffect(() => {
    const _graphOptionsConfig = createGraphOptionsConfig(graphSubstance);
    const _graphDataConfig = createGraphDataConfig(graphData, graphSubstance);
    setGraphOptionsConfig(_graphOptionsConfig);
    setGraphDataConfig(_graphDataConfig);

  },[graphSubstance,graphData])


  return (
    <div className="RT-container">
      <p className="RT-title">실시간 정보 보기</p>
      <div className="RT-content-container">
        <div className="x-scroll"><RTTableSelection/></div>
        <DownloadButton data={tableData?tableData:[]}></DownloadButton>
        <CustomTable data={tableData?tableData:[]} columns={columns}></CustomTable>
        <hr className="RT-hr"></hr>
        <RTGraphSelection/>
        { Object.keys(graphDataConfig).length > 0 ? 
        (<CustomGraph data={graphDataConfig} options={graphOptionsConfig}></CustomGraph>): (<div></div>)}
        {/*   { graphDataConfig && graphData && graphData.length > 0 &&  graphSubstance ?  */}
      </div>
    </div>
  );
}

export default RealTimeView;