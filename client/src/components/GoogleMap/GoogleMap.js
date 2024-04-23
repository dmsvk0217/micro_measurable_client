import React, { useState, useEffect, useRef } from "react";
import useMapStore from "../../store/MapStore";
import './GoogleMarker.css';

const GoogleMap = () => {
  const ref = useRef();
  const markerRefs = useRef([]);
  const mapInstance = useRef(null);
  

  const { setMapLocation, mapData, mapLocation, selectedSubstance } =
    useMapStore();


  useEffect(() => {

    const { AdvancedMarkerElement } = window.google.maps.importLibrary("marker");
    
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(ref.current, {
        center: { lat: 36.1032734, lng: 129.3893488 },
        zoom: 16.3,
        // mapId: "AIzaSyCjp5Sxe-c5mUn1GtfLqEatR0mt7cXYdIM",
        mapId: "9e9e4cf9a48b1c79"
      });
    }

    const markerColors = {
      good: "#7D9DDB",
      normal: "#6EB057",
      bad: "#D7E067",
      worst: "#BB7373",
      undefined: "#000000",
    };
    const markerColors_rgb = {
      good: "rgb(125,157,219,0.7)",
      normal: "rgb(110,176,87,0.7)",
      bad: "rgb(215,224,103,0.7)",
      worst: "rgb(187,115,115,0.7)",
      undefined: "rgb(0,0,240,0.7)",
    };

    markerRefs.current.forEach(marker => marker.setMap(null));
    markerRefs.current = [];

    // 노드 정보 가져오기
    mapData.forEach((node) => {
      let value;
      let sub_level = "";

      switch (selectedSubstance) {
        case "초미세먼지":
          value = node.pm25;
          if (value >= 76) sub_level = "worst";
          else if (value >= 36) sub_level = "bad";
          else if (value >= 16) sub_level = "normal";
          else if (value >= 0) sub_level = "good";
          else sub_level = "undefined";
          break;
        case "미세먼지":
          value = node.pm10;
          if (value >= 151) sub_level = "worst";
          else if (value >= 81) sub_level = "bad";
          else if (value > 31) sub_level = "normal";
          else if (value >= 0) sub_level = "good";
          else sub_level = "undefined";
          break;
        case "포름알데히드":
          value = node.ch2o;
          break;
        default:
          value = undefined;
      }

      const markerColor = markerColors[sub_level];
      const marker_rgb = markerColors_rgb[sub_level]

      const CustomNode = document.createElement('div');
      CustomNode.className = 'customNode';
      CustomNode.innerText = node.label;
      CustomNode.style.border = `2px solid ${markerColor}`;
      CustomNode.style.background = marker_rgb;

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position: node.position,
        map: mapInstance.current,
        content: CustomNode,
      });

      marker.addListener("click", () => {
        handleMarkerClick(node.label);
        // color: mapLocation === node.label ? "black" : "white",
      });
      markerRefs.current.push(marker);
    });

    const zoomChangedListener = mapInstance.current.addListener("zoom_changed", () => {
      const currentZoom = mapInstance.current.getZoom();
      const minZoomToShowMarker = 14;

      markerRefs.current.forEach((marker) => {
        if (currentZoom <= minZoomToShowMarker) {
          marker.setMap(null);
        } else {
          marker.setMap(mapInstance.current);
        }
      });
    });

    return () => {
      window.google.maps.event.removeListener(zoomChangedListener);
    };
  }, [selectedSubstance, mapData, mapLocation]);

  const handleMarkerClick = (label) => {
    setMapLocation(label);
  };

  return (
    <div ref={ref} id="map" style={{ width: "100%", height: "100%" }}></div>
  );
};

export default GoogleMap;