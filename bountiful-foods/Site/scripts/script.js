let currentDate = new Date();

try {
	let options = {
		weekday: "long",
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	document.querySelector("#updated").textContent = ` Last Update: ${currentDate.toLocaleDateString(
		"en-us",
		options,
	)} ${currentDate.toLocaleTimeString("en-US")}`;
} catch (error) {
	alert("Error displaying time udpate");
}

document.querySelector("#year").textContent = currentDate.getFullYear();