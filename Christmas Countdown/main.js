// ********* Christmas countdown project ********* //

const days = document.querySelector(".days h3");
const hours = document.querySelector(".hours h3");
const mins = document.querySelector(".mins h3");
const secs = document.querySelector(".secs h3");

// main function for project
function countDown() {
	// get current date
	const now = new Date();

	// get christmas date
	const christmas = new Date(now.getFullYear(), 11, 25);

	// Event countdown
	const countdown = christmas - now;

	// get seconds
	let s = Math.floor(countdown / 1000);
	// get minutes
	let m = Math.floor(s / 60);
	// get hours
	let h = Math.floor(m / 60);
	// get days
	let d = Math.floor(h / 24);

	// get hours per day
	h = h % 24;
	// get minutes per hours
	m = m % 60;
	// get seconds per minute
	s = s % 60;

	// format parts
	h = h < 10 ? "0" + h : h;
	m = m < 10 ? "0" + m : m;
	s = s < 10 ? "0" + s : s;

	// Display parts to the DOM
	days.textContent = d;
	hours.textContent = h;
	mins.textContent = m;
	secs.textContent = s;

	setTimeout(countDown, 1000);
}

countDown();
