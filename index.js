
const apikey = "68aa0195b79696f58086961a6a1ca8f3";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=1641338a8c4649ef865152949252704&q=${cityValue}&aqi=no`,
        {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          cache: 'no-store'
        }
      );
      

    console.log("response: ", response)

    

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const temperature = Math.round(data.current.temp_c);

    const description = data.current.condition.text;

    // const icon = data.weather[0].icon;

    // const details = [
    //   `Feels like: ${Math.round(data.main.feels_like)}`,
    //   `Humidity: ${data.main.humidity}%`,
    //   `Wind speed: ${data.wind.speed} m/s`,
    // ];

    // weatherDataEl.querySelector(
    //   ".icon"
    // ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;

    // weatherDataEl.querySelector(".details").innerHTML = details
    //   .map((detail) => `<div>${detail}</div>`)
    //   .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}