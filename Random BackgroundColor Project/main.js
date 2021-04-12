// ********* Random background generator ********* //

const header = document.querySelector(".header");
const btn = document.querySelector(".btn");
const container = document.querySelector(".container");

// hex colors
const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

let color = "#";

btn.addEventListener("click", createRandomBackground);

// create random background color
function createRandomBackground() {
	const background = randomBackground();
	// create new element
	const box = document.createElement("div");
	box.className = "box";
	box.style.backgroundColor = background;
	box.innerHTML = `<h1>${background}</h1>`;

	container.appendChild(box);

	color = "#";
}

function randomBackground() {
	for (let i = 0; i < 6; i++) {
		// Get random index
		const randIndex = values[Math.floor(Math.random() * values.length)];
		color += randIndex;
	}
	return color;
}

window.addEventListener("scroll", () => {
	if (window.pageYOffset > header.getBoundingClientRect().height) {
	} else {
		header.style.position = "relative";
	}
});
