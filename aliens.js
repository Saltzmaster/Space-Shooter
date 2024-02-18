// Alien movement variables
let alienDirection = 1; // 1: right, -1: left
let alienShiftDown = false; // Flag to indicate if aliens should shift down

// Move aliens
function moveAliens() {
    // Check if aliens should shift down
    if (alienShiftDown) {
        for (let c = 0; c < alienColumnCount; c++) {
            for (let r = 0; r < alienRowCount; r++) {
                aliens[c][r].y += 5; // Shift aliens down by 5 pixels
            }
        }
        alienShiftDown = false; // Reset flag after shifting down
    } else {
        // Move aliens horizontally
        for (let c = 0; c < alienColumnCount; c++) {
            for (let r = 0; r < alienRowCount; r++) {
                aliens[c][r].x += 5 * alienDirection; // Adjust movement speed as needed
            }
        }

        // Check if aliens have reached the canvas boundary
        let hitBoundary = false;
        for (let c = 0; c < alienColumnCount && !hitBoundary; c++) {
            for (let r = 0; r < alienRowCount; r++) {
                const a = aliens[c][r];
                if ((a.x <= 0 && alienDirection === -1) || (a.x + alienWidth >= canvas.width && alienDirection === 1)) {
                    hitBoundary = true;
                    break;
                }
            }
        }

        // If aliens hit the boundary, adjust their position to the opposite side
        if (hitBoundary) {
            for (let c = 0; c < alienColumnCount; c++) {
                for (let r = 0; r < alienRowCount; r++) {
                    aliens[c][r].y += alienHeight; // Move aliens down
                    aliens[c][r].x += canvas.width / 2 * alienDirection; // Move aliens to the opposite side
                }
            }
            alienDirection *= -1; // Change direction
        }
    }
}



// Update alien direction
function updateAlienDirection() {
    console.log("Updating alien direction");
    // Check if aliens have reached the canvas boundary
    let hitBoundary = false;
    for (let c = 0; c < alienColumnCount && !hitBoundary; c++) {
        for (let r = 0; r < alienRowCount; r++) {
            const a = aliens[c][r];
            console.log("Alien position:", a.x, a.y);
            console.log("Canvas width:", canvas.width);
            if ((a.x <= 0 && alienDirection === -1) || (a.x + alienWidth >= canvas.width && alienDirection === 1)) {
                console.log("Aliens hit the boundary");
                hitBoundary = true;
                break;
            }
        }
    }
    // Check if aliens have reached the bottom of the canvas
    let bottomReached = false;
    for (let r = 0; r < alienRowCount; r++) {
        const a = aliens[0][r]; // Check the first column of aliens
        if (a.y + alienHeight >= canvas.height) {
            console.log("Aliens reached the bottom");
            bottomReached = true;
            break;
        }
    }
    // If aliens hit the boundary or reach the bottom, change direction and shift down
    if (hitBoundary || bottomReached) {
        console.log("Changing direction and shifting down");
        alienDirection *= -1; // Change direction
        alienShiftDown = true; // Shift aliens down
    } else {
        console.log("No boundary hit");
        alienShiftDown = false; // Reset shift down flag if aliens haven't hit the boundary
    }
}


