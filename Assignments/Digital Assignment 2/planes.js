let player1, player2;
let bullet1, bullet2;

let gameStarted = false;
let whoWon = "Player 1";

let openingText, aPlayerWonText;
let frameCounter = 0;

function ifSomeoneWon() {
    //if playerTwo.disableBody(true, true); happened
    if (!playerTwo.isActive()) {
        whoWon = "Player 1";
        return true;
    }
    else if(!playerOne.isActive()) {
        whoWon = "Player 2";
        return true;
    }
    return false;
}