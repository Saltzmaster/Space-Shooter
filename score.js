// Game variables
let score = 0;
const scoreDisplay = document.getElementById('score');

// Update score display
function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
}

// Collision detection
function collisionDetection() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let c = 0; c < alienColumnCount; c++) {
            for (let r = 0; r < alienRowCount; r++) {
                const a = aliens[c][r];
                if (a.status === 1 &&
                    bullets[i].x > a.x &&
                    bullets[i].x < a.x + alienWidth &&
                    bullets[i].y > a.y &&
                    bullets[i].y < a.y + alienHeight) {
                    bullets.splice(i, 1);
                    a.status = 0;
                    // Increment score when an alien is hit
                    score += 10; // Adjust score as needed
                    updateScore(); // Update score display
                    return; // Exit the loops after a collision is detected
                }
            }
        }
    }
}
