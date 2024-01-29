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
        초미세먼지
      </button>
      <button
        className={selectedButtonId === 2 ? "active" : ""}
        onClick={() => selectedButtonAction(2)}
      >
        미세먼지
      </button>
      <button
        className={selectedButtonId === 3 ? "active" : ""}
        onClick={() => selectedButtonAction(3)}
      >
        포름알데히드
      </button>
    </div>
  );
}

export default OptionContainer;
