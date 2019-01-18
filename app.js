/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice0, dice1, gamePlaying, numberPlays, lastPlay;

init();


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. Random number
        dice0 = Math.floor(Math.random() * 6) + 1;
        dice1 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result

        var diceDOM0 = document.querySelector('.dice-0');
        document.querySelector('.dice-0').style.display = 'block';
        diceDOM0.style.display = "block";
        diceDOM0.src = ('dice-' + dice0 + '.png');

        var diceDOM1 = document.querySelector('.dice-1');
        document.querySelector('.dice-1').style.display = 'block';
        diceDOM0.style.display = "block";
        diceDOM1.src = ('dice-' + dice1 + '.png');

        //3. Update the round score IF the rolled number was NOt a 1

        if (dice0 !== 1 && dice1 !== 1 && (dice0 !== 6 || dice1 !== 6)) {
            //Add score

            roundScore += (dice0 + dice1);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //Next player
            console.log(dice0, dice1)
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add CURRENT score do GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= numberPlays) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice-0').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player 
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-input').addEventListener('click', function () {
    numberPlays = document.querySelector('#input').value;

    console.log(numberPlays);
    if (numberPlays === "") {
        numberPlays = 100;
    }

    document.getElementById('play').classList.add('hidden')
});

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    numberPlays = 100;

    document.getElementById('play').classList.remove('hidden')

    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';

    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';

    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastPlay = undefined;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
}
//document.querySelector('#current-' + activePlayer).textContent = dice;
/* Another way to write things in HTML
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
*/
/* A way to get things from HTML
var x = document.querySelector("#score-0").textContent;
*/

/*CODING CHALLENGES
    1 - a player looses his ENTIRE score when he rolls two 6 in a row.
    2 - add an input fied to the HTML where players can set the winning score, so that they can change the predefined score of 100.
    3 - add another dice to the game, so that there are two dices now.
*/