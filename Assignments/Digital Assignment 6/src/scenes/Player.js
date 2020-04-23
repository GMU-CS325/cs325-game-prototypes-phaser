class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setTexture(texture);
        this.setPosition(x, y);
    }

    //In create function, do this.children.add(new EnemyRobot(this, 264, 250, name of texture));
    /*preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        this.rotation += 0.01;
    }*/
}