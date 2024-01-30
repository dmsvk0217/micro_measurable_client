import React from "react";
import "./OptionContainer.css";

function OptionContainer(props) {
  const selectedButtonId = props.selectedButtonId;
  const selectedButtonAction = props.selectedButtonAction;
  return (
    <div className="option-container">
      <button
        className={selectedButtonId === 1 ? "active" : ""}
        onClick={() => selectedButtonAction(1)}
      >
        <div className="substance-option-one-container">
          <div className="substance-option-name">초미세먼지</div>
          <div className="substance-option-name-en">PM-2.5</div>
        </div>
      </button>
      <button
        className={selectedButtonId === 2 ? "active" : ""}
        onClick={() => selectedButtonAction(2)}
      >
        <div className="substance-option-one-container">
          <div className="substance-option-name">미세먼지</div>
          <div className="substance-option-name-en">PM-10</div>
        </div>
      </button>
      <button
        className={selectedButtonId === 3 ? "active" : ""}
        onClick={() => selectedButtonAction(3)}
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
