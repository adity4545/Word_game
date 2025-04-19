const hangmanImage = document.querySelector(".main img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guess-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".playagain");

let currentWord, correctLatters = [], wrongGuessCount;
const maxGuesses = 6;

// Initialize game timer
const gameTimer = new GameTimer(2 * 60); // 2 minutes

// Handle time up event
gameTimer.onTimeUp(() => {
    gameOver(false, true);
});

const resetGame = () => {
    correctLatters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    
    // Enable all keyboard buttons
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    
    // Create word display
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    
    // Reset and start timer
    gameTimer.reset();
    gameTimer.start();
    
    // Hide game over modal
    gameModel.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = (isVictory, isTimeUp = false) => {
    // Stop the timer
    gameTimer.stop();
    
    setTimeout(() => {
        let modelText, headerText;
        
        if (isTimeUp) {
            headerText = "Time's Up!";
            modelText = `You ran out of time! The word was:`;
        } else {
            headerText = isVictory ? "Congrats!" : "Game Over!";
            modelText = isVictory ? `You found the word:` : `The correct word was:`;
        }
        
        gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h2").innerText = headerText;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLatters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLatters.length === currentWord.length) return gameOver(true);
};

// Create keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => 
        initGame(e.target, String.fromCharCode(i))
    );
}

// Initialize game
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);