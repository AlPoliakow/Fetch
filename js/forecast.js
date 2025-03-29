// select stargazing message div
const starGazeMessage = document.querySelector(".star");
// select  forecastInfo div
const forecastMessage = document.querySelector("#forecastInfo");

//get forecast data
const getForecast = async function () {
    const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=935da16f3bf140a4872111650250201&q=Mallacoota&days=5&aqi=no&alerts=no`);
    const forecastData = await request.json();
    console.log(forecastData);
    //console.log(forecastData.forecast.forecastday[1]); // gives tomorrow's forecast
    //call display daily forecast data
    displayForecast(forecastData);
    //call display sunrise data
    sunriseTomorrow(forecastData);
   
};

// call forecast data function
getForecast();

//display daily forecast data
const displayForecast = function (forecastData) {
    //isolate data
    const forecastToday = forecastData.forecast.forecastday[0];
    console.log(forecastToday);
    const dailyArray = forecastToday.hour;
    console.log(dailyArray);

    // isolate time, condition description, temperature, wind, rain, cloud and uv from data for each hour
    const dailyForecastInfo = dailyArray.map(hour => ({
        index: hour.time,
        condition: hour.condition.text,
        temperature: hour.temp_c,
        wind: hour.wind_kph,
        rain: hour.precip_mm,
        cloud: hour.cloud,
        uv: hour.uv
    }));
    //console.log(dailyForecastInfo);

    // create a table displaying the daily forecast data with a row for each hour
    dailyForecastInfo.forEach((index, condition, temperature, wind, rain, cloud, uv) => {
        console.log(index);
        const row = document.createElement(`tr`);
        const table = document.querySelector(`#forecastInfo table`);
        table.appendChild(row);
        row.innerHTML = `
              <td>${index.index.substr(10)}</td> 
              <td>${index.condition}</td>
              <td>${index.temperature}</td>
              <td>${index.wind}</td>
              <td>${index.rain}</td>
              <td>${index.cloud}</td>
              <td>${index.uv}</td>`
            ; //subtr(10) removes the date and leaves the time
    });

    // display activity data in a table with a row for each hour 
    const filteredDailyForecastArray = dailyForecastInfo.slice(6, 21);
    //console.log(filteredDailyForecastArray);
    filteredDailyForecastArray.forEach((index, condition, temperature, wind, rain, cloud, uv) => {
        const activityRow = document.createElement(`tr`);
        const activityTable = document.querySelector(`#activitiesPrediction`);
        activityTable.appendChild(activityRow);
        //console.log("Registering activities function"); //registered

        //switch statement to check rain
        //console.log(index.rain); // to check what numbers need to be included in the switch statement
        switch (true) { // based on the chance of rain 
            //case: no rain
            case (0 == index.rain): 
                //console.log("Not raining");

                //switch statment to check wind
                console.log(index.wind); // to check what numbers need to be included in the switch statement
                switch (true) { // based on the chance of wind
                    //case: wind is less than 10kmph
                    case (10 >= index.wind):
                        //console.log("Not windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Perfect</td>
                        <td>Go for it</td>
                        <td>Go for it</td>
                        <td>Perfect</td>
                        </tr>`
                        break;
                    // case: wind is between 10 and 20kmph
                    case (10 <= index.wind && 20 >= index.wind):
                        //console.log("Not too windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Go for it</td>
                        <td>Go for it</td>
                        <td>Go for it</td>
                        <td>Go for it</td>
                        </tr>`
                        break;
                    // case: wind is between 20 and 30kmph
                    case (20 <= index.wind && 30 >= index.wind):
                        //console.log("Kind of windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        </tr>`
                        break;
                    // case: wind is between 30 and 40kmph
                    case (30 <= index.wind && 40 >= index.wind):
                        //console.log("Quite windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Risky</td>
                        <td>Nah</td>
                        <td>Risky</td>
                        </tr>`
                        break;
                    // case: wind is pver 40kmph
                    case (40 <= index.wind):
                        //console.log("Too windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        </tr>`
                        break;
                };
                break;
            // case: min rain
            case (0.25 >= index.rain):
                //console.log("Light rain");

                //switch statment to check wind
                console.log(index.wind); // to check what numbers need to be included
                switch (true) { // based on the chance of wind
                    //case: wind is less than 10kmph
                    case (10 >= index.wind):
                        //console.log("Not windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        </tr>`
                        break;
                    // case: wind is between 10 and 20kmph
                    case (10 <= index.wind && 20 >= index.wind):
                        //console.log("Not too windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        </tr>`
                        break;
                    // case: wind is between 20 and 30kmph
                    case (20 <= index.wind && 30 >= index.wind):
                        //console.log("Kind of windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        <td>Ok</td>
                        </tr>`
                        break;
                    // case: wind is between 30 and 40kmph
                    case (30 <= index.wind && 40 >= index.wind):
                        //console.log("Quite windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Risky</td>
                        <td>Nah</td>
                        <td>Risky</td>
                        </tr>`
                        break;
                    // case: wind is over 40kmph
                    case (40 <= index.wind):
                        //console.log("Too windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        </tr>`
                        break;
                };
                break;
            // case: light rain
            case (0.25 <= index.rain && 1 >= index.rain):
                //console.log("Mid rain");
                
                //switch statment to check wind
                switch (true) { // based on the chance of wind 
                    // case: wind is less than 10kmph
                    case (10 >= index.wind):
                        //console.log("Not windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Potential</td>
                        <td>Potential</td>
                        <td>Potential</td>
                        <td>Potential</td>
                        </tr>`
                        break;
                    // case: wind is between 10 and 20kmph
                    case (10 <= index.wind && 20 >= index.wind):
                        //console.log("Not too windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Potential</td>
                        <td>Potential</td>
                        <td>Potential</td>
                        <td>Potential</td>
                        </tr>`
                        break;
                    // case: wind is between 20 and 30kmph
                    case (20 <= index.wind && 30 >= index.wind):
                        //console.log("Kind of windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Potential</td>
                        <td>Potential</td>
                        <td>Potential</td>
                        </tr>`
                        break;
                    // case: wind is between 30 and 40kmph
                    case (30 <= index.wind && 40 >= index.wind):
                        //console.log("Quite windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Risky</td>
                        <td>Nah</td>
                        <td>Risky</td>
                        </tr>`
                        break;
                    // case: wind is over 40kmph
                    case (40 <= index.wind):
                        //console.log("Too windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        </tr>`
                        break;
                };
                break;
            // case: raining
            case (1 <= index.rain):
                //console.log("Rain");
                
                //switch statment to check wind
                switch (true) { // based on the chance of wind
                    // case: wind is less than 10kmph
                    case (10 >= index.wind):
                        //console.log("Not windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Risky</td>
                        <td>Risky</td>
                        <td>Risky</td>
                        <td>Risky</td>
                        </tr>`
                        break;
                    // case: wind is between 10 and 20kmph
                    case (10 <= index.wind && 20 >= index.wind):
                        //console.log("Not too windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Risky</td>
                        <td>Risky</td>
                        <td>Risky</td>
                        <td>Risky</td>
                        </tr>`
                        break;
                    // case: wind is between 20 and 30kmph
                    case (20 <= index.wind && 30 >= index.wind):
                        console.log("Kind of windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Risky</td>
                        <td>Risky</td>
                        <td>Risky</td>
                        </tr>`
                        break;
                    // case: wind is between 30 and 40kmph
                    case (30 <= index.wind && 40 >= index.wind):
                        //console.log("Quite windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Risky</td>
                        <td>Risky</td>
                        <td>Unsafe</td>
                        </tr>`
                        break;
                    // case: wind is over 40kmph
                    case (40 <= index.wind):
                        console.log("Too windy");
                        activityRow.innerHTML = `
                        <tr>
                        <td>${index.index.substr(10)}</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        <td>Unsafe</td>
                        </tr>`
                        break;
                };
                break;
        };
    });

    //fetch tonight's cloud cover and display data
    const cloudTonight = function () {
        //isolate data
        const starTable = document.createElement('table');
        const star = document.querySelector(".star");
        star.appendChild(starTable);
        starTable.classList.add("starTable");
        // create array for 9-11pm
        const starTableHeading = document.createElement('tr');
        starTable.appendChild(starTableHeading);
        starTableHeading.innerHTML = `
            <th>Time</th>
            <th>Cloud</th>
            <th>Rain</th>
            <th>Prediction</th>`;
        const starForecastArray = dailyForecastInfo.slice(21);
        console.log(starForecastArray);

        // display activity data in a table based on time 
        starForecastArray.forEach((index) => {
            console.log(index);
            const starRow = document.createElement(`tr`);
            starTable.appendChild(starRow);

            // switch statement to check rain
            console.log(index.rain); // to check what numbers need to be included
            switch (true) { // based on the chance of rain 
                case (0 == index.rain):
                    console.log("Not raining tonight");

                    //switch statment to check cloud
                    console.log(index.cloud); // to check what numbers need to be included
                    switch (true) { // based on the chance of cloud 
                        case (40 >= index.cloud):
                            console.log("Not windy");
                            starRow.innerHTML = `
                            <td>${index.index.substr(10)}</td> 
                            <td>${index.cloud}%</td>
                            <td>${index.rain}mm</td>
                            <td>Perfect</td>`
                                ; //subtr(10) removes the date and leaves the time
                            break;
                        case (40 <= index.cloud):
                            console.log("Not windy");
                            starRow.innerHTML = `
                            <td>${index.index.substr(10)}</td> 
                            <td>${index.cloud}%</td>
                            <td>${index.rain}mm</td>
                            <td>Too cloudy</td>`
                                ; //subtr(10) removes the date and leaves the time
                            break;
                    };
                    break;

                //case: min rain
                case (0.5 >= index.rain):
                    console.log("Might raining tonight");

                    //switch statment to check cloud
                    console.log(index.cloud); // to check what numbers need to be included
                    switch (true) { // based on the chance of cloud
                        case (40 >= index.cloud):
                            console.log("Not windy");
                            starRow.innerHTML = `
                            <td>${index.index.substr(10)}</td> 
                            <td>${index.cloud}%</td>
                            <td>${index.rain}mm</td>
                            <td>Might drizzle</td>`
                                ; //subtr(10) removes the date and leaves the time
                            break;
                        case (40 <= index.cloud):
                            console.log("Not windy");
                            starRow.innerHTML = `
                            <td>${index.index.substr(10)}</td> 
                            <td>${index.cloud}%</td>
                            <td>${index.rain}mm</td>
                            <td>Too cloudy</td>`
                                ; //subtr(10) removes the date and leaves the time
                            break;
                    };
                    break;

                //case: mod rain
                case (0.5 <= index.rain && 1 >= index.rain):
                    //switch statment to check cloud
                    console.log(index.cloud); // to check what numbers need to be included
                    switch (true) { // based on the chance of cloud
                        case (40 >= index.cloud):
                            starRow.innerHTML = `
                            <td>${index.index.substr(10)}</td> 
                            <td>${index.cloud}%</td>
                            <td>${index.rain}mm</td>
                            <td>Showers</td>`
                                ; //subtr(10) removes the date and leaves the time
                            break;
                        case (40 <= index.cloud):
                            starRow.innerHTML = `
                            <td>${index.index.substr(10)}</td> 
                            <td>${index.cloud}%</td>
                            <td>${index.rain}mm</td>
                            <td>Too cloudy</td>`
                                ; //subtr(10) removes the date and leaves the time
                            break;
                    };
                    break;

                //case: rain
                case (1 >= index.rain):
                    //switch statment to check cloud
                    console.log(index.cloud); // to check what numbers need to be included
                    starRow.innerHTML = `
                            <td>${index.index.substr(10)}</td> 
                            <td>${index.cloud}%</td>
                            <td>${index.rain}mm</td>
                            <td>Showers/rain</td>`
                        ; //subtr(10) removes the date and leaves the time
                    break;
            };

        });
    };

    cloudTonight();
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

    // switch statement to list lowest value first
    switch(true){
        case (sunriseCloud < sunriseWindowCloud):
            sunriseMessage.innerText = `Sunrise is at ${sunriseTomorrow} tomorrow and it will be ${sunriseCloud}-${sunriseWindowCloud}% cloudy`;
            break;
        case (sunriseCloud > sunriseWindowCloud):
            sunriseMessage.innerText = `Sunrise is at ${sunriseTomorrow} tomorrow and it will be ${sunriseWindowCloud}-${sunriseCloud}% cloudy`;
            break;
        case (sunriseCloud == sunriseWindowCloud):
            sunriseMessage.innerText = `Sunrise is at ${sunriseTomorrow} tomorrow and it will be ${sunriseCloud}% cloudy`;
            break;
    }
};

