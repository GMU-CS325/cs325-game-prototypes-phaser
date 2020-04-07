var playButton;
var surviveButton;
var optionButton;
var buttons;

var currentIndex;

var cursorKeys;

function change(event) {
    console.log("D");
}

function changeOption(change) {
    console.log("In function");
    buttons[currentIndex].setStyle({ fontFamily: 'cdragon', fontSize: 64, color: '#000000' });
    //At top, loop back to bottom
    if (currentIndex + change == -1) {
        currentIndex = buttons.length - 1;
    }
    else {
        currentIndex = (currentIndex + change) % buttons.length;
    }

    buttons[currentIndex].setStyle({ fontFamily: 'cdragon', fontSize: 64, color: '#800000' });
}

class TitleScene extends Phaser.Scene {

    constructor() {
		super({ key: 'titleScene' });
	}

    change(event) {
        console.log("D");
    }

    init() {
        currentIndex = 0;
        buttons = [];
    }

	preload() {
	}

    create() {
        // console.log(this); brings up TitleScene, which it should
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.anims.create(
        {
            key: 'background',
            frames: [
                { key: 'bg_001' },
                { key: 'bg_002' },
                { key: 'bg_003' },
                { key: 'bg_004' },
            ],
            frameRate: 15,
            repeat: -1
        });
        this.add.sprite(0, 0, 'bg_001').setOrigin(0, 0).play('background');

        var add = this.add;
        var input = this.input;
        var width = this.cameras.main.width;

        this.add.text(width / 8, 32, 'Brutal Brawl', {
            fontFamily: 'cdragon',
            fontSize: 160,
            color: '#ff0000'
        }).setShadow(15, 15, "#111111", 2, false, true);

        playButton = this.add.text(width / 2 - 75, 300, 'Classic', {
            fontFamily: 'cdragon',
            fontSize: 60,
            color: '#800000'
        });
        playButton.setInteractive();

        surviveButton = this.add.text(width / 2 - 75, 375, 'Survive', {
            fontFamily: 'cdragon',
            fontSize: 60,
            color: '#000000'
        });
        surviveButton.setInteractive();

        optionButton = this.add.text(width / 2 - 75, 450, 'Options', {
            fontFamily: 'cdragon',
            fontSize: 60,
            color: '#000000'
        });
        optionButton.setInteractive();

        buttons.push(playButton);
        buttons.push(surviveButton);
        buttons.push(optionButton);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
            changeOption(-1);
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            changeOption(1);
        }

        if ((currentIndex == 1) && Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.scene.start('gameScene');
        }
    }
}

export default TitleScene;