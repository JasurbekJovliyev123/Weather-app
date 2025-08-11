import axios from 'axios';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

export const fetchWeatherByCoords = async (coords) => {
  const response = await weatherApi.get('/weather', {
    params: {
      lat: coords.lat,
      lon: coords.lon,
    },
  });
  return response.data;
};

export const fetchWeatherByCity = async (city) => {
  const response = await weatherApi.get('/weather', {
    params: {
      q: city,
    },
  });
  return response.data;
};

export const fetchForecastByCity = async (city) => {
  const response = await weatherApi.get('/forecast', {
    params: {
      q: city,
    },
  });
  return response.data;
};

export const fetchForecastByCoords = async (coords) => {
  const response = await weatherApi.get('/forecast', {
    params: {
      lat: coords.lat,
      lon: coords.lon,
    },
  });
  return response.data;
};