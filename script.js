const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');
const fallback = document.getElementById('fallback');
const zipCodeInput = document.getElementById('zip-code');
const fetchWeatherButton = document.getElementById('fetch-weather');

// Helper function to set weather icon based on condition
function setWeatherIcon(condition) {
  if (condition.includes('rain')) return 'fas fa-cloud-showers-heavy';
  if (condition.includes('snow')) return 'fas fa-snowflake';
  if (condition.includes('clear')) return 'fas fa-sun';
  if (condition.includes('cloud')) return 'fas fa-cloud';
  if (condition.includes('storm')) return 'fas fa-bolt';
  return 'fas fa-smog';
}

// Fetch weather data from wttr.in
function fetchWeather(apiUrl) {
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
}

// Try geolocation first, fallback to ZIP code
function getWeather() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const apiUrl = `https://wttr.in/${latitude},${longitude}?format=%C|%t`;
      fetchWeather(apiUrl);
    },
    (error) => {
      fallback.style.display = 'block';
      console.error(error);
    }
  );
}

// Handle ZIP code fallback
fetchWeatherButton.addEventListener('click', () => {
  const zipCode = zipCodeInput.value.trim();
  if (zipCode.length === 5 && !isNaN(zipCode)) {
    const apiUrl = `https://wttr.in/${zipCode}?format=%C|%t`;
    fetchWeather(apiUrl);
    fallback.style.display = 'none';
  } else {
    alert('Please enter a valid ZIP code.');
  }
});

// Load weather on startup
getWeather();
