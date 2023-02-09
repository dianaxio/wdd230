// Weather API

const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind-speed');
const weatherIcon = document.querySelector('.weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-34.660&lon=-58.367&units=metric&appid=4cc78ee7f99ae471b5d144d07bbe927e'

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
      }
      else {
        throw Error(await response.text());
      }
    } 
    catch (error) {
        console.log(error);
    }
}

function displayResults(weatherData) {
    temperature.innerHTML = `${weatherData.main.temp.toFixed(1)}`;
    windSpeed.innerHTML = `${weatherData.wind.speed.toFixed(1)}`;
    

    const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = capitalizeStr(desc);

    windChillCalc();
}

function capitalize(word) {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
}

function capitalizeStr(string) {
    let capitalized;
    if (string.includes(" ")) {
        let split = string.split(" ");
        split = split.map((word) => capitalize(word));
        capitalized = split.join(" ");
    }
    else {
        capitalized = capitalize(string);
    }
    return capitalized;
}

apiFetch();

// Windchill

function windChillCalc() {
    const temperatureC = parseFloat(document.querySelector(".temperature").textContent);
    const windSpeedMsec = parseFloat(document.querySelector(".wind-speed").textContent);

    const temperatureF = (temperatureC * 1.8) + 32;
    const windSpeedMph = windSpeedMsec * 2.237;

    const windChill = document.querySelector(".wind-chill");
    windChill.textContent = windChillC(temperatureF, windSpeedMph);
}

function windChillC (temperatureF, windSpeedMph) {
    let windChillC;
    if (temperatureF <= 50 && windSpeedMph > 3) {
        const t = temperatureF;
        const s = windSpeedMph ** 0.16;
        const windChillF = 35.74 + 0.6215 * t - 35.75 * s + 0.4275 * t * s;
        windChillC = (windChillF - 32) / 1.8;
        windChillC = windChillC.toFixed(1)
    }
    else {windChillC = "N/A"};
    return windChillC;
}