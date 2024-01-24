import React, { useState, useEffect } from "react";
import CurrentDate from '../../../../components/CurrentDate';

import './SDSelection.css';


function SDSelection(){
    const [month, setMonth] = useState('');
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    return(
        <div className='RT-graph-select-container'>
                <div className='RT-graph-location'>
                    <p>측정위치</p>
                    <div className='RT-graph-dropdown'>
                        {/* <select value={location} onChange={handleLocationChange}>
                            <option value="option1">뉴턴홀</option>
                            <option value="option2">오석관</option>
                            <option value="option3">느헤미야홀</option>
                        </select> */}
                    </div>
                </div>
                <div className='RT-graph-matter'>
                    <p>측정물질</p>
                    <div className='RT-graph-dropdown'>
                        <select value={month} onChange={handleMonthChange}>
                            {months.map((month, index) => (
                                 <option value={index+1} key={index}>{month}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <CurrentDate/>
            </div>
    );
}

export default SDSelection;