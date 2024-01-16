import React from 'react'
import './MapView.css'

function MapView(){
    return (
        <div className='image-container'>
            <img src='img/map.png' alt="map" className="map"/>
            <div className='building-image-container'>
                <img src='img/student_building.png' alt='student_building' className='student_building'/>
                <img src='img/grace_building.png' alt='grace_building' className='grace_building'/>
            </div>
        </div>
    );
}

export default MapView;
