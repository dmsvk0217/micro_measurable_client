import React, { useState, useEffect, useRef } from 'react';
// import globalIcon from '../img/globalIcon'
import './MapView.css'

function MapView(){

    const [containerHeight, setContainerHeight] = useState(0);
    const mapRef = useRef(null);
    const infoRef = useRef(null);

    useEffect(() => {
        const mapHeight = mapRef.current ? mapRef.current.offsetHeight : 0;
        const infoHeight = infoRef.current ? infoRef.current.offsetHeight : 0;

        // 두 요소 중 더 큰 높이를 선택하여 상태를 업데이트합니다.
        setContainerHeight(Math.max(mapHeight, infoHeight));
    }, []);


    const [selectedButtonId, setSelectedButtonId] = useState(1);


    const selectedButtonAction = (buttonId) => {

        setSelectedButtonId(buttonId);

        if(buttonId === 1){
            console.log('초미세먼지');
        }
        else if (buttonId === 2){
            console.log('미세먼지');
        }
        else {
            console.log('포름알데히드');
        }
    }

    return (
        <div className='main-container'  style={{ height: `calc(${containerHeight}px)` }}>
            <img src='img/map.png' alt="map" className="map" ref={mapRef}/>
            <div className='building-image-container'>
                <img src='img/student_building.png' alt='student_building' className='student_building'/>
                <img src='img/grace_building.png' alt='grace_building' className='grace_building'/>
            </div>

            <div className='option-container'>
                <button className={selectedButtonId === 1 ? 'active' : ''} onClick={() => selectedButtonAction(1)}>초미세먼지</button>
                <button className={selectedButtonId === 2 ? 'active' : ''} onClick={() => selectedButtonAction(2)}>미세먼지</button>
                <button className={selectedButtonId === 3 ? 'active' : ''} onClick={() => selectedButtonAction(3)}>포름알데히드</button>
            </div>

            <div className='info-container' ref={infoRef}>
                <div className='node-info'></div>
                <div className='legend-info'>
                    <p className='legend-title'><span className="option">초미세먼지</span>  범례</p>
                    <div className="legend-content">
                        <div className='legen-option-status'>
                            <p className='good'>좋음</p>
                            <p className='normal'>보통</p>
                            <p className='bad'>나쁨</p>
                            <p className='worse'>매우 나쁨</p>
                        </div>
                        <div className='legen-option-value'>
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
