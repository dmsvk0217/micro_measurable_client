import React, { useState} from 'react';
import './MapView.css'

function MapView(){

    const [legendTitle, setLegendTitle] = useState('초미세먼지');
    const [selectedButtonId, setSelectedButtonId] = useState(1);
    const [legendValueGood, setlegendValueGood] = useState('0~15');
    const [legendValueNormal, setlegendValueNormal] = useState('16~35');
    const [legendValueBad, setlegendValueBad] = useState('36~75');
    const [legendValueWorse, setlegendValueWorse] = useState('76~');



    const selectedButtonAction = (buttonId) => {

        setSelectedButtonId(buttonId);

        if(buttonId === 1){
            setLegendTitle('초미세먼지');
            setlegendValueGood('0~15');
            setlegendValueNormal('16~35');
            setlegendValueBad('36~75');
            setlegendValueWorse('76~');
        }
        else if (buttonId === 2){
            setLegendTitle('미세먼지');
            setlegendValueGood('0~');
            setlegendValueNormal('');
            setlegendValueBad('');
            setlegendValueWorse('');
        }
        else {
            setLegendTitle('포름알데히드');
            setlegendValueGood('0~');
            setlegendValueNormal('');
            setlegendValueBad('');
            setlegendValueWorse('');
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
                            <p className='good'>{legendValueGood}</p>
                            <p className='normal'>{legendValueNormal}</p>
                            <p className='bad'>{legendValueBad}</p>
                            <p className='worse'>{legendValueWorse}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MapView;
