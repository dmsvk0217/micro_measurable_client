import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavigationBar.css'

function NavigationBar(){
    const location = useLocation();


    // 현재 경로가 통계 관련 경로인지 확인하는 함수
    const isStatisticsActive = () => {
        return location.pathname === '/statisticsDay' || location.pathname === '/statisticsMonth';
    };


    return (
        <nav className="navbar"> 
            <div className="navbar-logo">
                <NavLink to="/"><img src="/img/logo.png" alt="Logo" className="logo"/></NavLink>
            </div>
            <ul className="nav-links">
                <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>지도 보기</NavLink></li>
                <li><NavLink to="/realTime" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>실시간 정보 보기</NavLink></li>
                <li><NavLink to="/statisticsDay" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>통계 보기</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavigationBar; 