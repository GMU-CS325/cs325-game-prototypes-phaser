//BANApifwje ajioef oijegfojidfs oijdflij ijdfjludfuhjhdfjuhdvfshujvfuhj
let playerOne, playerTwo;
let bulletOne, bulletTwo;

let keyENTER;

let gameStarted = false;
let whoWon = "Player One";

let openingText, aPlayerWonText;
let frameCounter = 0;

function ifSomeoneWon() {
    //if playerTwo.disableBody(true, true); happened
    if (!playerTwo.active==true) {
        whoWon = "Player One";
        return true;
    }
    else if(!playerOne.active==true) {
        whoWon = "Player Two";
        return true;
    }
    return false;
}