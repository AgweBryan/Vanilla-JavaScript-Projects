// ********* BMI Calculator ********* //

const weight = document.querySelector(".weight"),
	height = document.querySelector(".height"),
	form = document.querySelector("form"),
	result = document.querySelector(".result"),
	output = result.querySelector("#BMI");

form.addEventListener("submit", calculate);

// Calculate BMI
function calculate(e) {
	e.preventDefault();
	// Get weight and height values as numbers
	const weightValue = parseInt(weight.value);
	const heightValue = parseInt(height.value);

	// Check for empty fields
	if (!weightValue || !heightValue) {
		alert("Please fill in input fields");
	} else {
		// Calculate BMI
		const BMI = ((weightValue / (heightValue * heightValue)) * 10000).toFixed(1);

		// display BMI to user
		result.classList.remove("display-none");
		output.textContent = BMI;
	}
}
