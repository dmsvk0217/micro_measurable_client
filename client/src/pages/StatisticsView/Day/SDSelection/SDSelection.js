import React, { useState, useEffect } from "react";
import CurrentDate from '../../../../components/CurrentDate';

import './SDSelection.css';


function SDSelection(){

    const [year, setYear] = useState(2024);
    const years = [2024];
    const handleYearChange = (event) => {
        setYear(event.target.value);
    };
    const [month, setMonth] = useState('1월');
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const [location, setLocation] = useState('뉴턴홀');
    const locations = ['뉴턴홀', '오석홀','느헤미야홀'];
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const [matter, setMatter] = useState('초미세먼지');
    const matters = ['초미세먼지', '미세먼지','포름알데히드'];
    const handleMatterChange = (event) => {
        setMatter(event.target.value);
    };

    return(
        <div className='SD-graph-select-container'>

                <div className='SD-graph-select-comp'>
                    <p>측정위치</p>
                    <div className='SD-graph-dropdown'>
                        <select value={location} onChange={handleLocationChange}>
                            {locations.map((location, index) => (
                                 <option value={index+1} key={index}>{location}</option>
                            ))}
                        </select>
                        
                    </div>
                </div>

                <div className='SD-graph-select-comp'>
                    <p>측정기간</p>
                    <div className='SD-graph-dropdown'>
                        <select value={year} onChange={handleYearChange}>
                            {years.map((year, index) => (
                                 <option value={index+1} key={index}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className='SD-graph-dropdown'>
                        <select value={month} onChange={handleMonthChange}>
                            {months.map((month, index) => (
                                 <option value={index+1} key={index}>{month}</option>
                            ))}
                        </select>
                        
                    </div>
                </div>

                <div className='SD-graph-select-comp'>
                    <p>측정물질</p>
                    <div className='SD-graph-dropdown'>
                        <select value={matter} onChange={handleMatterChange}>
                            {matters.map((matter, index) => (
                                 <option value={index+1} key={index}>{matter}</option>
                            ))}
                        </select>
                        
                    </div>
                </div>
    
            </div>
    );
}

export default SDSelection;