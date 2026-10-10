const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiURL);

  console.log(response);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const displayCity = document.createElement("h1");
  const displayTemp = document.createElement("p");
  const displayHumidity = document.createElement("p");
  const displayDescription = document.createElement("p");

  displayCity.textContent = city;
  displayTemp.textContent = `${((temp - 273.15)* (9/5) + 32).toFixed(1)}°F`;
  displayHumidity.textContent = `Humidity: ${humidity}`;
  displayDescription.textContent = `${description}`;

  displayCity.classList.add("city");
  displayTemp.classList.add("temp");
  displayHumidity.classList.add("humidity");
  displayDescription.classList.add("description");

  card.appendChild(displayCity); 
  card.appendChild(displayTemp);
  card.appendChild(displayHumidity);
  card.appendChild(displayDescription);


}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error");

  card.textContent = "";
  card.style.display = "flex";

  card.appendChild(errorDisplay);
}
