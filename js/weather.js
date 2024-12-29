//function to fetch weather data
const getWeatherData = async function () {
    const request = await fetch(`https://goweather.herokuapp.com/weather/{Melbourne}`);
    const data = await request.json();
    console.log(data);
    console.log(data.temperature);
    displayWeatherData(data);
};

getWeatherData();

//display the fetched Weather data
const displayWeatherData = function (data) {
    const weatherInfo = document.querySelector("#weatherInfo");
    weatherInfo.innerHTML = `<p>${data.description}</p>
    <p>${data.temperature}</p>
    <p>Wind: ${data.wind}</p>`;
};