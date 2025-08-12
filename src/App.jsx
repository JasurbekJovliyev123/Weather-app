import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryProvider } from './app/providers/QueryProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { Navigation } from './widgets/Navigation';
import { LoadingSpinner } from './shared/ui/LoadingSpinner'; 
const HomePage = lazy(() => import('./pages/HomePage'));
const ForecastPage = lazy(() => import('./pages/ForecastPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="min-h-screen bg-gray-50 dark:bg-gray-900"
  >
    <header>
       <Navigation />
    </header>
  
    <main className="py-6">
      {children}
    </main>
  </motion.div>
);

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Suspense fallback={
              <div className="flex justify-center items-center h-screen">
                <LoadingSpinner size="xl" />
              </div>
            }>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PageWrapper>
                      <HomePage />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/forecast"
                  element={
                    <PageWrapper>
                      <ForecastPage />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PageWrapper>
                      <SettingsPage />
                    </PageWrapper>
                  }
                />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </Router>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
