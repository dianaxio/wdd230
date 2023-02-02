const createBanner = () => {
    const banner = document.createElement('div');
    banner.setAttribute('class', 'banner');
    banner.textContent = '🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.';
    return banner;
}

const checkCurrentDate = () => {
    const todaysDate = new Date(Date.now());
    if (todaysDate.getDay() === 1 || todaysDate.getDay() === 2) {
        const body = document.querySelector('body');
        const banner = createBanner();
        body.insertBefore(banner, body.firstChild);
    }
}

checkCurrentDate();