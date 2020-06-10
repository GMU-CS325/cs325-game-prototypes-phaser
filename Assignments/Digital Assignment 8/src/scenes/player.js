class Player extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene.matter.world, x, y, texture, frame);
        scene.add.existing(this);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.sprite = this;
        this.scene = scene;
        this.setPosition(x, y);
        this.setTexture(texture);
        this.setFrame(frame);
        
        console.log(this);
        //this.setBody("rectangle");
        this.setData("health", 100);

        scene.anims.create({
            key: 'idle',
            frameRate: 10,
            frames: scene.anims.generateFrameNames('testsheet', {
                prefix: 'bjack_',
                suffix: '.png',
                start: 5,
                end: 8,
                zeroPad: 2
            })
        });
    }

    //In create function, do this.children.add(new EnemyRobot(this, 264, 250, name of texture));

    jump() {
        if (this.body.position.y > 610) {
            this.setTexture("jump");
            this.play('jump');
            this.setVelocityY(-13);
        }
        
    }

    moveLeft() {
        this.setTexture("run");
        this.play("run");
        this.x += -7;
        this.setFlipX(true);
        if (this.body.position.y > 610) {

            if (this.anims.getCurrentKey() != 'run') {
                this.play('run');
            }
        }
    }

    moveRight() {
        this.setTexture("run");
        this.play("run");
        this.x += 7;
        this.setFlipX(true);
        if (this.body.position.y > 610) {

            if (this.anims.getCurrentKey() != 'run') {
                this.play('run');
            }
        }
    }

    update() {
        console.log(this.body);
        //this.setVelocityX(0);
    }
}