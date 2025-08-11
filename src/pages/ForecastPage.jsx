import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

import { SearchWeather } from '../features/SearchWeather';
import { LoadingSpinner } from '../shared/ui/LoadingSpinner';
import { ErrorMessage } from '../shared/ui/ErrorMessage';
import { fetchForecastByCity, fetchForecastByCoords } from '../shared/api/weather';
import { getCurrentPosition } from '../shared/lib/geolocation';
import { formatTemperature, getWeatherIconUrl, formatDate, groupForecastByDay, capitalizeFirstLetter } from '../shared/lib/utils';
import { storage, STORAGE_KEYS } from '../shared/lib/storage';

const ForecastPage = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);

  useEffect(() => {
    const initLocation = async () => {
      const defaultCity = storage.get(STORAGE_KEYS.DEFAULT_CITY, '');
      if (defaultCity) {
        setCurrentCity(defaultCity);
        return;
      }

      try {
        const coords = await getCurrentPosition();
        setLocationCoords(coords);
      } catch {
        setCurrentCity('London');
      }
    };

    initLocation();
  }, []);

  const forecastQuery = useQuery({
    queryKey: ['forecast', currentCity, locationCoords],
    queryFn: async () => {
      if (currentCity) {
        return await fetchForecastByCity(currentCity);
      } else if (locationCoords) {
        return await fetchForecastByCoords(locationCoords);
      }
      throw new Error('No location available');
    },
    enabled: !!(currentCity || locationCoords),
    staleTime: 10 * 60 * 1000,
  });

  const handleSearch = (city) => {
    setCurrentCity(city);
    setLocationCoords(null);
  };

  const groupedForecast = forecastQuery.data ? groupForecastByDay(forecastQuery.data.list) : [];
   console.log(forecastQuery);
   
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-4 space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center space-x-2">
          <Calendar className="w-8 h-8 text-primary" />
          <span>5-Day Forecast</span>
        </h1>
        <SearchWeather 
          onSearch={handleSearch}
          isLoading={forecastQuery.isLoading}
          className="max-w-md mx-auto"
        />
        {forecastQuery.data && (
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {forecastQuery.data.city.name}, {forecastQuery.data.city.country}
          </p>
        )}
      </div>

      {forecastQuery.isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading forecast data...
            </p>
          </div>
        </div>
      )}

      {forecastQuery.error && (
        <ErrorMessage
          message="Failed to fetch forecast data. Please try again or search for a different city."
          onRetry={() => forecastQuery.refetch()}
        />
      )}

      <AnimatePresence>
        {groupedForecast.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {groupedForecast.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-shadow hover:shadow-xl"
              >
                <div className="text-center mb-1 md:mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {index === 0 ? 'Today' : formatDate(day.items[0].dt)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short' 
                    })}
                  </p>
                </div>

                <div className="flex flex-col items-center mb-2 md:mb-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={getWeatherIconUrl(day.weather.icon)}
                    alt={day.weather.description}
                    className="md:w-16 md:h-16 w-12 h-12 mb-2"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center capitalize">
                    {capitalizeFirstLetter(day.weather.description)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">High</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatTemperature(day.temp_max)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <TrendingDown className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Low</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatTemperature(day.temp_min)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>{formatTemperature(day.temp_min)}</span>
                    <span>{formatTemperature(day.temp_max)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="bg-gradient-to-r from-blue-400 to-red-400 h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForecastPage