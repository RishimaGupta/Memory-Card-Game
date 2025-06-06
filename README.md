# Memory-Card-Game <br>
## Deployed Website Link <br>
https://rishimagupta.github.io/Memory-Card-Game/ <br>
## Project Overview <br>
This is a classic web-based Memory Card Game built with HTML, CSS, and JavaScript. The goal is simple: flip cards to reveal hidden emojis and find matching pairs. Test your memory, challenge yourself with different difficulties, and aim for the highest score! <br>
## Key Features Implemented <br>
* *Dynamic Grid:* Cards are dynamically generated to form a 4x4 (Easy) or 6x6 (Hard) grid. <br>
* *Card Flipping & Matching Logic:* Click cards to reveal emojis; matching pairs stay face up, non-matching cards flip back down after a short delay. <br>
* *Game State Tracking:* Keeps count of moves and tracks elapsed time for each game. <br>
* *Scoring System:* Earn points based on your performance – fewer moves and less time result in a higher score! <br>
* *Multiple Themes:* Choose from fun card themes like "Animals," "Food," and "Emojis." <br>
* *Difficulty Levels:* Select between "Easy" (4x4 grid) and "Hard" (6x6 grid) to adjust the challenge. <br>
* *Pause/Resume Functionality:* Need a break? Pause the game and resume exactly where you left off. <br>
* *Sound Effects:* Engaging audio cues for matches, mismatches, and victory! <br>
* *Instructions Modal*: A clear "How to Play" guide accessible via a dedicated button. <br>
* *Responsive Design:* Fully optimized for various screen sizes, ensuring a smooth experience on both desktop and mobile devices. <br>
## How to Play <br>
1. *Start a New Game:* Click the "New Game" button. <br>
2. *Choose Your Challenge:* Select a "Theme" (Animals, Food, Emojis) and "Difficulty" (Easy 4x4, Hard 6x6) from the dropdowns. Changing these will automatically start a new game. <br>
3. *Flip Cards:* Click on any facedown card to reveal its emoji. <br>
4. *Find Pairs:* Click a second card. <br>
  * If the emojis match, both cards will stay face up. <br>
  * If they don't match, both cards will flip back face down after a moment. <br>
5. *Track Your Progress:* Keep an eye on your "Moves" and "Time" in the control panel. <br>
6. *Score:* Your "Score" updates as you play, reflecting how efficiently you're finding matches. <br>
7. *Win!:* The game ends when all pairs are matched. A "Congratulations!" message will appear with your final score. <br>
8. *Pause:* Use the "Pause" button to temporarily stop the timer and card interaction. Click "Resume" to continue. <br>
9. *Instructions:* Click the "Instructions" button if you need a refresher on the rules. <br>
## Technologies Used <br>
* *HTML5:* For the basic structure and content of the game. <br>
* *CSS3:* For styling the game elements, creating animations, and ensuring responsiveness. <br>
* *JavaScript (ES6+):* For implementing all game logic, interactivity, dynamic content generation, and state management. <br>
## Development Highlights <br>
This project allowed for extensive practice and a deeper understanding of front-end web development principles. Specific areas of development focus include: <br>
* *Dynamic Card Generation:* Instead of hardcoding cards, JavaScript was used to programmatically create card elements based on the chosen theme and difficulty, making the game highly adaptable. <br>
* *Responsive Grid Layout:* CSS Grid with repeat() and minmax() functions, combined with @media queries, was leveraged to ensure the card grid fluidly adjusts between 4x4 and 6x6 layouts and maintains optimal spacing on all screen sizes. <br>
* *Interactive Controls:* All buttons and dropdowns were wired up using JavaScript event listeners to control game flow, difficulty changes, theme selection, and the new pause/resume feature. <br>
* *Comprehensive Game Logic:* The handleCardClick function, central to the game, was meticulously crafted to manage card flipping, pair comparison, score updates, move counting, and sound effects. <br>
* *Scoring System Implementation:* The calculateScore() function was developed to provide a meaningful scoring mechanism that rewards efficiency (fewer moves, less time). <br>
* *Animated UI Elements:* CSS transitions were utilized for smooth card flips, and CSS @keyframes animations were applied for the dynamic "fly-in" effect of the congratulatory message and the fade-in effect of the instructions modal, significantly enhancing the user experience. <br>
* *Cross-Browser Responsiveness:* Significant attention was paid to media queries to ensure the game is fully playable and visually appealing across various devices and screen dimensions. <br>
