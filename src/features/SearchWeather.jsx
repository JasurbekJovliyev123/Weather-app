import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const SearchWeather = ({ 
  onSearch, 
  isLoading = false,
  className = '' 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`relative ${className}`}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          disabled={isLoading}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-[#0EA5E9] outline-none dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 transition-all"
          aria-label="Search for a city"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <button
        type="submit"
        disabled={!query.trim() || isLoading}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-[#0EA5E9]  hover:bg-primary-dark disabled:bg-blue-300 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:cursor-not-allowed"
        aria-label="Search"
      >
        Search
      </button>
    </motion.form>
  );
};