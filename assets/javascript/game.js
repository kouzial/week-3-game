

// 3 global variables declaration

// Creating an array with words choosen randomly when initialized
	var words = [
	"javascript",
	"hangman",
	"game"
];

// Storing the word we want te player to guess
var word="";

// Storing the answer board (all the _)
var answerArray = [];

// Words that are wrong and already chosen
var chosenWrong = [];

// Number of chances to guess
var lives = 10;


// Function that initialize the game
function init(){

	// Pick a random word
	word = words[Math.floor(Math.random() * words.length)];
	lives = 10;
	answerArray = [];
	chosenWrong = [];

	// Setting up the array for answers
	answerArray = [];
	for (var i = 0; i < word.length; i++) {
		answerArray[i] = "_";
	}
	document.getElementById("answer").style.display = "";
	document.getElementById("chosenWrong").style.display = "";
	document.getElementById("lives").style.display = "";
	document.getElementById("answer").innerHTML= answerArray.join(" ");
	document.getElementById("message").innerHTML= "Type a letter then press guess, or press quit to stop playing.";
	document.getElementById("playAgain").style.display = "none";
	document.getElementById("chosenWrong").innerHTML = "Already Chosen: " +chosenWrong.join(", ");
	document.getElementById("lives").innerHTML = "lives: " + lives;


}
init();

// Function for the game loop
document.onkeyup = function (event) {
	// Get a guess from the player
	var guess = String.fromCharCode(event.keyCode).toLowerCase();
	var showThisMessage = "";

	// Update the game with the guess
	var i=0; // 
	for (i = 0; i < chosenWrong.length; i++) {
		if (chosenWrong[i] === guess) {
			showThisMessage = "You already tried " +guess;
		}
	}
	for (i = 0; i < word.length; i++) {
		if (word[i] === guess) {
			answerArray[i] = guess;
			showThisMessage = "YES! "+guess+" is in the answer";
		}
	}

	// Update the game for remaining unknowns
	var remaining_letters = answerArray.length;

	// Figuring out how many letters remaining to guess
	for (i = 0; i < answerArray.length; i++) {
		if (answerArray[i] !== "_") {
			remaining_letters -= 1;
		}
	}

	// If no remaining letters, you won
	if (remaining_letters ==0) {
		showThisMessage = "YES! You guessed the word!"
		document.getElementById("playAgain").style.display = "";

	}

	// If no message, wrong guess
	if (showThisMessage === "") {
		chosenWrong.push(guess);
		lives -= 1;
		if (lives === 0) {
			showThisMessage = "You Lose :(";
			document.getElementById("playAgain").style.display = "";
			document.getElementById("answer").style.display = "none";
			document.getElementById("chosenWrong").style.display = "none";
			document.getElementById("lives").style.display = "none";


		}
		else {
			showThisMessage = "Sorry, no "+guess;
		}

	}

	// Update the puzzle
	document.getElementById("answer").innerHTML = answerArray.join(" ");
	document.getElementById("chosenWrong").innerHTML = "Already Chosen: " +chosenWrong.join(", ");
	document.getElementById("lives").innerHTML = "lives: " + lives;
	document.getElementById("message").innerHTML = showThisMessage;


}
		