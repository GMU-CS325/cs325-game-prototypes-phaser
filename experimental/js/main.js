window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'background', 'assets/background.png' );
        game.load.audio( 'bgmusic', ['assets/Car_Park_Throwdown .mp3']);
        game.load.image( 'player', 'assets/evil_guy.png' );
        game.load.image( 'bullet', 'assets/bullet.png' );
        
        game.load.image( 'brain', 'assets/brain.png' );
        game.load.image( 'evil_heart', 'assets/evil_heart.png' );
        game.load.image( 'heart', 'assets/heart.png' );
        game.load.image( 'liver', 'assets/liver.png' );
        game.load.image( 'neuron', 'assets/neuron.png' );
        game.load.image( 'shooter', 'assets/shooter.png' );
        
        
        
    }
    
//    var bouncy;
    var background;
    var music;
    var player;    
    var bullets;
    var weapon;
    var firebutton;
    
    var fireRate = 100;
    var nextFire = 0;
    
    function create() {
        
        //background
        background = this.game.add.sprite(0, 0, 'background');
        
        //music
        music = game.add.audio('bgmusic');
//        music.play();
        
        //physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //player
        player = this.game.add.sprite(60, 450, 'player');
        player.anchor.setTo(0.5,0);
        game.physics.enable(player, Phaser.Physics.ARCADE );
        player.allowRotation = false;
        
        //weapon
        weapon = game.add.weapon(30, 'bulller');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 350;
        weapon.autofire = false;
        weapon.fireRate = 1000;
        weapon.trackSprite(player,50, 25, true);
        
        //bullet
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        
        //fire
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
    }
    
    function update() {
        player.scale+=.5;
//                game.physics.arcade.collide(player, asteroids, playerHit);
//        game.physics.arcade.collide(weapon.bullets, asteroids, asteroidHit, null, this);
//        game.physics.arcade.collide(player, powerups, collectPowerup);
        
        
//        if (fireButton.isDown) {
//            if(weapon.fire()){
//                laser.play();
//            }
//
//        }

        
    }
    
    function fire() {

        if (game.time.now > nextFire && bullets.countDead() > 0)
        {
            nextFire = game.time.now + fireRate;

            var bullet = bullets.getFirstDead();

            bullet.reset(sprite.x - 8, sprite.y - 8);

            game.physics.arcade.moveToPointer(bullet, 300);
        }

    }
};
