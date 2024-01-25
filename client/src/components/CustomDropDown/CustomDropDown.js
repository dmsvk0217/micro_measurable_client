import React from "react";
import "./CustomDropDown.css";

const CustomDropDown = ({ optionData, selectedValue, handleSelectedValue }) => {
  return (
    <select
      value={selectedValue}
      onChange={(e) => handleSelectedValue(e.target.value)}
      className="custom-dropdown"
    >
      {optionData.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default CustomDropDown;
