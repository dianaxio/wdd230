let currentYear = new Date().getFullYear();
document.querySelector(".current-year").innerHTML = currentYear;

let lastModified = document.lastModified;
document.querySelector(".last-modified").innerHTML = lastModified;

// W10 Weather API

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=4cc78ee7f99ae471b5d144d07bbe927e'

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
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(1)}</strong>`;

    const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = capitalizeStr(desc);
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