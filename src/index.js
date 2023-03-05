function formatDate(timestamp) {
  let date = new Date(timestamp);
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  return `${currentDay} ${currentHours}:${currentMinutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="https://assets.codepen.io/9254068/${forecastDay.weather[0].icon}.png"
          alt=""
          width="75"
          height="75"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let feelsLike = document.querySelector("#feelsLike-value");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `./images/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "53a4b2b1392fe8f20220772417c83c7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function submitButton(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
 let apiKey = "53a4b2b1392fe8f20220772417c83c7f";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(getTemp);
}

function getLocation(event) {
 event.preventDefault();
 navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
 event.preventDefault();
 let temperatureElement = document.querySelector("#temperature");
 celsiusLink.classList.add("active");
 fahrenheitLink.classList.remove("active");
 let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
 temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function convertToCelsius(event) {
 event.preventDefault();
 celsiusLink.classList.remove("active");
 fahrenheitLink.classList.add("active");
 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;


let dateElement = document.querySelector("#date");
let date = new Date();
dateElement.innerHTML = formatDate(date);


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitButton);


let currentButton = document.querySelector("#buttonB");
currentButton.addEventListener("click", getLocation);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);


searchCity("Fresno, CA");