class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setTexture(texture);
        this.setPosition(x, y);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setData("health", 100);
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
        this.setVelocityX(0);
    }
}