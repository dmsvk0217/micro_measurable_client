import React, { useRef, useState, useEffect } from "react";

import googleMapID from "../../config/googleMapId";
import useNodeInfoStore from "../../store/NodeInfoStore";
import useMapStore from "../../store/MapStore";


const GoogleMap = () => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  const { nodes } = useNodeInfoStore();
  const { setMapAddress, setMapLocation } = useMapStore();

      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

      if (ref.current && !map) {
        const newMap = new window.google.maps.Map(ref.current, {
          mapId: googleMapID,
          center: { lat: 36.1032734, lng: 129.3893488 },
          zoom: 17,
          // styles: [{ featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }] }]
        });
        setMap(newMap);
      }

      if (map) {
        nodes.forEach((node) => {
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
            background: rgb(125,157,219,0.7);
            border: 2px solid #7D9DDB;
          `;

          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: node.latitude, lng: node.longitude },
            content: CustomNode,
            title: node.location,
          });

          marker.addListener("click", () => {
            console.log(node.location);
            setMapAddress(node.nodeAddress);
            setMapLocation(node.location);
          });
        });
      }
    }

    initMap();
  }, [map, nodes]);  // Ensure correct dependencies

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}/>
  );
};


export default GoogleMap;
