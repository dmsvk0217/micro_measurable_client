import React, { useState, useEffect } from "react";
import {
  selectYearOptions,
  selectLocationOptions,
  selectSubstanceOptions,
} from "../../../../constants/selectOption";
import CustomDropDown from "../../../../components/CustomDropDown/CustomDropDown";
import SMSubmitButton from "../SMSubmitButton/SMSubmitButton";
import LocationsButton from "../../../../components/LocationsButton/LocationsButton";

import "./SMSelection.css";

function SMSelection() {
  const [selectedYear, setSelectedYear] = useState(selectYearOptions[0]);
  const [selectedLocation, setSelectedLocation] = useState(
    selectLocationOptions[0]
  );
  const [selectedSubstance, setSelectedSubstance] = useState(
    selectSubstanceOptions[0]
  );
  const [selectedLocations, setSelectedLocations] = useState([
    selectLocationOptions[0],
  ]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  const handleLocationChange = (location) => {
    const updatedLocations = selectedLocations.includes(location)
      ? selectedLocations.filter((loc) => loc !== location)
      : [...selectedLocations, location];

    setSelectedLocations(updatedLocations);
  };
  const handleSubstanceChange = (substance) => {
    setSelectedSubstance(substance);
  };

  return (
    <div className="SM-select">
      <div className="SM-select-container">
        <div className="SM-select-comp">
          <p>측정기간</p>
          <CustomDropDown
            optionData={selectYearOptions}
            selectedValue={selectedYear}
            handleSelectedValue={handleYearChange}
          />
        </div>
        <div className="SM-select-comp">
          <p>측정물질</p>
          <CustomDropDown
            optionData={selectSubstanceOptions}
            selectedValue={selectedSubstance}
            handleSelectedValue={handleSubstanceChange}
          />
        </div>
      </div>
      <div className="SD-select-location">
        <p className="location-title">측정 위치</p>
        <div className="location-container">
          <div className="location-buttons-container">
            {selectLocationOptions.map((location) => (
              <LocationsButton
                key={location.value}
                location={location}
                selectedLocations={selectedLocations}
                handleLocationChange={handleLocationChange}
              />
            ))}
          </div>
        </div>
      </div>
      <SMSubmitButton
        selectedYear={selectedYear}
        selectedLocation={selectedLocation}
        selectedSubstance={selectedSubstance}
      />
    </div>
  );
}

export default SMSelection;
