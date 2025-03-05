// select section for stargazing message
const starGazeMessage = document.querySelector(".star");
// select section for forecast Info
const forecastMessage = document.querySelector("#forecastInfo");

//get forecast
const getForecast = async function () {
    const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=935da16f3bf140a4872111650250201&q=Mallacoota&days=5&aqi=no&alerts=no`);
    const forecastData = await request.json();
    console.log(forecastData);
    //console.log(forecastData.forecast.forecastday[1]);// gives tomorrow's forecast
    displayForecast(forecastData);
    sunriseTomorrow(forecastData);
    cloudTonight(forecastData);
    rainToday(forecastData);
    checkBoardWind(forecastData);
};

getForecast();

const displayForecast = function (forecastData) {
    //isolate data
    const forecastToday = forecastData.forecast.forecastday[0];
    console.log(forecastToday);
    const dailyArray = forecastToday.hour;
    console.log(dailyArray);


    const dailyForecastInfo = dailyArray.map(hour => ({
        index: hour.time,
        condition: hour.condition.text,
        temperature: hour.temp_c,
        wind: hour.wind_kph,
        rain: hour.chance_of_rain,
        cloud: hour.cloud,
        uv: hour.uv
    }));

    console.log(dailyForecastInfo);
    
    dailyForecastInfo.forEach((index, condition, temperature, wind, rain, cloud, uv) => {
        console.log(index);
        const row = document.createElement(`tr`);
        const table = document.querySelector(`table`);
        table.appendChild(row);
        row.innerHTML = `
              <td>${index.index}</td>
              <td>${index.condition}</td>
              <td>${index.temperature}</td>
              <td>${index.wind}</td>
              <td>${index.rain}</td>
              <td>${index.cloud}</td>
              <td>${index.uv}</td>`
            ;
    });

    // display activity data in a table based on time 
    const filteredDailyForecastArray = dailyForecastInfo.slice(6, 21);
    //console.log(filteredDailyForecastArray);
    filteredDailyForecastArray.forEach((index, condition, temperature, wind, rain, cloud, uv) => {
                const activityRow = document.createElement(`tr`);
            const activityTable = document.querySelector(`#activitiesPrediction`);
            activityTable.appendChild(activityRow);
            if (index.wind <= 20) {
                console.log(`It's safe to paddle board`);
            }
            activityRow.innerHTML = `
              <td>${index.index}</td>
              <td>Paddle function tbc</td>
              <td>Hiking function tbc</td>
              <td>Indoor function tbc</td>
              <td>Beach function tbc</td>`
                ;
    });
};


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
    const starArray = [earlyStarCloud, midStarCloud, lateStarCloud];
    console.log(starArray);

    //create cloud percent message
    const cloudMessage = document.createElement("p");
    starGazeMessage.appendChild(cloudMessage);

    cloudMessage.innerText = `There is predicted to be ${earlyStarCloud}% cloud cover at 9pm, ${midStarCloud}% at 10pm and ${lateStarCloud}% at 11pm`;

    // loop
    for (let starCloud in starArray) {
        if (starCloud <= 10) {
            console.log("It's predicted to be perfect for stargazing tonight");
        } else if (starCloud >= 10 && starCloud <= 40) {
            console.log("It's predicted to be alright for stargazing tonight");
        } else {
            console.log("It's predicted to be challenging to stargaze tonight");
        }
    }
    //if (earlyNumber <= 10) {
    //nineMessage.innerHTML = "<span>9pm:</span> It should be perfect for stargazing";
    // } else if (earlyNumber >= 10 && earlyNumber <= 30) {
    //nineMessage.innerHTML = "<span>9pm:</span> It might be alright to stargaze"
    //  } else {
    //nineMessage.innerHTML = "<span>9pm:</span> Not ideal conditions for stargazing"
    // }
};

//check rain and display information
const rainToday = function (forecastData) {
    //isolate data
    const rainForecastToday = forecastData.forecast.forecastday[0];
    console.log(rainForecastToday);
    const rainArray = rainForecastToday.hour;
    const rainMap = rainArray.map((hour) => hour.chance_of_rain);
    console.log(rainMap);
    console.log(rainMap[21], rainMap[22], rainMap[23]);
    //create star rain message
    const starRainMessage = document.createElement("p");
    starGazeMessage.appendChild(starRainMessage);
    starRainMessage.innerText = `There is a ${rainMap[21]}% chance of rain at 9pm, a ${rainMap[22]}% chance of rain at 10pm and a ${rainMap[23]}% chance of rain at 11pm`

};


//check wind and notify if paddle boarding is safe
const checkBoardWind = function (forecastData) {
    boardForecastToday = forecastData.forecast.forecastday[0];
    console.log(boardForecastToday);
    console.log(boardForecastToday.hour);
    //create an array and check each hour for wind
    const hourArray = boardForecastToday.hour;
    const hourMap = hourArray.map((hour) => hour.wind_kph);
    console.log(hourMap);
    console.log(hourMap[6]);
    const paddleMessage = document.querySelector(".paddle");
    if (hourMap[6] <= 20) {
        console.log("Paddle Board");
        paddleMessage.innerText = "It's was paddle boarding weather at 6am!";
    } else {
        console.log("Too Windy");
        paddleMessage.innerText = "It was too windy to paddle board at 6am!";
    }
};







