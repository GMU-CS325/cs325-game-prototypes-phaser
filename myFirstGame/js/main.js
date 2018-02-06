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

    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
      game.load.spritesheet('player', 'assets/castle_sprites/elisa-spritesheet1.png', 56, 43);
      game.load.tilemap('tilemap', 'assets/MyTileMap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', 'assets/platformertiles.png')
    }

    function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.stage.backgroundColor = "#a9f0ff";
      // Add the tile set to the game.
      let map = game.add.tilemap('tilemap');
      map.addTilesetImage('platformertiles', 'tiles');

      let backgroundLayer = map.createLayer('BackgroundLayer');
      this.groundLayer = map.createLayer('GroundLayer');
      let accentLayer = map.createLayer('AccentLayer');

      map.setCollisionBetween(1, 100, true, this.groundLayer);
      this.sprite = game.add.sprite(0, 0, 'player');
      game.physics.arcade.enable(this.sprite);

      this.groundLayer.resizeWorld();

      this.sprite.body.bounce.y = 0.2;
      this.sprite.body.gravity.y = 50000;
      this.sprite.body.gravity.x = 20;
      this.sprite.body.velocity.x = 100;

      this.sprite.animations.add('idle', [0,1,2], 10, true);
      this.sprite.animations.play('idle');

      game.camera.follow(this.sprite);
      this.cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
      game.physics.arcade.collide(this.sprite, this.groundLayer);
      if(this.cursors.up.isDown) this.sprite.body.velocity.y = -2000;
      else this.sprite.body.velocity.y = 0;

      if(this.cursors.left.isDown) this.sprite.body.velocity.x = -500;
      else if(this.cursors.right.isDown) this.sprite.body.velocity.x = 500;
      else this.sprite.body.velocity.x = 0;
    }
};
