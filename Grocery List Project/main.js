// ********* Grocery list project ********* //
const form = document.querySelector(".inputForm");
const input = document.querySelector(".input-item");
const submitbtn = document.querySelector(".submit");
const displayContainer = document.querySelector(".display-none");
const itemsContainer = document.querySelector(".itemsContainer");
const clrBtn = document.querySelector(".btn-clear");

// Edit variables
let editElement;
let editId;
let editing = false;

/* Event listeners */
// create new item
form.addEventListener("submit", add_grocery);
// Clear list event
clrBtn.addEventListener("click", clear_list);
// load local storage
window.addEventListener("load", loadLocalStorage);

/* Functions */
// create new item
function add_grocery(e) {
	// prevent default submit behavior
	e.preventDefault();

	let value = input.value.trim();

	// Create an id for element using date object
	let id = new Date().getTime();
	if (value) {
		if (!editing) {
			// create new grocery item
			createItem(id, value);

			// set back to default
			reset();

			// display container
			displayItemsContainer();

			// Add item to local storage
			addToLocalStorage(id, value);
		} else {
			editElement.querySelector(".itemName").textContent = value;

			// edit local storage
			editLocalStorage(editId, value);

			// set back to default
			reset();
		}
	} else {
		alert("Please enter a grocery item before submitting.");
		reset();
	}
}

// set back to default
function reset() {
	input.value = "";
	submitbtn.value = "Submit";
	editing = false;
	editId = "";
}

// clear list
function clear_list() {
	if (confirm("Remove all items?")) {
		itemsContainer.innerHTML = "";
	}

	// hide items container
	displayItemsContainer();

	// clear local storage
	clearLocalStorage();
}

// display items container
function displayItemsContainer() {
	if (itemsContainer.innerHTML !== "") {
		displayContainer.classList.add("display-block");
	} else {
		displayContainer.classList.remove("display-block");
	}
}

// remove item
function removeItem(e) {
	const itemId = e.target.parentElement.parentElement.parentElement.dataset.id;
	if (confirm(`This action cannot be undone!`)) {
		itemsContainer.removeChild(e.target.parentElement.parentElement.parentElement);
	}

	// hide container if empty
	displayItemsContainer();

	// remove from local storage
	removeFromLocalStorage(itemId);
}

// edit item
function editItem(e) {
	editElement = e.target.parentElement.parentElement.parentElement;
	editing = true;
	editId = editElement.dataset.id;
	input.value = editElement.querySelector(".itemName").textContent;
	submitbtn.value = "edit";
}

/* Local storage functions */

// Add item to local storage
function addToLocalStorage(id, value) {
	const item = { id, value };
	const groceries = localStorage.groceries ? JSON.parse(localStorage.groceries) : [];
	groceries.push(item);

	// Update local storage
	localStorage.groceries = JSON.stringify(groceries);
}

// remove item from local storage
function removeFromLocalStorage(id) {
	const groceries = JSON.parse(localStorage.groceries);
	const item = groceries.filter((item) => {
		return item.id !== parseInt(id);
	});

	// Overwrite local storage
	localStorage.groceries = JSON.stringify(item);
}

// edit local storage
function editLocalStorage(id, value) {
	const groceries = JSON.parse(localStorage.groceries);
	const list = groceries.map((item) => {
		if (item.id === parseInt(id)) {
			item.value = value;
		}
		return item;
	});

	// Overwrite local storage
	localStorage.groceries = JSON.stringify(list);
}

// clear local storage
function clearLocalStorage() {
	localStorage.groceries = [];
}

// load local storage
function loadLocalStorage() {
	const grocery = JSON.parse(localStorage.groceries);
	console.log(grocery);
	if (grocery) {
		grocery.forEach((item) => {
			console.log(item.id, item.value);
			createItem(item.id, item.value);
		});
		displayItemsContainer();
	}
}

/********* create new grocery item ********/

function createItem(id, value) {
	// Create new element
	const item = document.createElement("div");
	// add a class
	item.className = "item";
	// add a data-id attribute
	item.setAttribute("data-id", id);
	// add html
	item.innerHTML = `
  <p class="itemName">${value}</p>
  <div class="btn-group">
    <button class="editBtn" title='Edit item'>
      <i class="fas fa-edit"></i>
    </button>
    <button class="deleteBtn" title='Remove item'>
      <i class="fas fa-trash"></i>
    </button>
  </div>`;

	// append to itemsContainer to display in DOM
	itemsContainer.appendChild(item);

	// item elements
	const editBtn = item.querySelector(".editBtn");
	const deleteBtn = item.querySelector(".deleteBtn");

	/* Event listeners */
	// edit item
	editBtn.addEventListener("click", editItem);
	// remove item
	deleteBtn.addEventListener("click", removeItem);
}
