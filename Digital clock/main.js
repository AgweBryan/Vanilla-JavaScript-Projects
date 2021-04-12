// ********* Digital clock project ********* //

const modalOverlay = document.querySelector(".modalOverlay");
const modalHr = document.querySelector(".modalHr");
const modalMin = document.querySelector(".modalMin");
const create = document.querySelector(".create");
const closeModal = document.querySelector(".closeModal");
const modalContainer = document.querySelector(".modalContainer");
const parts = document.querySelector(".parts");
const alarms = document.querySelector(".alarms");
const alarmsBox = document.querySelector(".alarms-box");
const add = document.querySelector(".add");
const clrAll = document.querySelector(".clrAll");

let message = false;
let ampm;

/* Event listeners */
// Show modal
add.addEventListener("click", displayModal);
// Clear alarm box
clrAll.addEventListener("click", clearAlarms);
// Hide modal
closeModal.addEventListener("click", displayModal);
// Add alarm
create.addEventListener("click", addAlarm);

// Display set alarms on page load
window.addEventListener("load", () => {
	// Load local storage
	loadLocalStorage();

	// digital clock
	digitalClock();

	// display alarm message
	displayMessage();
});

/* Functions */

function digitalClock() {
	const clockTime = new Date();

	// get parts
	let h = clockTime.getHours();
	let m = clockTime.getMinutes();

	// Format parts
	h = h < 10 ? "0" + h : h;
	m = m < 10 ? "0" + m : m;
	ampm = h > 11 ? "PM" : "AM";

	// display date
	parts.innerHTML = `<h1 class="time">${h} : ${m} <span class="ampm">${ampm}</span></h1>`;

	setTimeout(digitalClock, 60000);
}

// display message
function displayMessage() {
	if (alarmsBox.innerHTML === "") {
		clrAll.classList.add("display-none");
		alarmsBox.innerHTML = "<p class='message'>No alarms set.</p>";
	} else {
		clrAll.classList.remove("display-none");
		return alarmsBox;
	}
	message = true;
}

// Show modal
function displayModal() {
	modalOverlay.classList.toggle("show-modal");
}

// Clear alarm box
function clearAlarms() {
	alarmsBox.innerHTML = "";
	// display message
	displayMessage();
	// clear local storage
	clearLocalStorage();
}

// Add alarm
function addAlarm() {
	// Get input value
	let hour = modalHr.value;
	let minute = modalMin.value;

	if (hour && minute) {
		if (hour > -1 && minute > -1) {
			if (hour > 23 || minute > 59) {
				alert("Hours on clock can't display > 23 nor minutes display > 59.");
				reset();
			} else {
				let id, value;

				id = new Date().getTime();

				// Set AM & PM
				ampm = hour > 11 ? "pm" : "am";

				// format alarm
				hour = hour < 10 ? "0" + hour : hour;
				minute = minute < 10 ? "0" + minute : minute;

				value = `${hour} : ${minute}`;

				// Create alarm div
				const alarm = document.createElement("div");
				alarm.className = "alarm";
				alarm.setAttribute("data-id", id);
				alarm.setAttribute("data-value", value);
				alarm.innerHTML = `
      <div class="alarm-time">
        <h4>${value} <span>${ampm}</span></h4>
      </div>
      <button class="delete">remove</button>
      `;

				if (message) {
					alarmsBox.innerHTML = "";
					message = false;
				}

				// Append alarm to alarms container
				alarmsBox.appendChild(alarm);

				const deleteBtn = alarm.querySelector(".delete");
				deleteBtn.addEventListener("click", (e) => {
					removeAlarm(e);
				});

				alarms.style.display = "block";
				// Set back to default
				reset();
				// Hide modal
				displayModal();
				// Add alarm to local Storage
				addToLocalStorage(id, value);
				// show clrAll button
				displayMessage();
			}
		} else {
			alert("No negative values.");
			reset();
		}
	} else if (!hour && !minute) {
		alert("No empty fields");
	} else {
		alert("Please don't leave any field empty.");
		reset();
	}
}

// Set back to default
function reset() {
	modalHr.value = "";
	modalMin.value = "";
}

// Remove item
function removeAlarm(e) {
	const id = parseInt(e.target.parentElement.dataset.id);
	const value = e.target.parentElement.dataset.value;
	if (confirm("Delete this alarm?")) {
		e.target.parentElement.remove();
	}
	// remove alarm from local storage
	removeFromLocalStorage(id, value);
	// display message if alarm was the only set alarm
	displayMessage();
}

/* Local Storage functions */
// add to local storage
function addToLocalStorage(id, value) {
	const alarmValue = { id, value };
	const list = localStorage.alarms ? JSON.parse(localStorage.alarms) : [];
	list.push(alarmValue);
	localStorage.alarms = JSON.stringify(list);
}

// Remove from local storage
function removeFromLocalStorage(id, value) {
	const alarmValue = { id, value };
	const list = JSON.parse(localStorage.alarms);

	const newList = list.filter((item) => {
		return item.id !== alarmValue.id;
	});
	// Overwrite local storage
	localStorage.alarms = JSON.stringify(newList);
}

// Clear local storage
function clearLocalStorage() {
	localStorage.clear();
}

// Load local storage
function loadLocalStorage() {
	// check if local storage has values
	if (localStorage.alarms) {
		const list = JSON.parse(localStorage.alarms).map((item) => {
			const hour = item.value.slice(0, 2);
			const minute = item.value.slice(5);
			ampm = hour > 11 ? "pm" : "am";
			const value = `${hour} : ${minute}`;
			const alarm = document.createElement("div");
			alarm.className = "alarm";
			alarm.setAttribute("data-id", item.id);
			alarm.setAttribute("data-value", item.value);
			alarm.innerHTML = `
          <div class="alarm-time">
            <h4>${value} <span>${ampm}</span></h4>
          </div>
          <button class="delete">remove</button>`;
			alarmsBox.appendChild(alarm);

			const deleteBtn = alarm.querySelector(".delete");
			deleteBtn.addEventListener("click", (e) => {
				removeAlarm(e);
			});
		});
	}
}
