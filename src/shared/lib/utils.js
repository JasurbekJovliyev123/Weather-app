export const formatTemperature = (temp) => {
  return `${Math.round(temp)}°C`;
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const groupForecastByDay = (forecast) => {
  const grouped = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([date, items]) => ({
      date,
      items,
      temp_min: Math.min(...items.map(item => item.main.temp_min)),
      temp_max: Math.max(...items.map(item => item.main.temp_max)),
      weather: items[0].weather[0], 
    }));
};