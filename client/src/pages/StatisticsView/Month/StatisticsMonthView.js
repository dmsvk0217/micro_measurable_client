import React from 'react'
import './StatisticsMonthView.css'
import SMTable from './SMTable/SMTable';
import SMGraph from './SMGraph/SMGraph';
import SMSelection from './SMSelection/SMSelection';
import SDSelection from '../Day/SDSelection/SDSelection';

function StatisticsMonthView(){
    return (
        <div className='SM-container'>
            <p className='SM-title'>통계 보기 &gt; 월별</p>
            <div className='SM-content-container'>
                <SMSelection/>
                <SMTable/>
                <hr className='SM-Month'></hr>
                <SMGraph/>
            </div>
        </div>
    );
}

export default StatisticsMonthView;