import React, { useEffect, useState } from "react";
import {
  selectMonthOptions,
  selectYearOptions,
  selectLocationOptions,
  selectSubstanceOptions,
} from "../../../../constants/selectOption";
import CustomDropDown from "../../../../components/CustomDropDown/CustomDropDown";
import LocationsButton from "../../../../components/LocationsButton/LocationsButton";
import "./SDSelection.css";

import { useSDDataMutation } from "../../../../hooks/useSDDataMutation";
import useSDStore from "../../../../store/SDStore";

function SDSelection() {

  const { year, month, locations, substance, setYear, setMonth, setLocations, setSubstance} = useSDStore();

  useEffect(() => {

    const loadData = async () => {
      await setYear(selectYearOptions[0]);
      await setMonth(selectMonthOptions[0]);
      await setLocations('전체');
      await setSubstance(selectSubstanceOptions[0]);

      SDMutate();
    };
    
    loadData();
  }, []);


  const handleYearChange = (year) => {
    setYear(year);
  };

  const handleMonthChange = (month) => {
    setMonth(month);
  };

  const handleLocationChange = (location) => {
    const updatedLocations = location === '전체'
    ? ['전체']
    : locations.includes('전체')
      ? [location]
      : locations.includes(location)
        ? locations.filter((loc) => loc !== location && loc !== '전체')
        : [location, ...locations.filter((loc) => loc !== '전체')];
  

    setLocations(updatedLocations);
};

  const handleSubstanceChange = (substance) => {
    setSubstance(substance);
  };

  const { mutate: SDMutate } = useSDDataMutation();

  const handleSearchButton = () => {
      SDMutate();
  };

  return (
    <div className="SD-select">
      <div className="SD-select-container">
        <div className="SD-select-comp">
          <p>측정기간</p>
          <CustomDropDown
            optionData={selectYearOptions}
            selectedValue={year}
            handleSelectedValue={handleYearChange}
          />
          <div className="SD-select-comp-sizedBox"></div>
          <CustomDropDown
            optionData={selectMonthOptions}
            selectedValue={month}
            handleSelectedValue={handleMonthChange}
          />
        </div>

        <div className="SD-select-comp">
          <p>측정물질</p>
          <CustomDropDown
            optionData={selectSubstanceOptions}
            selectedValue={substance}
            handleSelectedValue={handleSubstanceChange}
          />
        </div>
      </div>
      <div className="SD-select-location">
        <p className="location-title">측정 위치</p>
        <div className="location-buttons-container">
          {selectLocationOptions.map((location) => (
              //console.log("👻 "+locations),
              //console.log("🙊"+locations[0]),

            <LocationsButton
              key={location}
              location={location}
              selectedLocations={locations}
              handleLocationChange={handleLocationChange}
            />
          ))}
        </div>
      </div>
      <div className="search-btn-container">
          <button className="search-btn" onClick={handleSearchButton}> 검색 </button>
      </div>
    </div>
  );
};

export default SDSelection;
