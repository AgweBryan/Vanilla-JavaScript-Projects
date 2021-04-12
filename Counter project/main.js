// ********* Counter project ********* //

const counterValue = document.querySelector(".counter");
const decrease = document.querySelector(".decrease");
const reset = document.querySelector(".reset");
const increase = document.querySelector(".increase");

let counter = 0;

// Event listeners
// decrease event
decrease.addEventListener("click", decreaseCounter);
// reset event
reset.addEventListener("click", resetCounter);
// increase event
increase.addEventListener("click", increaseCounter);

// Functions

// decrease
function decreaseCounter() {
	counter--;
	counterValue.textContent = counter;
	paintCounter(counter);
}
// reset
function resetCounter() {
	counter = 0;
	counterValue.textContent = counter;
	paintCounter(counter);
}
// increase
function increaseCounter() {
	counter++;
	counterValue.textContent = counter;
	paintCounter(counter);
}

// color value
function paintCounter(number) {
	if (number === 0) {
		counterValue.style.color = "#000";
	} else if (number < 0) {
		counterValue.style.color = "rgb(245, 110, 110)";
	} else {
		counterValue.style.color = "rgb(110, 245, 151)";
	}
}
