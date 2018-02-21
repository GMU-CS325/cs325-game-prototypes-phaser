"use strict";

GameStates.makeGame = function(game, shared) {
  // Create your own variables.
  var connections = [];
  var victoryConnections = [];
  // var counter = 0;
  var star1 = null, star2 = null;

  function quitGame() {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    game.state.start('MainMenu');
  }

  function selectStar(star) {
    if (star.animations.paused == true) {
      star.animations.paused = false;
      star.animations.play('twinkle');
    }
    else {
      star.animations.stop(null, true);
      star.animations.paused = true;
    }
    if (star1 == null) {
      star1 = star;
    }
    else if (star2 == null && star != star1) {
      star2 = star;
      let line = lineExists(star1, star2);
      if (line != null) {
        removeLine(line);
        deselectStars();
      }
      else {
        drawLine();
      }
    }
  }

  function lineExists(star1, star2) {
    if (connections.length == 0) return null;
    let pos1 = [star1.worldPosition.x + 8, star1.worldPosition.y + 8];
    let pos2 = [star2.worldPosition.x + 8, star2.worldPosition.y + 8];
    let line = null;
    connections.forEach((connection) => {
      if ((compareArray(connection.star1, pos1) || compareArray(connection.star2, pos1)) && (compareArray(connection.star1, pos2) || compareArray(connection.star2, pos2))) {
        line = connection;
      }
    });
    return line;
  }

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

  function deselectStars() {
    star1.animations.stop(null, true);
    star1.animations.paused = true;
    star1 = null;
    star2.animations.stop(null, true);
    star2.animations.paused = true;
    star2 = null;
  }

  function removeLine(line) {
    line.drawer.kill();
    connections.splice(connections.indexOf(line), 1);
  }

  function compareArray(array1, array2) {
    if (array1.length != array2.length) return false;
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] != array2[i]) {
        return false;
      }
    }
    return true;
  }
  // Manually define all of the connections needed to win.
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

  function determineScore() {
    let correctConnections = 0;
    let incorrectConnections = 0;
    let found = false;
    for (var i = 0; i < connections.length; i++) {
      let line = connections[i];
      for (var j = 0; j < victoryConnections.length; j++) {
        let winLine = victoryConnections[j];
        if ((compareArray(line.star1, winLine.star1) || compareArray(line.star2, winLine.star1)) && (compareArray(line.star1, winLine.star2) || compareArray(line.star2, winLine.star2))) {
          found = true;
          break;
        }
      }
      if (found) correctConnections++;
      else incorrectConnections++;
      found = false;
    }
    let score = (correctConnections * 100) - (incorrectConnections * 100);
    if (score < 0) score = 0;
    console.log(score);
    return score;
  }

  return {
    create: function () {
      let background = game.add.sprite(0, 0, 'background');
      background.width = 800;
			background.height = 600;

      let winningStars = game.add.group();
      let constellation = game.add.tilemap('level1');

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

      this.stars = game.add.group();
			for (var i = 0; i < 10; i++) {
				this.stars.add(game.add.sprite(Math.floor((Math.random() * 780) + 20), Math.floor((Math.random() * 400) + 20), 'twinkleStar'));
        this.stars.getAt(i).inputEnabled = true;
        this.stars.getAt(i).events.onInputDown.add(selectStar, this);
			}
			this.stars.callAll('animations.add', 'animations', 'twinkle', [0, 1, 2, 3, 4, 5, 6], 10, true);
      this.stars.forEach((star) => {
        star.animations.paused = true;
      });

      let playButtonFrame = game.add.sprite(game.world.centerX - 132, 350, 'buttonFrame');
      let playButton = game.add.button(game.world.centerX - 128, 353, 'buttons', determineScore, null, 0, 1, 2);
    },

    update: function () {


    }
  };
};
