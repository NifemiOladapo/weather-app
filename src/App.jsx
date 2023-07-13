import React, { useState } from 'react';
import "./App.css";
function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(location === ""){
      return
    }
    fetchWeatherData();
  };

  const fetchWeatherData = async () => {
    const apiKey = 'b82b931968fc4dab8aa32301231207';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <div className="weather__card">
            <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleLocationChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.location.name}</h2>
          <p>{weatherData.current.temp_c}°C</p>
          <p>{weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
        </div>
      )}
      </div>
  
    </div>
  );
}

export default App;
