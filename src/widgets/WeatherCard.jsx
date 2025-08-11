import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { formatTemperature, getWeatherIconUrl, capitalizeFirstLetter, formatTime } from '../shared/lib/utils';

export const WeatherCard = ({ weather, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {weather.name}, {weather.sys.country}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={getWeatherIconUrl(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="w-16 h-16"
          />
          <div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {formatTemperature(weather.main.temp)}
            </div>
            <p className="text-gray-600 dark:text-gray-400 capitalize">
              {capitalizeFirstLetter(weather.weather[0].description)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-gray-500" />
            <div className="text-sm">
              <p className="text-gray-500 dark:text-gray-400">Feels like</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatTemperature(weather.main.feels_like)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div className="text-sm">
              <p className="text-gray-500 dark:text-gray-400">Humidity</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {weather.main.humidity}%
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-green-500" />
            <div className="text-sm">
              <p className="text-gray-500 dark:text-gray-400">Wind</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {weather.wind.speed} m/s
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-purple-500" />
            <div className="text-sm">
              <p className="text-gray-500 dark:text-gray-400">Pressure</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {weather.main.pressure} hPa
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 dark:text-gray-400">Sunrise:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatTime(weather.sys.sunrise)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 dark:text-gray-400">Sunset:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatTime(weather.sys.sunset)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};