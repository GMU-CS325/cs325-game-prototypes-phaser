"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    let playerDirection = 'down';
    let enemyDirection = 'down';
    let ability = 'process';
    let abilityActive = false;
    let abilityOnCooldown = false;
    let attacking = false;
    let playerVelocityConstant = 1;
    let worldVelocityConstant = 1;

    function quitGame() {
      //  Here you should destroy anything you no longer need.
      //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

      //  Then let's go back to the main menu.
      game.state.start('MainMenu');
    }

    function useAbility() {
      if (ability == 'process') {
        if (abilityActive == false && abilityOnCooldown == false) {
          abilityActive = true;
          playerVelocityConstant = 2;
          worldVelocityConstant = 0.5;
          this.filter = game.add.sprite(0, 0, 'grayscale');
          abilityOnCooldown = true;
          game.time.events.add(Phaser.Timer.SECOND * 5, resetAbility, this);
        }
      }
    }

    function resetAbility() {
      abilityActive = false;
      playerVelocityConstant = 1;
      worldVelocityConstant = 1;
      this.filter.destroy();
      game.time.events.add(Phaser.Timer.SECOND * 30, refreshAbility, this);
    }

    function refreshAbility() {
      abilityOnCooldown = false;
    }

    // If player loses all health or touches a killing tile, player is killed.
    function enemyCollision(player, enemy) {
      if (attacking) {
        enemy.health -= 1;
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
        if (enemy.health <= 0) {
          enemy.kill();
        }
      }
      else {
        player.health -= 1;
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

        if (player.health <= 0) {
          this.player.kill();
          this.player.x = 80;
          this.player.y = 100;
          this.player.revive();
          this.player.health = 5;
        }
      }
    }

    return {
      create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.music = game.add.audio('overworldMusic');
  			this.music.loop = true;
  			this.music.volume = .3;
  		  this.music.play();

        let map = game.add.tilemap('tilemap');
        map.addTilesetImage('Overworld', 'overworldTiles');
        let groundLayer = map.createLayer('GroundLayer');
        let accentLayer = map.createLayer('AccentLayer');
        let houseLayer = map.createLayer('HouseLayer');

        // All of the code to create the player, their physics, and their animations.
        this.player = game.add.sprite(80, 100, 'playerAtlas');
        game.physics.arcade.enable(this.player);
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
        game.camera.follow(this.player); // Enables camera to follow player.

        // All of the code for setting up an enemy.
        this.enemy1 = game.add.sprite(200, 200, 'enemyLog');
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
      },

      update: function () {
        game.physics.arcade.overlap(this.player, this.enemy1, enemyCollision, null, this);
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        if (this.actionKey.isUp) {
          attacking = false;
        }
        if (this.actionKey.isDown) {
        //  this.player.body.velocity.x = 0;
        //  this.player.body.velocity.y = 0;
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
