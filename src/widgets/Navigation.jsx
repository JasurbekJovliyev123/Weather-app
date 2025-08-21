import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Settings, Cloud, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/forecast', icon: Calendar, label: 'Forecast' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];


  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto py-1 md:py-2 px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to={'/'} className="flex items-center space-x-1 md:space-x-2">
            <Cloud className="md:w-8 md:h-8 w-6 h-6 text-primary" />
            <span className="md:text-xl text-md font-bold text-[#0EA5E9] dark:text-white">
              WeatherApp
            </span>
          </NavLink>

          <div className="hidden md:flex md:space-x-5 lg:space-x-8">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          <button 
            onClick={()=>setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X  className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2 pb-4 space-y-1">
                {navItems.map(({ to, icon: Icon, label }) => (
                  <motion.div
                    key={to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <NavLink
                      to={to}
                      onClick={()=>setIsOpen(!isOpen)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                          isActive
                            ? 'text-primary bg-primary/10'
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};