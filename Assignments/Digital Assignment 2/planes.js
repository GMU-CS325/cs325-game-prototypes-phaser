//BANApifwje ajioef oijegfojidfs oijdflij ijdfjludfuhjhdfjuhdvfshujvfuhj
let playerOne, playerTwo;
let bulletOne, bulletTwo;

let gameStarted = false;
let whoWon = "Player One";

let openingText, aPlayerWonText;
let frameCounter = 0;

function ifSomeoneWon() {
    //if playerTwo.disableBody(true, true); happened
    if (!playerTwo.isActive()) {
        whoWon = "Player One";
        return true;
    }
    else if(!playerOne.isActive()) {
        whoWon = "Player Two";
        return true;
    }
    return false;
}