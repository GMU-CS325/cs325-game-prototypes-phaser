// Name: Kevin Pfeifle
// CS-325
// Digital Assignement 1

// References I used to help understand concepts -
// -----------------------------------------------
// This example helped me get started making the platformer: https://phaser.io/examples/v2/arcade-physics/platformer-basics
// I used the tutorial on piazza to help me understand how to load in my Tiled map: https://www.joshmorony.com/create-a-running-platformer-game-in-phaser-with-tilemaps/
// This example help me understand how to load objects from Tiled into my game: https://phaser.io/examples/v2/tilemaps/create-from-objects
// And lots of reference to the Phaser API.

// Assets -
// --------
// I created all of the poorly drawn sprites and tiles used in the game.
// The music and sound effects were borrowed from these sources:
// Music - https://soundcloud.com/digitalr3public/cristal-cave-chiptune
// Sounds Effects - https://opengameart.org/content/512-sound-effects-8-bit-style

"use strict";

window.onload = function() {
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    var jumpTimer = 0; // Used to make sure jumping can only occur when on ground.
    // The status of the player and what they have collected.
    var gemCount = 0;
    var mysticGemCount = 0;
    var playerLives = 3;
    // Score is determined by the items collected and if the level is completed.
    var score = 0;

    function preload() {
      // Load in the audio files to be used.
      game.load.audio('music', 'assets/6-CristalCaveChiptune.wav');
      game.load.audio('gemPickup', 'assets/gem.wav');
      game.load.audio('mysticGemPickup', 'assets/mysticGem.wav');
      // game.load.audio('footstep', 'assets/footstep.wav');
      game.load.audio('jump', 'assets/jump.wav');
      game.load.audio('doorOpen', 'assets/doorOpen.wav');
      game.load.audio('falling', 'assets/falling.wav');
      game.load.audio('damage', 'assets/damage.wav');
      // Loads in the tiles and the background image.
      game.load.image('tiles', 'assets/cave_purple.png');
      game.load.image('background', 'assets/cave_purple_background.png');
      // Loads in the spritesheets.
      game.load.spritesheet('player', 'assets/sprite_big.png', 30, 54);
      game.load.spritesheet('gems', 'assets/gem.png', 32, 32);
      // Loads in the tilemap created in Tiled.
      game.load.tilemap('tilemap', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    }

    function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);




      // Sets up the background.
      this.background = game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
      this.background.fixedToCamera = true;

      // Add the tilemap to the game.
      this.map = game.add.tilemap('tilemap');
      this.map.addTilesetImage('cave_purple', 'tiles');
      // Sets up the different layers of the map for interaction.
      this.trapLayer = this.map.createLayer('TrapLayer');
      this.deathLayer = this.map.createLayer('DeathLayer'); // invisible layer for falling in pits.
      this.deathLayer.visible = false;
      this.groundLayer = this.map.createLayer('GroundLayer');
      this.exitLayer = this.map.createLayer('ExitLayer');
      this.underExitLayer = this.map.createLayer('UnderExitLayer');
      this.underExitLayer.visible = false;
      // accents and background block are decorations, not interactable, therefore just a regular variable.
      let accentLayer = this.map.createLayer('AccentLayer');
      let backgroundLayer = this.map.createLayer('BackgroundLayer');

      // Sets up the audio.
      // this.footstep = game.add.audio('footstep');
      this.jump = game.add.audio('jump');
      this.jump.volume = .3;
      this.doorOpen = game.add.audio('doorOpen');
      this.doorOpen.volume = .3;
      this.falling = game.add.audio('falling');
      this.falling.volume = .3;
      this.damage = game.add.audio('damage');
      this.damage.volume = .3;
      this.gemPickup = game.add.audio('gemPickup');
      this.gemPickup.volume = .3;
      this.mysticGemPickup = game.add.audio('mysticGemPickup');
      this.mysticGemPickup.volume = .3;
      // Music isn't accessed anywhere else, so regular variable.
      let music = game.add.audio('music');
      music.loop = true;
      music.play();
      music.volume = .3;

      // Sets up the HUD.
      this.HUD = game.add.group();
      // Score
      this.scoreCounter = game.add.text(0, 0, 'Score = ' + score, {fill:'white', fontSize:'20px'});
      this.HUD.add(this.scoreCounter);
      this.HUD.fixedToCamera = true;
      // Gems
      this.gemCounterImage = game.add.sprite(0, 32, 'gems', 6);
      this.HUD.add(this.gemCounterImage);
      this.gemCounter = game.add.text(32, 37, '= ' + gemCount, {fill:'white', fontSize:'20px'});
      this.HUD.add(this.gemCounter);
      // Mystic Gems
      this.mysticGemCounterImage = game.add.sprite(0, 64, 'gems', 0);
      this.HUD.add(this.mysticGemCounterImage);
      this.mysticGemCounter = game.add.text(32, 69, '= ' + mysticGemCount, {fill:'white', fontSize:'20px'});
      this.HUD.add(this.mysticGemCounter);
      // Lives
      this.livesImage = game.add.sprite(0, 101, 'gems', 12);
      this.HUD.add(this.livesImage);
      this.livesCounter = game.add.text(32, 103, '= ' + playerLives, {fill:'white', fontSize:'20px'});
      this.HUD.add(this.livesCounter);

      // Sets up the groups for the two collectable items.
      this.mysticGems = game.add.physicsGroup();
      this.gems = game.add.physicsGroup();
      this.oneUPs = game.add.physicsGroup();
      // Turns all references to the item on the map into sprite objects, then sets the sprite animations.
      // Mystic Gems - the objective items.
      this.map.createFromObjects('ItemLayer', 'mysticGem', 'gems', 0, true, false, this.mysticGems);
      this.mysticGems.forEach(mysticGem => {
        mysticGem.body.immovable = true;
        mysticGem.animations.add('spin', [0,1,2,3,4,5], 6, true);
        mysticGem.animations.play('spin');
      });
      // Regular Gems - the extra collectable items.
      this.map.createFromObjects('ItemLayer', 'gem', 'gems', 0, true, false, this.gems);
      this.gems.forEach(gem => {
        gem.body.immovable = true;
        gem.animations.add('spin', [6,7,8,9], 5, true);
        gem.animations.play('spin');
      });
      // 1UPS
      this.map.createFromObjects('ItemLayer', '1UP', 'gems', 12, true, false, this.gems);

      // Sets up collision detection for the different map layers.
      this.map.setCollisionBetween(1, 100, true, this.groundLayer);
      this.map.setCollisionBetween(1, 100, true, this.trapLayer);
      this.map.setCollisionBetween(1, 100, true, this.deathLayer);
      this.map.setCollisionBetween(1, 100, true, this.exitLayer);
      this.groundLayer.resizeWorld();

      // Creates the player character sprite.
      this.player = game.add.sprite(80, 80, 'player');
      this.player.scale.setTo(1,1);
      this.player.health = 4;
      // Sets up player physics.
      game.physics.arcade.enable(this.player);
      this.player.body.gravity.y = 600;
      this.player.body.gravity.x = 20;
      this.player.body.velocity.x = 100;
      // Sets up the player animations.
      this.player.animations.add('idle', [0,1], 3, true);
      this.player.animations.add('right', [2,3,4,5], 10, true);
      this.player.animations.add('left', [6,7,8,9], 10, true);
      this.player.animations.add('jumpRight', [10], 1, true);
      this.player.animations.add('jumpLeft', [11], 1, true);
      this.player.animations.play('idle');
      game.camera.follow(this.player); // Enables camera to follow player.

      this.cursors = game.input.keyboard.createCursorKeys(); // Sets up arrow key bindings.
    }

    function update() {
      // Enables the collision between the player, layers, and items.
      // Also sets up the callback function for collision.
      game.physics.arcade.collide(this.player, this.groundLayer);
      game.physics.arcade.collide(this.player, this.trapLayer, playerDeath, null, this);
      game.physics.arcade.collide(this.player, this.deathLayer, playerDeath, null, this);
      game.physics.arcade.collide(this.player, this.exitLayer, checkPlayerWin, null, this);
      game.physics.arcade.overlap(this.player, this.gems, collectItem, null, this);
      game.physics.arcade.overlap(this.player, this.mysticGems, collectItem, null, this);

      // Checks for input from key bindings, moves player accordingly.
      // If up is pressed, and the player is on the floor, then jump.
      if (this.cursors.up.isDown && this.player.body.onFloor() && game.time.now > jumpTimer) {
        this.player.animations.play('jumpRight');
        this.player.body.velocity.y = -400;
        jumpTimer = game.time.now + 750;
        this.jump.play();
      }
      // If left is pressed, move left, if in air use in-air sprite.
      else if(this.cursors.left.isDown) {
        this.player.body.velocity.x = -200;
        if (!this.player.body.onFloor()) this.player.animations.play('jumpLeft');
        else this.player.animations.play('left');
        // this.footstep.play();
      }
      // If right is pressed, move right, if in air use in-air sprite.
      else if(this.cursors.right.isDown) {
        this.player.body.velocity.x = 200;
        if (!this.player.body.onFloor()) this.player.animations.play('jumpRight');
        else this.player.animations.play('right');
      }
      // Otherwise the player is idle.
      else {
        this.player.body.velocity.x = 0;
        if (this.player.body.onFloor()) this.player.animations.play('idle');
      }
    }

    // The various functions that I use within the body of the game are found below:

    // Called when player and item collide.
    // Item is killed, sound is played, and the effect on the game is different per item.
    function collectItem(player, item) {
      if (item.name == 'gem') {
        item.kill();
        this.gemPickup.play();
        score += 10;
        this.scoreCounter.text = 'Score = ' + score;
        gemCount++;
        this.gemCounter.text = '= ' + gemCount;
        if (gemCount == 40) {
          playerLives++;
          this.livesCounter.text = '= ' + playerLives;
        }
      }
      else if (item.name == 'mysticGem') {
        item.kill();
        this.mysticGemPickup.play();
        score += 100;
        this.scoreCounter.text = 'Score = ' + score;
        mysticGemCount++;
        this.mysticGemCounter.text = '= ' + mysticGemCount;
      }
      else if (item.name == '1UP') {
        item.kill();
        this.gemPickup.play();
        playerLives++;
        this.livesCounter.text = '= ' + playerLives;
      }
    }
    // If player loses all health or touches a killing tile, player is killed.
    function playerDeath(player, cause) {
      this.player.kill();
      // Plays the death sounds of how the player died.
      if (cause.layer.name == 'DeathLayer') this.falling.play();
      else this.damage.play();
      playerLives--;
      this.livesCounter.text = '= ' + playerLives;
      if (playerLives == 0) {
        // game over!
        let gameOver = game.add.text(225, 250, 'GAME OVER!', {fill:'white', fontSize:'50px', boundsAlignH:'center', boundsAlignV:'middle'});
        gameOver.fixedToCamera = true;
      }
      else {
        this.player.x = 80;
        this.player.y = 80;
        this.player.revive();
      }
    }
    // If the player has gather all the mystic gems, opens the exit door.
    function checkPlayerWin(player, exit) {
     if (mysticGemCount == 0) {
       // you win!
       this.exitLayer.visible = false;
       this.underExitLayer.visible = true;
       this.exitLayer.destroy();
       this.doorOpen.play();
       score += 500;
       this.scoreCounter.text = 'Score = ' + score;
       let victory = game.add.text(300, 250, 'YOU WIN!', {fill:'white', fontSize:'50px', boundsAlignH:'middle', boundsAlignV:'middle'});
       victory.fixedToCamera = true;
     }
    }
};
