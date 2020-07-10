// JavaScript source code
let player, ball, greenBricks, blueBricks, redBricks, cursors;
let gameStarted = false;
let openingText, gameOverText, playerWonText, scoreText, highScoreText, replayText;
let frameCounter = 0;

function isGameOver(world) {
    //console.log(Boolean(ball.body.y > world.bounds.height));
    return ball.body.y > world.bounds.height;
}

function isWon() {
    return greenBricks.countActive()
        + blueBricks.countActive()
        + redBricks.countActive() === 0;
}

function bricksHit() {
    return (greenBricks.getLength() - greenBricks.countActive())
        + ( (redBricks.getLength() - redBricks.countActive()) * 3)
        + ( (blueBricks.getLength() - blueBricks.countActive()) * 2);
}

function hitBrick(ball, brick) {
    brick.disableBody(true, true);

    if (ball.body.velocity.x === 0) {
        randNum = Math.random();
        if (randNum >= 0.5) {
            ball.body.setVelocityX(150);
        } else {
            ball.body.setVelocityX(-150);
        }
    }
    else {
        ball.setVelocityX(Math.abs(ball.body.velocity.x) + (Math.random() * 100));
    }
}

function hitPlayer(ball, player) {
    // Increase the velocity of the ball after it bounces
    ball.setVelocityY(ball.body.velocity.y - 5);

    randNum = Math.random()
    let newXVelocity = Math.abs(ball.body.velocity.x) + (Math.random() * 100);
    // If the ball is to the left of the player, ensure the X-velocity is negative
    if (ball.x < player.x) {
        ball.setVelocityX(-newXVelocity);
    } else {
        ball.setVelocityX(newXVelocity);
    }
}