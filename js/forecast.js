//get forecast
const getForecast = async function () {
    const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=935da16f3bf140a4872111650250201&q=Mallacoota&days=5&aqi=no&alerts=no`);
    const forecastData = await request.json();
    console.log(forecastData);
    //console.log(forecastData.forecast.forecastday[1]);// gives tomorrow's forecast
    sunriseTomorrow(forecastData);
    cloudTonight(forecastData);
    rainToday(forecastData);
    checkBoardWind(forecastData);
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
    const sunriseMessage = document.querySelector(".sunrise");
    sunriseMessage.innerText = `Sunrise is at ${sunriseTomorrow} tomorrow and it will be ${sunriseCloud}-${sunriseWindowCloud}% cloudy`;
};



//get tonights cloud cover for star gaxing and display information
const cloudTonight = function (forecastData) {
    //isolate data
    const forecastToday = forecastData.forecast.forecastday[0];
    console.log(forecastToday);
    const earlyStar = forecastToday.hour[21];
    console.log(earlyStar);
    const midStar = forecastToday.hour[22];
    console.log(midStar);
    const lateStar = forecastToday.hour[23];
    console.log(lateStar);
    const earlyStarCloud = earlyStar.cloud;
    const midStarCloud = midStar.cloud;
    const lateStarCloud = lateStar.cloud;
    console.log(earlyStarCloud, midStarCloud, lateStarCloud);
    // create section for stargazing message
    const starGazeMessage = document.querySelector(".star");
    // change data into numbers
    earlyNumber = parseInt(earlyStarCloud);
    midNumber = parseInt(midStarCloud);
    lateNumber = parseInt(lateStarCloud);
    //create 9pm message
    const nineMessage = document.createElement("p");
    starGazeMessage.appendChild(nineMessage);
     //create 10pm message
     const tenMessage = document.createElement("p");
     starGazeMessage.appendChild(tenMessage);
     //create 11pm message
     const elevenMessage = document.createElement("p");
     starGazeMessage.appendChild(elevenMessage);
      
    if (earlyNumber <= 10) {
        nineMessage.innerHTML = "<span>9pm:</span> It should be perfect for stargazing";
    } else if (earlyNumber >= 10 && earlyNumber <= 30) {
        nineMessage.innerHTML = "<span>9pm:</span> It might be alright to stargaze"
    } else {
        nineMessage.innerHTML = "<span>9pm:</span> Not ideal conditions for stargazing"
    }
    if (midNumber <= 10) {
        tenMessage.innerHTML = "<span>10pm:</span> It should be perfect for stargazing";
    } else if (midNumber >= 10 && midNumber <= 30) {
        tenMessage.innerHTML = "<span>10pm:</span> It might be alright to stargaze"
    } else {
        tenMessage.innerHTML = "<span>10pm:</span> Not ideal conditions for stargazing"
    }
    if (lateNumber <= 10) {
        elevenMessage.innerHTML = "<span>11pm:</span> It should be perfect for stargazing";
    } else if (lateNumber >= 10 && lateNumber <= 30) {
        elevenMessage.innerHTML = "<span>11pm:</span> It might be alright to stargaze"
    } else {
        elevenMessage.innerHTML = "<span>11pm:</span> Not ideal conditions for stargazing"
    }
};

//check rain and display information
const rainToday = function (forecastData) {
    //isolate data
    const rainForecastToday = forecastData.forecast.forecastday[0];
    console.log(rainForecastToday);
    console.log(rainForecastToday.hour[6], rainForecastToday.hour[7], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6], rainForecastToday.hour[6]);
};

//check wind and notify if paddle boarding is safe
const checkBoardWind = function (forecastData){
    boardForecastToday = forecastData.forecast.forecastday[0];
    console.log(boardForecastToday);
     const seven = boardForecastToday.hour[7];
     const eight = boardForecastToday.hour[8];
     const nine = boardForecastToday.hour[9];
     const ten = boardForecastToday.hour[10];
     const eleven = boardForecastToday.hour[11];
     const twelve = boardForecastToday.hour[12];
     const thirteen = boardForecastToday.hour[13];
     const fourteen = boardForecastToday.hour[14];
     const fifteen = boardForecastToday.hour[15];
     const sixteen = boardForecastToday.hour[16];
     const seventeen = boardForecastToday.hour[17];
     const eighteen = boardForecastToday.hour[18];
     const nineteen = boardForecastToday.hour[19];
     const twenty = boardForecastToday.hour[20];
    console.log(seven.wind_kph);
    const paddleMessage = document.querySelector(".paddle");
    if (seven.wind_kph <= 20) {
        console.log("Paddle Board");
        paddleMessage.innerText = "It's was paddle boarding weather at 7am!";
    } else {
        console.log("Too Windy");
        paddleMessage.innerText = "It was too windy to paddle board at 7am!";
    }
};







