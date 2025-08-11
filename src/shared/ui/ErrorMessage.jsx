import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ErrorMessage = ({ 
  message, 
  onRetry, 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center p-6 text-center ${className}`}
    >
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          aria-label="Retry loading"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
};