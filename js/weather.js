const weatherInfo = document.querySelector("#weatherInfo");
const activitiesInfo = document.querySelector("#activitiesInfo");

//fetch the weather data
const getWeatherData = async function () {
    const request = await fetch(`http://api.weatherapi.com/v1/current.json?key=935da16f3bf140a4872111650250201&q=Mallacoota&aqi=no`);
    const data = await request.json();
    console.log(data);
    console.log(data.current.temp_c);
    displayWeatherData(data);
};

getWeatherData();

//display the fetched weather data
const displayWeatherData = function (data) {
    weatherInfo.innerHTML = `<p><span>Currently:</span> ${data.current.condition.text}</p>
    <p><span>Temperature:</span> ${data.current.temp_c} °C</p>
    <p><span>Wind:</span> ${data.current.wind_kph} kmph</p>
    <p><span>Rain:</span> ${data.current.precip_mm}mm</p>
    <p><span>Cloud cover:</span> ${data.current.cloud}%</p>`;
};

