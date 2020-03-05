class LevelSelect extends Phaser.Scene
{
    constructor() {
        super("LevelSelect"); //inherit from Scene class, just like Java
        //bootGame is the identifier for this scene
    }

    preload() {
        this.load.image('background', 'Assets/background.png');
        this.load.image('title', 'Assets/title.png');
        this.load.image('ground', 'Assets/afloor.png');
        this.load.image('koopatitle', 'Assets/koopa.png');
        this.load.image('mountain', 'Assets/MountainSelect.png');
        this.load.image('locked', 'Assets/lock.png');
    }

    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        var title = this.add.sprite(550, 100, 'title').setOrigin(0, 0).setScale(1.25, 1.25);
        title.setInteractive({ useHandCursor: false });

        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, 48, 'ground');
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);
        this.bg_2.y = game.config.height - 114;
        this.bg_2.setScale(1, 2.5);

        var koopa = this.add.sprite(100, 725, 'koopatitle').setOrigin(0, 0);

        this.add.sprite(700, 400, 'mountain');
        this.add.sprite(1100, 400, 'locked');
    }
}

//init prepares data
//preload loads music and images into memory
//create adds objects to the game
//update is a loop that runs constantly
