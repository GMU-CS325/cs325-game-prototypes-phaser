var currentIndex;
var buttons;
var titleButton;
var replayButton;
var winner;

function changeOption(change) {
	buttons[currentIndex].setStyle({ fontFamily: 'cdragon', fontSize: 64, color: '#800000' });
	//At top, loop back to bottom
	if (currentIndex + change == -1) {
		currentIndex = buttons.length - 1;
	}
	else {
		currentIndex = (currentIndex + change) % buttons.length;
	}

	buttons[currentIndex].setStyle({ fontFamily: 'cdragon', fontSize: 64, color: '#333333' });
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
	},

	create: function () {
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		var add = this.add;
		var input = this.input;
		var width = this.cameras.main.width;

		this.add.text(width/4, 32, 'Game Over', {
			fontFamily: 'cdragon',
			fontSize: 160,
			color: '#800000'
		}).setShadow(15, 15, "#111111", 2, false, true);

		titleButton = this.add.text(width / 4 + 100, 300, winner + ' wins', {
			fontFamily: 'cdragon',
			fontSize: 64,
			color: '#333333'
		});

		/*titleButton = this.add.text(width / 4 + 50, 300, 'Back To Title Screen', {
			fontFamily: 'cdragon',
			fontSize: 64,
			color: '#333333'
		});
		titleButton.setInteractive();

		replayButton = this.add.text(width / 4 + 200, 375, 'Replay', {
			fontFamily: 'cdragon',
			fontSize: 64,
			color: '#800000'
		});
		replayButton.setInteractive();

		buttons.push(titleButton);
		buttons.push(replayButton);*/
	},

	update: function () {
		/*if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
			changeOption(-1);
		}
		else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
			changeOption(1);
		}

		if ((currentIndex == 0) && Phaser.Input.Keyboard.JustDown(this.enter)) {
			this.scene.manager.sleep('endScene');
			this.scene.manager.start('titleScene');
			//this.scene.start('gameScene');
		}

		if ((currentIndex == 1) && Phaser.Input.Keyboard.JustDown(this.enter)) {
			this.scene.manager.sleep('endScene');
			this.scene.restart('gameScene');
			this.scene.run('gameScene');
		}*/
	}
});

export default EndScene;