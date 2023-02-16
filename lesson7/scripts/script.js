let currentYear = new Date().getFullYear();
document.querySelector(".current-year").innerHTML = currentYear;

let lastModified = document.lastModified;
document.querySelector(".last-modified").innerHTML = lastModified;

// W07 Progressive Loading of Images

let images = document.querySelectorAll("img[data-src]");

function loadImages(image) {
	const newSrc = image.getAttribute("data-src");

	if (!newSrc) {return};
	image.src = newSrc;
	
	image.onload = () => {
		image.removeAttribute("data-src");
	};
};

function lazyLoad(items, observer) {
	items.forEach((item) => {
		if (item.isIntersecting) {
			loadImages(item.target);
			observer.unobserve(item.target);
		};
	});
};

const options = {
	threshold: 1,
};
const imageObserver = new IntersectionObserver(lazyLoad, options);

images.forEach((image) => {
    imageObserver.observe(image);
});