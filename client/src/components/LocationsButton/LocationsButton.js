// LocationsButton.js
import React from "react";
import './LocationsButton.css'

const LocationsButton = ({ location, selectedLocations, handleLocationChange }) => {
  return (
      <li 
        key = {location.value}
        className={selectedLocations.includes(location) ? 'active' : ''}>
        <button
          className={selectedLocations.includes(location) ? 'location-button-active' : 'location-button'}
          onClick={() => handleLocationChange(location)}
        >
          <span>{location}</span>
        </button>
      </li>
  );
};

export default LocationsButton;
