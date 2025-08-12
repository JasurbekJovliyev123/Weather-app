import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MapPin, AlertCircle } from 'lucide-react';
import { WeatherCard } from '../widgets/WeatherCard';
import { SearchWeather } from '../features/SearchWeather';
import { LoadingSpinner } from '../shared/ui/LoadingSpinner';
import { ErrorMessage } from '../shared/ui/ErrorMessage';
import { fetchWeatherByCoords, fetchWeatherByCity } from '../shared/api/weather';
import { getCurrentPosition } from '../shared/lib/geolocation';
import { storage, STORAGE_KEYS } from '../shared/lib/storage';

 const HomePage = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const defaultCity = storage.get(STORAGE_KEYS.DEFAULT_CITxY, '');
        if (defaultCity) {
          setCurrentCity(defaultCity);
          return;
        }

        const coords = await getCurrentPosition();
        setLocationCoords(coords);
      } catch (error) {
        setLocationError(error.message);
        setCurrentCity('Tashkent');
      }
    };

    getLocation();
  }, []);

  const weatherQuery = useQuery({
    queryKey: ['weather', currentCity, locationCoords],
    queryFn: async () => {
      if (currentCity) {
        return await fetchWeatherByCity(currentCity);
      } else if (locationCoords) {
        return await fetchWeatherByCoords(locationCoords);
      }
      throw new Error('No location available');
    },
    enabled: !!(currentCity || locationCoords),
    staleTime: 5 * 60 * 1000, 
  });

  const handleSearch = (city) => {
    setCurrentCity(city);
    setLocationCoords(null);
  };

  const handleRetry = () => {
    if (currentCity) {
      weatherQuery.refetch();
    } else {
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4 space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Current Weather
        </h1>
        <SearchWeather 
          onSearch={handleSearch}
          isLoading={weatherQuery.isLoading}
          className="max-w-md mx-auto"
        />
      </div>

      {locationError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Location access denied. Showing weather for London as default.
            </p>
          </div>
        </motion.div>
      )}

      {weatherQuery.isLoading && (
        <div className="flex justify-center w-full py-12">
          <div className="text-center">
            <LoadingSpinner size="xl" className="mb-4 ml-12" />
            <p className="text-gray-600 text-center  dark:text-gray-400">
              Loading weather data...
            </p>
          </div>
        </div>
      )}

      {weatherQuery.error && (
        <ErrorMessage
          message="Failed to fetch weather data. Please try again or search for a different city."
          onRetry={handleRetry}
        />
      )}

      {weatherQuery.data && (
        <WeatherCard weather={weatherQuery.data} />
      )}

      {!locationCoords && !currentCity && !locationError && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Enable location access or search for a city to see weather data
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default HomePage