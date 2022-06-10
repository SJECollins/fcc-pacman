const grid = document.querySelector(".grid")
const score = document.getElementById("score")

const width = 28
let points = 0

const layout = [
    /**
     * 0 - pacman
     * 1 - wall
     * 2 - ghost-lair
     * 3 - pellets
     * 4 - empty
     */
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

const squares = []

// Draw board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement("div")
        grid.appendChild(square)
        squares.push(square)

        // Add layout to board
        if (layout[i] === 0) {
            squares[i].classList.add("pac-dot")
        } else if (layout[i] === 1) {
            squares[i].classList.add("wall")
        } else if (layout[i] === 2) {
            squares[i].classList.add("ghost-lair")
        } else if (layout[i] === 3) {
            squares[i].classList.add("pellet")
        }
    }
}

createBoard()

// Pacman start
let pacmanPosition = 490
squares[pacmanPosition].classList.add("pacman")

// Move
function movePacman(event) {
    squares[pacmanPosition].classList.remove("pacman")

    switch(event.keyCode) {
        case 37:
            if (pacmanPosition % width !== 0 && 
                !squares[pacmanPosition - 1].classList.contains("wall") &&
                !squares[pacmanPosition - 1].classList.contains("ghost-lair")) pacmanPosition -= 1

                // Check if pacman is in the left exit
                if ((pacmanPosition - 1) === 363) {
                    pacmanPosition = 391
                }

            break
        case 38:
            if (pacmanPosition - width >= 0 && 
                !squares[pacmanPosition - width].classList.contains("wall") &&
                !squares[pacmanPosition - width].classList.contains("ghost-lair")) pacmanPosition -= width
            break
        case 39:
            if (pacmanPosition % width < width - 1 && 
                !squares[pacmanPosition + 1].classList.contains("wall") &&
                !squares[pacmanPosition + 1].classList.contains("ghost-lair")) pacmanPosition += 1

                // Check if pacman is in the right exit
                if ((pacmanPosition + 1) === 392) {
                    pacmanPosition = 364
                }

            break
        case 40:
            if (pacmanPosition + width < width * width && 
                !squares[pacmanPosition + width].classList.contains("wall") &&
                !squares[pacmanPosition + width].classList.contains("ghost-lair")) pacmanPosition += width
            break
    }
    squares[pacmanPosition].classList.add("pacman")
    dotEaten()
    pelletEaten()
    checkGameOver()
    checkWin()
}

document.addEventListener("keyup", movePacman)

function dotEaten() {
    if (squares[pacmanPosition].classList.contains("pac-dot")) {
        points++
        score.innerHTML = points
        squares[pacmanPosition].classList.remove("pac-dot")
    }
}

// Eating a pellet
function pelletEaten() {
    if (squares[pacmanPosition].classList.contains("pellet")) {
        points += 10
        score.innerHTML = points
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unscareGhosts, 10000)
        squares[pacmanPosition].classList.remove("pellet")
    }
}

function unscareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// Create ghosts
class Ghost {
    constructor(className, startPosition, speed) {
        this.className = className
        this.startPosition = startPosition
        this.speed = speed
        this.currentPosition = this.startPosition
        this.timerId = NaN
        this.isScared = false
    }
}

ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500)
]

// Draw ghosts to grid
ghosts.forEach(ghost => {
    squares[ghost.currentPosition].classList.add(ghost.className)
    squares[ghost.currentPosition].classList.add("ghost")
})

// Move ghost randomly
ghosts.forEach(ghost => moveGhost(ghost))

// Function to move ghosts
function moveGhost(ghost) {
    const directions = [-1, +1, +width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
        // if next square does not contain a wall or ghost, can move there
        if (!squares[ghost.currentPosition + direction].classList.contains("wall") &&
            !squares[ghost.currentPosition + direction].classList.contains("ghost")) {
                squares[ghost.currentPosition].classList.remove(ghost.className, "ghost", "scared-ghost")
                ghost.currentPosition += direction
                squares[ghost.currentPosition].classList.add(ghost.className, "ghost")

            }  else direction = directions[Math.floor(Math.random() * directions.length)]
        // else try move somewhere else

        if (ghost.isScared) {
            squares[ghost.currentPosition].classList.add("scared-ghost")
        }

        // Pacman eats the ghost
        if (ghost.isScared && squares[ghost.currentPosition].classList.contains("pacman")) {
            squares[ghost.currentPosition].classList.remove(ghost.className, "ghost", "scared-ghost")
            ghost.currentPosition = ghost.startPosition
            points += 100
            score.innerHTML = points
            squares[ghost.currentPosition].classList.add(ghost.className, "ghost")
        }
        checkGameOver()
    }, ghost.speed)
}

function checkGameOver() {
    if (squares[pacmanPosition].classList.contains("ghost") &&
        !squares[pacmanPosition].classList.contains("scared-ghost")) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            score.innerHTML = "Game OVER"
        }
}

// Check for a win
function checkWin() {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup", movePacman)
        score.innerHTML = "You Win"
    }
}