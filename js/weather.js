const weatherInfo = document.querySelector("#weatherInfo");
const activitiesInfo = document.querySelector("#activitiesInfo");

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

//check wind and notify if paddle boarding is safe
const checkWind = function (data){
    const windSpeed= parseInt(data.current.wind_kph);
    console.log(windSpeed);
    const paddleMessage = document.createElement("p");
    activitiesInfo.appendChild(paddleMessage);
    if (windSpeed <= 20) {
        console.log("Paddle Board");
        paddleMessage.innerText = "It's paddle boarding weather right now!";
    } else {
        console.log("Too Windy");
        paddleMessage.innerText = "It's too windy to paddle board!";
    }
};

//display the fetched Weather data
const displayWeatherData = function (data) {
    weatherInfo.innerHTML = `<p>${data.current.condition.text}</p>
    <p>${data.current.temp_c} degrees</p>
    <p>Wind: ${data.current.wind_kph} kmph</p>`;
};

//get forecast
const getForecast = async function () {
    const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=935da16f3bf140a4872111650250201&q=Mallacoota&days=5&aqi=no&alerts=no`);
    const forecastData = await request.json();
    console.log(forecastData);
    //console.log(forecastData.forecast.forecastday[1]);// gives tomorrow's forecast
    sunriseTomorrow(forecastData);
};

getForecast();

//get tomorrow's sunrise time and display information
const sunriseTomorrow = function (forecastData) {
    //isolate data
    const forecastTomorrow = forecastData.forecast.forecastday[1];
    console.log(forecastTomorrow);
    const sunriseTomorrow = forecastTomorrow.astro.sunrise;
    console.log(sunriseTomorrow);
    //check cloud at sunrise
    const sunriseTimeCheck = parseInt(sunriseTomorrow);
    console.log(sunriseTimeCheck);
     const confirmedSunriseTime = forecastTomorrow.hour[sunriseTimeCheck];
     console.log(confirmedSunriseTime);
     const sunriseCloud = confirmedSunriseTime.cloud;
     console.log(sunriseCloud);
     //display information
    const sunriseMessage = document.createElement("p");
    activitiesInfo.appendChild(sunriseMessage);
        sunriseMessage.innerText = `Sunrise is at ${sunriseTomorrow} tomorrow and it will be ${sunriseCloud}% cloudy`;

};


