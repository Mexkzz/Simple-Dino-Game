const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const gameOverMessage = document.getElementById('game-over-message');
let score = 0;
let scoreDisplay = document.getElementById('score');
let scoreAdded = false;

document.addEventListener('keydown', function(event) {
    jump();
});
function jump() {
    if (dino.classList != 'jump') {
        dino.classList.add('jump');
        setTimeout(function() {
            dino.classList.remove('jump');
        }, 300);
    }
}
let isAlive = setInterval(function() {
    dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
    cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 150) {
        gameOver();
    } else if (cactusLeft < 0) {
        if (!scoreAdded) {
            addScore();
            scoreAdded = true;
        }
    } else if (cactusLeft > 50) {
       scoreAdded = false; 
    }
})
function gameOver() {
    clearInterval(isAlive);
    gameOverMessage.innerHTML = 'Game Over';
    cactus.style.animationPlayState = 'paused';
}

setInterval(function() {
    const animationDuration = parseFloat(window.getComputedStyle(cactus).getPropertyValue('animation-duration'));

    animationDuration -= 0.01;
    
    if (animationDuration < 0.1) {
        animationDuration = 0.1;
    }
    cactus.style.animationDuration = animationDuration + 's';
}, 1000)

document.addEventListener('keydown', function(event) {
    gameOverMessage.innerHTML === 'Game Over' ? location.reload() : null;
});

function addScore() {
    score++;
    scoreDisplay.innerHTML = 'Score: ' + score;
}