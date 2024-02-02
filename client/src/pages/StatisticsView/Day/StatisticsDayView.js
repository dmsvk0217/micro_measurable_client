import React, { useEffect } from "react";

import "./StatisticsDayView.css";
import CustomGraph from "../../../components/CustomGraph/CustomGraph";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SDSelection from "./SDSelection/SDSelection";
import { chartData, chartOptions } from "./SDGraphConfig";
import { data, columns } from "./SDTableConfig";
import DownloadButton from "../../../components/DownloadButton/DownloadButton";
import DayorMonthButton from "../../../components/DayorMonthButton/DayorMonthButton";
import StatisticsMonthView from "../Month/StatisticsMonthView";

import useSDStore from "../../../store/SDStore";
import { useSDTableDataMutation } from '../../../hooks/useSDDataMutation';

function StatisticsDayView() {
  const { tableData } = useSDStore();
  const { mutate: tableMutate, isLoading } = useSDTableDataMutation();

  const [selectedOption, setSelectedOption] = React.useState('일별');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    tableMutate({selectedLocation:"전체", selectedDate: new Date(2024, 0, 1), selectedSubstance:"포름알데히드"});
  }, []);

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
