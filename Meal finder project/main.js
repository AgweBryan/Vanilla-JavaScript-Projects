// ********* Menu project ********* //

const menu = document.querySelector(".menu");
const form = document.querySelector("form");
const input = form.querySelector("#search");
const categories = document.querySelector("#categories");
const search_results = document.querySelector("#searchResults");
const loader = document.querySelector(".preloader-div");
const loader2 = document.querySelector(".loader-div");

// Meals to be shown on page load
const myMeals = ["Rice", "Bread", "Chicken", "Pork", "pudding", "Pancake"];

let mealArr = [];
let searching = false;
// display meals on page load
getMeals(myMeals);

// ===== URLS =====
/* 
search meal by name
const url1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"; 

filter by category
const url2 = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";

Lookup full meal details by id
const url3 = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772'
*/

// ===== Event listeners =====
// Filter by category

categories.addEventListener("change", filterCategory);

// search for meal
form.addEventListener("submit", searchMeal);

// ===== Functions =====
// Get meals
async function getMeals(arr) {
	if (searching) {
		menu.innerHTML = `<div class="loader-div">
      <img src="./images/favPreloader.jpg" alt="loader" />
    </div>`;
		for (let i = 0; i < arr.length; i++) {
			const object = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${arr[i]}`);
			const data = await object.json();

			// get meal attributes
			const meal = data.meals;

			if (meal) {
				for (const i of meal) {
					// get meal attributes
					getMealAtt(i);
				}
				search_results.innerHTML = `${meal.length} results for <span class='searchText'>${input.value}</span>`;
			} else {
				menu.innerHTML = "";
				search_results.innerHTML = `No Search results for <span class='searchText'>${input.value}</span>`;
			}
		}
		displayMenuItems(mealArr);
		mealArr = [];
	} else {
		for (let i = 0; i < arr.length; i++) {
			const object = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${arr[i]}`);
			const data = await object.json();

			// get meal attributes
			const meal = data.meals[0];
			getMealAtt(meal);
		}
		displayMenuItems(mealArr);
		mealArr = [];
		// hide preloader
		loader.classList.add("hide-preloader");
	}
}

// display menu items
function displayMenuItems(meal) {
	menu.innerHTML = "";
	const items = meal
		.map((item) => {
			return `
      <div class='meal'>
        <div class="meal-img">
          <img src="${item.img}" alt="" />
        </div>
        <div class="meal-details">
          <h3 class="meal-name">${item.title}</h3>
          <p>${item.text}....</p>
          <a href="${item.youtube}">Watch video <i class="fab fa-youtube"></i></a>
        </div>
    </div>`;
		})
		.join("");

	// add to DOM
	menu.innerHTML = items;
}

// search meal
function searchMeal(e) {
	e.preventDefault();
	const term = input.value;
	const termArr = [term];
	if (term) {
		searching = true;
		getMeals(termArr);
	} else {
		alert("Please enter a search");
	}
}

// filter by category
function filterCategory(e) {
	const cat = e.target.value;

	search_results.innerHTML = "";

	// display loader
	menu.innerHTML = `<div class="loader-div">
    <img src="./images/favPreloader.jpg" alt="loader" />
  </div>`;

	if (cat === "Random") {
		mealArr = [];
		getMeals(myMeals);
	} else {
		mealArr = [];
		getCategory(cat);
	}
}

// get category
async function getCategory(cat) {
	const obj = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
	const data = await obj.json();
	const meal = data.meals;
	const newMealArr = [];
	for (let i = 0; i < 6; i++) {
		const mealID = meal[i].idMeal;
		getMealById(mealID);
	}
}

// get meal by id
async function getMealById(id) {
	const obj = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
	const data = await obj.json();
	const meal = data.meals[0];

	// get meal attributes
	getMealAtt(meal);
	displayMenuItems(mealArr);
}

// get meal attributes
function getMealAtt(meal) {
	const mealName = meal.strMeal;
	const mealImg = meal.strMealThumb;
	const mealYoutube = meal.strYoutube;
	const mealText = meal.strInstructions.slice(0, 70).replace(/(\r\n|\r|\n)/, " ");

	const mealAtt = { title: mealName, img: mealImg, youtube: mealYoutube, text: mealText };

	mealArr.push(mealAtt);
}
