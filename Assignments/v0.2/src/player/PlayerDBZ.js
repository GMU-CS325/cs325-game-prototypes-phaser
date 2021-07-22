import Phaser from "phaser"
export default class PlayerDBZ extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y);
        this.scene = scene;
        const anims = scene.anims;

    }
}