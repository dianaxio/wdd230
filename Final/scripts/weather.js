// location and api and url constants
const lat = 33.160569432208895;
const lon = -117.34967162017418;
const apikey = "9880917462831086d4f7d0427eebff95";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;

// Loads weather data from location above using the api key and OpenWeatherMap api.
async function loadWeatherData () {

    const response = await fetch(weatherUrl);

    if (response.ok) {
        const weatherData = await response.json();
    
        // current temp
        const currentTemp = Math.round(weatherData.main.temp * 10) / 10;
        document.getElementById('temperature').innerText = String(currentTemp);

        // wind speed
        const currentWindSpeed = Math.round(weatherData.wind.speed * 10) / 10 ;
        document.getElementById('wind_speed').innerText = String(currentWindSpeed);

        // description
        const currentDescription = weatherData.weather[0].description;
        document.getElementById('forecast').innerText = String(currentDescription);

        // description
        const currentHumidity = weatherData.main.humidity;
        document.getElementById('humidity').innerText = String(currentHumidity);


        // wind chill
        let currentWindChill = "";
        if (currentTemp <= 50 & currentWindSpeed > 3) {
            currentWindChill = Math.round(35.74 + (0.6215 * currentTemp ) - 
                            (35.75 * (currentWindSpeed ** 0.16)) + 
                            (0.4275 * currentTemp * (currentWindSpeed ** 0.16) )).toString() + "°F";
        }
        else {
            currentWindChill = "N/A";
        }
                           
        document.getElementById('wind_chill').innerText = String(currentWindChill);

        // icon
        const iconId = weatherData.weather[0].icon;
        const docIcon = document.getElementById('weather_icon')
        const iconUrl = `https://openweathermap.org/img/wn/${iconId}@4x.png`;
        docIcon.src = iconUrl;
        docIcon.loading = "lazy";
        document.getElementById('weather_icon').alt = weatherData.weather[0].description;
        
    }

}

async function loadForecastData () {

    const response = await fetch(forecastUrl);
    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    if (response.ok) {
        const forecastData = await response.json();
        let dayCounter = 1;
        let currentDay = "day" + String(dayCounter) + "-";
        for(i=0;i<24;i++) {

            dataPoint = forecastData.list[i]
            if (dataPoint.dt_txt.slice(-8) == "18:00:00" ) {
                let forecastDate = new Date(dataPoint.dt*1000);
                let weekDay = weekdays[forecastDate.getDay()];
                let forecastTemp = Math.round(dataPoint.main.temp);
                let forecastDescription = dataPoint.weather[0].description;
                let forecastIcon = dataPoint.weather[0].icon;
                
                document.getElementById(currentDay + "name").innerText = weekDay;
                document.getElementById(currentDay + "temp").innerText = forecastTemp;
                document.getElementById(currentDay + "description").innerText = forecastDescription;
                let iconUrl = `https://openweathermap.org/img/wn/${forecastIcon}@4x.png`;
                document.getElementById(currentDay + "icon").src = iconUrl;
                document.getElementById(currentDay + "icon").alt = forecastDescription;
                dayCounter++;
                currentDay = "day" + String(dayCounter) + "-";
                
            }
        }
    }

}


loadWeatherData()
loadForecastData()