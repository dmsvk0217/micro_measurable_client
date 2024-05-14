import React, { useState, useEffect } from "react";

import "./StatisticsDayView.css";
import CustomGraph from "../../../components/CustomGraph/CustomGraph";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SDSelection from "./SDSelection/SDSelection";
import { createGraphDataConfig, createGraphOptionsConfig } from "./SDGraphConfig";
import { data, columns } from "./SDTableConfig";
import DownloadButton from "../../../components/DownloadButton/DownloadButton";
import DayorMonthButton from "../../../components/DayorMonthButton/DayorMonthButton";
import StatisticsMonthView from "../Month/StatisticsMonthView";

import useSDStore from "../../../store/SDStore";
import { useSDTableDataMutation } from '../../../hooks/useSDDataMutation';

function StatisticsDayView() {
  const { tableData, graphData, substance } = useSDStore();

  const [selectedOption, setSelectedOption] = useState('일별');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const [graphOptionsConfig, setGraphOptionsConfig] = useState({});
    const [graphDataConfig, setGraphDataConfig] = useState([]);

  useEffect(() => {
    const _graphOptionsConfig = createGraphOptionsConfig(substance);
    const _graphDataConfig = createGraphDataConfig(graphData, substance);
    setGraphOptionsConfig(_graphOptionsConfig);
    setGraphDataConfig(_graphDataConfig);

  },[graphData])

  return (
    <div className="SD-container">
      <p className="SD-title">통계 보기</p>      
      <DayorMonthButton selectedOption={selectedOption} handleOptionClick={handleOptionClick}/>
      <div className="contents">
        {selectedOption === '일별' && (
          <div className="SD-content-container">
            <SDSelection />
            <DownloadButton data={tableData?tableData:[]}></DownloadButton>
            <div className="table-wrapper">
              <CustomTable data={tableData?tableData:[]} columns={columns}></CustomTable>
            </div>
            <hr className="SD-hr"></hr>
            <p className="SD-graph-title"> | 그래프 보기 | </p>
            { Object.keys(graphDataConfig).length > 0 ? 
                (<CustomGraph data={graphDataConfig} options={graphOptionsConfig}></CustomGraph>) : (<div></div>)}
                
          </div>
        )}

        {selectedOption === '월별' && (
          <StatisticsMonthView />
        )}
      </div>
    </div>
  );
}

export default StatisticsDayView;
