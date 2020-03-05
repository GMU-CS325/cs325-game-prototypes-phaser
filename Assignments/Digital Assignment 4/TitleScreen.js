class TitleScreen extends Phaser.Scene {
    constructor() {
        super("TitleScreen"); //inherit from Scene class, just like Java
        //bootGame is the identifier for this scene
    }

    //this.scene.start("key") starts scene

    preload() {
        this.load.image('background', 'Assets/background.png');
        this.load.image('title', 'Assets/title.png');
        this.load.image('koopatitle', 'Assets/koopa.png');
        this.load.image('play', 'Assets/tPlay.png');
        this.load.image('levelselect', 'Assets/tLevelSelect.png');
        this.load.image('ground', "Assets/afloor.png");
    }
    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0,0);
        this.add.sprite(550, 100, 'title').setOrigin(0, 0).setScale(1.25, 1.25);

        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, 48, 'ground');
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);
        this.bg_2.y = game.config.height - 114;
        this.bg_2.setScale(1, 2.5);

        var koopa = this.add.sprite(100, 725, 'koopatitle').setOrigin(0, 0);

        var playButton = this.add.sprite(1300, 500, 'play').setScale(.5, .5);
        playButton.setInteractive({ useHandCursor: true });
        playButton.on('pointerdown', () => this.loadFirstLevel());
 

        var levelSelect = this.add.sprite(1300, 600, 'levelselect').setScale(.5, .5);
        levelSelect.setInteractive({ useHandCursor: true });
        levelSelect.on('pointerdown', () => this.selectLevel());
    }

    loadFirstLevel() {
        this.scene.switch('MountainLevel');
    }

    selectLevel() {
        this.scene.switch('LevelSelect');
    }
}