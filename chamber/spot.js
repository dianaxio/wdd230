const requestURL = 'https://raw.githubusercontent.com/schaffah9/wdd230/main/chamber/data/data.json';

spotlightCompanies = [];

async function fetchCompanies() {
    const response = await fetch(requestURL);
    if (response.ok) {
        const data = await response.json();
        data['companies'].forEach(company => {
            const cond1 = (company.membership == 'gold');
            const cond2 = (company.membership == 'silver');
            if (cond1 || cond2) {
                spotlightCompanies.push(company);
            }
        });

        displaySpotlightCompanies();
    }
}

function displaySpotlightCompanies() {
    filtered = spotlightCompanies.sort(() => Math.random() - 0.5).slice(3);
    filtered.forEach(company => {displaySpotlight(company)});
}

function displaySpotlight(company) {
    const container = document.querySelector('.spotlights-container');

    let div = document.createElement('div');
    div.classList.add("spotlight");

    let htmlContent = `
        <h3>${company.name}</h3>
        <img 
        src="${company.img}" 
        alt="${company.name} Logo"
        height="80px">
        <p class="slogan">"${company.slogan}"</p>
        <p>
            ${company.phone} <br>
            ${company.email}
        </p>`;

    div.innerHTML = htmlContent;
    container.appendChild(div);
}

fetchCompanies();