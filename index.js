//Retrieving the current date and time
function formatDate(date) {
  let currentDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    //this ensures that if it's 9am in the morning, it will show as `09`//
    hours = `0${hours}`;
  }
  let mins = date.getMinutes();
  if (mins < 10) {
    //this ensures that if it's 9:05am in the morning, it will show as `09:05` instead of `09:5`//
    mins = `0${mins}`;
  }
  let year = date.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()]; //returns value between 0 and 6 - 0 is Sunday
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[date.getMonth()];
  return `${day} ${hours}:${mins}`;
  // return `${day}, ${month} ${currentDate} ${year} <br /> ${hours}:${mins}`;
}
let dateElement = document.querySelector("#date-header");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//store the City name on the page after searching for it with the search engine
function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#store-city").innerHTML = response.data.name;
  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  farenheitTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "ed2d0610004cfa337a722371f4a4d4a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

//Calling weather and geolocation API for current weather

function showPosition(position) {
  // console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ed2d0610004cfa337a722371f4a4d4a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

//Change temperature if you select Farenehit
function updateFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#current-temp");
  //when you click Farenheit, this removes the active class from Celsius and gives it to Farenheit
  farenheit.classList.add("active");
  celsius.classList.remove("active");
  farenheitTemp.innerHTML = Math.round(farenheitTemperature);
}
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", updateFarenheit);

//Change temperature if you select Celsius
function updateCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  //when you click Celsius, this removes the active class from Farenheit and gives it to Celsius
  farenheit.classList.remove("active");
  celsius.classList.add("active");
  let celsiusTemp = ((farenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", updateCelsius);

//This ensures that each time you select the F&C the temperature value is reset to current temp. That way the celsius calculation won't keep working on the previous value
let farenheitTemperature = null;

//this allows for a default city and values to appear each time
searchCity("Honolulu");

//Retrieving Cities
// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   moscow: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// let city = prompt("Enter a city").toLowerCase().trim();

// if (weather[city] !== undefined) {
//   let temperature = weather[city].temp; //the weather[city] finds the value inputted for the "city" object, finds within the weather object and pulls in the info there//
//   let humidity = weather[city].humidity;
//   let celsius = Math.round(temperature);
//   let farenheit = Math.round((temperature * 9) / 5 + 32);

//   alert(
//     `It is currently ${celsius}°C (${farenheit}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }
