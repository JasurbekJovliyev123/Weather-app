import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeatherCard } from '../../../widgets/WeatherCard';

const mockWeatherData = {
  id: 1,
  name: 'London',
  main: {
    temp: 20,
    feels_like: 18,
    temp_min: 15,
    temp_max: 25,
    pressure: 1013,
    humidity: 65,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  wind: {
    speed: 3.5,
    deg: 180,
  },
  clouds: {
    all: 10,
  },
  dt: 1634567890,
  sys: {
    country: 'GB',
    sunrise: 1634567000,
    sunset: 1634610000,
  },
};

describe('WeatherCard', () => {
  it('renders weather information correctly', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('London, GB')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    expect(screen.getByText('18°C')).toBeInTheDocument(); 
    expect(screen.getByText('65%')).toBeInTheDocument(); 
  });

  it('displays weather icon with correct alt text', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    const weatherIcon = screen.getByAltText('clear sky');
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute('src', expect.stringContaining('01d@2x.png'));
  });
});