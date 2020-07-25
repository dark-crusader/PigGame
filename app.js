/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, winscore;

if (!winscore) {
  winscore = 10;
}

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    dice = getNextNumber();
    changeDiceImage(dice);
    changeRoundScore(dice);

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[activePlayer] += roundScore;
    roundScore = 0;
    switchPlayer();
    updateScores();
});

document.querySelector('.btn-new').addEventListener('click', function() {
    init();
});


// Initialize the game variables
function init() {
    scores = [0, 0];            // Keeps scores of the players
    roundScore = 0;             // Score of the current round
    activePlayer = 0;           // Keeps track of the player whose chance it is
    dice = getNextNumber();     // Initial random dice variable
    document.querySelector('.dice').style.display = 'none'; // Setting dice image to not visible initially
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    for(var i = 1; i < scores.length; i++) {
        document.querySelector('.player-' + i + '-panel').classList.remove('active');
    }
    updateScores();
}

function getNextNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function changeDiceImage(n) {
    var diceImg = document.querySelector('.dice');
    diceImg.src = 'img/dice-' + n + '.png';
    diceImg.style.display = 'block';
}

function changeRoundScore(n) {
    if (n === 1) {
        roundScore = 0;
        updateScores();
        switchPlayer();
    } else {
        roundScore += n;
        updateScores();
    }
}

function switchPlayer() {
    var previousPlayer = document.querySelector('.player-' + activePlayer + '-panel');
    previousPlayer.classList.remove('active');
    activePlayer = getNextPlayer();
    var nextPlayer = document.querySelector('.player-' + activePlayer + '-panel');
    nextPlayer.classList.add('active');
}

function getNextPlayer() {
    return activePlayer === 0 ? 1 : 0;
}

function updateScores() {
    for(var i = 0; i < scores.length; i++) {
        if(scores[i] >= winscore) {
            gameOver(i);
            break;
        }
        document.querySelector('#score-' + i).textContent = scores[i];
        document.querySelector('#current-' + i).textContent = 0;
    }
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
}


function gameOver(i) {
    document.getElementById('name-' + i).textContent = 'WINNER';
    var win = setInterval(function() {
        document.querySelector('.player-' + i + '-panel').classList.toggle('winner');
    }, 350);
    setTimeout(() => {
        clearInterval(win);
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
        document.getElementById('name-' + i).textContent = 'PLAYER ' + (i+1);
    }, 4000);
    alert('Player ' + (i+1) + ' has won the game.');
    init();
}
