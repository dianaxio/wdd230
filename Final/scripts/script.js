date = new Date();
document.querySelector("#year").textContent = date.getFullYear();
document.querySelector("#timestamp").textContent= document.lastModified;
var URL

if (document.URL.split("/").slice(-2)[0] =='bountiful-foods' &
    document.URL.split("/").slice(-1)[0] == '') {
    URL = "index.html"
}
else {
    URL = document.URL.split("/").slice(-1)[0]
}

const fullDate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date);
document.querySelector("#date").innerHTML = fullDate;

function toggleMenu() {
    document.getElementById("main_nav").classList.toggle("open");
    document.getElementById("ham-btn").classList.toggle("open");
    document.getElementById("main_nav").classList.toggle("closed");
}

document.getElementById("ham-btn").onclick = toggleMenu;

const mainNav = document.getElementById("main_nav");
const mainNavChildren = mainNav.children;

for (let i = 0; i < mainNavChildren.length; i++) {
    if (mainNavChildren[i].children[0].href.split("/").slice(-1)[0] == URL) {
        mainNavChildren[i].children[0].classList.add('current-menu');
    }

}

if (URL == "index.html") {

    const numDrinksDisplay = document.getElementById("drink-counter");

    let numDrinks = localStorage.numDrinks

    if (numDrinks != undefined) {
        numDrinksDisplay.innerText = numDrinks;

    } else {
        numDrinksDisplay.innerText = 0;
        localStorage.numDrinks = 0;
    }

}