// *********** character Length Project *********** //

const output = document.querySelector(".output");
const btn = document.querySelector(".btn");
const textarea = document.getElementById("text");

// Add event listener
btn.onclick = (e) => {
	const text = textarea.value;
	if (text) {
		// Calculate word length function
		calculate(text);
	} else {
		alert("Please enter some text.");
	}
};

// ==== Functions ====

// Calculate word length function
function calculate(text) {
	// get character length
	const characterLength = text.length;
	// get wordlength
	const wordLength = text.match(/\w+/g).length;
	// get number of letters
	const numOfLetters = text.match(/[a-z]/g).length;

	// Output elements to the DOM
	output.innerHTML = `
    <h3>Number of characters = <span class="characters">${characterLength}</span></h3>
    <br />
    <br />
    <h3>Number of words = <span class="words">${wordLength}</span></h3>
    <br />
    <br />
    <h3>Number of letters = <span class="letters">${numOfLetters}</span></h3>
    <br />
    <br />
  `;
}
