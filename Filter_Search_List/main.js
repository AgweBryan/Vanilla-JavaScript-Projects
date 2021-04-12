// ********* Filter list project ********
const search = document.getElementById("search");
const items = document.querySelectorAll(".list-group-item");

// Keyup event listener
search.onkeyup = (e) => {
	// Get input value
	const value = e.target.value.toLowerCase().trim();

	items.forEach((li) => {
		// Get all item value
		const liValue = li.textContent.toLowerCase();

		// Check for index of value in liValue strin
		liValue.indexOf(value) > -1 ? (li.style.display = "block") : (li.style.display = "none");
	});
};
