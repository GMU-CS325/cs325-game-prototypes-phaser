var playButton;
var surviveButton;
var optionButton;
var buttons;

var currentIndex;

function changeOption(change) {
    buttons[currentIndex].setStyle({ fontFamily: 'dragon', fontSize: 64, color: '#000000' });
    //At top, loop back to bottom
    if (currentIndex + change == -1) {
        currentIndex = buttons.length - 1;
    }
    else {
        currentIndex = (currentIndex + change) % buttons.length;
    }

    buttons[currentIndex].setStyle({ fontFamily: 'dragon', fontSize: 64, color: '#800000' });
}

var TitleScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

    function TitleScene() {
        Phaser.Scene.call(this, { key: 'titleScene' });
	},

    init: function() {
        currentIndex = 0;
        buttons = [];
    },

    create: function() {
        // console.log(this); brings up TitleScene, which it should
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.Fkey = this.input.keyboard.addKey('F');

        this.Fkey.on('down', function () {
            this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen();
        }, this);

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

        var width = this.cameras.main.width;

        this.add.text(width / 8, 32, 'Brutal Brawl', {
            fontFamily: 'dragon',
            fontSize: 160,
            color: '#ff0000'
        }).setShadow(15, 15, "#111111", 2, false, true);

        playButton = this.add.text(width / 2 - 75, 300, 'Classic', {
            fontFamily: 'dragon',
            fontSize: 60,
            color: '#800000'
        });
        playButton.setInteractive();

        surviveButton = this.add.text(width / 2 - 75, 375, 'Survive', {
            fontFamily: 'dragon',
            fontSize: 60,
            color: '#000000'
        });
        surviveButton.setInteractive();

        optionButton = this.add.text(width / 2 - 75, 450, 'Options', {
            fontFamily: 'dragon',
            fontSize: 60,
            color: '#000000'
        });
        optionButton.setInteractive();

        buttons.push(playButton);
        buttons.push(surviveButton);
        buttons.push(optionButton);
    },

    update: function() {
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
            changeOption(-1);
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            changeOption(1);
        }

        if ((currentIndex == 1) && Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.scene.manager.sleep('titleScene');
            this.scene.manager.start('gameScene');
        }
    }
});

export default TitleScene;