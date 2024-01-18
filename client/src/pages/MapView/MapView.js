import React, { useState} from 'react';
import './MapView.css'

function MapView(){

    const [legendTitle, setLegendTitle] = useState('초미세먼지');
    const [selectedButtonId, setSelectedButtonId] = useState(1);


    const selectedButtonAction = (buttonId) => {

        setSelectedButtonId(buttonId);

        if(buttonId === 1){
            setLegendTitle('초미세먼지');
        }
        else if (buttonId === 2){
            setLegendTitle('미세먼지');
        }
        else {
            setLegendTitle('포름알데히드');
        }
    }

    return (
        <div className='main-container'>  
            <img src='img/map.png' alt="map" className="map"/>
            <div className='building-image-container'>
                <img src='img/student_building.png' alt='student_building' className='student_building'/>
                <img src='img/grace_building.png' alt='grace_building' className='grace_building'/>
            </div>

            <div className='option-container'>
                <button className={selectedButtonId === 1 ? 'active' : ''} onClick={() => selectedButtonAction(1)}>초미세먼지</button>
                <button className={selectedButtonId === 2 ? 'active' : ''} onClick={() => selectedButtonAction(2)}>미세먼지</button>
                <button className={selectedButtonId === 3 ? 'active' : ''} onClick={() => selectedButtonAction(3)}>포름알데히드</button>
            </div>

            <div className='info-container'>
                <div className='node-info'></div>
                <div className='legend-info'>
                    <p className='legend-title'><span className="option">{legendTitle}</span>  범례</p>
                    <div className="legend-content">
                        <div className='legend-option-status'>
                            <p className='good'>좋음</p>
                            <p className='normal'>보통</p>
                            <p className='bad'>나쁨</p>
                            <p className='worse'>매우 나쁨</p>
                        </div>
                        <div className='legend-option-value'>
                            <p className='good'>0~15</p>
                            <p className='normal'>16~35</p>
                            <p className='bad'>36~75</p>
                            <p className='worse'>76~</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MapView;
