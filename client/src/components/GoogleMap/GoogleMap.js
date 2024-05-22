import React, { useRef, useState, useEffect, useCallback } from "react";

import googleMapID from "../../config/googleMapId";
import useNodeInfoStore from "../../store/NodeInfoStore";
import useMapStore from "../../store/MapStore";
import { evaluateSubstanceColor } from "./utils";


const GoogleMap = () => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  const markers = useRef([]);

  const { nodes } = useNodeInfoStore();
  const { setMapLocation, selectedSubstance, mapData } = useMapStore();


  const initMap = useCallback(async () => {
    if (!window.google) {
      console.error("Google Maps API is not loaded.");
      return;
    }
  
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        mapId: googleMapID,
        center: { lat: 36.1032734, lng: 129.3893488 },
        zoom: 16,
      });
      setMap(newMap);
    }
  }, [map]);
  
  const makeCustumMarker = useCallback(async () => {
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
    
    if (map) {
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];
  
      nodes.forEach((node) => {
        const filteredData = mapData.filter(item => item.nodeInfo.location === node.location);
        const lastElement = filteredData.length > 0 ? filteredData[0] : null;
  
        const CustomNode = document.createElement('div');
        CustomNode.className = 'customNode';
        CustomNode.innerText = node.location;
        CustomNode.style.cssText = `
          width: 3.5em;
          height: 3.5em;
          border-radius: 50%;
          text-align: center;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          background: ${evaluateSubstanceColor(selectedSubstance, lastElement ?? {"pm2.5":"-", "pm10":"-","ch2o":"-"}, "background")};
          border: 2px solid ${evaluateSubstanceColor(selectedSubstance, lastElement ?? {"pm2.5":"-", "pm10":"-","ch2o":"-"}, "border")};
        `;
  
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: node.latitude, lng: node.longitude },
          content: CustomNode,
          title: node.location,
        });
  
        marker.addListener("click", () => {
          console.log(node.location);
          setMapLocation(node.location);
        });
  
        markers.current.push(marker);
      });
    }
  }, [map, nodes, selectedSubstance, mapData, setMapLocation]);
  

  useEffect(() => {
    initMap();
  }, [initMap]);
  
  useEffect(() => {
    makeCustumMarker();
  }, [makeCustumMarker]);
  

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}/>
  );
};


export default GoogleMap;
