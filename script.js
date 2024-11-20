const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');

// Helper function to set weather icon based on condition
function setWeatherIcon(condition) {
  if (condition.includes('rain')) return 'fas fa-cloud-showers-heavy';
  if (condition.includes('snow')) return 'fas fa-snowflake';
  if (condition.includes('clear')) return 'fas fa-sun';
  if (condition.includes('cloud')) return 'fas fa-cloud';
  if (condition.includes('storm')) return 'fas fa-bolt';
  return 'fas fa-smog';
}

// Fetch weather data using wttr.in API
function fetchWeather() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const apiUrl = `https://wttr.in/${latitude},${longitude}?format=%C|%t`;

      fetch(apiUrl)
        .then((response) => response.text())
        .then((data) => {
          const [condition, temp] = data.split('|');
          weatherIcon.innerHTML = `<i class="${setWeatherIcon(condition.toLowerCase())}"></i>`;
          temperature.textContent = temp.trim();
          conditions.textContent = condition.trim();
        })
        .catch((error) => {
          temperature.textContent = 'Error';
          conditions.textContent = 'Unable to fetch weather';
          console.error(error);
        });
    },
    (error) => {
      temperature.textContent = 'Error';
      conditions.textContent = 'Location not shared';
      console.error(error);
    }
  );
}

// Fetch weather on load
fetchWeather();
