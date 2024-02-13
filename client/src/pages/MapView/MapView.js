import React, { useState, useEffect } from "react";
import "./MapView.css";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import { Wrapper } from "@googlemaps/react-wrapper";
import OptionContainer from "./OptionContainer/OptionContainer";
import LegendInfo from "./LegendInfo/LegendInfo";
import NodeInfo from "./NodeInfo/NodeInfo";
import NodeInfoResponsive from "./NodeInfoResponsive/NodeInfoResponsive";
import { useMapDataMutation } from "../../hooks/useMapDataMutation";


function MapView() {

  const { mutate: mapMutate } = useMapDataMutation();

  useEffect(() => {
    // 초기 데이터 로드
    mapMutate();

    // 다음 정각까지의 시간(밀리초) 계산
    const now = new Date();
    const delay = 3600000 - (now.getMinutes() * 60000 + now.getSeconds() * 1000 + now.getMilliseconds());

    // 정각에 첫 실행을 위한 타이머 설정
    const timeoutId = setTimeout(() => {
      mapMutate(); // 데이터 로드
      // 이후 매 시간마다 데이터 로드
      setInterval(mapMutate, 3600000);
    }, delay);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearTimeout(timeoutId);
    };

  },[]);


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
