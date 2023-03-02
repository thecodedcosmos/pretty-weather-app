function formatDate(timestamp) {
  let date = new Date (timestamp);
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
    "Saturday"
  ];
  let currentDay = days[date.getDay()];
  return `${currentDay} ${currentHours}:${currentMinutes}`;
}

function displayForecast(response) {
console.log(response.data.daily);
}
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  days.forEach(function(day) {
forecastHTML = forecastHTML + 
  `<div class="col-2">
          <img 
          src="images/02d.png" 
          alt="Image description" 
          width="75" 
          />
          <br />
          <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-temperatures">  
          <strong class="high">92°</strong><strong class="low"> 64°</strong>
           </div>
          </div>
      `;
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "53a4b2b1392fe8f20220772417c83c7f";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
   axios.get(apiUrl).then(displayForecast);
}

function getTemp(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `./images/${response.data.weather[0].icon}.png`);
  
  let feelsLike = document.querySelector("#feelsLike-value");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  
  let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.dt * 1000);
 
celsiusTemperature  = response.data.main.temp;

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