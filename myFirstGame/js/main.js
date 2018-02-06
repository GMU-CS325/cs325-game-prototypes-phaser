"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

    var game = new Phaser.Game( 380, 320, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    var jumpTimer = 0;
    function preload() {
      game.load.spritesheet('player', 'assets/sprite_big.png', 30, 54);
      game.load.tilemap('tilemap', 'assets/testMap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', 'assets/tileset.png')
    }

    function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.stage.backgroundColor = "#a9f0ff";
      // Add the tile set to the game.
      let map = game.add.tilemap('tilemap');
      map.addTilesetImage('tileset', 'tiles');

      let backgroundLayer = map.createLayer('BackgroundLayer');
      this.groundLayer = map.createLayer('GroundLayer');
    //  let accentLayer = map.createLayer('AccentLayer');

      map.setCollisionBetween(1, 100, true, this.groundLayer);
      this.sprite = game.add.sprite(0, 0, 'player');
      this.sprite.scale.setTo(1,1);
      game.physics.arcade.enable(this.sprite);

      this.groundLayer.resizeWorld();

      this.sprite.body.bounce.y = 0.2;
      this.sprite.body.gravity.y = 250;
      this.sprite.body.gravity.x = 20;
      this.sprite.body.velocity.x = 100;

      this.sprite.animations.add('idle', [0,1], 3, true);
      this.sprite.animations.add('right', [2,3,4,5], 10, true);
      this.sprite.animations.add('left', [6,7,8,9], 10, true);
      this.sprite.animations.add('jumpRight', [10], 1, true);
      this.sprite.animations.add('jumpLeft', [11], 1, true);
      this.sprite.animations.play('idle');

      game.camera.follow(this.sprite);
      this.cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
      game.physics.arcade.collide(this.sprite, this.groundLayer);
    //  if(this.cursors.up.isDown) this.sprite.body.velocity.y = -2000;
    //  else this.sprite.body.velocity.y = 0;
      if (this.cursors.up.isDown && this.sprite.body.onFloor() && game.time.now > jumpTimer) {
        this.sprite.animations.play('jumpRight');
        this.sprite.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
      }
      else if(this.cursors.left.isDown) {
        this.sprite.body.velocity.x = -200;
        if (!this.sprite.body.onFloor()) this.sprite.animations.play('jumpLeft');
        else this.sprite.animations.play('left');
      }
      else if(this.cursors.right.isDown) {
        this.sprite.body.velocity.x = 200;
        if (!this.sprite.body.onFloor()) this.sprite.animations.play('jumpRight');
        else this.sprite.animations.play('right');
      }
      else {
        this.sprite.body.velocity.x = 0;
        if (this.sprite.body.onFloor()) this.sprite.animations.play('idle');
      }
    }

    function jump() {
      this.sprite.body.velocity.y = -200;
    }
};
