//BANApifwje ajioef oijegfojidfs oijdflij ijdfjludfuhjhdfjuhdvfshujvfuhj
let playerOne, playerTwo;
let bulletOne, bulletTwo;

let bulletsOne, bulletsTwo;

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

function addBulletOne() {
    var bulletOne = bulletsOne.get(playerOne.x, playerOne.y);

    if (!bulletOne) return; // None free

    activateBulletOne(bulletOne);

}

function activateBulletOne(bulletOne) {
    bulletOne
        .setActive(true)
        .setVisible(true)
        
}

function removebulletOne() {

}