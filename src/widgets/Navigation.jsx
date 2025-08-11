import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Settings, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
// import { SheetContent,SheetClose,SheetPortal,SheetOverlay,SheetTitle,SheetTrigger } from '@/components/ui/sheet';
export const Navigation = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/forecast', icon: Calendar, label: 'Forecast' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200  dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to={'/'} className="flex items-center space-x-1 md:space-x-2">
            <Cloud className="md:w-8 md:h-8 w-6 h-6 text-primary" />
            <span className="md:text-xl text-md font-bold text-[#0EA5E9] dark:text-white">
              WeatherApp
            </span>
          </NavLink>
          
          <div className="md:flex hidden md:space-x-5 lg:space-x-8">
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
        </div>
      </div>
    </motion.nav>
  );
};