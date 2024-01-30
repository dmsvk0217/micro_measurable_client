import React from "react";

import "./StatisticsDayView.css";
import CustomGraph from "../../../components/CustomGraph/CustomGraph";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SDSelection from "./SDSelection/SDSelection";
import { chartData, chartOptions } from "./SDGraphConfig";
import { data, columns } from "./SDTableConfig";
import DownloadButton from "../../../components/DownloadButton/DownloadButton";
import DayorMonthButton from "../../../components/DayorMonthButton/DayorMonthButton";
import StatisticsMonthView from "../Month/StatisticsMonthView";

function StatisticsDayView() {
  const [selectedOption, setSelectedOption] = React.useState('일별');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="SD-container">
      <p className="SD-title">통계 보기</p>      
      <DayorMonthButton selectedOption={selectedOption} handleOptionClick={handleOptionClick}/>
      <div className="contents">
        {selectedOption === '일별' && (
          <div className="SD-content-container">
            <SDSelection />
            <DownloadButton data={data}></DownloadButton>
            <CustomTable data={data} columns={columns}></CustomTable>
            <hr className="SD-Month"></hr>
            <p className="SD-graph-title">| 그래프 보기 |</p>
            <CustomGraph data={chartData} options={chartOptions}></CustomGraph>
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
