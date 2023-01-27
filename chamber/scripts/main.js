const menuButton = document.querySelector('#menuButton');

menuButton.addEventListener('click', function() {
    toggleMenu();
});


function toggleMenu() {
    const navElement = document.querySelector('#primaryNav');
    navElement.classList.toggle('open');
    document.querySelector('#menuButton').classList.toggle("open");
}

function getLastUpdate() {
    let lastModified = new Date(document.lastModified)
                            .toLocaleDateString('en-US', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    return lastModified;
}

function getCurrentYear() {
    return new Date().getFullYear();
}

function today() { 
    return new Date().toLocaleDateString('en-US', {dateStyle: 'full'});
}

let lastUpdatedElem = document.getElementById('lastUpdated');
lastUpdatedElem.innerHTML = getLastUpdate();

let currentYearElem = document.getElementById('year');
currentYearElem.innerHTML = getCurrentYear();

let todaysDayElem = document.getElementById('today');
todaysDayElem.innerHTML = today();