//BANApifwje ajioef oijegfojidfs oijdflij ijdfjludfuhjhdfjuhdvfshujvfuhj
let playerOne, playerTwo;
let bulletOne, bulletTwo;

var bulletsOne, bulletsTwo;

let keyENTER;
let cursors, playerTwoKeys;

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

function resetBullets(bulletsOne) {
    // Destroy the laser
    bulletsOne.kill();
}

function fireBullets() {
    // Get the first laser that's inactive, by passing 'false' as a parameter
    var bulletOne = bulletsOne.getFirstExists(false);
    if (bulletOne) {
        // If we have a laser, set it to the starting position
        bulletOne.reset(playerOne.x, playerOne.y - 20);
        // Give it a velocity of -500 so it starts shooting
        bulletOne.body.velocity.y = -500;
    }

}