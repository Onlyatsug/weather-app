// import statements for React and CSS
import { useEffect, useRef, useState } from 'react';
import "./Weather.css";

import Badge from './Badge';
import Country from './Country';

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
function Weather() {
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
    
    // Function to have the actual city of the input
    function keyDown(event) {
    if (event.key === "Enter") {
        search(inputRef.current.value);
    }
}
    // Function to fetch weather data from OpenWeatherMap API
    async function search(city, coord) {
        try {
            let lat, lon, locationName;

            if (!coord) {
                if (!city) {
                    inputRef.current.value = "";
                    inputRef.current.placeholder = "No city provided";
                    return;
                }

                const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API}`;
                const response = await fetch(url);
                const locationData = await response.json();

                if (locationData.length === 0) {
                    inputRef.current.value = "";
                    inputRef.current.placeholder = "City not found";
                    return;
                }

                lat = locationData[0].lat;
                lon = locationData[0].lon;
                locationName = locationData[0].name;
            } else {
                lat = coord[0].lat;
                lon = coord[0].lon;
            }

            const urlData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`;
            const response = await fetch(urlData);
            const data = await response.json();

            if (!data || !data.weather || data.weather.length === 0) {
                inputRef.current.value = "";
                inputRef.current.placeholder = "Weather data not available";
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clearIcon;

            setWeatherData({
                temperature: Math.floor(data.main.temp),
                location: locationName || data.name,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: icon,
                country: data.sys.country
            });

            if (inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.placeholder = InputCondition;
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
    // useEffect hook to get user's current location and fetch weather data   
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coordNav = [{
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }];
                search(null, coordNav);
            },
            (error) => {
                search("Juina");
            }
        );
    }, []);
    
    return (
        <div className="weather">
            {weatherData ? (
                <>
                    <div className="search-bar">
                        <input type="text" placeholder={InputCondition} ref={inputRef} onKeyDown={keyDown} />
                        <img id="search-icon" src={searchIcon} alt="search-icon" onClick={() => search(inputRef.current.value)} />
                    </div>
                    <img className="weather-icon" src={weatherData.icon} alt="weather-icon" />
                    <p className="temperature">{weatherData.temperature}°c</p>
                    <p className="location">{weatherData.location}</p>
                    <div className="badges-container">
                        <Badge>{weatherData.temperature}</Badge>
                        <Country>{weatherData.country}</Country>
                    </div>
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