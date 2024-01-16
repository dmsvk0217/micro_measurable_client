import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'

function NavigationBar(){
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/"><img src="/img/logo.png" alt="Logo" /></Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">지도 보기</Link></li>
                <li><Link to="/realTime">실시간 정보 보기</Link></li>
                <li><Link to="/statistics">통계 보기</Link></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;