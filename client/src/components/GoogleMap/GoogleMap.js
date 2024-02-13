// GoogleMap.js
import React, { useState, useEffect, useRef } from "react";
import useMapStore from "../../store/MapStore";

const GoogleMap = () => {

  const ref = useRef();
  const markerRefs = useRef([]);

  const { setMapLocation, mapData, mapLocation, selectedSubstance } = useMapStore();

  
  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat: 36.1032734, lng: 129.3893488 },
      zoom: 16.3,
      disableDefaultUI: true,
      zoomControl: false,
      panControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      styles: [
        {
          elementType: "labels",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "administrative.land_parcel",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "administrative.neighborhood",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
      ],
    });

    const markerColors = {
      good: "#7D9DDB",
      normal: "#6EB057",
      bad: "#D7E067",
      worst: "#BB7373",
      undefined: "black",
    };

    // 노드 정보 가져오기
    mapData.map((node) => {

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

      const customMarkerIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: markerColor,
        fillOpacity: 0.7,
        scale: 20,
        strokeColor: markerColor,
        strokeWeight: 3,
      };

      const marker =  new window.google.maps.Marker({
        position: node.position,
        map: newMap,
        icon: customMarkerIcon,
        label: {
          text: node.label,
          color: mapLocation === node.label? "black":"white",
          fontSize: "1.1em",
          fontWeight: "500",
        },
        optimized: false,
      });

      marker.addListener("click", () => {
        handleMarkerClick(node.label);
      });

      markerRefs.current.push(marker);
    });


    const zoomChangedListener = newMap.addListener("zoom_changed", () => {
      const currentZoom = newMap.getZoom();
      const minZoomToShowMarker = 14;

      markerRefs.current.forEach((marker) => {
        if (currentZoom <= minZoomToShowMarker) {
          marker.setVisible(false);
        } else {
          marker.setVisible(true);
        }
      });
    });

    return () => {
      window.google.maps.event.removeListener(zoomChangedListener);
    };
  }, [selectedSubstance, mapData, mapLocation]);

  const handleMarkerClick = (label) => {
    setMapLocation(label);
    console.log("🖱️click: ",label);
  };

  return (
    <div ref={ref} id="map" style={{ width: "100%", height: "100%" }}></div>//`calc(100vh - 100px)`
  );
};

export default GoogleMap;
