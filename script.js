// Get references to various HTML elements
const grid = document.getElementById("card-grid"); // The container for all the memory cards
const newGameBtn = document.getElementById("new-game"); // Button to start a new game
const movesCounter = document.getElementById("moves"); // Displays the number of moves made
const timerDisplay = document.getElementById("timer"); // Displays the elapsed time
const difficultySelect = document.getElementById("difficulty"); // Dropdown to select game difficulty
const message = document.getElementById("congrats-message"); // Message displayed upon game completion
const scoreDisplay = document.getElementById("score"); // Displays the player's score

// Get references to audio elements for sound effects
const matchSound = document.getElementById("match-sound"); // Sound played when two cards match
const mismatchSound = document.getElementById("mismatch-sound"); // Sound played when two cards don't match
const victorySound = document.getElementById("victory-sound"); // Sound played when the game is won

const pauseResumeBtn = document.getElementById("pause-resume"); // Button to pause/resume the game

// Game state variables
let isPaused = false; // Flag to track if the game is paused
let score = 0; // Current score of the player
let gridSize = 4; // Default grid size (e.g., 4x4 for 16 cards)
let cards = []; // Array to hold all card elements (though not directly used in the provided code, it's a common placeholder)
let flippedCards = []; // Array to store the two cards currently flipped by the player
let matchedPairs = 0; // Counts the number of successfully matched pairs
let moves = 0; // Counts the total moves made by the player
let timer = null; // Variable to hold the setInterval timer ID
let seconds = 0; // Tracks the elapsed time in seconds

// Defines different themes for the cards, each containing a set of emojis
const themes = {
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐼', '🐻', '🐯', '🦁', '🐮', '🐷', '🐸', '🐨', '🐔', '🐤', '🦉', '🦄'],
    food: ['🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🍗', '🍖', '🍤', '🥓', '🍳', '🥞', '🧇', '🍝', '🍜'],
    emojis: ['😀', '😅', '😂', '😍', '😎', '🤔', '😴', '😭', '😡', '🤯', '🤡', '🥳', '😇', '😷', '🤖', '👻', '😜', '😬']
};

/**
 * Creates a single card element for the game.
 * @param {string} emoji - The emoji character to be displayed on the back of the card.
 * @returns {HTMLElement} The created card div element.
 */
function createCard(emoji) {
    // Create the main card container
    const card = document.createElement("div");
    card.className = "card";

    // Create the front face of the card (initially blank)
    const front = document.createElement("div");
    front.className = "card-front card-inner";
    front.textContent = ""; // front side is blank

    // Create the back face of the card (shows the emoji)
    const back = document.createElement("div");
    back.className = "card-back card-inner";
    back.textContent = emoji; // back shows emoji

    // Append front and back faces to the card
    card.appendChild(front);
    card.appendChild(back);

    // Add a click event listener to the card
    card.addEventListener("click", () => handleCardClick(card, emoji));
    return card;
}

/**
 * Shuffles the elements of an array randomly.
 * @param {Array<any>} array - The array to be shuffled.
 * @returns {Array<any>} The shuffled array.
 */
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

/**
 * Initializes or restarts the game.
 * Resets game state, clears the grid, sets up difficulty, selects theme, and starts the timer.
 */
function startGame() {
    // Clear any existing timer to prevent multiple timers running
    clearInterval(timer);
    // Reset all game state variables
    seconds = 0;
    timerDisplay.textContent = "0"; // Update timer display
    moves = 0;
    movesCounter.textContent = "0"; // Update moves display
    matchedPairs = 0;
    score = 0;
    scoreDisplay.textContent = score; // Update score display
    message.classList.remove("show"); // Hide congratulatory message

    // Clear the existing cards from the grid
    grid.innerHTML = "";

    // Determine grid size based on difficulty
    const difficulty = difficultySelect.value;
    if (difficulty === "hard") gridSize = 6; // 6x6 grid for hard difficulty
    else gridSize = 4; // 4x4 grid for easy difficulty

    // Calculate total number of cards needed
    const totalCards = gridSize * gridSize;
    // Get the selected theme from the dropdown
    const theme = document.getElementById("theme").value;
    // Get emojis for the chosen theme, taking only half the total cards needed
    let images = themes[theme].slice(0, totalCards / 2);
    // Duplicate the images to create matching pairs
    images = [...images, ...images];
    // Shuffle the array of images
    shuffle(images);

    // Set the grid's class based on difficulty for CSS styling
    grid.className = `grid ${difficulty}`;

    // Create and append each card to the grid
    images.forEach((img) => {
        const card = createCard(img);
        grid.appendChild(card);
    });

    // Start the game timer
    timer = setInterval(() => {
        // Only increment timer if the game is not paused
        if (!isPaused) {
            seconds++;
            timerDisplay.textContent = seconds; // Update the timer display every second
        }
    }, 1000); // 1000 milliseconds = 1 second
}

/**
 * Calculates and updates the player's score based on moves and time.
 * The score is inversely proportional to moves and time taken.
 */
function calculateScore() {
    // Score calculation: starts at 1000 and decreases with more moves and time
    score = Math.max(0, 1000 - (moves * 5 + seconds * 2));
    scoreDisplay.textContent = score; // Update the score display
}

/**
 * Handles the click event on a card.
 * Manages card flipping, matching logic, sound effects, and game win condition.
 * @param {HTMLElement} card - The card element that was clicked.
 * @param {string} image - The emoji string associated with the clicked card.
 */
function handleCardClick(card, image) {
    // Prevent card clicks if the game is paused
    if (isPaused) return;
    // Prevent flipping already flipped cards or if two cards are already open
    if (card.classList.contains("flip") || flippedCards.length === 2) return;

    // Flip the clicked card
    card.classList.add("flip");
    // Add the flipped card to the array of currently flipped cards
    flippedCards.push({ card, image });

    // Check if two cards are currently flipped
    if (flippedCards.length === 2) {
        moves++; // Increment move count
        movesCounter.textContent = moves; // Update moves display
        calculateScore(); // Update score after every move

        const [first, second] = flippedCards; // Destructure the two flipped cards

        // Check if the two flipped cards match
        if (first.image === second.image) {
            matchedPairs++; // Increment matched pairs count
            matchSound.play(); // Play match sound
            flippedCards = []; // Clear the flippedCards array

            // Check if all pairs have been matched (game won)
            if (matchedPairs === (gridSize * gridSize) / 2) {
                clearInterval(timer); // Stop the game timer
                message.classList.add("show"); // Show the congratulatory message
                calculateScore(); // Final score calculation
                victorySound.play(); // Play victory sound
                // Update the congratulatory message with the final score
                message.innerHTML = `🎉 Congratulations! 🎉<br>Your score: <strong>${score}</strong>`;
            }
        }
        // If cards do not match
        else {
            mismatchSound.play(); // Play mismatch sound
            // Flip cards back after a short delay
            setTimeout(() => {
                first.card.classList.remove("flip");
                second.card.classList.remove("flip");
                flippedCards = []; // Clear the flippedCards array
            }, 1000); // Wait 1 second before flipping back
        }
    }
}

// --- Instructions Modal Logic ---
const instructionsBtn = document.getElementById("instructions-btn"); // Button to open instructions
const modal = document.getElementById("instructions-modal"); // The instructions modal element
const closeBtn = document.querySelector(".close-btn"); // Button to close the modal

// Event listener to open the instructions modal
instructionsBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Event listener to close the instructions modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Event listener to close the modal if clicked outside of it
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// --- Game Control Event Listeners ---
newGameBtn.addEventListener("click", startGame); // Start a new game when the new game button is clicked
difficultySelect.addEventListener("change", startGame); // Restart game when difficulty changes
document.getElementById("theme").addEventListener("change", startGame); // Restart game when theme changes

// Event listener for the pause/resume button
pauseResumeBtn.addEventListener("click", () => {
    isPaused = !isPaused; // Toggle the paused state
    // Change button text based on paused state
    pauseResumeBtn.textContent = isPaused ? "Resume" : "Pause";
});

// Start the game automatically when the window loads
window.onload = startGame;