import React from "react";
import "./Weather.css";

import searchIcon from "../assets/search-icon.svg";
import clearIcon from "../assets/clear-icon.svg";

const Weather = () => {
  return (
    <div className="weather">
        <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <img id="search-icon" src={searchIcon} alt="search-icon"/>
        </div>
        <div className="badge">
            <p>hot</p>
        </div>
        <img className="weather-icon" src={clearIcon} alt="weather-icon"/>
        <p className="temperature">49°c</p>
        <p className="location">Cuibrasa</p>
    </div>
  );
}

export default Weather;