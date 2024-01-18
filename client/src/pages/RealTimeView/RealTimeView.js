import React from 'react'
import './RealTimeView.css'
import RTTable from './RTTable/RTTable'
import RTGraph from './RTGraph/RTGraph'

function RealTimeView(){
    return (
        <div>
            <p className='RT-title'>실시간 정보 보기</p>
            <div className='RT-container'>
                <RTTable/>
                <RTGraph/>
            </div>
        </div>
    );
}

export default RealTimeView;