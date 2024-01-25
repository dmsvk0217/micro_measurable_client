import React, { useState, useEffect } from "react";

import './SMSelection.css';


function SMSelection(){
    const [year, setYear] = useState('');
    const [selectedNode, setSelectedNode] = useState("0");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [matter, setMatter] = useState('초미세먼지');
    const years = ['2024년'];
    const handleYearChange = (event) => {
        setYear(event.target.value);
    };
    const handleNodeSelect = (node) => {
        setSelectedNode(node);
        setDropdownOpen(false);
    }
    const handleMatterChange = (event) => {
        setMatter(event.target.value);
    }
    const handleTableSubmit = async () => {
        
    }
    

    return(
        <div className='SM-graph-select-container'>
            <div>
                <div className="location-and-unit">
                    <div className='SM-graph-location'>
                        <p>측정위치</p>
                        <div className='SM-graph-dropdown'>
                        <select
                    value={selectedNode}
                    onChange={(e) => handleNodeSelect(e.target.value)}
                    className="location-dropdown"
                    >
                    <option value="0">전체</option>
                    <option value="1">뉴턴홀</option>
                    <option value="2">현동홀</option>
                    <option value="3">느헤미아홀</option>
                    <option value="4">오석관</option>
                    <option value="5">코너스톤홀</option>
                    <option value="6">올네이션스홀</option>
                    <option value="7">그레이스스쿨</option>
                    <option value="8">로멘틱잔디</option>
                    <option value="9">평봉필드</option>
                    <option value="10">히딩크 풋살장</option>
                    <option value="11">복지동</option>
                    <option value="12">채플앞</option>
                    <option value="13">하용조관</option>
                    <option value="14">벧엘관</option>
                    <option value="15">창조관</option>
                    </select>
                        </div>
                    </div>
                    
                    <div className='SM-graph-time'>
                        <p>측정기간</p>
                        <div className='SM-graph-dropdown'>
                            <select value={year} onChange={handleYearChange}>
                                {years.map((year, index) => (
                                    <option value={index+1} key={index}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='SM-graph-matter'>
                        <p>측정물질</p>
                        <div className='SM-graph-dropdown'>
                            <select value={matter} onChange={handleMatterChange}>
                                <option value="option1">초미세먼지</option>
                                <option value="option2">미세먼지</option>
                                <option value="option3">포름알데히드</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="search-btn-container">
                    <button className="search-btn" onClick={handleTableSubmit}>
                        검색
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SMSelection;