import React, { useState, useEffect } from 'react'
import './StatisticsMonthView.css'
import CustomGraph from "../../../components/CustomGraph/CustomGraph";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SMSelection from './SMSelection/SMSelection';
import { createGraphDataConfig, createGraphOptionsConfig } from './SMGraphConfig';
import { columns } from "./SMTableConfig";
import DownloadButton from "../../../components/DownloadButton/DownloadButton";

import useSMStore from '../../../store/SMStore';

function StatisticsMonthView(){
    const { tableData, graphData, substance } = useSMStore();

    const [graphOptionsConfig, setGraphOptionsConfig] = useState({});
    const [graphDataConfig, setGraphDataConfig] = useState([]);

    useEffect(() => {
        const _graphOptionsConfig = createGraphOptionsConfig(substance);
        const _graphDataConfig = createGraphDataConfig(graphData, substance);
        setGraphOptionsConfig(_graphOptionsConfig);
        setGraphDataConfig(_graphDataConfig);
    
      },[graphData])


    return (
        <div className='SM-container'>
            <div className='SM-content-container'>
                <SMSelection/>
                <DownloadButton data={tableData?tableData:[]}></DownloadButton>
                <div className="table-wrapper">
                    <CustomTable data={tableData?tableData:[]} columns={columns}></CustomTable>
                </div>
                <hr className='SM-Month'></hr>
                <p className="SM-graph-title"> | 그래프 보기 | </p>
                { Object.keys(graphDataConfig).length > 0 ? 
                (<CustomGraph data={graphDataConfig} options={graphOptionsConfig}></CustomGraph>) : (<div></div>)}
                
            </div>
        </div>
    );
}

export default StatisticsMonthView;