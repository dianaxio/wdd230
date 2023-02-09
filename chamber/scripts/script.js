const currentDate = new Date();

const fullDate = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full"
}).format(currentDate);
document.querySelector(".date").innerHTML = fullDate;

const currentYear = currentDate.getFullYear();
document.querySelector(".current-year").innerHTML = currentYear;

const lastModified = document.lastModified;
document.querySelector(".last-modified").innerHTML = lastModified;

function toggleMenu() {
	document.getElementById("primary-nav").classList.toggle("open");
	document.getElementById("ham-btn").classList.toggle("open");
}

const hamburgerButton = document.getElementById("ham-btn");
hamburgerButton.onclick = toggleMenu;

const banner = document.querySelector(".banner");
if (currentDate.getDay() <= 2 && currentDate.getDay() > 0) {
	banner.style.display = "block";
}