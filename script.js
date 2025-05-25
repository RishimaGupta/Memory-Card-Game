const grid = document.getElementById("card-grid");
const newGameBtn = document.getElementById("new-game");
const movesCounter = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const difficultySelect = document.getElementById("difficulty");
const message = document.getElementById("congrats-message");
const scoreDisplay = document.getElementById("score");
const matchSound = document.getElementById("match-sound");
const mismatchSound = document.getElementById("mismatch-sound");
const victorySound = document.getElementById("victory-sound")
const pauseResumeBtn = document.getElementById("pause-resume");
let isPaused = false;
let score = 0;
let gridSize = 4;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;

const themes = {
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐼', '🐻', '🐯', '🦁', '🐮', '🐷', '🐸', '🐨', '🐔', '🐤', '🦉', '🦄'],
    food: ['🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🍗', '🍖', '🍤', '🥓', '🍳', '🥞', '🧇', '🍝', '🍜'],
    emojis: ['😀', '😅', '😂', '😍', '😎', '🤔', '😴', '😭', '😡', '🤯', '🤡', '🥳', '😇', '😷', '🤖', '👻', '😜', '😬']
};

function createCard(emoji) {
    const card = document.createElement("div");
    card.className = "card";

    const front = document.createElement("div");
    front.className = "card-front card-inner";
    front.textContent = ""; // front side is blank

    const back = document.createElement("div");
    back.className = "card-back card-inner";
    back.textContent = emoji; // back shows emoji

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => handleCardClick(card, emoji));
    return card;
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function startGame() {
    clearInterval(timer);
    seconds = 0;
    timerDisplay.textContent = "0";
    moves = 0;
    movesCounter.textContent = "0";
    matchedPairs = 0;
    score = 0;
    scoreDisplay.textContent = score;
    message.classList.remove("show");
    grid.innerHTML = "";

    const difficulty = difficultySelect.value;
    if (difficulty === "hard") gridSize = 6;
    else gridSize = 4;

    const totalCards = gridSize * gridSize;
    const theme = document.getElementById("theme").value;
    let images = themes[theme].slice(0, totalCards / 2);
    images = [...images, ...images]; // duplicate for matching pairs
    shuffle(images);

    grid.className = `grid ${difficulty}`;


    images.forEach((img) => {
        const card = createCard(img);
        grid.appendChild(card);
    });

    timer = setInterval(() => {
        if (!isPaused) {
            seconds++;
            timerDisplay.textContent = seconds;
        }
    }, 1000);
}


function calculateScore() {
    score = Math.max(0, 1000-(moves * 5 + seconds * 2));
    scoreDisplay.textContent = score;
}


function handleCardClick(card, image) {
    if (isPaused) return;
    if (card.classList.contains("flip") || flippedCards.length === 2) return;

    card.classList.add("flip");
    flippedCards.push({ card, image });

    if (flippedCards.length === 2) {
        moves++;
        movesCounter.textContent = moves;
        calculateScore(); // update score after every move

        const [first, second] = flippedCards;
        if (first.image === second.image) {
            matchedPairs++;
            matchSound.play(); // ✅ match sound
            flippedCards = [];

            if (matchedPairs === (gridSize * gridSize) / 2) {
                clearInterval(timer);
                message.classList.add("show");
                calculateScore();
                victorySound.play(); // 🎉 victory sound
                message.innerHTML = `🎉 Congratulations! 🎉<br>Your score: <strong>${score}</strong>`;
            }
        } 
        else {
            mismatchSound.play(); // ❌ mismatch sound
            setTimeout(() => {
                first.card.classList.remove("flip");
                second.card.classList.remove("flip");
                flippedCards = [];
            }, 1000);
        }
    }
}

const instructionsBtn = document.getElementById("instructions-btn");
const modal = document.getElementById("instructions-modal");
const closeBtn = document.querySelector(".close-btn");

instructionsBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

newGameBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", startGame);
document.getElementById("theme").addEventListener("change", startGame);
pauseResumeBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseResumeBtn.textContent = isPaused ? "Resume" : "Pause";
});

window.onload = startGame;