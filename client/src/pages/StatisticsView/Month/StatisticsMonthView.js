import React, { useEffect } from 'react'
import './StatisticsMonthView.css'
import CustomGraph from "../../../components/CustomGraph/CustomGraph";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SMSelection from './SMSelection/SMSelection';
import { chartData, chartOptions } from './SMGraphConfig';
import { columns } from "./SMTableConfig";
import DownloadButton from "../../../components/DownloadButton/DownloadButton";

import useSMStore from '../../../store/SMStore';
import { useSMTableDataMutation } from '../../../hooks/useSMDataMutation';

function StatisticsMonthView(){
    const { tableData } = useSMStore();
    const { mutate: tableMutate, isLoading } = useSMTableDataMutation();

    useEffect(() => {
        tableMutate({selectedLocation:"전체", selectedYear: new Date(2024, 0, 1).getFullYear(), selectedSubstance:"포름알데히드"});
    }, []);

    return (
        <div className='SM-container'>
            <div className='SM-content-container'>
                <SMSelection/>
                <DownloadButton data={tableData?tableData:[]}></DownloadButton>
                <CustomTable data={tableData?tableData:[]} columns={columns}></CustomTable>
                <hr className='SM-Month'></hr>
                <p className="SM-graph-title"> | 그래프 보기 | </p>
                <CustomGraph data={chartData} options={chartOptions}></CustomGraph>
            </div>
        </div>
    );
}

export default StatisticsMonthView;