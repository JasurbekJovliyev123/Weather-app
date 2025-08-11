import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, MapPin, Palette, Check } from 'lucide-react';

import { ThemeToggle } from '../features/ThemeToggle';
import { useTheme } from '../app/providers/ThemeProvider';
import { storage, STORAGE_KEYS } from '../shared/lib/storage';

const SettingsPage = () => {
  const { theme } = useTheme();
  const [defaultCity, setDefaultCity] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle');

  useEffect(() => {
    const savedCity = storage.get(STORAGE_KEYS.DEFAULT_CITY, '');
    setDefaultCity(savedCity);
  }, []);

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      storage.set(STORAGE_KEYS.DEFAULT_CITY, defaultCity);
      setSaveStatus('saved');
      
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }, 500);
  };

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Saving...</span>
          </>
        );
      case 'saved':
        return (
          <>
            <Check className="w-4 h-4" />
            <span>Saved!</span>
          </>
        );
      default:
        return (
          <>
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-4 space-y-8"
    >
      <div className="text-center">
        <h1 className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your weather app preferences
        </p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 md:space-x-3">
              <div className="md:w-12 md:h-12 w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="md:text-lg text-md font-semibold text-gray-900 dark:text-white">
                  Theme
                </h3>
                <p className="md:text-sm text-[12px] text-gray-600 dark:text-gray-400">
                  Choose your preferred theme
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {theme} mode
              </span>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="md:w-12 md:h-12 w-11 h-11 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="md:text-lg text-md font-semibold text-gray-900 dark:text-white">
                Default City
              </h3>
              <p className="md:text-sm text-[12px] text-gray-600 dark:text-gray-400">
                Set your preferred default location
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="default-city"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                City Name
              </label>
              <input
                type="text"
                id="default-city"
                value={defaultCity}
                onChange={(e) => setDefaultCity(e.target.value)}
                placeholder="e.g., London, New York, Tokyo"
                className="w-full px-4 py-2.5 md:py-3 bg-gray-50 dark:bg-gray-700 border border-[#0EA5E9] outline-none dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                aria-describedby="default-city-help"
              />
              <p
                id="default-city-help"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                This city will be used when location access is not available
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`w-full flex items-center justify-center space-x-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                saveStatus === 'saved'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-primary hover:bg-primary-dark text-white disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {getSaveButtonContent()}
            </motion.button>
          </div>
        </motion.div>


        {/* <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            About
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Weather Forecast App v1.0</p>
            <p>Built with React, JavaScript, and Tailwind CSS</p>
            <p>Weather data provided by OpenWeatherMap API</p>
          </div>
        </motion.div> */}
      </div>
    </motion.div>
  );
};


export default SettingsPage