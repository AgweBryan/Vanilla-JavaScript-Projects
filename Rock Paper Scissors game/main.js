// ********* Rock, Paper, Scissors Game ********* //

const gameBox = document.querySelector(".game-box");
const USERSCORE = document.querySelector(".user");
const BOTSCORE = document.querySelector(".bot");

const btn = document.querySelector(".btn");

// scores
let user_score = 0;
let bot_score = 0;
// choices
let user_choice, bot_choice;
let choices = [];

populateDOM();

btn.addEventListener("click", populateDOM);

function populateDOM() {
	gameBox.innerHTML = `
  <div class="flex-item">
    <p>Rock</p>
    <div class="rock box" data-id="rock">
      <img src="./images/rock.jpeg" alt="rock" />
    </div>
  </div>
  <div class="flex-item">
    <p>Paper</p>
    <div class="paper message box" data-id="paper">
      <img src="./images/paper.jpeg" alt="paper" />
    </div>
  </div>
  <div class="flex-item">
    <p>Scissors</p>
    <div class="scissors box" data-id="scissors">
      <img src="./images/scissors.jpeg" alt="scissors" />
    </div>
  </div>
  `;

	const boxes = document.querySelectorAll(".box");
	boxes.forEach((box) => {
		box.addEventListener("click", userChoice);
		choices.push(box);
	});
}

// get user choice
function userChoice(e) {
	// bot choice
	bot_choice = getBotChoice(choices).dataset.id;
	// user choice
	user_choice = e.target.parentElement.dataset.id;

	if (bot_choice == user_choice) {
		displayMessage("Draw!", bot_choice, user_choice);
	} else if (bot_choice === "rock" && user_choice === "scissors") {
		displayMessage("Bot wins!", bot_choice, user_choice, "text-danger");
		bot_score++;
		displayScores(bot_score, user_score);
	} else if (bot_choice === "rock" && user_choice === "paper") {
		displayMessage("You win!", bot_choice, user_choice, "text-success");
		user_score++;
		displayScores(bot_score, user_score);
	} else if (bot_choice === "paper" && user_choice === "scissors") {
		displayMessage("You win!", bot_choice, user_choice, "text-success");
		user_score++;
		displayScores(bot_score, user_score);
	} else if (bot_choice === "paper" && user_choice === "rock") {
		displayMessage("Bot wins!", bot_choice, user_choice, "text-danger");
		bot_score++;
		displayScores(bot_score, user_score);
	} else if (bot_choice === "scissors" && user_choice === "rock") {
		displayMessage("You win!", bot_choice, user_choice, "text-success");
		user_score++;
		displayScores(bot_score, user_score);
	} else if (bot_choice === "scissors" && user_choice === "paper") {
		displayMessage("Bot wins!", bot_choice, user_choice, "text-danger");
		bot_score++;
		displayScores(bot_score, user_score);
	}
}

// Get bot choice
function getBotChoice(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// display message
function displayMessage(str, bot, user, color) {
	gameBox.innerHTML = `
  <div class="flex-item">
    <p>Your choice</p>
    <div class="${user} box" data-id="${user}">
      <img src="./images/${user}.jpeg" alt="${user}" />
    </div>
  </div>
  <div class="flex-item">
    <h1 class='${color}'>${str}</h1>
  </div>
  <div class="flex-item">
    <p>Bot choice</p>
    <div class="${bot} box" data-id="${bot}">
      <img src="./images/${bot}.jpeg" alt="${bot}" />
    </div>
  </div>
  `;
}

// display scores
function displayScores(botScore, userScore) {
	USERSCORE.textContent = userScore;
	BOTSCORE.textContent = botScore;
}
