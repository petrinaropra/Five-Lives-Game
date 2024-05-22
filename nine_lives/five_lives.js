//five_lives.js
//create an array of words
const words = ['dragon','pizza','fairy','night', 'shirt', 'otter', 'plane'] ;
//choose a word in the words array and place it in the secretWord variable
const secretWord = words[Math.floor(Math.random() * words.length)];
//an array is created and filled with as many ? as the letters in secretWord
let clue = Array(secretWord.length).fill('?');
//variable lives gets integer 5
let lives = 5;
//variable guessedWordCorrectly gets a boolean value - false
let guessedWordCorrectly = false;
//variable guessedLetters gets a Set()
let guessedLetters = new Set();

//variable alphabetContainer gets alphabet div
const alphabetContainer = document.getElementById('alphabet');
//variable alphabet gets a string of letters from a to z
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

//Splits the alphabet string into individual letters.
//Iterates over each letter, creating a <span> element for each one.
//Sets the text content of the <span> to the letter.
//Assigns a unique id to each <span> using the letter.
//Adds an onclick event handler to each <span> that calls the makeGuess function with the corresponding letter.
//Appends each <span> to the alphabetContainer.
alphabet.split('').forEach(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.id = `letter-${letter}`;
    span.onclick = () => makeGuess(letter);
    alphabetContainer.appendChild(span);
});

//create a function called updateClue that takes one parameter - guessedLetter
function updateClue(guessedLetter) {
	//loop through the letters in secretWord
    for (let i = 0; i < secretWord.length; i++) {
		//if the value of guessedLetter is equal to any of the letters in secretWords
        if (guessedLetter === secretWord[i]) {
			//then replace a ? in clue with the guessedLetter value
            clue[i] = guessedLetter;
        }
    }
}

//create a function called makeGUess with one parameter - input
function makeGuess(input) {
	//guessInput gets an html element id 
    const guessInput = document.getElementById('guess-input');
	//checks the type of input that the user enters and if it's a string,
	//guess is set to input, If input is not a string, guess is set to the value 
	//from the input field (guessInput.value) and converted to lowercase.
    const guess = (typeof input === 'string') ? input : guessInput.value.toLowerCase();
	//set the value of guessInput to an empty string
    guessInput.value = '';
	
	//if the Set guessedLetters has the value of guess 
    if (guessedLetters.has(guess)) {
		//then call this function
        showModal();
		//stop function
        return;
    }
	//add the value of guess to the set guessedLetters
    guessedLetters.add(guess);
	//The line `document.getElementById(`letter-${guess}`).classList.add('guessed')` 
	//selects the HTML element with an `id` corresponding to the guessed letter 
	//(e.g., `letter-a` for the guess 'a'). It then adds the CSS class 'guessed' 
	//to this element, typically to change its appearance and indicate it has been guessed.
    document.getElementById(`letter-${guess}`).classList.add('guessed');

	//if the value of guess is equal to secretWord
    if (guess === secretWord) {
		//the value if guessedWordCorrectly changes to tru
        guessedWordCorrectly = true;
	//if the amount of letters in guess is equal to 1 and the value of
	//secretWord which is an array has the value of guess
	//basically if the user made a guess and its in the secretWord array
    } else if (guess.length === 1 && secretWord.includes(guess)) {
		//call updateClue function with guess as its argument
        updateClue(guess);
	//if the amount of letters in guess is equal to one
	//basically if the user made a guess
    } else if (guess.length === 1) {
		//minus one from the value of guess
        lives--;
    }
	//if ? is not in clue
    if (!clue.includes('?')) {
		//the value of guessedWordCorrectly is now true
        guessedWordCorrectly = true;
    }
	//call the function updateDisplay
    updateDisplay();
	//call the function checkGameStatus()
    checkGameStatus();
}

//create a function updateDisplay
function updateDisplay() {
	//join the items in clue together to form a string and put it in the html element clue
    document.getElementById('clue').textContent = clue.join('');
	//updates the content of an HTML element with id lives to show a message "Lives left:"
	//followed by a heart symbol repeated for the number of lives left.
    document.getElementById('lives').innerHTML = 'Lives left: ' + '<span class="heart">'.repeat(lives) + '❤'.repeat(lives) + '</span>'.repeat(lives);
}

//create checkGameStatus function
function checkGameStatus() {
	//variable result gets an html element id result
    const result = document.getElementById('result');
	//variable result gets an html element id resultImage
    const resultImage = document.getElementById('result-image');
	//if guessedWordCorrectly is true
    if (guessedWordCorrectly) {
		//display this text in result
        result.textContent = 'You won! The secret word was ' + secretWord + '!';
		//display an image 
        resultImage.src = `C:/Users/petix/OneDrive/Desktop/my_javascript_games/nine_lives/${secretWord}.png`;  // Ensure images are named according to words
		//style the image
        resultImage.style.display = 'block';
		//call disableInput() function
        disableInput();
	  //if lives is less than or equal to zero
    } else if (lives <= 0) {
		//display this in the result html element 
        result.textContent = 'You lost! The secret word was ' + secretWord;
		//call disableInput() function
        disableInput();
    }
}

//create disabledInput() funtion
function disableInput() {
	//diasble the input html element
    document.getElementById('guess-input').disabled = true;
	//disable the button
    document.querySelector('.input-container button').disabled = true;
	//disable the letter buttons
    alphabetContainer.querySelectorAll('span').forEach(span => {
        span.onclick = null;
    });
}


// Add an event listener to the input field to detect Enter key presses
document.getElementById('guess-input').addEventListener('keydown', function(event) {
	//if the user presses the "enter" key
    if (event.key === 'Enter') {
		//call makeGUess() function
        makeGuess();
    }
});

//call updateDisplay() function
updateDisplay();
