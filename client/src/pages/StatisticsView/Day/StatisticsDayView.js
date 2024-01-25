import React from 'react'
import './StatisticsDayView.css'

function StatisticsDayView(){
    return (
        <div className='SD-container'>
            <p className='SD-title'>통계 보기 &gt; 일별</p>
            <div className='SD-content-container'>
                {/* <SDTable/> */}
                <hr className='SD-hr'></hr>
                {/* <SDGraph/> */}
            </div>
        </div>
    );
}

export default StatisticsDayView;                                                  