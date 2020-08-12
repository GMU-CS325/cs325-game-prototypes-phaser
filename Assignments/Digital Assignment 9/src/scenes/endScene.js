var currentIndex;
var buttons;
var titleButton;
var replayButton;
var winner;
//s
function changeOption(change) {
	buttons[currentIndex].setStyle({ fontFamily: 'dragon', fontSize: 64, color: '#333333' });
	//At top, loop back to bottom
	if (currentIndex + change == -1) {
		currentIndex = buttons.length - 1;
	}
	else {
		currentIndex = (currentIndex + change) % buttons.length;
	}

	buttons[currentIndex].setStyle({ fontFamily: 'dragon', fontSize: 64, color: '#800000' });
}

var EndScene = new Phaser.Class({

	Extends: Phaser.Scene,
	initialize:

	function EndScene() {
		Phaser.Scene.call(this, { key: 'endScene' });
	},

	init: function (data) {
		currentIndex = 0;
		buttons = [];
		winner = data.winner;
		this.scene.stop('gameScene');
		this.scene.stop('titleScene');
	},

	create: function () {
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		var width = this.cameras.main.width;

		this.add.text(width/4, 32, 'Game Over', {
			fontFamily: 'dragon',
			fontSize: 160,
			color: '#800000'
		}).setShadow(15, 15, "#111111", 2, false, true);

		this.add.text(width / 4 + 150, 250, winner + ' wins', {
			fontFamily: 'dragon',
			fontSize: 64,
			color: '#333333'
		});

		titleButton = this.add.text(width / 4 + 50, 375, 'Back To Title Screen', {
			fontFamily: 'dragon',
			fontSize: 64,
			color: '#800000'
		});
		titleButton.setInteractive();

		replayButton = this.add.text(width / 4 + 225, 450, 'Replay', {
			fontFamily: 'dragon',
			fontSize: 64,
			color: '#333333'
		});
		replayButton.setInteractive();

		buttons.push(titleButton);
		buttons.push(replayButton);
	},

	update: function () {
		if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
			changeOption(-1);
		}
		else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
			changeOption(1);
		}

		if ((currentIndex == 0) && Phaser.Input.Keyboard.JustDown(this.enter)) {
			this.scene.transition({ target: 'titleScene', moveAbove: true });
		}

		if ((currentIndex == 1) && Phaser.Input.Keyboard.JustDown(this.enter)) {
			this.scene.transition({ target: 'gameScene', moveAbove: true });
		}
	}
});

export default EndScene;