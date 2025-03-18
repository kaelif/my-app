import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const apiKey = '6cb4b2ecbf8b423fad714830251203';
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Paris');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [debouncedCity, setDebouncedCity] = useState(city);

  // Debounce city input to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 500); // 500ms delay

    return () => clearTimeout(handler); // Cleanup timer on city change
  }, [city]);

  // Fetch weather data when debounced city changes
  useEffect(() => {
    const fetchWeather = async () => {
      if (!debouncedCity) return;

      setLoading(true);
      setError('');

      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${debouncedCity}`
        );
        setWeatherData(response.data);
      } catch (error) {
        setError('Failed to fetch weather data. Please try again.');
        console.error("Weather API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [debouncedCity, apiKey]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Weather App</h2>

      {/* Search Input */}
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city"
        className="w-full p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-700">Loading weather data...</div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-600 mb-4">{error}</div>
      )}

      {/* Weather Data Display */}
      {weatherData && !loading && (
        <div className="text-center">
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
            className="mx-auto"
          />
          <p className="text-xl font-semibold mt-2 text-gray-900">
            {weatherData.location.name}, {weatherData.location.country}
          </p>
          <p className="text-lg text-gray-800">
            Temperature: {weatherData.current.temp_c}°C
          </p>
          <p className="text-lg text-gray-800">Wind: {weatherData.current.wind_mph} mph</p>
          <p className="text-lg text-gray-800">
            Condition: {weatherData.current.condition.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
