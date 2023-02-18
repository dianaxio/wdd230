let images = document.querySelectorAll("[data-src]");

function loadImages(image) {
	const newSrc = image.getAttribute("data-src");

	if (!newSrc) {return};

	const hasSrcset = image.getAttribute("srcset");
	if (hasSrcset) {image.srcset = newSrc;}
	
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
	threshold: 0.25,
};
const imageObserver = new IntersectionObserver(lazyLoad, options);

images.forEach((image) => {
    imageObserver.observe(image);
});