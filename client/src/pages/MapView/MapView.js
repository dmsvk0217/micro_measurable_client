import React, {useState} from 'react';
// import globalIcon from '../img/globalIcon'
import './MapView.css'

function MapView(){

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
                <div className='legend-info'></div>
            </div>
        </div>

    );
}

export default MapView;
