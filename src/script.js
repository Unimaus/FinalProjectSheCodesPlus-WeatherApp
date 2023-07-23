// API Key

let apiKey = "f6314bt59a4db7709bf2fa9bob1f9379";

// Time Date Definitions

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// City Input Function - Adjusting Entries for Temperature, Humidity, WindSpeed, Weather Condition, Icon

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let weatherCondition = document.querySelector("#weather-condition");

  celciusTemperature = response.data.temperature.current;

  temperature.innerHTML = Math.round(response.data.temperature.current);
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  weatherCondition.innerHTML = response.data.condition.description;
}

function callApi(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityChanged = document.querySelector("#city");
  cityInput = `${cityInput.value}`;
  cityChanged.innerHTML = `${cityInput}`;

  callApi(cityInput);
}

// Functions - Temperature Conversion

function convertToFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

// Time Date Script

let now = new Date();

let date = document.querySelector("#date");
let day = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();
let weekDay = weekDays[now.getDay()];
date.innerHTML = `${weekDay}: ${day}.${month} ${year}`;

let time = document.querySelector("#time");
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  let minutesstring = `0${minutes}`;
  time.innerHTML = `${hour}:${minutesstring}`;
} else {
  time.innerHTML = `${hour}:${minutes}`;
}

function showCurrentPosition(response) {
  let currentCity = document.querySelector("#city");
  let currentTemperature = document.querySelector("#temperature");
  let currentWeatherCondition = document.querySelector("#weather-condition");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let currentIconElement = document.querySelector("#icon");

  currentCity.innerHTML = response.data.city;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  currentWeatherCondition.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  currentIconElement.setAttribute("src", `${response.data.condition.icon_url}`);
}

function getLatLon(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;

  let urlLatLon = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(urlLatLon).then(showCurrentPosition);
}

// Default place and weather conditions

navigator.geolocation.getCurrentPosition(getLatLon);

// Search City - Enter Temperature, Humidity, WindSpeed, Weather Condition, Icon

let celciusTemperature = null;

let cityInput = document.querySelector("#form");
cityInput.addEventListener("submit", enterCity);

// Temperature conversion (Celcius / Fahrenheit)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);
