"use strict";

GameStates.makeGame = function(game, shared) {
  // Create your own variables.
  var connections = [];
  var counter = 0;
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
      line = lineExists(star1, star2);
      if (line != null) {
        removeLine(line);
      }
      else {
        drawLine();
      }
    }
  }

  function lineExists(star1, star2) {
    let pos1 = [star1.worldPosition.x + 8, star1.worldPosition.y + 8];
    let pos2 = [star2.worldPosition.x + 8, star2.worldPosition.y + 8];
    connections.forEach((connection) => {
      if (connections.star1 == pos1 || connections.star2 == pos1 && connections.star1 == pos2 || connections.star2 == pos2) {
        return connection;
      }
      else {
        return null;
      }
    });
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

  return {
    create: function () {
      let background = game.add.sprite(0, 0, 'background');
      background.width = 800;
			background.height = 600;

      this.stars = game.add.group();
			for (var i = 0; i < 10; i++) {
				this.stars.add(game.add.sprite(Math.floor((Math.random() * 780) + 20), Math.floor((Math.random() * 400) + 20), 'twinkleStar'));
        this.stars.getAt(i).inputEnabled = true;
        this.stars.getAt(i).events.onInputDown.add(selectStar, this);
			}
			this.stars.callAll('animations.add', 'animations', 'twinkle', [0, 1, 2, 3, 4, 5, 6], 10, true);
      this.stars.forEach((star) => {
        star.animations.paused = true;
      })
    },

    update: function () {


    }
  };
};
