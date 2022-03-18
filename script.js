'use strict';

// Selecting the elements

// Players
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

// Scores
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');

// Current Score
let currentScore0 = document.querySelector("#current--0");
let currentScore1 = document.querySelector("#current--1");

// Dice element
let dice = document.querySelector('.dice');
dice.classList.add('hidden');

// Setting the scores to 0
score0.textContent = 0;
score1.textContent = 0;

// Buttons
let rollDice = document.querySelector('.btn--roll');
let newGame = document.querySelector('.btn--new');
let newGame1 = document.querySelector('.btn--new1');
let hold = document.querySelector('.btn--hold');

// Main Content
let main = document.querySelector('.mainContent');

// Display Win Tag
let win = document.querySelector('#displayWinner');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];

// Utility Functions

function swap (num) {

    if (num == 0) {

        player0.classList.remove('player--active');
        player1.classList.add('player--active');

    } else {

        player1.classList.remove('player--active');
        player0.classList.add('player--active');

    }
}

function addDice () {

    dice.classList.remove('hidden');

}

function removeDice () {

    dice.classList.add('hidden');

}

function checkWin() {

    if (score0.textContent >= 100) {

        main.classList.add('hidden');
        win.classList.remove('hidden');
        let result = win.firstElementChild;
        result.textContent = "Player 1 Wins 🥇🥇";
                    
    } else if (score1.textContent >= 100) {

        main.classList.add('hidden');
        win.classList.remove('hidden');
        let result = win.firstElementChild;
        result.textContent = "Player 2 Wins 🥇🥇";

    }

}

function clearScore() {

    currentScore = 0;
    scores = [0, 0];
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;
    removeDice();


}

// Rolling dice function
rollDice.addEventListener('click', function() {

    let diceValue = Math.trunc(Math.random(1) * 6) + 1;

    dice.src = `dice-${diceValue}.png`;

    addDice();

    if (diceValue != 1) {

        currentScore = currentScore + diceValue;

        if (activePlayer == 0) {

            currentScore0.textContent = currentScore;

        } else {

            currentScore1.textContent = currentScore;

        }

    } else {

        if (activePlayer == 0) {

            currentScore0.textContent = 0;
            currentScore = 0;
            activePlayer = 1;
            swap(0); 

        } else {
            
            currentScore1.textContent = 0;
            activePlayer = 0;
            currentScore = 0;
            swap(1);
        }
        
    }

});

// Hold Button
hold.addEventListener('click', function() {

    removeDice();

    if (activePlayer == 0) {

        activePlayer = 1;
        scores[0] += currentScore;
        currentScore = 0;
        currentScore0.textContent = 0;
        score0.textContent = scores[0];
        swap(0);
        checkWin();

    } else {

        activePlayer = 0;
        scores[1] += currentScore;
        currentScore = 0;
        currentScore1.textContent = 0;
        score1.textContent = scores[1];
        swap(1);
        checkWin();

    }

});


// New Game
newGame.addEventListener('click', clearScore);

// New Game 
newGame1.addEventListener('click', function() {

    clearScore();
    win.classList.add('hidden');
    main.classList.remove('hidden');

})