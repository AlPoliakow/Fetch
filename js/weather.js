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
    if (windSpeed <= 21) {
        console.log("Paddle Board");
        const paddleMessage = document.createElement("p");
        paddleMessage.innerText = "It's paddle boarding weather!";
        weatherInfo.appendChild(paddleMessage);
    }
}

