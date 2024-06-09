document.addEventListener('DOMContentLoaded', (event) => {
    const words = {
        bikes: ["Yamaha", "Suzuki", "Kawasaki", "Harley", "Ducati"],
        countries: ["India", "Canada", "Germany", "Australia", "Brazil"]
    };

    const categorySelect = document.getElementById('category');
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('gameArea');
    const wordDisplay = document.getElementById('wordDisplay');
    const message = document.getElementById('message');
    const result = document.getElementById('result');
    const wrongGuessesDisplay = document.getElementById('wrongGuesses');
    const charInput = document.getElementById('charInput');
    const guessButton = document.getElementById('guessButton');

    let selectedWord = '';
    let displayedWord = '';
    let wrongGuesses = 0;
    const maxWrongGuesses = 5;
    let guessedChars = [];

    startButton.addEventListener('click', () => {
        const category = categorySelect.value;
        const wordList = words[category];
        const randomIndex = Math.floor(Math.random() * wordList.length);
        selectedWord = wordList[randomIndex];
        displayedWord = "_".repeat(selectedWord.length);
        wrongGuesses = 0;
        guessedChars = [];

        wordDisplay.textContent = displayedWord;
        result.textContent = '';
        wrongGuessesDisplay.textContent = '';
        message.textContent = "Please enter each character:";
        charInput.disabled = false;
        guessButton.disabled = false;

        gameArea.style.display = 'block';
    });

    guessButton.addEventListener('click', () => {
        const char = charInput.value.toUpperCase();
        if (char === '') return;
        charInput.value = '';

        if (guessedChars.includes(char)) {
            message.textContent = "Already entered";
            return;
        }

        guessedChars.push(char);
        let found = false;
        let newDisplayedWord = '';

        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i].toUpperCase() === char) {
                newDisplayedWord += selectedWord[i];
                found = true;
            } else {
                newDisplayedWord += displayedWord[i];
            }
        }

        displayedWord = newDisplayedWord;
        wordDisplay.textContent = displayedWord;

        if (!found) {
            wrongGuesses++;
            wrongGuessesDisplay.textContent = `Wrong guesses: ${wrongGuesses}/${maxWrongGuesses}`;
        }

        if (displayedWord.toUpperCase() === selectedWord.toUpperCase()) {
            result.textContent = `Congratulations!! The String is ${selectedWord}`;
            charInput.disabled = true;
            guessButton.disabled = true;
        } else if (wrongGuesses >= maxWrongGuesses) {
            result.textContent = `Game Over! You have exceeded the maximum number of wrong guesses. The correct word was: ${selectedWord}`;
            charInput.disabled = true;
            guessButton.disabled = true;
        }
    });
});
