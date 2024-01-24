import React, { useState, useEffect } from "react";
import {
  selectNodeOptions,
  selectYearOptions,
  selectMonthOptions,
  selectSubstanceOptions,
} from "../../../../constants/selectOption";
import CustomDropDown from "../../../../components/CustomDropDown/CustomDropDown";
import "./SDSelection.css";

function SDSelection() {
  const [year, setYear] = useState(selectYearOptions[0]);
  const handleYearChange = (event) => {
    console.log("🚀 ~ handleYearChange ~ event:", event);
    setYear(event);
  };

  const [month, setMonth] = useState(selectMonthOptions[0]);
  const handleMonthChange = (event) => {
    console.log("🚀 ~ handleMonthChange ~ event:", event);
    setMonth(event);
  };

  const [location, setLocation] = useState(selectNodeOptions[0]);
  const handleLocationChange = (event) => {
    console.log("🚀 ~ handleLocationChange ~ event:", event);
    setLocation(event);
  };

  const [substance, setSubstance] = useState(selectSubstanceOptions[0]);
  const handleSubstanceChange = (event) => {
    console.log("🚀 ~ handleSubstanceChange ~ event:", event);
    setSubstance(event);
  };

  return (
    <div className="SD-select">
      <div className="SD-select-container">
        <div className="SD-select-comp">
          <p>측정위치</p>
          <div className="SD-dropdown">
            <CustomDropDown
              optionData={selectNodeOptions}
              selectedValue={location}
              handleSelectedValue={handleLocationChange}
            />
          </div>
        </div>

        <div className="SD-select-comp">
          <p>측정기간</p>
          <div className="SD-dropdown">
            <CustomDropDown
              optionData={selectYearOptions}
              selectedValue={year}
              handleSelectedValue={handleYearChange}
            />
          </div>
          <div className="SD-dropdown">
            <CustomDropDown
              optionData={selectMonthOptions}
              selectedValue={month}
              handleSelectedValue={handleMonthChange}
            />
          </div>
        </div>

        <div className="SD-select-comp">
          <p>측정물질</p>
          <div className="SD-dropdown">
            <CustomDropDown
              optionData={selectSubstanceOptions}
              selectedValue={substance}
              handleSelectedValue={handleSubstanceChange}
            />
          </div>
        </div>
      </div>
      <div className="SD-btn-container">
        <button className="search-btn">검색</button>
      </div>
    </div>
  );
}

export default SDSelection;
