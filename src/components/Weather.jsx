import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";


import searchIcon from "../assets/search-icon.svg";

import clearIcon from "../assets/clear-icon.svg";

import cloudIcon from "../assets/cloud-icon.svg";
import drizzleIcon from "../assets/drizzle-icon.svg";
import rainIcon from "../assets/rain-icon.svg";
import snowIcon from "../assets/snow-icon.svg";


import humidityIcon from "../assets/humidity-icon.svg";
import windIcon from "../assets/wind-icon.svg";


const Weather = () => {

    const [weatherData, setWeatherData] = useState(null);
    const inputRef = useRef(null);
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
    }
    
    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`;
            
            const response = await fetch(url);
            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || clearIcon;
            setWeatherData({
                temperature: Math.floor(data.main.temp),
                location: data.name,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: icon
            });
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {search("Cuiaba")}, []);

    return (
        <div className="weather">
        {weatherData ? (
        <>
            <div className="search-bar">
            <input type="text" placeholder="Search..." ref={inputRef}/>
            <img id="search-icon" src={searchIcon} alt="search-icon" onClick={()=>search(inputRef.current.value)}/>
            </div>
                <img className="weather-icon" src={weatherData.icon} alt="weather-icon"/>
                <p className="temperature">{weatherData.temperature}°c</p>
                <p className="location">{weatherData.location}</p>
                <div className="badge"><p>hot</p></div>
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