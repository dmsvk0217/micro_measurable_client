import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import NavigationBar from './components/NavigationBar/NavigationBar';
import MapView from './pages/MapView/MapView';
import RealTimeView from './pages/RealTimeView/RealTimeView';
import StatisticsView from './pages/StatisticsView/StatisticsView';
import Footer from './components/Footer/Footer'

function App() {
  return (
    <Router>
      <NavigationBar/>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/realTime" element={<RealTimeView />} />
          <Route path="/statistics" element={<StatisticsView />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
