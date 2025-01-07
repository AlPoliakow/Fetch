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
     const sunriseWindow = forecastTomorrow.hour[(sunriseTimeCheck + 1)];
     console.log(sunriseWindow);
     const sunriseWindowCloud = sunriseWindow.cloud;
     console.log(sunriseWindowCloud);
     //display information
    const sunriseMessage = document.createElement("p");
    activitiesInfo.appendChild(sunriseMessage);
        sunriseMessage.innerText = `Sunrise is at ${sunriseTomorrow} tomorrow and it will be ${sunriseCloud}-${sunriseWindowCloud}% cloudy`;
};


