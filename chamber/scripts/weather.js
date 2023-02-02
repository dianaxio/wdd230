const cityName = 'Rosario, Argentina';
const unit = 'metric';
const apiKey = '3b2ef76d25ad22a05fcfd9aeead6bddb';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

// select HTML elements in the document
const section = document.querySelector('#weather');

const displayResults = (weatherData) => {
    const temperatureInCelsius = weatherData.main.temp.toFixed(0);
    const currentTemp = document.querySelector('#current-temp');
    currentTemp.innerHTML = `<strong>${temperatureInCelsius}</strong>`;
    
    const desc = weatherData.weather[0].description;
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0]?.icon}.png`;
    const windSpeedInMPS = weatherData.wind.speed;
    const windChillData = calculateWindChill(temperatureInCelsius, windSpeedInMPS);

    
    
    /** Image handling */
    const img = document.createElement('img');
    img.setAttribute('src', iconsrc);
    img.setAttribute('alt', capitalize(desc));

    /** Description handling */
    const weatherDescription = document.createElement('p');
    weatherDescription.textContent = capitalize(desc);

    const division = document.createElement('p');
    division.setAttribute('class', 'division');

    /** Wind speed handling */
    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind Speed: ${(windSpeedInMPS * 3.6).toFixed(1)} km/h`;

    /** Wind chill handling */
    const windChill = document.createElement('p');
    windChill.textContent = `Wind Chill: ${windChillData} ${windChillData != 'N/A' ? '°F' : ''}`;


    section.appendChild(img);
    section.appendChild(weatherDescription);
    section.appendChild(division);
    section.appendChild(windSpeed);
    section.appendChild(windChill);

};

const createBasicStructure = () => {
    const title = document.createElement('h3');
    const weatherDescription = document.createElement('div');

    title.textContent = 'Weather';
    weatherDescription.innerHTML = `<span id="current-temp"></span> &deg;${unit == 'metric' ? 'C' : 'F'}`;

    section.appendChild(title);
    section.appendChild(weatherDescription);
};

const capitalize = (word) => {
    return word.split(' ')
               .map(
                    (word, i) => word.charAt(0).toUpperCase() + word.slice(1)
                )
               .join(' ');
};


const apiFetch = async () => {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            createBasicStructure();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const calculateWindChill = (temperature, windSpeed) => {
    const windSpeedInMPH = windSpeed * 2.237;
    const temperatureInFahrenheit = (temperature * 9/5) + 32;

    if (temperatureInFahrenheit >= -50 && temperatureInFahrenheit <= 50) {
        return windChill = 35.74 + (0.6215 * temperatureInFahrenheit) - (35.75 * Math.pow(windSpeedInMPH, 0.16)) + (0.4275 * temperatureInFahrenheit * Math.pow(windSpeedInMPH, 0.16));
    } else {
        return 'N/A';
    }
}



apiFetch();