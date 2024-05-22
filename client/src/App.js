import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import NavigationBar from "./components/NavigationBar/NavigationBar";
import MapView from "./pages/MapView/MapView";
import RealTimeView from "./pages/RealTimeView/RealTimeView";
import StatisticsDayView from "./pages/StatisticsView/Day/StatisticsDayView";
import Footer from "./components/Footer/Footer";
import NodeInfoProvider from "./providers/nodeInfoProvider";
import RawDataProvider from "./providers/rawDataProvider";

function App() {
  return (
    <Router>
      <NodeInfoProvider>
        <RawDataProvider>
          <NavigationBar />
          <hr className="nav-hr"></hr>
          <div className="main-content">
            <div className="sidebar">
            </div>
            <Routes>
              <Route path="/" element={<MapView />} />
              <Route path="/realTime" element={<RealTimeView />} />
              <Route path="/statisticsDay" element={<StatisticsDayView />} />
            </Routes>
          </div>
          <div className="empty-space"></div>
          <Footer />
        </RawDataProvider>
      </NodeInfoProvider>
    </Router>
  );
}

export default App;
