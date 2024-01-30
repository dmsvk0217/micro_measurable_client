import React, { useEffect } from 'react'
import './StatisticsMonthView.css'
import CustomGraph from "../../../components/CustomGraph/CustomGraph";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SMSelection from './SMSelection/SMSelection';
import { chartData, chartOptions } from './SMGraphConfig';
import { data, columns } from "./SMTableConfig";
import DownloadButton from "../../../components/DownloadButton/DownloadButton";

import useSMStore from '../../../store/SMStore';
import { useSMDataMutation } from '../../../hooks/useSMDataMutation';

import util from "../../../util.js";

function StatisticsMonthView(){
    const { tableData } = useSMStore();
    const { mutate, isLoading } = useSMDataMutation();

    useEffect(() => {
        mutate({selectedLocation:"전체", selectedDate: new Date(2024, 0, 1), selectedUnit:"일평균", selectedHour:""});
    })
    return (
        <div className='SM-container'>
            <div className='SM-content-container'>
                <SMSelection/>
                <DownloadButton data={data}></DownloadButton>
                <CustomTable data={data} columns={columns}></CustomTable>
                <hr className='SM-Month'></hr>
                <p className="SM-graph-title"> | 그래프 보기 | </p>
                <CustomGraph data={chartData} options={chartOptions}></CustomGraph>
            </div>
        </div>
    );
}

export default StatisticsMonthView;