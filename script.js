// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const playerWidth = 30;
const playerHeight = 10;
const playerSpeed = 5;
let playerX = canvas.width / 2 - playerWidth / 2;
const bulletWidth = 3;
const bulletHeight = 10;
const bulletSpeed = 8;
let bullets = [];
const alienRowCount = 5;
const alienColumnCount = 10;
const alienWidth = 30;
const alienHeight = 20;
const alienPadding = 10;
const alienOffsetTop = 30;
const alienOffsetLeft = 30;
const aliens = [];

// Initialize aliens
for (let c = 0; c < alienColumnCount; c++) {
    aliens[c] = [];
    for (let r = 0; r < alienRowCount; r++) {
        aliens[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Player controls
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
    // Prevent spacebar from scrolling the page
    else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        // Create a new bullet at the current position of the player
        bullets.push({ x: playerX + playerWidth / 2 - bulletWidth / 2, y: canvas.height - playerHeight });
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Player movement
function movePlayer() {
    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    } else if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }
}


// Draw player
function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

// Draw bullets
function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        ctx.beginPath();
        ctx.rect(bullets[i].x, bullets[i].y, bulletWidth, bulletHeight);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}

// Move bullets
function moveBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bulletSpeed;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}


// Draw aliens
function drawAliens() {
    for (let c = 0; c < alienColumnCount; c++) {
        for (let r = 0; r < alienRowCount; r++) {
            if (aliens[c][r].status === 1) {
                const alienX = c * (alienWidth + alienPadding) + alienOffsetLeft;
                const alienY = r * (alienHeight + alienPadding) + alienOffsetTop;
                aliens[c][r].x = alienX;
                aliens[c][r].y = alienY;
                ctx.beginPath();
                ctx.rect(alienX, alienY, alienWidth, alienHeight);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
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
                    // Exit the loops after a collision is detected
                    return;
                }
            }
        }
    }
}

// Game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePlayer();
    drawPlayer();
    moveBullets();
    drawBullets();
    drawAliens();
    collisionDetection();
    requestAnimationFrame(draw);
}

draw();
