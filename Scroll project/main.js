// ********* Scroll project ********* //

const navbar = document.querySelector(".navigation");
const links = document.querySelectorAll(".nav-link");

// get navbar height
const navHeight = navbar.getBoundingClientRect().height;

window.onscroll = fixed;

links.forEach((nav_link) => {
	nav_link.addEventListener("click", addActiveClass);
});

// ===== funcions =====

// navbar position fixed
function fixed() {
	// get window scroll-heigt
	const scrollHeight = window.pageYOffset;

	if (scrollHeight > navHeight) {
		// Add fixed positioning
		navbar.classList.add("navFixed");
	} else {
		navbar.classList.remove("navFixed");
	}
}

// add active class
function addActiveClass(e) {
	e.preventDefault();

	// remove active class from current holder
	removeActive();

	// add active class to clicked element
	e.target.classList.add("active");

	// get element's target
	const href = e.target.getAttribute("href").slice(1);

	// get target element
	const targetElement = document.querySelector(`#${href}`);

	// get element's height from top
	const top_height = targetElement.offsetTop;

	let position = top_height - navHeight;

	if (!navbar.classList.contains("navFixed")) {
		position = position - navHeight;
	}

	window.scrollTo({
		left: 0,
		top: position,
	});
}

function removeActive() {
	links.forEach((link) => {
		link.classList.remove("active");
	});
}
