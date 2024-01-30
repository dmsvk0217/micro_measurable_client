import React, { useState, useEffect } from "react";
import {
  selectMonthOptions,
  selectYearOptions,
  selectLocationOptions,
  selectSubstanceOptions,
} from "../../../../constants/selectOption";
import CustomDropDown from "../../../../components/CustomDropDown/CustomDropDown";
import SDSubmitButton from "../SDSubmitButton/SDSubmitButton";
import "./SDSelection.css";

import { useSDTableDataMutation } from "../../../../hooks/useSDDataMutation";

function SDSelection() {
  const [selectedYear, setSelectedYear] = useState(selectYearOptions[0]);
  const [selectedMonth, setSelectedMonth] = useState(selectMonthOptions[0]);
  const [selectedLocation, setSelectedLocation] = useState(
    selectLocationOptions[0]
  );
  const [selectedSubstance, setSelectedSubstance] = useState(
    selectSubstanceOptions[0]
  );

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleSubstanceChange = (substance) => {
    setSelectedSubstance(substance);
  };

  const { mutate: tableMutate } = useSDTableDataMutation();

  const handleSearchButton = () => {
      tableMutate({ selectedYear, selectedMonth, selectedLocation, selectedSubstance});
  };

  return (
    <div className="SD-select">
      <div className="SD-select-container">
        {
        <div className="SD-select-comp">
          <p>측정위치</p>
          <CustomDropDown
            optionData={selectLocationOptions}
            selectedValue={selectedLocation}
            handleSelectedValue={handleLocationChange}
          />
        </div>
        }

        <div className="SD-select-comp">
          <p>측정기간</p>
          <CustomDropDown
            optionData={selectYearOptions}
            selectedValue={selectedYear}
            handleSelectedValue={handleYearChange}
          />
          <CustomDropDown
            optionData={selectMonthOptions}
            selectedValue={selectedMonth}
            handleSelectedValue={handleMonthChange}
          />
        </div>

        <div className="SD-select-comp">
          <p>측정물질</p>
          <CustomDropDown
            optionData={selectSubstanceOptions}
            selectedValue={selectedSubstance}
            handleSelectedValue={handleSubstanceChange}
          />
        </div>
      </div>
      <div className="search-btn-container">
          <button className="search-btn" onClick={handleSearchButton}> 검색 </button>
      </div>
    </div>
  );
}

export default SDSelection;
