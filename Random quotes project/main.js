// ********* Random Quote generator ********** //

const button = document.querySelector(".btn");
const output = document.querySelector(".output");

const url = "https://type.fit/api/quotes";

// Event listeners
button.addEventListener("click", getQuote);

window.addEventListener("load", getQuote);

function generateQuote(quote) {
	// quote
	const text = quote.text;
	// quote author
	const author = quote.author;
	if (author) {
		createQuoteDiv(author, text);
	} else {
		createQuoteDiv("No Author", text);
	}
}

async function getQuote() {
	// show preloader while waiting for promise
	output.innerHTML = '<img src="./preloader/loader3.gif">';
	const object = await fetch(url);
	const data = await object.json();
	// hide preloader
	output.innerHTML = "";
	// get a random quote
	const quote = data[Math.floor(Math.random() * 99)];
	generateQuote(quote);
}

function createQuoteDiv(author, quote) {
	// display new quote to DOM
	output.innerHTML = `
  <p class="quote"><i class="fa fa-quote-left"></i> ${quote} <i class="fa fa-quote-right"></i></p>
	<span class="speaker">-- ${author}</span>`;
}
