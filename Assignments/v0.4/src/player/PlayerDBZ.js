import Phaser from "phaser"
export default class PlayerDBZ {
    constructor(scene, x, y) {
        this.scene = scene;
        const anims = scene.anims;

        anims.create({
            key: "test-1",
            frames: anims.generateFrameNumbers("player", { start: 0, end: 3}),
            frameRate: 3,
            repeat: -1
        });

        // scene.anims.create({
        //     key: 'test-1',
        //     frameRate: 5,
        //     frames: scene.anims.generateFrameNames('yoshi_shapes', {
        //         prefix: 'yoshi_',
        //         suffix: '.png',
        //         start: 10,
        //         end: 14,
        //         zeroPad: 2
        //     })
        // });

        this.sprite = scene.matter.add.sprite(500,50, "player", 0);
        const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
        const { width: w, height: h } = this.sprite;
        const mainBody = Bodies.rectangle(x, y, w * 0.4, h * 0.7);
        this.sprite.setExistingBody(mainBody).setScale(2);
    }

    update() {
        console.log("");
    }
}