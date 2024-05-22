import React from "react";
import "./MapView.css";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import { Wrapper } from "@googlemaps/react-wrapper";
import OptionContainer from "./OptionContainer/OptionContainer";
import LegendInfo from "./LegendInfo/LegendInfo";
import NodeInfo from "./NodeInfo/NodeInfo";
import NodeInfoResponsive from "./NodeInfoResponsive/NodeInfoResponsive";

function MapView() {

  return (
    <div className="main-container">
      <div className="map-and-info-container">
        <div className="map-container">
          <Wrapper apiKey={"AIzaSyCjp5Sxe-c5mUn1GtfLqEatR0mt7cXYdIM"}>
            <GoogleMap options={{ disableDefaultUI: true, zoomControl: false }}/>
          </Wrapper>
        </div>
        <div className="option-and-info-flex-container">
          <OptionContainer/>
          <div className="info-container">
            <NodeInfo/>
            <div className="info-container-dividier"></div>
            <LegendInfo/>
          </div>
        </div>
      </div>
      <NodeInfoResponsive/>
    </div>
  );
}

export default MapView;
