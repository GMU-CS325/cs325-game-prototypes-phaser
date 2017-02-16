
BasicGame.shoot = function (game) {


	this.player;
    this.aliens;
    this.bullets;
    this.bulletTime = 0;
    this.cursors;
    this.fireButton;
    this.explosions;
    this.starfield;
    this.score = 0;
    this.scoreString = '';
    this.scoreText;
    this.lives;
    this.enemyBullet;
    this.firingTimer = 0;
    this.stateText;
    this.livingEnemies = [];
    this.enter;
    this.death;
    this.gameover;
    this.laser;
    this.bomb;
    this.heath=300;
    this.tween;
    this.dead=false;
    this.queen;
    this.heart;

};

BasicGame.shoot.prototype = {


	create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.enter = this.add.audio('enter');
        this.death = this.add.audio('death');
        this.laser = this.add.audio('laser');
        this.gameover=this.add.audio('gameover');
        this.bomb=this.add.audio('bomb');
        this.enter.play();
          
      
        //  The scrolling starfield background
        this.starfield = this.add.sprite(0, 0, 'starfield');
        this.starfield.scale.setTo(0.32,0.32);
        //  Our bullet group
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        // The enemy's bullets
        this.enemyBullets = this.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(90, 'enemyBullet');
        this.enemyBullets.setAll('anchor.x', 1);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);

        //  The hero!
       
        this.heart = this.add.sprite(90, 155, 'heart');
        this.heart.visible = false;
        this.queen = this.add.sprite(400, 300, 'queen');
         this.player = this.add.sprite(400, 500, 'this.player');
        this.queen.animations.add('down', [0,1,2,3], 5, true);
   
         this.queen.animations.play('down');
           this.player.scale.setTo(2,2);
                    this.queen.scale.setTo(2,2);
                          this.queen.visible = false;
        this.player.animations.add('down', [0,1,2], 5, true);     
        this.player.animations.play('down');
        this.player.anchor.setTo(0.5, 0.5);


        this.physics.enable(this.player, Phaser.Physics.ARCADE);
          this.player.body.collideWorldBounds=true;
        //  The baddies!
        this.aliens= this.add.sprite(this.world.centerX+100, this.world.centerY,'long');
         this.aliens.anchor.setTo(0.5, 0.5);
                this.aliens.scale.setTo(1,1);
        this.physics.enable(this.aliens, Phaser.Physics.ARCADE);
       
      
                this.aliens.body.moves = false;
                  this.aliens.x = 600;
        this.aliens.y = 100;



        //  The score
        this.scoreString = 'Health :  ';
        this.scoreText = this.add.text(10, 10, this.scoreString + this.heath, { font: '34px Arial', fill: '#fff' });

        //  Lives
        this.lives = this.add.group();
       

        //  Text
        this.stateText = this.add.text(400,200,'', { font: '84px Arial', fill: '#fff' });

        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.scale.setTo(0.3, 0.3);
        this.stateText.visible = false;
        this.tween = this.add.tween(this.aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween loops it calls descend
        this.tween.onLoop.add(this.descend, this);

        for (var i = 0; i < 3; i++)
        {
            var ship = this.lives.create(this.world.width - 100 + (30 * i), 60, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            ship.scale.setTo(0.3, 0.3);
            ship.angle = 90;
            ship.alpha = 0.4;
        }

        //  An explosion pool
        this.explosions = this.add.group();
        this.explosions.createMultiple(30, 'kaboom');
       // this.explosions.forEach(this.setupInvader, this);

        //  And some controls to play the game with
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	
	

     setupInvader: function (invader) {

     invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');

    },

     descend: function (){

        this.aliens.y += 10;

    },
	update: function () {
		   if (this.player.alive)
        {
            //  Reset the player, then check for movement keys
            this.player.body.velocity.setTo(0, 0);

            if (this.cursors.left.isDown)
            {
                this.player.body.velocity.x = -200;
            
                  
            }
            else if (this.cursors.up.isDown)
            {
                this.player.body.velocity.y = -200;
            }
           else  if (this.cursors.down.isDown)
            {
                this.player.body.velocity.y = 200;
            }
            else if (this.cursors.right.isDown)
            {
                this.player.body.velocity.x = 200;
            }

            //  Firing?
            if (this.fireButton.isDown)
            {
                this.fireBullet();
                this.laser.play();
             
            }

            if (this.time.now > this.firingTimer)
            {
                this.enemyFires();
              
            }

            //  Run collision
            this.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
            this.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
        }
	},
	collisionHandler: function  (aliens, bullets) {

        //  When a bullet hits an alien we kill them both
        bullets.kill();
       this.heath-=10;
        this.scoreText.text = this.scoreString + this.heath;
     
        if(this.heath==0)
        {
         this.stateText.text = "You Win, you achieve your revenage!!!\n Now enjoy your time with princess";
          this.stateText.visible = true;
        aliens.kill();
        this.dead=true;
        this.enter.stop();
        this.death.play();
          this.heart.visible = true;
          this.queen.visible = true;
             this.player.reset(350,330);
this.player.visible = true;
         this.player.body.moves=false;
         
    }


	},

    enemyHitsPlayer: function  () {

        this.bullet.kill();

},
 enemyFires: function  () {

        //  Grab the first bullet we can from the pool
        this.enemyBullet = this.enemyBullets.getFirstExists(false);

        this.livingEnemies.length=20;


           this.livingEnemies.push(this.aliens);
   


        if (this.enemyBullet&&this.dead==false)
        {

           
            // And fire the bullet from this enemy
            this.enemyBullet.reset(this.aliens.x, this.aliens.y);
            this.physics.arcade.moveToObject(this.enemyBullet,this.player,120);
            this.firingTimer = this.time.now;
        }

    },
        fireBullet: function  () {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (this.time.now > this.bulletTime)
        {
            //  Grab the first bullet we can from the pool
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet)
            {
                //  And fire it
               
                this.bullet.reset(this.player.x, this.player.y + 8);
                this.bullet.body.velocity.y = -400;
                this.bulletTime = this.time.now + 200;
                
  
            }
        }

    },

    resetBullet: function  (bullet) {

        //  Called if the bullet goes out of the screen
        bullet.kill();

    },
    restart: function  () {

        //  A new level starts

        //resets the life count
        this.lives.callAll('revive');
        //  And brings the aliens back from the dead :)
        this.aliens.removeAll();
   
       this.enter.play();

        //revives the player
        this.player.revive();
         this.score=0;
        //hides the text
        this.stateText.visible = false;

    },
};

