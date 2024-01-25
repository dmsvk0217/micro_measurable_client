import React from 'react'
import './StatisticsMonthView.css'
import CustomGraph from "../../../components/CustomGraph/CustomGraph";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SMSelection from './SMSelection/SMSelection';
import { chartData, chartOptions } from './SMGraphConfig';
import { data, columns } from "./SMTableConfig";

function StatisticsMonthView(){
    return (
        <div className='SM-container'>
            <p className='SM-title'>통계 보기 &gt; 월별</p>
            <div className='SM-content-container'>
                <SMSelection/>
                <CustomTable data={data} columns={columns}></CustomTable>
                <hr className='SM-Month'></hr>
                <CustomGraph data={chartData} options={chartOptions}></CustomGraph>
            </div>
        </div>
    );
}

export default StatisticsMonthView;