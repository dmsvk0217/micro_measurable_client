import React, { useState, useEffect } from "react";
import "./DayorMonthButton.css";

const DayorMonthButton = ({ selectedOption, handleOptionClick }) => {
  const [isSecondActive, setIsSecondActive] = useState(
    selectedOption === "일별"
  );

  useEffect(() => {
    setIsSecondActive(selectedOption === "월별");
  }, [selectedOption]);

  return (
    <dl className="select-unit">
      <dd
        className={selectedOption === "일별" ? "active" : ""}
        style={{ borderRight: "2px solid #55B76B" }}
        onClick={() => handleOptionClick("일별")}
      >
        일별
      </dd>
      <dd
        className={selectedOption === "월별" ? "active" : ""}
        onClick={() => handleOptionClick("월별")}
        style={{ borderLeft: "none" }}
      >
        월별
      </dd>
    </dl>
  );
};

export default DayorMonthButton;
