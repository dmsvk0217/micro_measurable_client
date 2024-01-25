import React, { useState, useEffect } from "react";
import {
    selectYearOptions,
    selectLocationOptions,
    selectSubstanceOptions,
} from "../../../../constants/selectOption";
import CustomDropDown from "../../../../components/CustomDropDown/CustomDropDown";
import SMSubmitButton from "../SMSubmitButton/SMSubmitButton";
import './SMSelection.css';


function SMSelection(){
    const [selectedYear, setSelectedYear] = useState(selectYearOptions[0]);
    const [selectedLocation, setSelectedLocation] = useState(
        selectLocationOptions[0]
    );
    const [selectedSubstance, setSelectedSubstance] = useState(
        selectSubstanceOptions[0]
    );
    
    const handleYearChange = (year) => {
        setSelectedYear(year);
    };
    const handleLocationChange = (location) => {
        setSelectedLocation(location);
    };
    const handleSubstanceChange = (substance) => {
        setSelectedSubstance(substance);
    };

    return(
        <div className="SM-select">
            <div className='SM-select-container'>
                <div className="SM-select-comp">
                    <p>측정위치</p>
                    <CustomDropDown
                        optionData={selectLocationOptions}
                        selectedValue={selectedLocation}
                        handleSelectedValue={handleLocationChange}
                    />
                </div>
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
            <SMSubmitButton
                selectedYear={selectedYear}
                selectedLocation={selectedLocation}
                selectedSubstance={selectedSubstance}
            />
        </div>
    );
}

export default SMSelection;