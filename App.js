let API_KEY = "ad24ac30b39bc37d1c6b9018cdbaa46f";

let weatherInfo = document.getElementById("weatherInfo");
let errorMessage = document.getElementById("errorMessage");
let cityInput = document.getElementById("cityInput");
let searchButton = document.getElementById("searchButton");

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
async function updateWeather() {
  const city = cityInput.value;
  if (!city) {
    displayMessage("City name can not be empty");
    return;
  }

  try {
    const weatherData = await getWeatherData(city);
    console.log(weatherData);
    if (weatherData.cod === "404") {
      displayMessage("Please enter valid city name");
      return;
    }
    weatherInfo.innerHTML = `
    <h2>${weatherData.name},${weatherData.sys.country}</h2>
    <p><b>Temperature</b>: ${weatherData.main.temp}°C</P>
    <p><b>Weather</b>: ${weatherData.weather[0].description}</p>
    <p><b>Humidity</b>: ${weatherData.main.humidity}%</p>
    <p><b>Wind</b>: ${weatherData.wind.speed}m/s</p>
    `;
    weatherInfo.classList.remove("hidden");
  } catch (error) {
    displayMessage("Server errors:something went wrong on our side");
  }
  function displayMessage(message) {
    errorMessage.textContent = message;
    weatherInfo.innerHTML = "";
  }
}

searchButton.addEventListener("click", updateWeather);
