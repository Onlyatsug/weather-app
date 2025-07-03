// import statements for React and CSS
import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";

import Badge from './Badge';

// import statements for icons
import searchIcon from "../assets/search-icon.svg";
import clearIcon from "../assets/clear-icon.svg";
import cloudIcon from "../assets/cloud-icon.svg";
import drizzleIcon from "../assets/drizzle-icon.svg";
import rainIcon from "../assets/rain-icon.svg";
import snowIcon from "../assets/snow-icon.svg";
import humidityIcon from "../assets/humidity-icon.svg";
import windIcon from "../assets/wind-icon.svg";

// Weather component
const Weather = () => {
    // useState and useRef hooks for managing state and references
    const [weatherData, setWeatherData] = useState();
    const inputRef = useRef();
    const InputCondition = "Search...";
  // Object to map weather icons based on OpenWeatherMap API response
    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,
    };
    
    // Function to fetch weather data from OpenWeatherMap API
    const search = async (city) => {
        try {
            // Check if the input is empty
            if (!city) {
                inputRef.current.value = "";
                inputRef.current.placeholder = "No city provided";  
                return
            };
            // URL for lat and lon
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API}`;
            
            // Fetching the coordinates of the city
            var response = await fetch(url);
            const coord = await response.json();
            if (coord.length === 0) {
                inputRef.current.value = "";
                inputRef.current.placeholder = "City not found";    
                return;
            }
             
            // URL for weather data using the coordinates
            const urlData = `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0].lat}&lon=${coord[0].lon}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`;
            
            // Fetching the weather data
            var response = await fetch(urlData);
            const data = await response.json();

            // Check if the response contains weather data
            if (!data || !data.weather || data.weather.length === 0) {
                inputRef.current.value = "";
                inputRef.current.placeholder = "Weather data not available";
                return;
            }
            // Set the icon based on the icons provided by data
            const icon = allIcons[data.weather[0].icon] || clearIcon;
            
            // Update the weatherData
            setWeatherData({
                temperature: Math.floor(data.main.temp),
                location: coord[0].name,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: icon
            });
            if (inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.placeholder = InputCondition;
            }
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {search("Cuiaba")}, []);

    const keyDown = (event) => {
        if (event.key === "Enter") {
            search(inputRef.current.value);
        }
    }

    return (
        <div className="weather">
        {weatherData ? (
        <>
            <div className="search-bar">
                <input type="text" placeholder={InputCondition} ref={inputRef} onKeyDown={keyDown}/>
                <img id="search-icon" src={searchIcon} alt="search-icon" onClick={()=>search(inputRef.current.value)}/>
            </div>
                <img className="weather-icon" src={weatherData.icon} alt="weather-icon"/>
                <p className="temperature">{weatherData.temperature}°c</p>
                <p className="location">{weatherData.location}</p>
                <Badge>{weatherData.temperature}</Badge>
                <hr />
                <div className="weather-date">
                <div className="col">
                    <img src={humidityIcon} alt="Humidity icon" />
                    <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={windIcon} alt="Wind icon" />
                    <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                    </div>
                </div>
                </div>
            </>
        ) : (
        <p>Loading...</p>
        )}
        </div>
    );
}

export default Weather;