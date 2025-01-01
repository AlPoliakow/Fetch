//function to fetch weather data
const getWeatherData = async function () {
    const request = await fetch(`https://goweather.herokuapp.com/weather/{Melbourne}`);
    const data = await request.json();
    console.log(data);
    console.log(data.temperature);
    displayWeatherData(data);
    checkWind(data);
};

getWeatherData();

//display the fetched Weather data
const displayWeatherData = function (data) {
    const weatherInfo = document.querySelector("#weatherInfo");
    weatherInfo.innerHTML = `<p>${data.description}</p>
    <p>${data.temperature}</p>
    <p>Wind: ${data.wind}</p>`;
};

const checkWind = function (data){
    console.log(data.wind);
    const windSpeed= parseInt(data.wind);
    console.log(windSpeed);
    const paddleMessage = document.createElement("p");
    weatherInfo.appendChild(paddleMessage);
    if (windSpeed <= 20) {
        console.log("Paddle Board");
        paddleMessage.innerText = "It's paddle boarding weather!";
    } else {
        console.log("Too Windy");
        paddleMessage.innerText = "It's too windy to paddle board!";
    }
}

