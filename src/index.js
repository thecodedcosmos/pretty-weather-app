function formatDate(date) {
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
function getTemp(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function searchCity(city) {
  let apiKey = "caa883a4a60d93878755b08a933f74ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}
function submitButton(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "caa883a4a60d93878755b08a933f74ea";
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
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

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

searchCity("Atlanta,Ga");

function showIcon() {
  if (weatherDescription === "Clear" && hours >= 19) {
    return `images/nightclear.png`;
  } else {
    if (weatherDescription === "Clear" && hours <= 06) {
      return `images/nightclear.png`;
    } else {
      if (weatherDescription === "Clear" && hours > 06) {
        return `images/dayclear.png`;
      }
    }
  }
}
if (weatherDescription === "Breezy" && hours >= 19) {
    return `images/breezynight.png`;
  } else {
    if (weatherDescription === "Breezy" && hours <= 06) {
      return `images/breezynight.png`;
    } else {
      if (weatherDescription === "Breezy" && hours > 06) {
        return `images/breezyday.png`;
      }
    }
  }
  if (weatherDescription === "Foggy" && hours >= 19) {
    return `images/foggynight.png`;
  } else {
    if (weatherDescription === "Foggy" && hours <= 06) {
      return `images/foggynight.png`;
    } else {
      if (weatherDescription === "Foggy" && hours > 06) {
        return `images/foggyday.png`;
      }
    }
  }
  if (weatherDescription === "Misty" && hours >= 19) {
    return `images/mistynight.png`;
  } else {
    if (weatherDescription === "Misty" && hours <= 06) {
      return `images/mistynight.png`;
    } else {
      if (weatherDescription === "Misty" && hours > 06) {
        return `images/mistyday.png`;
      }
    }
  }
  if (weatherDescription === "Cloudy" && hours >= 19) {
    return `images/nightcloudy.png`;
  } else {
    if (weatherDescription === "Cloudy" && hours <= 06) {
      return `images/nightcloudy.png`;
    } else {
      if (weatherDescription === "Cloudy" && hours > 06) {
        return `images/cloudy.png`;
      }
    }
  }
  if (weatherDescription === "Showery" && hours >= 19) {
    return `images/showerynight.png`;
  } else {
    if (weatherDescription === "Showery" && hours <= 06) {
      return `images/showerynight.png`;
    } else {
      if (weatherDescription === "Showery" && hours > 06) {
        return `images/showerrain.png`;
      }
    }
  }
  if (weatherDescription === "Snowy" && hours >= 19) {
    return `images/snownight.png`;
  } else {
    if (weatherDescription === "Snowy" && hours <= 06) {
      return `images/snownight.png`;
    } else {
      if (weatherDescription === "Snowy" && hours > 06) {
        return `images/daysnow.png`;
      }
    }
  }
  if (weatherDescription === "Stormy" && hours >= 19) {
    return `images/stormynight.png`;
  } else {
    if (weatherDescription === "Stormy" && hours <= 06) {
      return `images/stormynight.png`;
    } else {
      if (weatherDescription === "Stormy" && hours > 06) {
        return `images/stormyday.png`;
      }
    }
  }
  if (weatherDescription === "Sunny" && hours >= 19) {
    return `images/sunnynight.png`;
  } else {
    if (weatherDescription === "Sunny" && hours <= 06) {
      return `images/sunnynight.png`;
    } else {
      if (weatherDescription === "Sunny" && hours > 06) {
        return `images/sunny.png`;
      }
    }
  }
  let weatherDescription = null;