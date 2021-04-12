// ********* Number Guessing Game ********* //

const container = document.querySelector(".project-container");
const h1 = container.querySelector("h1");
const h2 = container.querySelector("h2");
const inputfield = container.querySelector(".number");
const btn = container.querySelector(".submit");
const p_tag = container.querySelector("p");
const form = container.querySelector("form");
const hint = container.querySelector(".hint");

// Event Listeners
// submit event
form.addEventListener("submit", guessNumber);
// hint event
hint.addEventListener("click", getHint);

// number of trials
let trials = 10;

// get random number between 1 - 100
const number = Math.floor(Math.random() * 100);

// guess number function
function guessNumber(e) {
	// prevent submitting
	e.preventDefault();

	const guess = parseInt(inputfield.value);

	if (guess) {
		if (guess > number) {
			h2.textContent = "You guessed too high!";
			trials--;
			trialsLeft(trials);
		} else if (guess < number) {
			h2.textContent = "You guessed too low!";
			trials--;
			trialsLeft(trials);
		} else {
			// display win messages
			h1.textContent = "Woooo, You win";
			h2.textContent = "Congratulations!";
			// hide input
			form.style.display = "none";
			p_tag.textContent = `The number was ${number}`;
			// hide hint
			hint.style.display = "none";
		}
	} else {
		alert("Please enter a number!");
	}
}

// Calculate trials
function trialsLeft(digit) {
	if (digit === 0) {
		// hide input
		form.style.display = "none";
		// display loose message
		p_tag.textContent = `Game Over!`;
		p_tag.style.color = "red";
	} else {
		p_tag.textContent = `You have ${digit} trials left!`;
	}
}

// get hint
function getHint() {
	if (trials > 5) {
		alert("You have to try at least 5 times first");
	} else {
		alert(`The number is between ${number - 9} and ${number + 4}`);
	}
}
