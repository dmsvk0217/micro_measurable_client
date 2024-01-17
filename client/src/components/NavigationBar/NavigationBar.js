import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css'

function NavigationBar(){
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <NavLink to="/"><img src="/img/logo.png" alt="Logo" /></NavLink>
            </div>
            <ul className="nav-links">
                <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>지도 보기</NavLink></li>
                <li><NavLink to="/realTime" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>실시간 정보 보기</NavLink></li>
                <li><NavLink to="/statistics" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>통계 보기</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;