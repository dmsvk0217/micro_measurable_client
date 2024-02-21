import React, { useState, useEffect } from "react";
import "./RTGraphSelection.css";
import CurrentDate from "../../../components/CurrentDate";
import CustomDropDown from "../../../components/CustomDropDown/CustomDropDown";
import { useRTGraphDataMutation } from '../../../hooks/useRTDataMutation';
import { selectLocationOptions, selectSubstanceOptions } from "../../../constants/selectOption";
import useRTStore from '../../../store/RTStore';

function RTGraphSelection() {

  const { graphLocation, graphSubstance, setGraphLocation, setGraphSubstance } = useRTStore();


  const handleNodeSelect = async (node) => {
    await setGraphLocation(node);
    handleSearchButton();
  };

  const handleSubstanceChange = async (substance) => {
    await setGraphSubstance(substance);
    handleSearchButton();
  };

  useEffect(() => {

    const loadData = async () => {
      await setGraphLocation(selectLocationOptions[1]);
      await setGraphSubstance(selectSubstanceOptions[1]);
      handleSearchButton();
      
    }

    loadData();
  }, []);

  const { mutate: graphMutate } = useRTGraphDataMutation();

  const handleSearchButton = () => {
    graphMutate();
  };



  return (
    <div className="RTTable">
      <div className="RT-graph-title-container">
        <span className="RT-graph-title">| 그래프 보기 |</span> 
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
                selectedValue={graphLocation}
                handleSelectedValue={handleNodeSelect}
              />
            </div>
            <div className="RT-table-unit">
                <p style={{ fontWeight: "bold", marginRight: "10px" }}>측정물질</p>
                <CustomDropDown
                    optionData={selectSubstanceOptions}
                    selectedValue={graphSubstance}
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
