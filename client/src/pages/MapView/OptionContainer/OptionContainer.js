import React from "react";
import "./OptionContainer.css";
import useMapStore from "../../../store/MapStore";

function OptionContainer() {
  const { selectedSubstance, setSelectedSubstance} = useMapStore();


  return (
    <div className="option-container">
      <button
        className={selectedSubstance === '초미세먼지' ? "active" : ""}
        onClick={() => setSelectedSubstance('초미세먼지')}
      >
        <div className="substance-option-one-container">
          <div className="substance-option-name">초미세먼지</div>
          <div className="substance-option-name-en">PM-2.5</div>
        </div>
      </button>
      <button
        className={selectedSubstance === '미세먼지' ? "active" : ""}
        onClick={() => setSelectedSubstance('미세먼지')}
      >
        <div className="substance-option-one-container">
          <div className="substance-option-name">미세먼지</div>
          <div className="substance-option-name-en">PM-10</div>
        </div>
      </button>
      <button
        className={selectedSubstance === '포름알데히드' ? "active" : ""}
        onClick={() => setSelectedSubstance('포름알데히드')}
      >
        <div className="substance-option-one-container">
          <div className="substance-option-name">포름알데히드</div>
          <div className="substance-option-name-en">CH2O</div>
        </div>
      </button>
    </div>
  );
}

export default OptionContainer;
