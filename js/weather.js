//function to fetch weather data
const getWeatherData = async function () {
    const request = await fetch(`http://api.weatherapi.com/v1/current.json?key=935da16f3bf140a4872111650250201&q=Mallacoota&aqi=no`);
    const data = await request.json();
    console.log(data);
    console.log(data.current.temp_c);
    displayWeatherData(data);
    checkWind(data);
};

getWeatherData();

//get forecast
const getForecast = async function () {
    const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=935da16f3bf140a4872111650250201&q=Mallacoota&days=5&aqi=no&alerts=no`);
    const data = await request.json();
    console.log(data);
    //displayWeatherData(data);
    //checkWind(data);
};

getForecast();

//display the fetched Weather data
const displayWeatherData = function (data) {
    const weatherInfo = document.querySelector("#weatherInfo");
    weatherInfo.innerHTML = `<p>${data.current.condition.text}</p>
    <p>${data.current.temp_c} degrees</p>
    <p>Wind: ${data.current.wind_kph} kmph</p>`;
};

const checkWind = function (data){
    console.log(data.wind);
    const windSpeed= parseInt(data.current.wind_kph);
    console.log(windSpeed);
    const paddleMessage = document.createElement("p");
    const activitiesInfo = document.querySelector("#activitiesInfo");
    activitiesInfo.appendChild(paddleMessage);
    if (windSpeed <= 20) {
        console.log("Paddle Board");
        paddleMessage.innerText = "It's paddle boarding weather!";
    } else {
        console.log("Too Windy");
        paddleMessage.innerText = "It's too windy to paddle board!";
    }
}

