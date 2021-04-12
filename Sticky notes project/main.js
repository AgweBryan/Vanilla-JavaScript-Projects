// ********* Sticky Notes Project ********* //
const createBtn = document.querySelector(".create-btn");
const textNote = document.querySelector("#textNote");
const checkBtn = document.querySelector(".check-btn");
const timesBtn = document.querySelector(".times-btn");
const container2 = document.querySelector(".container-2");
const container3 = document.querySelector(".container-3");

/* Event listerners */
// display textarea
createBtn.addEventListener("click", openCloseTextArea);
// hide textarea
timesBtn.addEventListener("click", openCloseTextArea);
// create new note
checkBtn.addEventListener("click", createNote);
// load notes on page load
window.addEventListener("load", () => {
	loadLocalStorage();
});

/* Functions */

// display/hide textarea
function openCloseTextArea() {
	container2.classList.toggle("display");
	// set textarea value to default
	textNote.value = "";
}
// create note
function createNote() {
	const note = textNote.value;
	const id = new Date().getTime();
	if (note) {
		createNoteText(id, note);

		// Add to local storage
		addNoteToLocalStorage(id, note);

		// close textarea
		openCloseTextArea();
	} else {
		alert("Please enter text in textbox.");
	}
}

// remove note
function removeNote(e) {
	e.target.remove();
	// display message

	// remove from local storage
	removeNoteFromLocalStorage(e.target.dataset.id);
}

// random margins
function margin() {
	const randomMargin = ["-5px", "1px", "5px", "10px", "15px", "20px"];
	return randomMargin[Math.floor(Math.random() * randomMargin.length)];
}

// random rotate value
function rotate() {
	const randomRotate = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-10deg)"];

	return randomRotate[Math.floor(Math.random() * randomRotate.length)];
}

// random colors
function color() {
	const randomColor = ["purple", "yellow", "green", "orange", "red", "brown", "voilet"];

	return randomColor[Math.floor(Math.random() * randomColor.length)];
}

/* Local storage functions */

// add note to local storage
function addNoteToLocalStorage(id, note) {
	const item = { id, note };
	const notes = localStorage.notes ? JSON.parse(localStorage.notes) : [];
	notes.push(item);

	// Update local storage
	localStorage.notes = JSON.stringify(notes);
}

// remove note from local storage
function removeNoteFromLocalStorage(id) {
	const notes = JSON.parse(localStorage.notes);
	const item = notes.filter((item) => {
		return item.id !== parseInt(id);
	});

	// Overwrite local storage
	localStorage.notes = JSON.stringify(item);
}

// Load local storage on page load
function loadLocalStorage() {
	const txtNotes = JSON.parse(localStorage.notes);
	if (txtNotes) {
		txtNotes.forEach((noteValue) => {
			createNoteText(noteValue.id, noteValue.note);
		});
	}
}

// create notes
function createNoteText(id, note) {
	// create new element
	const noteDiv = document.createElement("div");
	noteDiv.className = "note";
	noteDiv.setAttribute("data-id", id);
	noteDiv.setAttribute("title", "Double click to remove note.");
	noteDiv.innerHTML = `<h2>${note}</h2>`;
	noteDiv.style.margin = margin();
	noteDiv.style.transform = rotate();
	noteDiv.style.background = color();

	// append to container3
	container3.appendChild(noteDiv);

	// remove note
	noteDiv.addEventListener("dblclick", removeNote);
}
