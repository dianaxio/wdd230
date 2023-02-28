let currentYear = new Date().getFullYear();
document.querySelector(".current-year").innerHTML = currentYear;

let lastModified = document.lastModified;
document.querySelector(".last-modified").innerHTML = lastModified;


const url ="https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
// const url = "prophets.json"
const cards = document.querySelector("#cards");

async function getProphetData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.table(data.prophets);
  displayProphets(data.prophets);
}

getProphetData(url);

function displayProphets(prophets) {
  prophets.forEach((prophet) => {
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const portrait = document.createElement("img");

    const birthDate = document.createElement("p");
    const deathDate = document.createElement("p");
    const birthPlace = document.createElement("p");
    const numChildren = document.createElement("p");

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    birthDate.textContent = `Birth Date: ${prophet.birthdate}`;
    deathDate.textContent = `Death Date: ${prophet.death}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
    numChildren.textContent = `Number of Children: ${prophet.numofchildren}`;

    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `Image of ${prophet.name} ${prophet.lastname}`
    );
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(deathDate);
    card.appendChild(birthPlace);
    card.appendChild(numChildren);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}