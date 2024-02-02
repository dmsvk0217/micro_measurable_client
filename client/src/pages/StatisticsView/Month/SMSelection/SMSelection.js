import React, { useState, useEffect } from "react";
import {
  selectYearOptions,
  selectLocationOptions,
  selectSubstanceOptions,
} from "../../../../constants/selectOption";
import CustomDropDown from "../../../../components/CustomDropDown/CustomDropDown";
import LocationsButton from "../../../../components/LocationsButton/LocationsButton";
import './SMSelection.css';
import { useSMDataMutation } from "../../../../hooks/useSMDataMutation";
import useSMStore from "../../../../store/SMStore";


function SMSelection(){

    const { year, locations, substance, setYear, setLocations, setSubstance } = useSMStore();

    useEffect(() => {

        const loadData = async () => {
            await setYear(selectYearOptions[0]);
            await setLocations('전체');
            await setSubstance(selectSubstanceOptions[0]);
            
            SMMutate();
        };
          
        loadData();
    },[]);

    
    const handleYearChange = (year) => {
        setYear(year);
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

    const { mutate : SMMutate } = useSMDataMutation();

    const handleSearchButton = () => {
        SMMutate();
    };

    return(
        <div className="SM-select">
            <div className='SM-select-container'>
                <div className="SM-select-comp">
                    <p>측정기간</p>
                    <CustomDropDown
                        optionData={selectYearOptions}
                        selectedValue={year}
                        handleSelectedValue={handleYearChange}
                    />
                </div>
                <div className="SM-select-comp">
                    <p>측정물질</p>
                    <CustomDropDown
                        optionData={selectSubstanceOptions}
                        selectedValue={substance}
                        handleSelectedValue={handleSubstanceChange}
                    />
                </div>
            </div>
            <div className="SM-select-location">
                <p className="location-title">측정 위치</p>
                <div className="location-container">
                <div className="location-buttons-container">
                    {selectLocationOptions.map((location) => (
                    <LocationsButton
                        key={location}
                        location={location}
                        selectedLocations={locations}
                        handleLocationChange={handleLocationChange}
                    />
                    ))}
                </div>
                </div>
            </div>
            <div className="search-btn-container">
                <button className="search-btn" onClick={handleSearchButton}> 검색 </button>
            </div>
        </div>
    );
}

export default SMSelection;

