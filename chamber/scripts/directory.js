const companies = document.querySelector('#companies');
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

function showGrid() {
    companies.classList.add("directory-grid");
    companies.classList.remove("directory-list");
}

function showList() {
    companies.classList.add("directory-list");
	companies.classList.remove("directory-grid");
}

gridButton.addEventListener("click", showGrid);
listButton.addEventListener("click", showList);


const requestURL = "https://raw.githubusercontent.com/dianaxio/wdd230/main/chamber/data/datas.json";

fetch(requestURL)
    .then((response) => response.json())
    .then((jsonObject) => {
        const companies = jsonObject['companies'];
        companies.forEach(displayCompany);
    });

function displayCompany(company) {
    let card = document.createElement('section');
    let name = document.createElement('h3');
    let address = document.createElement('p');
    let phone = document.createElement('p');
    let url = document.createElement('a');    
    let logo = document.createElement('img');
    let membership = document.createElement('p');

    name.textContent = company.name;
    address.textContent = `📍 ${company.address}`;
    phone.textContent = `📞 ${company.phone}`;

    url.textContent = `🌐 ${company.name} site`;
    url.href = company.url
    
    logo.src = company.img;
    logo.alt = `${company.name} logo`
    logo.loading = 'lazy'

    membership.textContent = `${capitalizeStr(company.membership)} member`
    membership.style.fontWeight = "bold"

    switch (company.membership){
        case "bronze":
            membership.style.color = "#CD7F32";
            break;
        case "silver":
            membership.style.color = "#757575";
            break;
        case "gold":
            membership.style.color = "#996515";
            break;
    }

    card.appendChild(name);
    card.appendChild(membership);
    card.appendChild(logo);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(url);

    companies.appendChild(card);
}

function capitalize(word) {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
}

function capitalizeStr(string) {
    let capitalized;
    if (string.includes("-")) {
        let split = string.split("-");
        split = split.map((word) => capitalize(word));
        capitalized = split.join("-");
    }
    else {
        capitalized = capitalize(string);
    }
    return capitalized;
}