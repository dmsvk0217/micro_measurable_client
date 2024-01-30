import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "./RTGraphSelection.css";
import { FaCalendarAlt } from "react-icons/fa";
import CurrentDate from "../../../components/CurrentDate";
import CustomDropDown from "../../../components/CustomDropDown/CustomDropDown";

import { useRTGraphDataMutation } from '../../../hooks/useRTDataMutation';

import { 
  selectLocationOptions,
  selectSubstanceOptions
} from "../../../constants/selectOption";

function RTGraphSelection() {
  const [selectedLocation, setSelectedLocation] = useState(
    selectLocationOptions[0]
  );
  const [selectedSubstance, setSelectedSubstance] = useState(
    selectSubstanceOptions[0]
  );

  const handleNodeSelect = (node) => {
    setSelectedLocation(node);
    handleSearchButton();
  };

  const handleSubstanceChange = (substance) => {
    setSelectedSubstance(substance);
    handleSearchButton();
  };

  const { mutate: graphMutate } = useRTGraphDataMutation();

  const handleSearchButton = () => {
    graphMutate({ selectedLocation, selectedSubstance});
  };



  return (
    <div className="RTTable">
      <div className="RT-graph-title-container">
        <span className="RT-graph-title">| 그래프 보기 | </span> 
      </div>
      <div className="RT-table-select-container">
        <div>
          <div className="location-and-unit">
            <div className="RT-table-location">
              <p style={{ fontWeight: "bold", marginRight: "10px" }}>
                측정위치
              </p>
              <CustomDropDown
                optionData={selectLocationOptions}
                selectedValue={selectedLocation}
                handleSelectedValue={handleNodeSelect}
              />
            </div>
            <div className="RT-table-unit">
                <p style={{ fontWeight: "bold", marginRight: "10px" }}>측정물질</p>
                <CustomDropDown
                    optionData={selectSubstanceOptions}
                    selectedValue={selectedSubstance}
                    handleSelectedValue={handleSubstanceChange}
                />
            </div>
            <CurrentDate></CurrentDate>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RTGraphSelection;
