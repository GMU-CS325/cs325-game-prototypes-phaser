class MountainLevel extends Phaser.Scene {

    constructor() {
        super("MountainLevel"); //inherit from Scene class, just like Java
    }

    init() {
        this.frameCounter = 0;
        this.randomValue = 0;
        this.data.set('score', 0);

    }

    preload() {
    }

    create() {
        var musica = this.sound.add('play');
        musica.play({ loop: true });
        this.gameOver = this.sound.add('gameOver');

        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
        this.bg_1.setOrigin(0, 0);
        this.bg_1.setScrollFactor(0, 0); //Makes it work
        this.physics.world.enable(this.bg_1);
        this.bg_1.body.setImmovable(true);

        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, 48, 'ground');
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);
        this.bg_2.y = game.config.height - 114;
        this.bg_2.setScale(1, 2.5);
        this.physics.world.enable(this.bg_2);
        this.bg_2.body.setImmovable(true);

        this.player = this.add.sprite(100, 830, 'player');
        this.physics.world.enable(this.player);  
        this.player.body.setGravityY(250);
        this.player.setScale(5, 5);

        this.physics.add.collider(this.player, this.bg_1);
        this.physics.add.collider(this.player, this.bg_2);

        this.enemies = this.add.group({
            defaultKey: 'enemies',
            maxSize: 20,
        });

        this.physics.world.enable(this.enemies);
        this.physics.add.collider(this.player, this.enemies, gameOver);

        this.anims.create({
            key: 'run',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'sprites_',
                suffix: '.png',
                start: 51,
                end: 58,
                zeroPad: 2
            })
        });

        this.anims.create({
            key: 'up',
            frameRate: 15,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'jump_',
                suffix: '.png',
                start: 1,
                end: 15,
                zeroPad: 2
            })
        });

        this.anims.create({
            key: 'down',
            frameRate: 20,
            frames: this.anims.generateFrameNames('slide', {
                prefix: 'roll_',
                suffix: '.png',
                start: 1,
                end: 28,
                zeroPad: 2
            })
        });

        this.anims.create({
            key: 'flap',
            repeat: -1,
            framerate: 20,
            frames: this.anims.generateFrameNames('bird', {
                prefix: 'bird_',
                suffix: '.png',
                start: 5,
                end: 13,
                zeroPad: 2
            })
        });

        this.text = this.add.text(25, 25, '', { font: '40px Courier', fill: '#00ff00' });

        this.text.setText([
            'Score: ' + this.data.get('score')
        ]);

        this.player.anims.play('run');

        this.cursors = this.input.keyboard.createCursorKeys();

        // set world bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

        // making the camera follow the player
        this.myCam.startFollow(this.bg_2);
    }

    update() {
        this.frameCounter = this.frameCounter + 1;
        if(this.frameCounter % 125 == 0)
        {
            //Generate enemy
            this.randomValue = Math.floor(Math.random() * Math.floor(10)); //Either 0 or 1 should be returned
            if (this.randomValue < 5) {
                var currentEnemy = this.enemies.create(game.config.width, this.bg_2.y - 50, 'thwomp');
                //currentEnemy.setScale(.5, .5);
                this.physics.world.enable(currentEnemy);
                this.physics.add.collider(this.player, currentEnemy, gameOver);
                currentEnemy.body.setImmovable(true);
            }
            else {
                var currentEnemy = this.enemies.create(game.config.width, this.bg_2.y - 155, 'bird');
                currentEnemy.setScale(3, 3);
                currentEnemy.play('flap');
                this.physics.world.enable(currentEnemy);
                this.physics.add.collider(this.player, currentEnemy, gameOver);
                currentEnemy.body.setSize(currentEnemy.width, currentEnemy.height, 300, 400);
                currentEnemy.body.setImmovable(true);
            }

        }

        Phaser.Actions.IncX(this.enemies.getChildren(), -8);
        let l = this.enemies.children.getArray();
        for (let x = 0; x < l.length; x++) {
            if (l[x].x < -50) {
                this.enemies.remove(l[x], true, true);
            }
        }

        this.data.set('score', this.frameCounter);
        this.text.setText([
            'Score: ' + this.data.get('score')
        ]);

        // move the player when the arrow keys are pressed
        this.player.x = this.myCam.scrollX + 100;
        //this.player.x = this.myCam.scrollX;
        this.bg_2.tilePositionX += 7;

        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX += 2; //The .3 means that we scroll slower than how fast our camera, set to follow our player, is moving

        //Setting it to a higher number will make the background go faster
        //this.bg_2.tilePositionX += 3; //The ground will go as fast as we are moving

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && (this.player.anims.getCurrentKey() == 'run')) {
            this.player.anims.stop();
            this.player.anims.play('up');

            this.player.body.setVelocityY(-350);
            this.player.once('animationcomplete', () => {
                this.player.body.setVelocityY(250);
                this.time.addEvent({
                    delay: 700, // in ms
                    callback: () => {
                        this.player.play('run');
                    }
                })
            });
        }

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && (this.player.anims.getCurrentKey() == 'run')) {
            this.player.anims.stop();
            this.player.anims.play('down');
            this.player.setScale(3.5, 3.5);
            this.time.addEvent({
                delay: 1200,
                callback: () => {
                    this.player.setScale(5, 5);
                    this.player.setX(100);
                    this.player.setY(830);
                }
            })
            
            this.player.once('animationcomplete', () => {
                   this.player.play('run');
            })
        }
    }

}