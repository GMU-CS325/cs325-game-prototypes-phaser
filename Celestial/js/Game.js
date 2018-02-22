"use strict";

GameStates.makeGame = function(game, shared) {
  // All the globals needed for all the different helper functions.
  var connections = [];
  var victoryConnections = [];
  var star1 = null, star2 = null;
  var winningStars = null, stars = null;
  var timer = null;
  var gameOver = false, timerAvailable = false;
  var finished = null;
  var music = null;

  function quitGame() {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    game.state.start('MainMenu');
  }

  // Allows the player to click on a star and select it for drawing.
  function selectStar(star) {
    // Maintains animation state.
    if (star.animations.paused == true) {
      star.animations.paused = false;
      star.animations.play('twinkle');
    }
    else {
      star.animations.stop(null, true);
      star.animations.paused = true;
    }
    // Ensures the proper stars are selected.
    if (star1 == null) {
      star1 = star;
    }
    else if (star2 == null && star != star1) {
      star2 = star;
      let line = lineExists(star1, star2);
      // If there is a line, remove it instead of adding another.
      if (line != null) {
        removeLine(line);
        deselectStars();
      }
      // Otherwise add line.
      else {
        drawLine();
      }
    }
    // Makes sure that animations still play if reselecting the same star.
    else {
      if (star.animations.paused == true) {
        star.animations.paused = false;
        star.animations.play('twinkle');
      }
      else {
        star.animations.stop(null, true);
        star.animations.paused = true;
      }
    }
  }

  // Helper funciton to check if a line exists between two stars.
  function lineExists(star1, star2) {
    if (connections.length == 0) return null;
    let pos1 = [star1.worldPosition.x + 8, star1.worldPosition.y + 8];
    let pos2 = [star2.worldPosition.x + 8, star2.worldPosition.y + 8];
    let line = null;
    // Uses helper function compareArray to check if the positions are equivalent.
    connections.forEach((connection) => {
      if ((compareArray(connection.star1, pos1) || compareArray(connection.star2, pos1)) && (compareArray(connection.star1, pos2) || compareArray(connection.star2, pos2))) {
        line = connection;
      }
    });
    return line;
  }

  // Draws a line between the two stars that were selected.
  function drawLine() {
    let draw = game.add.graphics();
    draw.lineStyle(1, 0xffffff, .3);

    draw.moveTo(star1.worldPosition.x + 8, star1.worldPosition.y + 8)
    draw.beginFill();
    draw.lineTo(star2.worldPosition.x + 8, star2.worldPosition.y + 8);
    draw.endFill();

    connections.push({
      drawer: draw,
      star1: [star1.worldPosition.x + 8, star1.worldPosition.y + 8],
      star2: [star2.worldPosition.x + 8, star2.worldPosition.y + 8]
    });
    deselectStars();
  }

  // Helper function that deselects stars and turns off the animations.
  function deselectStars() {
    star1.animations.stop(null, true);
    star1.animations.paused = true;
    star1 = null;
    star2.animations.stop(null, true);
    star2.animations.paused = true;
    star2 = null;
  }

  // Removes a line between to stars.
  function removeLine(line) {
    line.drawer.kill();
    connections.splice(connections.indexOf(line), 1);
  }

  // Compares the elements of an array for equivalency.
  function compareArray(array1, array2) {
    if (array1.length != array2.length) return false;
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] != array2[i]) {
        return false;
      }
    }
    return true;
  }

  // Manually define all of the connections needed to win. This was done be looking at data from tilesheet of stars.
  function defineWin(stars) {
    for (var starLayer in stars) {
      for (var item in stars[starLayer]) {
        let starData = stars[starLayer][item];

        if (starData.name == 'star1') {
          for (var checkItem in stars[starLayer]) {
            let checkStarData = stars[starLayer][checkItem];
            if (checkStarData.name == 'star2') {
              victoryConnections.push({
                star1: [Math.floor(starData.x) + 8, Math.floor(starData.y) + 8],
                star2: [Math.floor(checkStarData.x) + 8, Math.floor(checkStarData.y) + 8],
              });
            }
            else if (checkStarData.name == 'star3') {
              victoryConnections.push({
                star1: [Math.floor(starData.x) + 8, Math.floor(starData.y) + 8],
                star2: [Math.floor(checkStarData.x) + 8, Math.floor(checkStarData.y) + 8],
              });
            }
          }
        }

        else if (starData.name == 'star4') {
          for (var checkItem in stars[starLayer]) {
            let checkStarData = stars[starLayer][checkItem];
            if (checkStarData.name == 'star2') {
              victoryConnections.push({
                star1: [Math.floor(starData.x) + 8, Math.floor(starData.y) + 8],
                star2: [Math.floor(checkStarData.x) + 8, Math.floor(checkStarData.y) + 8],
              });
            }
            else if (checkStarData.name == 'star3') {
              victoryConnections.push({
                star1: [Math.floor(starData.x) + 8, Math.floor(starData.y) + 8],
                star2: [Math.floor(checkStarData.x) + 8, Math.floor(checkStarData.y) + 8],
              });
            }
          }
        }

        else if (starData.name == 'star3') {
          for (var checkItem in stars[starLayer]) {
            let checkStarData = stars[starLayer][checkItem];
            if (checkStarData.name == 'star5') {
              victoryConnections.push({
                star1: [Math.floor(starData.x) + 8, Math.floor(starData.y) + 8],
                star2: [Math.floor(checkStarData.x) + 8, Math.floor(checkStarData.y) + 8],
              });
            }
          }
        }

        else if (starData.name == 'star5') {
          for (var checkItem in stars[starLayer]) {
            let checkStarData = stars[starLayer][checkItem];
            if (checkStarData.name == 'star6') {
              victoryConnections.push({
                star1: [Math.floor(starData.x) + 8, Math.floor(starData.y) + 8],
                star2: [Math.floor(checkStarData.x) + 8, Math.floor(checkStarData.y) + 8],
              });
            }
          }
        }

        else if (starData.name == 'star6') {
          for (var checkItem in stars[starLayer]) {
            let checkStarData = stars[starLayer][checkItem];
            if (checkStarData.name == 'star7') {
              victoryConnections.push({
                star1: [Math.floor(starData.x) + 8, Math.floor(starData.y) + 8],
                star2: [Math.floor(checkStarData.x) + 8, Math.floor(checkStarData.y) + 8],
              });
            }
          }
        }
      }
    }
  }

  // Iterates through chosen connections and correct connections and compares to see how accurate the player was.
  function determineScore() {
    let correctConnections = 0;
    let incorrectConnections = 0;
    let found = false;
    // Iterates through both arrays of connections.
    for (var i = 0; i < connections.length; i++) {
      let line = connections[i];
      for (var j = 0; j < victoryConnections.length; j++) {
        let winLine = victoryConnections[j];
        // If there was a connection then yay.
        if ((compareArray(line.star1, winLine.star1) || compareArray(line.star2, winLine.star1)) && (compareArray(line.star1, winLine.star2) || compareArray(line.star2, winLine.star2))) {
          found = true;
          break;
        }
      }
      // Maintains number of correct and incorrect connections.
      if (found) correctConnections++;
      else incorrectConnections++;
      found = false;
    }
    // Converts connections and time into score.
    let score = (correctConnections * 100) - (incorrectConnections * 100);
    score += Math.floor(timer.duration / 1000);
    if (score < 0) score = 0;
    return score;
  }

  // Gets rid of player input and shows the player that the level is over.
  function endLevel() {
    if (gameOver) return;
    winningStars.forEach((star) => {
      star.inputEnabled = false;
    });
    stars.forEach((star) => {
      star.inputEnabled = false;
    });
    finished = game.add.sprite(0, 0, 'finished');
    finished.width = 800;
    finished.height = 600;
    timer.destroy();
    timerAvailable = false;
    gameOver = true;
    let endTimer = game.time.create();
    let scoreScreenTimer = endTimer.add(Phaser.Timer.SECOND * 3, showScore, this);
    endTimer.start();
  }

  // Maintains the end of level score screen.
  function showScore() {
    finished.kill();
    // Determines the number of stars the player earned and if they can continue.
    let score = determineScore();
    let win = false;
    let starNum = 0;
    if (score >= 500) {
      win = true;
      starNum++;
      if (score >= 600) {
        starNum++;
        if (score >= 700) {
          starNum++;
        }
      }
    }
    // If they can continue, show level complete with number of earned stars and score. Give button to continue
    if (win) {
      let complete = game.add.sprite(0, 0, 'levelComplete');

      if (starNum == 1) {
        let star1 = game.add.sprite(game.world.centerX - 64, 200, 'star');
        let star2 = game.add.sprite(game.world.centerX - 16, 200, 'noStar');
        let star3 = game.add.sprite(game.world.centerX + 32, 200, 'noStar');
      }
      else if (starNum == 2) {
        let star1 = game.add.sprite(game.world.centerX - 64, 200, 'star');
        let star2 = game.add.sprite(game.world.centerX - 16, 200, 'star');
        let star3 = game.add.sprite(game.world.centerX + 32, 200, 'noStar');
      }
      else {
        let star1 = game.add.sprite(game.world.centerX - 64, 200, 'star');
        let star2 = game.add.sprite(game.world.centerX - 16, 200, 'star');
        let star3 = game.add.sprite(game.world.centerX + 32, 200, 'star');
      }

      let scoreCounter = game.add.text(game.world.centerX, 300, score, {fill:'white', fontSize:'38px'});
      /*
      scoreCounter.setTextBounds(100, 200, 700, 300);
      scoreCounter.boundsAlignH = 'center';
      scoreCounter.boundsAlignV = 'middle';
      */
      let continueButtonFrame = game.add.sprite(game.world.centerX - 132, 435, 'buttonFrame');
      let continueButton = game.add.button(game.world.centerX - 128, 438, 'buttons', nextLevel, null, 5, 1, 3);
    }
    // If they failed, show level failed with no stars. Give button to restart.
    else {
      let failed = game.add.sprite(0, 0, 'levelFailed');

      let star1 = game.add.sprite(game.world.centerX - 64, 200, 'noStar');
      let star2 = game.add.sprite(game.world.centerX - 16, 200, 'noStar');
      let star3 = game.add.sprite(game.world.centerX + 32, 200, 'noStar');

      let scoreCounter = game.add.text(game.world.centerX, 300, score, {fill:'white', fontSize:'38px', boundsAlignH:'center', boundsAlignV:'middle'});

      let retryButtonFrame = game.add.sprite(game.world.centerX - 132, 435, 'buttonFrame');
      let retryButton = game.add.button(game.world.centerX - 128, 438, 'buttons', resetLevel, null, 11, 7, 9);

    }
  }

  // Resets the level.
  function resetLevel() {
    music.stop();
    winningStars.forEach((star) => {
      star.inputEnabled = true;
    });
    stars.forEach((star) => {
      star.inputEnabled = true;
    });

    gameOver = false;
    game.state.restart();
  }

  // Moves to next level ---- THERE HAS TO BE A BETTER WAY THAN TO HAVE ALL THIS CODE PER LEVEL.
  // CURRENTLY DOES NOTHING, AS THERE IS ONLY THE ONE LEVEL.
  function nextLevel() {

    //music.stop();
    //game.state.start('Level2');
  }

  return {
    create: function () {
      // Defines everything that the game state needs.
      music = game.add.audio('titleMusic');
			music.loop = true;
			music.volume = .3;
      music.play();
      
      let background = game.add.sprite(0, 0, 'background');
      background.width = 800;
			background.height = 600;

      winningStars = game.add.group();
      let constellation = game.add.tilemap('level1');

      // Gets the winning stars from the tilemap.
      for (var starLayer in constellation.objects) {
        for (var item in constellation.objects[starLayer]) {
          let starData = constellation.objects[starLayer][item];
          let star = game.add.sprite(Math.floor(starData.x), Math.floor(starData.y), 'twinkleStar');
          star.inputEnabled = true;
          star.events.onInputDown.add(selectStar, this);
          star.animations.add('twinkle',  [0, 1, 2, 3, 4, 5, 6], 10, true);
          star.animations.paused = true;
          winningStars.add(star);
        }
        defineWin(constellation.objects);
      }

      // Creates all the random incorrect stars.
      stars = game.add.group();
			for (var i = 0; i < 10; i++) {
				stars.add(game.add.sprite(Math.floor((Math.random() * 780) + 20), Math.floor((Math.random() * 400) + 20), 'twinkleStar'));
        stars.getAt(i).inputEnabled = true;
        stars.getAt(i).events.onInputDown.add(selectStar, this);
			}
			stars.callAll('animations.add', 'animations', 'twinkle', [0, 1, 2, 3, 4, 5, 6], 10, true);
      stars.forEach((star) => {
        star.animations.paused = true;
      });

      // Creates the hud.
      let hud = game.add.group();
      let hudDrawer = game.add.graphics();
      hudDrawer.beginFill(0xc188f7, .25);
      hudDrawer.drawRect(0, 525, 800, 600);
      hudDrawer.endFill();
      hud.add(hudDrawer);

      let playButtonFrame = game.add.sprite(game.world.centerX - 132, 535, 'buttonFrame');
      let playButton = game.add.button(game.world.centerX - 128, 538, 'buttons', endLevel, null, 6, 8, 10);
      hud.add(playButtonFrame);
      hud.add(playButton);
      let hourglass = game.add.sprite(600, 545, 'hourglass');
      hud.add(hourglass);
      this.timeCounter = game.add.text(640, 540, '', {fill:'white', fontSize:'35px'});
      hud.add(this.timeCounter);

      // Creates the timer for the level.
      timerAvailable = true;
      timer = game.time.create();
      let timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, endLevel, this);
      timer.start();
    },

    update: function () {
      // Updates the timer each second.
      if (timerAvailable) this.timeCounter.text = Math.floor(timer.duration / 1000);
    }
  };
};
