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

  return (
    <div className="SD-select">
      <div className="SD-select-container">
        <div className="SD-select-comp">
          <p>측정위치</p>
          <div className="SD-dropdown">
            <CustomDropDown
              optionData={selectLocationOptions}
              selectedValue={selectedLocation}
              handleSelectedValue={handleLocationChange}
            />
          </div>
        </div>

        <div className="SD-select-comp">
          <p>측정기간</p>
          <div className="SD-dropdown">
            <CustomDropDown
              optionData={selectYearOptions}
              selectedValue={selectedYear}
              handleSelectedValue={handleYearChange}
            />
          </div>
          <div className="SD-dropdown">
            <CustomDropDown
              optionData={selectMonthOptions}
              selectedValue={selectedMonth}
              handleSelectedValue={handleMonthChange}
            />
          </div>
        </div>

        <div className="SD-select-comp">
          <p>측정물질</p>
          <div className="SD-dropdown">
            <CustomDropDown
              optionData={selectSubstanceOptions}
              selectedValue={selectedSubstance}
              handleSelectedValue={handleSubstanceChange}
            />
          </div>
        </div>
      </div>
      <SDSubmitButton
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedLocation={selectedLocation}
        selectedSubstance={selectedSubstance}
      />
    </div>
  );
}

export default SDSelection;
