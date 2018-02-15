"use strict";

GameStates.makeGame = function( game, shared ) {
    // All the different variables at use throughout the program.
    let playerDirection = 'down';
    let enemyDirection = 'down';
    let ability = 'process'; // current ability.
    let abilityActive = false;
    let abilityOnCooldown = false;
    let attacking = false;
    let attackTimer = 0; // used to determine attack sound effect.
    // used to determine speeds during slow-down abiity.
    let playerVelocityConstant = 1;
    let worldVelocityConstant = 1;
    let enemyStarted = false;

    function quitGame() {
      //  Here you should destroy anything you no longer need.
      //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

      //  Then let's go back to the main menu.
      game.state.start('MainMenu');
    }

    // When the player presses q they use their ability.
    function useAbility() {
      // Currently the only ability is process.
      if (ability == 'process') {
        // If it is not in use and not on cooldown, use it.
        if (abilityActive == false && abilityOnCooldown == false) {
          abilityActive = true;
          // update constants.
          playerVelocityConstant = 2;
          worldVelocityConstant = 0.5;
          this.abilityStart.play();
          // apply filter.
          this.filter = game.add.sprite(0, 0, 'grayscale');
          abilityOnCooldown = true;
          game.time.events.add(Phaser.Timer.SECOND * 5, resetAbility, this);
        }
        else {
          this.abilityCooldown.play();
        }
      }
    }
    // Ends the ability and puts it on cooldown.
    function resetAbility() {
      abilityActive = false;
      playerVelocityConstant = 1;
      worldVelocityConstant = 1;
      this.abilityStop.play();
      this.filter.destroy();
      game.time.events.add(Phaser.Timer.SECOND * 30, refreshAbility, this);
    }

    // Refreshes the abiltiy from cooldown.
    function refreshAbility() {
      abilityOnCooldown = false;
      this.abilityReady.play();
    }

    // Determines what to do if enemy and player collide.
    function enemyCollision(player, enemy) {
      // If player is attacking -
      if (attacking) {
        enemy.health -= 1;
        this.enemyDamage.play();
        // My attempt at knock-back, doesnt work that well...
        if (enemyDirection == 'up') {
          enemy.body.y += 10;
        }
        else if (enemyDirection == 'left') {
          enemy.body.x += 10;
        }
        else if (enemyDirection == 'right') {
          enemy.body.x -= 10;
        }
        else if (enemyDirection == 'down') {
          enemy.body.y -= 10;
        }
        // Since there is only one enemy, you win when it dies.
        if (enemy.health <= 0) {
          enemy.kill();
          let win = game.add.text(275, 250, 'You Win!', {fill:'white', fontSize:'50px', boundsAlignH:'center', boundsAlignV:'middle'});
          win.fixedToCamera = true;
          game.time.events.add(5000, restart, this);
        }
      }
      else {
        player.health -= 1;
        this.playerDamage.play();
        // My attempt at knock-back, doesnt work that well...better for player than for enemy.
        if (playerDirection == 'up') {
          player.body.y += 10;
        }
        else if (playerDirection == 'left') {
          player.body.x += 10;
        }
        else if (playerDirection == 'right') {
          player.body.x -= 10;
        }
        else if (playerDirection == 'down') {
          player.body.y -= 10;
        }
        // If you die, then you respawn where you started. There isn't enough playable content in this demo to justify a game over, so you simply just respawn.
        if (player.health <= 0) {
          this.player.kill();
          this.playerDeath.play();
          this.player.x = 80;
          this.player.y = 690;
          game.time.events.add(Phaser.Timer.SECOND * 3, respawn, this);
        }
      }
    }

    // Respawns the player.
    function respawn() {
      this.player.revive();
      this.playerSpawn.play();
      this.player.health = 5;
    }

    // Starts the enemy movements.
    function startEnemy(enemy) {
      if (!enemyStarted) {
        enemyMovement(enemy, 'right');
        enemyStarted = true;
      }
    }

    // Determines the enemy movements - there is an issue here.
    function enemyMovement(enemy, direction) {
        if (direction == 'left') {
          enemy.body.velocity.x = -50 * worldVelocityConstant;
          game.time.events.add(Phaser.Timer.SECOND * 5, enemyMovement.bind(enemy, 'right'), this);
        }
        else if (direction == 'right') {
          enemy.body.velocity.x = 50 * worldVelocityConstant;
          game.time.events.add(Phaser.Timer.SECOND * 5, enemyMovement.bind(enemy, 'left'), this);
        }
    }

    // Restarts the game state whenever a game over or a win occurs.
    function restart() {
      this.music.stop();
      game.state.restart();
    }

    return {
      create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 800, 800);

        // Sets up the music to play.
        this.music = game.add.audio('overworldMusic');
  			this.music.loop = true;
  			this.music.volume = .3;
  		  this.music.play();

        // Sets up all of the sounds effects that are in use in the game.
        this.abilityStart = game.add.audio('abilityStart');
        this.abilityStart.volume = .3;
        this.abilityStop = game.add.audio('abilityStop');
        this.abilityStop.volume = .3;
        this.abilityCooldown = game.add.audio('abilityCooldown');
        this.abilityCooldown.volume = .3;
        this.abilityReady = game.add.audio('abilityReady');
        this.abilityReady.volume = .3;
        this.playerDamage = game.add.audio('playerDamage');
        this.playerDamage.volume = .3;
        this.playerDeath = game.add.audio('playerDeath');
        this.playerDeath.volume = .3;
        this.playerSpawn = game.add.audio('playerSpawn');
        this.playerSpawn.volume = .3;
        this.attack = game.add.audio('attack');
        this.attack.volume = .3;
        this.enemyDamage = game.add.audio('enemyDamage');
        this.enemyDamage.volume = .3;

        // Sets up the tilemap for the world and its layers.
        this.map = game.add.tilemap('tilemap');
        this.map.addTilesetImage('Overworld', 'overworldTiles');
        let groundLayer = this.map.createLayer('GroundLayer');
        this.wallLayer = this.map.createLayer('WallLayer');
        this.houseLayer = this.map.createLayer('HouseLayer');
        let accentLayer = this.map.createLayer('AccentLayer');
        this.map.setCollisionBetween(1, 1000, true, this.wallLayer);
        this.map.setCollisionBetween(1, 1000, true, this.houseLayer);
        this.wallLayer.resizeWorld();

        // All of the code to create the player, their physics, and their animations.
        this.player = game.add.sprite(80, 690, 'playerAtlas');
        game.physics.arcade.enable(this.player);
        this.playerSpawn.play();
        this.player.health = 5;
        this.player.body.gravity.y = 0;
        this.player.body.gravity.x = 0;
        this.player.body.velocity.x = 0;
        this.player.animations.add('attackDown', Phaser.Animation.generateFrameNames('attackDown', 1, 4), 10 * playerVelocityConstant, false);
        this.player.animations.add('attackLeft', Phaser.Animation.generateFrameNames('attackLeft', 1, 4), 10 * playerVelocityConstant, false);
        this.player.animations.add('attackRight', Phaser.Animation.generateFrameNames('attackRight', 1, 4), 10 * playerVelocityConstant, false);
        this.player.animations.add('attackUp', Phaser.Animation.generateFrameNames('attackUp', 1, 4), 10 * playerVelocityConstant, false);
        this.player.animations.add('walkUp', Phaser.Animation.generateFrameNames('walkUp', 1, 4), 4 * playerVelocityConstant, true);
        this.player.animations.add('walkLeft', Phaser.Animation.generateFrameNames('walkLeft', 1, 4), 4 * playerVelocityConstant, true);
        this.player.animations.add('walkRight', Phaser.Animation.generateFrameNames('walkRight', 1, 4), 4 * playerVelocityConstant, true);
        this.player.animations.add('walkDown', Phaser.Animation.generateFrameNames('walkDown', 1, 4), 4 * playerVelocityConstant, true);


        // All of the code for setting up an enemy.
        this.enemy1 = game.add.sprite(200, 225, 'enemyLog');
        game.physics.arcade.enable(this.enemy1);
        this.enemy1.health = 10;
        this.enemy1.body.gravity.y = 0;
        this.enemy1.body.gravity.x = 0;
        this.enemy1.body.velocity.x = 0;
        this.enemy1.animations.add('walkDown', Phaser.Animation.generateFrameNames('walkDown', 1, 4), 4 * worldVelocityConstant, true);
        this.enemy1.animations.play('walkDown');

        // ALl of the code to set up the controls for the plaer.
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
        let abilityKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        abilityKey.onDown.add(useAbility, this);

        game.camera.follow(this.player); // Enables camera to follow player.
        startEnemy(this.enemy1); // starts enemy movement.
      },

      update: function () {
        // All of the collision detection.
        game.physics.arcade.collide(this.player, this.wallLayer);
        game.physics.arcade.collide(this.player, this.houseLayer);
        game.physics.arcade.collide(this.enemy1, this.wallLayer);
        game.physics.arcade.collide(this.enemy1, this.houseLayer);
        game.physics.arcade.overlap(this.player, this.enemy1, enemyCollision, null, this);

        // Key handling, what happens when a key is pressed:
        if (this.actionKey.isUp) {
          attacking = false;
        }
        if (this.actionKey.isDown) {
          if (game.time.now > attackTimer) {
             attackTimer = game.time.now + 425;
             this.attack.play();
          }
          attacking = true;
          if (playerDirection == 'down') {
            this.player.animations.play('attackDown');
          }
          else if (playerDirection == 'left') {
            this.player.animations.play('attackLeft');
          }
          else if (playerDirection == 'right') {
            this.player.animations.play('attackRight');
          }
          else if (playerDirection == 'up') {
            this.player.animations.play('attackUp');
          }
        }

        else if (this.downKey.isDown) {
          this.player.animations.play('walkDown');
          this.player.body.velocity.y = 50 * playerVelocityConstant;
          this.player.body.velocity.x = 0;
          playerDirection = 'down';
        }
        // If left is pressed, move left, if in air use in-air sprite.
        else if (this.leftKey.isDown) {
          this.player.animations.play('walkLeft');
          this.player.body.velocity.x = -50 * playerVelocityConstant;
          this.player.body.velocity.y = 0;
          playerDirection = 'left';

        }
        // If right is pressed, move right, if in air use in-air sprite.
        else if (this.rightKey.isDown) {
          this.player.body.velocity.x = 50 * playerVelocityConstant;
          this.player.body.velocity.y = 0;
          this.player.animations.play('walkRight');
          playerDirection = 'right';
        }

        else if (this.upKey.isDown) {
          this.player.body.velocity.y = -50 * playerVelocityConstant;
          this.player.body.velocity.x = 0;
          this.player.animations.play('walkUp');
          playerDirection = 'up';
        }
        // Otherwise the player is idle.
        else {
          this.player.animations.stop(null, true);
          this.player.body.velocity.x = 0;
          this.player.body.velocity.y = 0;
        }
      }
    };
};
