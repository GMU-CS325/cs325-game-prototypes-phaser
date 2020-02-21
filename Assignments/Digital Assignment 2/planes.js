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
let shotFrequency = 500;
let lastShot = 0;
let lastShotTwo = 0;

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

function addBulletOne(physics, game) {
    if (lastShot == 0)
        lastShot = new Date().getTime();
    var currentTime = new Date().getTime();
    if (currentTime - lastShot < shotFrequency)
        return;

    var bulletOne = bulletsOne.get(playerOne.x, playerOne.y);

    if (!bulletOne) return; // None free

    console.log(this);
    physics.world.enable(bulletOne);
    physics.velocityFromAngle(playerOne.angle, 300, bulletOne.body.velocity);
    bulletOne.setAngle(playerOne.angle);
    lastShot = currentTime;
    activateBulletOne(bulletOne);

}

function activateBulletOne(bulletOne) {
    bulletOne
        .setActive(true)
        .setVisible(true)
    //bulletOne.reset(playerOne.x, playerOne.y);
    //bulletOne.body.velocity.y = -300;
}

function removebulletOne() {

}

function addBulletTwo(physics, game) {
    if (lastShotTwo == 0)
        lastShotTwo = new Date().getTime();

    var currentTime = new Date().getTime();
    if (currentTime - lastShotTwo < shotFrequency)
        return;

    var bulletTwo = bulletsTwo.get(playerTwo.x, playerTwo.y);
    //Hello there

    if (!bulletTwo) return; // None free

    console.log(this);
    bulletTwo.setAngle(playerTwo.angle);
    physics.world.enable(bulletTwo);

    physics.velocityFromAngle(playerTwo.angle, 300, bulletTwo.body.velocity);
    lastShotTwo = currentTime;
    activateBulletTwo(bulletTwo);

}

function activateBulletTwo(bulletTwo) {
    bulletTwo
        .setActive(true)
        .setVisible(true)
    //bulletOne.reset(playerOne.x, playerOne.y);
    //bulletOne.body.velocity.y = -300;
}

function removebulletTwo() {

}