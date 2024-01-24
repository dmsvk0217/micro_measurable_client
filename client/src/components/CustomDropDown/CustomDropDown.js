import React from "react";

const CustomDropDown = ({ optionData, selectedValue, handleSelectedValue }) => {
  console.log("🚀 ~ CustomDropDown ~ optionData:", optionData);
  console.log(
    "🚀 ~ CustomDropDown ~ handleSelectedValue:",
    handleSelectedValue
  );
  console.log("🚀 ~ CustomDropDown ~ selectedValue:", selectedValue);
  return (
    <select
      value={selectedValue}
      onChange={(e) => handleSelectedValue(e.target.value)}
      className="location-dropdown"
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
