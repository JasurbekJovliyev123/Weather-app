# Weather Forecast App

A modern, responsive weather forecast application built with React, TypeScript, and Tailwind CSS. Features real-time weather data, 5-day forecasts, automatic location detection, and a beautiful dark mode interface.

## 🌟 Features

- **Current Weather**: Real-time weather data with automatic location detection
- **5-Day Forecast**: Detailed weather forecasts with smooth animations
- **City Search**: Search weather for any city worldwide
- **Dark/Light Mode**: Beautiful theme switcher with localStorage persistence
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Modern Animations**: Smooth transitions using Framer Motion

## 🚀 Tech Stack

- **Framework**: React 18 with JavaScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion
- **API**: OpenWeatherMap API
- **Architecture**: Feature-Sliced Design (FSD)
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-forecast-app
```

2. Install dependencies:
```bash
npm install
```

3. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. Replace the demo API key in `src/shared/api/weather.js`:
```javascript
const API_KEY = 'your_actual_api_key_here';
```

5. Start the development server:
```bash
npm run dev
```

## 🏗️ Architecture

This project follows the Feature-Sliced Design (FSD) architecture pattern:

```
src/
├── app/           # App-level setup, providers, routing
├── pages/         # Application pages (Home, Forecast, Settings)
├── widgets/       # UI compositions (WeatherCard, Navigation)
├── features/      # User scenarios (SearchWeather, ThemeToggle)
├── entities/      # Business entities (Weather data types)
└── shared/        # Reusable utilities, UI components, API
```

## 📱 Pages

1. **Home Page**: Current weather with location detection and city search
2. **Forecast Page**: 5-day weather forecast with animated cards
3. **Settings Page**: Theme toggle and default city configuration

## ⚡ Key Features

### Automatic Location Detection
- Uses browser's Geolocation API
- Fallback to default city if permission denied
- Smooth error handling with user-friendly messages

### Weather Data
- Current temperature, humidity, wind speed, pressure
- Weather conditions with animated icons
- Sunrise/sunset times
- Feels-like temperature

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Accessible navigation

### Performance
- Data caching with TanStack Query
- Optimized API calls with stale-while-revalidate strategy
- Lazy loading and code splitting
- Smooth animations without performance impact

## 🎨 Design System

- **Primary Color**: #0EA5E9 (Sky Blue)
- **Typography**: System fonts with proper line heights
- **Spacing**: 8px grid system
- **Animation**: Consistent easing and timing
- **Accessibility**: WCAG 2.1 AA compliant

## 🧪 Testing

Run tests with:
```bash
npm run test
```

Tests include:
- Component rendering and behavior
- Utility function correctness
- Weather data formatting
- User interaction scenarios

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint

## 🌐 API Integration

The app uses the OpenWeatherMap API for weather data:
- Current weather endpoint
- 5-day forecast endpoint
- Geolocation-based queries
- City name searches

## 📋 Requirements Implemented

✅ **Technical Stack**
- ReactJS with JavaScript
- TanStack React Query for data fetching
- Framer Motion for animations
- Tailwind CSS for styling
- Feature-Sliced Design architecture

✅ **Functional Requirements**
- Automatic location detection
- City search functionality
- 5-day weather forecast
- Light/Dark mode toggle
- Default city settings
- Loading and error states
- Fully responsive design

✅ **Code Quality**
- DRY principles followed
- Clean, maintainable code
- Accessibility features
- Unit and component tests

## 🚀 Deployment

The app is ready for deployment on platforms like:
- Netlify
- Vercel
- GitHub Pages

Build the project:
```bash
npm run build
```

The `dist` folder contains the production-ready files.

## 🔮 Future Enhancements

- Hourly forecast view
- Weather maps integration
- Push notifications
- Historical weather data
- Multiple location management
- Weather alerts and warnings

## 📄 License

This project is open source and available under the MIT License.